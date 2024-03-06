const exp = require('express')
const userApp = exp.Router()

const expressAsyncHandler = require('express-async-handler')

//import req handlers from controllers
const {getUsers, getUserByUsername,createUser,updateUser,deleteUser, loginUser, loginUserRefresh} = require('../Controllers/userController')
const verifyToken = require('../Middlewares/verifyToken')
const {upload} = require('../Middlewares/cloudinaryUpload');



//user CRUD

//read all users
userApp.get('/users/:userType',expressAsyncHandler(getUsers))

//get user by username
userApp.post('/user',expressAsyncHandler(getUserByUsername))

//create user
userApp.post('/create-user',upload.array("files",2),expressAsyncHandler(createUser))

//update user
userApp.post('/user-update',upload.single("file"),expressAsyncHandler(updateUser))

//delete user
userApp.delete('/user/:username',expressAsyncHandler(deleteUser))

//login user
userApp.post('/user-login',expressAsyncHandler(loginUser))

//login using token
userApp.post('/user-login-refresh',expressAsyncHandler(loginUserRefresh))





module.exports = userApp;