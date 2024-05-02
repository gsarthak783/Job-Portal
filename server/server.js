//create express app
const exp = require('express')
const app = exp();
const cors = require('cors')
const path = require('path')

//connect to react app
// app.use(exp.static(path.join(__dirname,'../job-portal/build')))
// connect frontend and backend port using cors
 app.use(cors({
<<<<<<< HEAD
    origin: ["https://job-portal-website-ten.vercel.app/"],
    methods:["POST", "GET"],
    credentials:true
=======
    origin: ["https://job-portal-website-ten.vercel.app"],
    methods:["POST", "GET"]
>>>>>>> 5e03a5124c79d1cdac9fc3a55c31655bb999b62d
 }))
//configured env variables
require('dotenv').config()

app.use(exp.json())

const userApp = require('./API/userApi')
const jobApp = require('./API/jobApi')
const appliedJobs = require('./API/appliedApi')
const appliedUsers = require('./API/appliedUsersApi')
const salaryApp = require('./API/salaryApi')
const newsletterApp = require('./API/newsletterApi')

//forward req to userApp when path starts with /user-api
app.use('/user-api',userApp)

//forward req to jobApp when path starts with /job-api
app.use('/job-api',jobApp)

//forward req to the appliedJobs when path starts with /applied-api
app.use('/apply-api',appliedJobs)

//forward request to appliedUsers when path start with /appliedUsers-api
app.use('/appliedUsers-api',appliedUsers)

//forward req to salaryApp when path starts with /salary-api
app.use('/salary-api',salaryApp)

//forward req  when path starts with /newsletter-api
app.use('/newsletter-api',newsletterApp)

app.get('/',(req,res)=>{
    res.json("Hello");
})

// middleware to handle the frontend url requests
app.use('',(req,res,next)=>{
    res.sendFile((path.join(__dirname,'../job-portal/build/index.html')))
})

//error handler
app.use((err,req,res,next) =>{
    res.send({message:'Error occured',error:err.message})
})

//assign port nymber
const PORT = process.env.PORT;
app.listen(PORT, ()=>console.log(`webserver is running on port ${PORT} ...`))
