const exp = require('express')
const appliedUsers = exp.Router()

const expressAsyncHandler = require('express-async-handler')

//import req handlers from controllers
const {getUsers, getUserByUsername,createUser,updateUser,deleteUser} = require('../Controllers/appliedUsersController')



//Job CRUD

//get all users
appliedUsers.get('/users',expressAsyncHandler(getUsers))

//get user by Id
appliedUsers.get('/user/:username',expressAsyncHandler(getUserByUsername))

//create user
appliedUsers.post('/user-apply',expressAsyncHandler(createUser))

//update user
appliedUsers.put('/user-update',expressAsyncHandler(updateUser))

//delete user
appliedUsers.delete('/user-delete/:username',expressAsyncHandler(deleteUser))


module.exports = appliedUsers;