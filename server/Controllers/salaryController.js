//import user model
const {Salary} = require('../db')

const getSalary = async (req,res) =>{
  const salaryList = await Salary.find()
    res.status(200).send({message:"Salaries Data",payload:salaryList})
}

const getActiveSalary = async (req,res) =>{
    let status = "active"
    const activeSalary = await Salary.find({status:status});
    res.status(200).send({message:"Active Data",payload:activeSalary})
}


const getSalaryById = async (req,res) => {
    let id = req.params._id;
   
    let salary = await Salary.findOne({_id:id})
    
    if(salary !== null){
        res.send({message:"Data found",payload:salary})
    }
    else{
        res.send({message:"Data not found"})
    }
}

const createSalary= async (req,res) => {

    //create() => create document + save in collection 
    //let user = await User.create(req.body)
    
        //create the document
    const document = new Salary(req.body)

    //save the document in the collection
    let salary = await document.save()
    res.status(201).send({message:"Salary Data Created",payload:salary})
    }
    

const updateSalary = async (req,res) => {
   let updatedUser =  await User.findOneAndUpdate({username:req.body.username},{...req.body})
   if(updatedUser){
         res.status(200).send({message:"User updated",payload:updatedUser})
   }
   else{
    res.status(200).send({message:"User not found"}) 
}
      
}

const deleteSalary = async (req,res) => {
    let id= req.params._id;

    let salary = await Salary.deleteOne({_id:id})
    console.log(salary)

    if(salary.deletedCount !== 0){
        res.send({message:"Data deleted",payload:salary})
    }
    else if(salary.acknowledged && salary.deletedCount === 0){
        res.send({message:"Data not found in Database"})
    }
    }

   
    

module.exports = {getSalary,getActiveSalary,getSalaryById,createSalary,updateSalary,deleteSalary}