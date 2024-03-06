const exp = require('express')
const jobApp = exp.Router()

const expressAsyncHandler = require('express-async-handler')

//import req handlers from controllers
const {getJobs,getActiveJobs, getJobById,createJob,updateJob,deleteJob} = require('../Controllers/jobController')



//Job CRUD

//get all jobs
jobApp.get('/jobs',expressAsyncHandler(getJobs))

//get active jobs
jobApp.get('/active-jobs',expressAsyncHandler(getActiveJobs))

//get job by Id
jobApp.get('/job/:jobId',expressAsyncHandler(getJobById))

//create job
jobApp.post('/job-create',expressAsyncHandler(createJob))

//update job
jobApp.put('/job-update',expressAsyncHandler(updateJob))

//delete job
jobApp.delete('/job-delete/:username',expressAsyncHandler(deleteJob))






module.exports = jobApp;