//import user model
const {Newsletter} = require('../db')


const getNewsletter = async (req,res) =>{

  const list = await Newsletter.find()
 
    res.status(200).send({message:"Newsletters",payload:list})
}

const createNewsletter = async (req,res) => {   

    let email = req.body.email;
    
    let newsletter = await Newsletter.findOne({email:email})

    if(newsletter !== null)
    {
        res.send({message:"Already Subscribed"})
    }
    else{
        const document = new Newsletter(req.body)

      //save the document in the collection
     let email = await document.save()
    res.status(201).send({message:"Subscribed",payload:email})

    }
    
}
    

module.exports = {getNewsletter,createNewsletter}