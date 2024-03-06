//import user model
const {Applicant,Application} = require('../db')


const getJobs = async (req,res) =>{
  const jobsList = await Applicant.find()
    res.status(200).send({message:"Jobs",payload:jobsList})
}


const getJobByUsername= async (req,res) => {
    let username = req.params.username;
   
    let job = await Applicant.findOne({username:username})
    
    if(job !== null){
        res.send({message:"Jobs found",payload:job})
    }
    else{
        res.send({message:"Jobs not found"})
    }
}

const getStatus= async (req,res) => {
    let username = req.body.username;
    let jobId = req.body.jobId;
  //  console.log(req.body)
    let status = '';
   
    let job = await Applicant.findOne({username:username})
    
    if(job !== null){

       let foundJob =  job.appliedJobs.find(job => job.jobId === jobId)
      // console.log(foundJob)
        res.send({message:"Jobs found",payload:foundJob})
    }
    else{
        let job = {status}
        res.send({message:"Jobs not found",payload:job})
    }
}

const createJob= async (req,res) => {

    //getting the username and url given by job applier
    let username = req.body.username;
    let resumeUrl = req.body.resumeUrl;
    const jobs = req.body.appliedJobs;

    //checking if user already exist
    let checkByUsername = await Applicant.findOne({username:username})
        
        if(checkByUsername === null)
        {        console.log('hello')
              //create the  job document 
        checkByUsername = new Applicant({
            username,
            resumeUrl,
            appliedJobs: [jobs],
        });  

    }
     else { 
            checkByUsername.appliedJobs.push(jobs); 
        } 

        //save the document in the collection
        let applied = await checkByUsername.save()
     
        //send response
       return res.status(201).send({message:"Job Applied",payload:applied})
   
    
}

const updateJob = async (req,res) => {
    const user = req.body.user;
    const jobId = req.body.jobId;
    const newStatus = req.body.status;

   let updatedJob =  await Applicant.updateOne({'username':user,'appliedJobs.jobId':jobId},
                                                {$set:{'appliedJobs.$.status':newStatus}});
   if(updatedJob){
         res.status(200).send({message:"Job Updated"})
   }
   else{
    res.status(200).send({message:"Job Not Updated"}) 
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

   
    

module.exports = {getJobs,getJobByUsername,getStatus,createJob,updateJob,deleteJob}