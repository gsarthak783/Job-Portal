//import mongoose
const mongoose = require('mongoose')

require('dotenv').config()

const DB_URL = process.env.ATLAS_DB_URL;

//connect to db
mongoose.connect(DB_URL)
.then(()=> console.log("DB connection success"))
.catch(err => console.log("Error in db connect", err) )

//create user schema
const userSchema = new mongoose.Schema({
    userType:String,
    firstName:{
        type:String,
        required:[true,'Firstname is required'],
    },
    lastName:{
        type:String,
        required:[true,'Lastname is required'],
    },
    contactNumber:{
        type:String,
        required:[true,'Contact is required'],
        minLength:[10,'Number should contain 10 digits'],
        maxLength:[10,'Number should contain 10 digits'],
    },
    imageUrl:String,
    resumeUrl:String,
    username:{
        type:String,
        required:[true,'Username is required'],
        minLength:[4,'Username should contain atleast 4 characters'],
    },
    email:{
        type:String,
        required:[true,'Email is required'],
    },
    password:{
        type:String,
        required:true
    }

})

//create company Schema
const companySchema = new mongoose.Schema({
    userType:String,
    username:String,
    email:String,
    password:String,
    companyName:String,
    imageUrl:String,

})

// create job schema
const jobSchema = new mongoose.Schema({
    jobId:String,
    jobTitle:String,
    indusrty:String,
    companyName:String,
    minSalary:String,
    maxSalary:String,
    jobPostingDate:String,
    jobLocation:String,
    employmentType:String,
    experienceLevel:String,
    skills:[{}],
    companyUrl:String,
    description:String,
    detail:String,
    benefits:[{type:String}],
    rounds:[{type:String}],
    imageUrl:String,
    status:String,
    username:String,
})

const appliedJobs = new mongoose.Schema({
    username:String,
    resumeUrl:String,
    appliedJobs:[{}],
})

const appliedUsers = new mongoose.Schema({
    username:String,
    jobs:[
        {
            jobId:String,
            users:[{}]
        }
    ]
})

const estimateSalary = new mongoose.Schema({
    
    industry:String,
    jobTitle:String,
    description:String,
    salary:String,
    education:String,
    skills:String,
    status:String
})


//create Model(class) for the userSchema
const User = mongoose.model('userAuthentication',userSchema)

//create Model(class) for the jobSchema
const Job = mongoose.model('job',jobSchema)

//create Model(class) for the companySchema
const Company = mongoose.model('companydata',companySchema)

//create Model class for the appliedJobs
const Applicant = mongoose.model('userappliedjob',appliedJobs)

//create Model class for the applied Users
const Application = mongoose.model('applieduser',appliedUsers)

//create Model class for the Estimated Salary
const Salary = mongoose.model('salary',estimateSalary)

//export  models
module.exports = {User,Job, Company, Applicant, Application, Salary};