const exp = require('express')
const salaryApp = exp.Router()

const expressAsyncHandler = require('express-async-handler')

//import req handlers from controllers
const {getSalary,getActiveSalary, getSalaryById,createSalary,updateSalary,deleteSalary} = require('../Controllers/salaryController')



//Job CRUD

//get all jobs
salaryApp.get('/salary',expressAsyncHandler(getSalary))

//get all jobs
salaryApp.get('/salary-active',expressAsyncHandler(getActiveSalary))

//get job by Id
salaryApp.get('/salary/:_id',expressAsyncHandler(getSalaryById))

//create job
salaryApp.post('/salary-create',expressAsyncHandler(createSalary))

//update job
salaryApp.put('/salary-update',expressAsyncHandler(updateSalary))

//delete job
salaryApp.delete('/salary-delete/:_id',expressAsyncHandler(deleteSalary))






module.exports = salaryApp;