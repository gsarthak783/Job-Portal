//import user model
const {Job,Application} = require('../db')

const getJobs = async (req,res) =>{
  const jobsList = await Job.find()
  // reversing the objects to get the latest job first
    // let jobs = jobsList.reverse();
    res.status(200).send({message:"Jobs",payload:jobsList})
}

const getActiveJobs = async (req,res) =>{
    let status = "active"
    const activeJobs = await Job.find({status:status});
    res.status(200).send({message:"Active Jobs",payload:activeJobs})
}

const getJobById = async (req,res) => {
    let jobId = req.params.jobId;
   
    let job = await Job.findOne({jobId:jobId})
    
    if(job !== null){
        res.send({message:"Job found",payload:job})
    }
    else{
        res.send({message:"Job not found"})
    }
}

const createJob= async (req,res) => {

    //create() => create document + save in collection 
    //let user = await User.create(req.body)

    //getting the jobId given by job poster
    let jobId = req.body.jobId;
    console.log(req.body)
    username = req.body.username;
    console.log(username)

   
   

    //checking if user already exist
    let checkJobById = await Job.findOne({jobId:jobId})
   // console.log(checkJobById)
    if(checkJobById !== null)
    {
        res.send({message:"Job Id already exist"})
        
    }
    else{
        //create the document
    const jobDocument = new Job(req.body)

    //save the document in the collection
    let job = await jobDocument.save()
    res.status(201).send({message:"Job created",payload:job})
    }
    
}

const updateJob = async (req,res) => {
   let updatedUser =  await User.findOneAndUpdate({username:req.body.username},{...req.body})
   if(updatedUser){
         res.status(200).send({message:"User updated",payload:updatedUser})
   }
   else{
    res.status(200).send({message:"User not found"}) 
}
      
}

const deleteJob = async (req,res) => {
    let jobId= req.body.jobId;
    let job = await Job.deleteOne({jobId})

    if(user.deletedCount !== 0){
        res.send({message:"Job deleted",payload:job})
    }
    else if(user.acknowledged && user.deletedCount === 0){
        res.send({message:"Job not found in Database"})
    }
    }

   
    

module.exports = {getJobs,getActiveJobs,getJobById,createJob,updateJob,deleteJob}