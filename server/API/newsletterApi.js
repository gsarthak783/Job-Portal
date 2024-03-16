const exp = require('express')
const newsletterApp = exp.Router()

const expressAsyncHandler = require('express-async-handler')

//import req handlers from controllers
const {getNewsletter,createNewsletter} = require('../Controllers/newsletterController')


//get all emails
newsletterApp.get('/newsletter',expressAsyncHandler(getNewsletter))

//post new email
newsletterApp.post('/newsletter-create',expressAsyncHandler(createNewsletter))

module.exports = newsletterApp;