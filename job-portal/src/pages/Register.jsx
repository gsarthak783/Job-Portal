import React, { useState } from 'react';
import UserRegister from '../components/UserRegister';
import CompanyRegister from '../components/CompanyRegister';



const Register = () => {


  const [userType, setUserType] = useState('user');

  const handleUserType = (event) => {
    setUserType(event.target.value);
  };


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

        <div>
          {userType === 'user' ? (
            <>

              <UserRegister userType={userType} />

            </>

          ) : (

            <>

              <CompanyRegister userType={userType} />

            </>

          )}



        </div>

        {/* <p className="text-center text-gray-500 text-xs">&copy;2024 JobPortal. All rights reserved.</p> */}
      </div>
    </div>
  );
};

export default Register;