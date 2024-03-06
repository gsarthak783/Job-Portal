import React, { useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate, Link } from "react-router-dom";
import { useForm } from 'react-hook-form';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaEye, FaEyeSlash } from 'react-icons/fa6';

const CompanyRegister = (user) => {

  const navigate = useNavigate();


  const [error, setError] = useState('');
  const { register, handleSubmit } = useForm();
  const [image, setImage] = useState(null);
  const [showPass, setShowPass] = useState(false);

  const togglePassVisiblity = (e) => {
    setShowPass(!showPass);
  }

  const uploadPic = (e) => {
    console.log(e.target.files[0])
    setImage(e.target.files[0])
  }

  const onCompanyRegister = async (userObj) => {
    try {
      if (userObj.username !== '' && userObj.email !== ''
        && userObj.password !== '' && userObj.companyName !== ''
        && image !== null) {

        let userType = user.userType;
        const data = { userType, ...userObj }
        const formData = new FormData();
        formData.append('data', JSON.stringify(data));
        formData.append('files', image)
        console.log(formData)
        //make http post request
        const res = await axios.post('http://localhost:1234/user-api/create-user', formData)
        console.log(res);
        if (res.status === 201) {
          toast.success('Register Successful')
          navigate('/login')
        }
        else {
          setError(res.data.message)
        }

      }
      else {
        toast.warn('Mandatory fields are required!!')
      }

    }
    catch (err) {
      setError(err.message)
    }
  };



  return (

    <>
      <form className="space-y-5" onSubmit={handleSubmit(onCompanyRegister)}>
        <div>
          <h3 className="text-xl font-semibold mb-4">Create an Account</h3>
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
          <div className="lg:w-1/2 w-full">
            <label className="block mb-2 text-lg">Email <span className='text-red-500'>*</span></label>
            <input
              type='email'
              placeholder="Enter Email"
              {...register("email")}
              className="create-job-input"
            />
          </div>
        </div>


        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="lg:w-1/2 w-full">
            <label className="block mb-2 text-lg">Company Logo <span className='text-red-500'>*</span></label>
            <input
              type="file"
              placeholder="Upload Company Logo"
              name='files'
              onChange={uploadPic}
              className='create-job-input' />
          </div>
          <div className="lg:w-1/2 w-full">
            <label className="block mb-2 text-lg">Company Name <span className='text-red-500'>*</span></label>
            <select name='companyName'
              {...register('companyName')}
              className='create-job-input' >
              <option value="">Select Company Name</option>
              <option value="Tech Innovations Inc.">Tech Innovations Inc.</option>
              <option value="Global Solutions Ltd.">Global Solutions Ltd.</option>
              <option value="Creative Minds Co.">Creative Minds Co.</option>
              <option value="Elite Enterprises LLC">Elite Enterprises LLC</option>
              <option value="Infinite Technologies Corp.">Infinite Technologies Corp.</option>
              <option value="Strategic Partners Group">Strategic Partners Group</option>
              <option value="Bright Future Holdings">Bright Future Holdings</option>
              <option value="Visionary Ventures Ltd.">Visionary Ventures Ltd.</option>
              <option value="Quantum Solutions Inc.">Quantum Solutions Inc.</option>
              <option value="Dynamic Solutions Group">Dynamic Solutions Group</option>

            </select>
          </div>
        </div>


        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="w-full relative ">
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



        {error.length !== 0 && <p className='text-red-500'>{error}</p>}


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

export default CompanyRegister;