//import user model
const {User,Company} = require('../db')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { cloudinary } = require('../Middlewares/cloudinaryUpload')
const fs = require('fs')

const getUsers = async (req,res) =>{
    let userType = req.params.userType;
    if(userType === 'user'){
        const usersList = await User.find()
        res.status(200).send({message:"Users",payload:usersList})
    }
    else if(userType === 'company'){
        const usersList = await Company.find()
        res.status(200).send({message:"Users",payload:usersList})
    }
 
}

const getUserByUsername = async (req,res) => {
    let username = req.body.username;
    let userType = req.body.userType;
    console.log(req.body)
    if(userType === 'user'){
        let user = await User.findOne({username:username})

        if(user !== null){
            res.send({message:"User found",user:user})
        }
        else{
            res.send({message:"User not found"})
        }
    }
    else if(userType === 'company')
    {
        let user = await Company.findOne({username:username})

        if(user !== null){
            res.send({message:"User found",user:user})
        }
        else{
            res.send({message:"User not found"})
        }
    }
    
    
   
}

const createUser = async (req,res) => {

    try {
        const user = JSON.parse(req.body.data);
        const userCred = user.username;
        const userType = user.userType;

        if (userType === 'user') {
            let checkUser = await User.findOne({ username: userCred });

            if (checkUser === null) {
                const userDocument = new User(user);

                let hashedPassword = await bcryptjs.hash(userDocument.password, 5);
                userDocument.password = hashedPassword;

                // Upload profile image to Cloudinary
                let image = await new Promise((resolve, reject) => {
                    cloudinary.uploader.upload_stream({ resource_type: 'image' }, (error, result) => {
                        if (error) return reject(error);
                        resolve(result);
                    }).end(req.files[0].buffer);
                });

                // Add Cloudinary image URL to userDocument
                userDocument.imageUrl = image.secure_url;

                // Upload resume to Cloudinary
                let resume = await new Promise((resolve, reject) => {
                    cloudinary.uploader.upload_stream({ resource_type: 'image' }, (error, result) => {
                        if (error) return reject(error);
                        resolve(result);
                    }).end(req.files[1].buffer);
                });

                // Add Cloudinary resume URL to userDocument
                userDocument.resumeUrl = resume.secure_url;

                // Save the document in the collection
                let userData = await userDocument.save();

                res.status(201).send({ message: "User created", payload: userData });
            } else {
                res.send({ message: "Username already exists" });
            }
        } else {
            let checkUser = await Company.findOne({ username: userCred });

            if (checkUser === null) {
                const userDocument = new Company(user);

                let hashedPassword = await bcryptjs.hash(userDocument.password, 5);
                userDocument.password = hashedPassword;

                // Upload image to Cloudinary
                let image = await new Promise((resolve, reject) => {
                    cloudinary.uploader.upload_stream({ resource_type: 'image' }, (error, result) => {
                        if (error) return reject(error);
                        resolve(result);
                    }).end(req.files[0].buffer);
                });

                // Add Cloudinary image URL to userDocument
                userDocument.imageUrl = image.secure_url;

                // Save the document in the collection
                let userData = await userDocument.save();

                res.status(201).send({ message: "Company created", payload: userData });
            } else {
                res.send({ message: "Username already exists" });
            }
        }
    } catch (error) {
        res.status(500).send({ message: 'Internal server error', error });
    }
}

const extractPublicId = (url) => {
    const startIndex = url.lastIndexOf('/') + 1;
    const endIndex = url.lastIndexOf('.');
    return url.substring(startIndex,endIndex);
}

const updateUser = async (req,res) => {

    try {
        const user = JSON.parse(req.body.data);
        const userCred = user.username;

        // Check if the user exists
        let checkUser = await User.findOne({ username: userCred });

        if (checkUser !== null) {
            // If there is a file in the request, process it
            if (req.file) {
                // Optionally, delete the old resume from Cloudinary if it exists
                // const oldResumeUrl = checkUser.resumeUrl;
                // const publicId = extractPublicId(oldResumeUrl);
                // await cloudinary.uploader.destroy(publicId);

                // Upload new resume to Cloudinary
                let result = await new Promise((resolve, reject) => {
                    console.log(req.file.mimetype)
                    cloudinary.uploader.upload_stream({ resource_type: 'image' }, (error, result) => {
                        if (error) return reject(error);
                        resolve(result);
                    }).end(req.file.buffer);
                });
                // Add Cloudinary resume URL to checkUser
                checkUser.resumeUrl = result.secure_url;
            }

            // Save the updated user document
            let userData = await checkUser.save();

            res.send({ message: "Resume Updated", user: userData });
        } else {
            res.status(404).send({ message: "User not found" });
        }
    } catch (error) {
        res.status(500).send({ message: 'Internal server error', error });
    } 
}

const deleteUser = async (req,res) => {
    let username = req.params.username;
    let user = await User.deleteOne({username})

    if(user.deletedCount !== 0){
        res.send({message:"User deleted",payload:user})
    }
    else if(user.acknowledged && user.deletedCount === 0){
        res.send({message:"User not found in DB"})
    }
}

const loginUser = async (req,res) => {
    let userCred = req.body;
    let userName = userCred.username;
    let userPassword = userCred.password;
    let userType = userCred.userType;

    if(userType === 'user')
    {
        let userFromDb = await User.findOne({username:userName})

        if(userFromDb===null){
            res.send({message:"Invalid username"})
        }
        else
        {   
            let hashPass = await bcryptjs.compare(userPassword,userFromDb.password)
          //  let checkPassword = await User.findOne({username:userName,password:userPassword})
            if(hashPass === false){
                // console.log(hashPass)
                res.send({message:"Invalid password"})
            }
            else{
               // console.log(hashPass)
               let signedToken = jwt.sign({username:userFromDb.username,userType:userType},process.env.SECRET_KEY,{expiresIn:"1d"})
                res.send({message:"Login Successful",token:signedToken,user:userFromDb})
            }
        }
    }
    else{

        let userFromDb = await Company.findOne({username:userName})

    if(userFromDb===null){
        res.send({message:"Invalid username"})
    }
    else
    {   
        let hashPass = await bcryptjs.compare(userPassword,userFromDb.password)
      //  let checkPassword = await User.findOne({username:userName,password:userPassword})
        if(hashPass === false){
            // console.log(hashPass)
            res.send({message:"Invalid password"})
        }
        else{
           // console.log(hashPass)
           let signedToken = jwt.sign({username:userFromDb.username,userType:userType},process.env.SECRET_KEY,{expiresIn:"1d"})
            res.send({message:"Login Successful",token:signedToken,user:userFromDb})
        }
    }

    }
    
}    

const loginUserRefresh = async (req,res)  => {

     //get bearer token from the header of req object
     const bearerToken = req.body.token;
    // console.log(req.body);
    

     //get token
     if(bearerToken){
        
        //verify the token
        let decodedToken =  jwt.verify(bearerToken,process.env.SECRET_KEY) 
        
            res.send({message:"Token",payload:decodedToken})
    }else{
        res.send({Message:"Unauthorised Access"})
    }
}
    

module.exports = {getUsers,getUserByUsername,createUser,updateUser,deleteUser, loginUser,loginUserRefresh}