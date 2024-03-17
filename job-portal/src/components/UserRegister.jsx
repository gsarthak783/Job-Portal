import React, { useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate, Link } from "react-router-dom";
import {useForm} from 'react-hook-form';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaEye, FaEyeSlash } from 'react-icons/fa6';
import Swal from 'sweetalert2';

const UserRegister = (user) => {

    const navigate = useNavigate();
     
    
        const [error, setError] = useState('');
        const {register, handleSubmit} = useForm();
        const [image, setImage] = useState(null);
       const [resume, setResume] = useState(null);
       const [showPass, setShowPass] = useState(false);

        const uploadPic = (e) => {
          console.log(e.target.files[0])
          setImage(e.target.files[0])
        }

        const uploadResume = (e) => {
          console.log(e.target.files[0])
          setResume(e.target.files[0])
        }

        const togglePassVisiblity = (e) => {
          setShowPass(!showPass);
        }
    
        const  onUserRegister = async (userObj) => {
          try{
            if(userObj.firstName !== '' && userObj.lastName !== ''
             && userObj.username !== '' && userObj.email !== '' 
             && userObj.password !== '' && userObj.contactNumber !== ''
             && resume !== null && image !== null)
             {

              let userType = user.userType;
           const data = {userType,...userObj}
           console.log(data)
           const formData = new FormData();
           formData.append('data',JSON.stringify(data));
           formData.append('files',image)
           formData.append('files',resume)
          //  console.log(JSON.parse(formData))
           //make http post request
           const res = await axios.post('http://localhost:1234/user-api/create-user', formData)
           console.log(res);
           if(res.status === 201){
              //  toast.success('Register Successful')
              //  navigate('/login')   
              Swal.fire({
                title: 'Success',
                text: 'You have successfully registered!',
                icon: 'success'
              }).then((result)=> {
                if(result.isConfirmed){
                  navigate('/login')
                }
              })
              
            }
            else{
             setError(res.data.message)
            }
          }
            else{
              toast.error('Mandatory fields are required!!')
            }
            
          }
          catch(err){
             setError(err.message)
          }    
         };
     
      
     
      return (
    
        <>
            <form className="space-y-5" onSubmit={handleSubmit(onUserRegister)}>
            <div>
              <h3 className="text-xl font-semibold mb-4">Create an Account</h3>
            </div>

           
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">Firstname <span className='text-red-500'>*</span></label>
              <input
              placeholder="Enter Firstname"
                {...register("firstName")}
                className="create-job-input"
              />
            </div>
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">Lastname <span className='text-red-500'>*</span></label>
              <input
                placeholder="Enter Lastname"
                {...register("lastName")}
                className="create-job-input"
              />
            </div>
          </div>
    
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">Username <span className='text-red-500'>*</span></label>
              <input
              placeholder="Enter Username"
                {...register("username")}
                className="create-job-input"
              />
            </div>
            <div className="lg:w-1/2 w-full relative ">
              <label className="block mb-2 text-lg">Password <span className='text-red-500'>*</span></label>
              <input
              type={showPass ? 'text' : 'password'}
                placeholder="Enter Password"
                {...register("password")}
                className="create-job-input "
              />
              <span onClick={togglePassVisiblity} className='absolute right-2 inset-y-12 flex'>
                {showPass ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
          </div>


          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">Email <span className='text-red-500'>*</span></label>
              <input
              type='email'
              placeholder="Ex: abc@gmail.com"
                {...register("email")}
                className="create-job-input"
              />
            </div>
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">Contact <span className='text-red-500'>*</span></label>
              <input
              
                placeholder="Enter Number"
                {...register("contactNumber")}
                className="create-job-input"
              />
            </div>
          </div>


          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">Profile Picture <span className='text-red-500'>*</span></label>
              <input 
             type="file" 
            
             name='files' 
             onChange={uploadPic}  
             className='create-job-input'/>
            </div>
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">Resume <span className='text-red-500'>*</span></label>
              <input 
             type="file" 
            
             name='files' 
             onChange={uploadResume} 
             className='create-job-input' />
            </div>
          </div>
    
            

              {error.length !== 0 &&<p className='text-red-500'>{error}</p>}
              
    
              <div className="flex items-center justify-between">
                <button
                  type="submit"
                  
                  className=" w-1/4 block mt-6 bg-blue-500 hover:bg-blue-700 text-white font-semibold px-8 py-2 rounded-sm cursor-pointer"
                >
                  Register
                </button>

              </div>

              <div className='flex'>
              <div className='flex text-gray-500 font-semibold'>
              Already have an account?
              </div>
          <Link to="/login"
              className="flex text-gray-700 pl-1 text-m font-bold mb-2 hover:underline cursor-pointer space-y-[5]"
              
            >
              Login
            </Link>
          </div>
     
            </form>

            
           <ToastContainer />
        </>   
      );
    };
     
    export default UserRegister;