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

    const user = JSON.parse(req.body.data)
    console.log(user)
    console.log(req.files)

    //create() => create document + save in collection 
    //let user = await User.create(req.body)

    //getting the user given username
    let userCred = user.username;
    //storing the userType
    let userType = user.userType;
  //  console.log(userCred)
  //if userType is user
    if(userType === 'user'){
        let checkUser = await User.findOne({username:userCred})
        //console.log(checkUser)
        if(checkUser === null)
        {
         //create the document
        const userDocument = new User(user)
           
        //hash the password
        let hashedPassword = await bcryptjs.hash(userDocument.password,5)
        //replace plain password with hashed password
        userDocument.password = hashedPassword;

        //upload  profile image to cloudinary
        let image = await cloudinary.uploader.upload(req.files[0].path)
        //add cloudinary image url to userDocument
        userDocument.imageUrl = image.url;

        //upload resume to cloudinary
        let resume = await cloudinary.uploader.upload(req.files[1].path)
        //add cloudinary resume url to userDocument
        userDocument.resumeUrl = resume.url;

        fs.unlink(req.files[0].path,err=>{
            if(err){
                throw err
            }
            console.log("Image removed from local folder")
        });

        fs.unlink(req.files[1].path,err=>{
            if(err){
                throw err
            }
            console.log("Resume removed from local folder")
        });


        console.log(userDocument)
        //save the document in the collection
        let userData = await userDocument.save()

        

        res.status(201).send({message:"User created",payload:userData})
        }
        else{
            res.send({message:"Username already exist"})
        }
    }
    else {

        //checking if user already exist
    let checkUser = await Company.findOne({username:userCred})
    //console.log(checkUser)
    if(checkUser === null)
    {
        //create the document
    const userDocument = new Company(user)

    //hash the password
    let hashedPassword = await bcryptjs.hash(userDocument.password,5)
    //replace plain password with hashed password
    userDocument.password = hashedPassword;

    //upload image to cloudinary
    let image = await cloudinary.uploader.upload(req.files[0].path)

    //add cloudinary image url to userDocument
    userDocument.imageUrl = image.url;

    console.log(userDocument)
    //save the document in the collection
    let userData = await userDocument.save()

    fs.unlink(req.files[0].path,err=>{
        if(err){
            throw err
        }
        console.log("Image removed from local folder")
    });
    res.status(201).send({message:"Seller created",payload:userData})
    }
    else{
        res.send({message:"Username already exist"})
    }
    
}
}

const extractPublicId = (url) => {
    const startIndex = url.lastIndexOf('/') + 1;
    const endIndex = url.lastIndexOf('.');
    return url.substring(startIndex,endIndex);
}

const updateUser = async (req,res) => {

    const user = JSON.parse(req.body.data)
    console.log(req.body)
    console.log(req.file.path)

    let userCred = user.username;

    let checkUser = await User.findOne({username:userCred})
        //console.log(checkUser)
        if(checkUser !== null)
        {

        // let oldResumeUrl = checkUser.resumeUrl;
        // let publicId = extractPublicId(oldResumeUrl);
        // console.log(publicId)

         //delete old resume from cloudinary
        //  let result2 = await cloudinary.uploader.destroy(publicId);
        //  console.log(result2)

        //upload new resume to cloudinary
        let result = await cloudinary.uploader.upload(req.file.path)
        console.log(result)

        //add cloudinary resume url to checkUser
        checkUser.resumeUrl = result.url;
        console.log(checkUser)
        //save the document in the collection
        let userData = await checkUser.save()

        fs.unlink(req.file.path,err=>{
            if(err){
                throw err
            }
            console.log("Resume removed from local folder")
        });

            res.send({message:"Resume Updated",user:userData})
         
        
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
     console.log(bearerToken);

     //get token
     if(bearerToken){
        
        //verify the token
        let decodedToken =  jwt.verify(bearerToken,process.env.SECRET_KEY) 
        console.log("Decoded Data = ",decodedToken)
            res.send({message:"Token",payload:decodedToken})
    }else{
        res.send({Message:"Unauthorised Access"})
    }
}
    

module.exports = {getUsers,getUserByUsername,createUser,updateUser,deleteUser, loginUser,loginUserRefresh}