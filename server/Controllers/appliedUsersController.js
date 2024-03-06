//import user model
const {Applicant,Application} = require('../db')


const getUsers = async (req,res) =>{
  const userList = await Application.find()
    res.status(200).send({message:"Users",payload:userList})
}


const getUserByUsername = async (req,res) => {
    let username = req.params.username;
   
    let application = await Application.findOne({username:username})
    
    if(application !== null){
        res.send({message:"Applications found",payload:application})
    }
    else{
        res.send({message:"Applications not found"})
    }
}

const createUser = async (req,res) => {

    //getting the username and job data given by job applier
   // console.log(req.body)
    // getting the company username
    let username = req.body.username;
    console.log('username' + username)
    let userjob = req.body.jobs;
    //console.log(jobs)
    

    //checking if company document already exist
    let checkByUsername = await Application.findOne({username:username})
    console.log(checkByUsername)
        if(checkByUsername === null)
        {        
              //create the company document 
        checkByUsername = new Application(req.body);  
    }
     else { 
                userjob.forEach(job => {
                    
                    const index = checkByUsername.jobs.findIndex(j => j.jobId === job.jobId);
                        console.log("Index - ",index)
                        //if jobId does not exist then create the jobId
                        if(index === -1){
                            checkByUsername.jobs.push(job);
                            console.log('if')
                        }
                        // push the userdata in the existing jobId
                        else{
                            checkByUsername.jobs[index].users.push(...job.users)
                            console.log(checkByUsername)
                            console.log('else')
                        }
                });    
             
        } 

        //save the document in the collection
        let applied = await checkByUsername.save()
     
        //send response
       return res.status(201).send({message:"Application Forwarded",payload:applied})
   
    
}

const updateUser = async (req,res) => {
   
    let companyUsername = req.body.username;
    let user = req.body.user;
    let jobId = req.body.jobId;
    let newStatus = req.body.status;
    

    let data = await Application.findOne({username:companyUsername})
   
    if(data !== null){
        // const index = data.jobs.findIndex(j => j.jobId === jobId)

        let updatedData = await Application.findOneAndUpdate({'username':companyUsername,'jobs.jobId':jobId, 'jobs.users.username':user},
        {$set : {'jobs.$[outer].users.$[inner].status':newStatus}}, {arrayFilters: [{'outer.jobId':jobId},{'inner.username':user}],new:true});
        
        if(!updatedData){
            res.status(200).send({message:"Status Not Updated"})
        }
        else{
            res.status(200).send({message:"Status Updated"})
        }

    }
}


const deleteUser = async (req,res) => {
    let jobId= req.body.jobId;
    let job = await Job.deleteOne({jobId})

    if(user.deletedCount !== 0){
        res.send({message:"Job deleted",payload:job})
    }
    else if(user.acknowledged && user.deletedCount === 0){
        res.send({message:"Job not found in Database"})
    }
    }

   
    

module.exports = {getUsers,getUserByUsername,createUser,updateUser,deleteUser}