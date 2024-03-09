import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { userLoginPromiseStatus } from '../slices/loginSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { useHistory } from 'react-router-use-history';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaEye, FaEyeSlash } from 'react-icons/fa6';

const Login = () => {

  const { register, handleSubmit } = useForm();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const { currentUser, loginStatus, errorMessage, isPending } = useSelector(state => state.loginState)
  const [userType, setUserType] = useState('user');
  const [showPass, setShowPass] = useState(false);


  const togglePassVisiblity = (e) => {
    setShowPass(!showPass);
  }

  const handleUserType = (event) => {
    setUserType(event.target.value);
  };


  const onSubmit = async (userObj) => {

    if (userObj.username !== '' &&
      userObj.password !== '') {
        console.log(userObj)
      const formData = { userType, ...userObj }
      dispatch(userLoginPromiseStatus(formData))

    }
    else {
      toast.error('Username and Password required!!')
    }
  };

  useEffect(() => {

    window.scrollTo(0,0);
    
    if (loginStatus && isPending === false) {

      toast('Login Successful')
      console.log('Login Successful')

      // setTimeout(() => {
      //   const { from } = location.state || { from: { pathname: '/' } };
      //   history.replace(from);
      // }, 3000);

      const { from } = location.state || { from: { pathname: '/' } };
        history.replace(from);

      
    }
  }, [loginStatus])



  return (
    <div className="max-w-screen-2xl container mx-auto xl:px-24 px-4">
      <div className="bg-blue-50 py-10 px-4 lg:px-16">

        <div className=" flex  justify-center bg-white rounded px-6 pt-4 pb-4 mb-2 mx-20">
          <label className="order-1 mx-2">
            <button
              type='button'
              value="user"
              onClick={handleUserType}
            />
            <span className={`border rounded-md px-12 py-2 cursor-pointer font-semibold 
           ${userType === 'user' ? 'bg-blue-500 text-white' : 'bg-slate-100 hover:bg-slate-200'}  `}>
              User</span>
          </label>

          <label className="order-2 mx-2">
            <button
              type='button'
              value="company"

              onClick={handleUserType}
            />
            <span className={`border rounded-md px-7 py-2 cursor-pointer font-semibold
           ${userType === 'company' ? 'bg-blue-500 text-white' : 'bg-slate-100 hover:bg-slate-200'} `}>
              Company</span>
          </label>

        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-5"
        >
          <h3 className="text-xl font-semibold mb-4">Please Login</h3>
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">Username <span className='text-red-500'>*</span></label>
              <input
                id='username'
                name='username'
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

          {errorMessage.length !== 0 && <p className='text-red-500'>{errorMessage}</p>}

          <div className="flex items-center justify-between">
            <button
              className="w-1/4 block mt-6 bg-blue-500 hover:bg-blue-700 text-white font-semibold px-8 py-2 rounded-sm cursor-pointer"
              type="submit"

            >
              Login
            </button>

            {/* <Link to="/register"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Register
              </Link> */}

          </div>

          <div className=" mt-2 ">

            <Link to="#"
              className=" text-gray-700 text-sm font-semibold  hover:underline cursor-pointer space-y-[5]"

            >
              Forgot Password?
            </Link>

            <div className='flex'>
              <div className='flex text-gray-500 font-semibold'>
                Don't have an account?
              </div>
              <Link to="/register"
                className="flex text-gray-700 pl-1 text-m font-bold mb-2 hover:underline cursor-pointer space-y-[5]"

              >
                Register
              </Link>
            </div>

          </div>
        </form>
        {/* <p className="text-center text-gray-500 text-xs">
          &copy;2024 JobPortal. All rights reserved.
        </p> */}
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;