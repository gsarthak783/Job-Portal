const exp = require('express')
const appliedJobs = exp.Router()

const expressAsyncHandler = require('express-async-handler')

//import req handlers from controllers
const {getJobs, getJobByUsername,getStatus,createJob,updateJob,deleteJob} = require('../Controllers/appliedJobsController')



//Job CRUD

//get all jobs
appliedJobs.get('/jobs',expressAsyncHandler(getJobs))

//get job by username
appliedJobs.get('/job/:username',expressAsyncHandler(getJobByUsername))

//get status by id
appliedJobs.post('/job',expressAsyncHandler(getStatus))

//create job
appliedJobs.post('/job-apply',expressAsyncHandler(createJob))

//update job
appliedJobs.put('/job-update',expressAsyncHandler(updateJob))

//delete job
appliedJobs.delete('/job-delete/:username',expressAsyncHandler(deleteJob))


module.exports = appliedJobs;