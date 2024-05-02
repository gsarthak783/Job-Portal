import React from "react";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from 'react-hook-form';
import axios from "axios";
import { refreshCurrentUser } from "../slices/loginSlice";


const ProfilePage = () => {

  const [profileData, setProfileData] = useState(null);
  const { register, handleSubmit } = useForm();
  const [resume, setResume] = useState(null);
  const [flag, setFlag] = useState(false);
  const dispatch = useDispatch();

  const { currentUser } = useSelector(state => state.loginState)
  let username = currentUser.username;
  let userType = currentUser.userType;

  useEffect(() => {
    window.scrollTo(0,0);
    setProfileData(currentUser);
  }, []);


  const handleViewResume = (resumeUrl) => {
    window.open(resumeUrl, '_blank');
  };

  const uploadResume = (e) => {
    console.log(e.target.files[0])
    setResume(e.target.files[0])
  };

  const handleUpdateResume = () => {
    setFlag(!flag);
  }

  const onSubmit = async () => {
    try {
      let data = { username }
      console.log(data)
      let formData = new FormData()
      formData.append('data', JSON.stringify(data));
      formData.append('file', resume);

      console.log(formData)
      //make http post request
      const res = await axios.post('http://localhost:1234/user-api/user-update', formData)
      console.log(res);
      if (res.data.message === 'Resume Updated') {
        dispatch(refreshCurrentUser({
          username: username,
          userType: userType,
        }))
      }
      setFlag(false);
    }
    catch (err) {

    }

  }


  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
        {profileData && (
          <>
            <div className="flex justify-center">
              <img src={profileData.imageUrl} alt="Profile" className="w-32 h-32 rounded-full mb-4 border-4" />
            </div>
            <div className="text-center mb-4">
              <h2 className="text-2xl font-bold">{currentUser.userType === 'user' ? `${profileData.firstName} ${profileData.lastName}` : profileData.companyName}</h2>
            </div>
            {currentUser.userType === 'user' ? (
              <>
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-1 text-right">
                    <h2 className="text-lg font-semibold mb-2">Username:</h2>
                    <h2 className="text-lg font-semibold mb-2">Email:</h2>
                    <h2 className="text-lg font-semibold mb-3">Contact Number:</h2>
                    <h2 className="text-lg font-semibold mb-2">Resume:</h2>
                  </div>
                  <div className="col-span-1 text-left mt-1">
                    <p className="text-gray-600 mb-2">{currentUser.username}</p>
                    <p className="text-gray-600 mb-2">{profileData.email}</p>
                    <p className="text-gray-600 mb-3">{profileData.contactNumber}</p>
                    <div className="flex items-center">
                      <button className="block mt-2 bg-blue-500 hover:bg-blue-700 text-white font-semibold px-4 py-2 mx-2 rounded-sm cursor-pointer" onClick={() => handleViewResume(currentUser.resumeUrl)}>View</button>
                      <button className="block mt-2 bg-blue-500 hover:bg-blue-700 text-white font-semibold px-4 py-2 mx-2 rounded-sm cursor-pointer" onClick={() => handleUpdateResume()}>Update</button>
                    </div>
                  </div>
                </div>
              </>
            ) : (

              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-1 text-right">
                  <h2 className="text-lg font-semibold mb-2">Username:</h2>
                  <h2 className="text-lg font-semibold mb-2">Email:</h2>
                </div>
                <div className="col-span-1 mt-1">
                  <p className="text-gray-600 mb-2">{currentUser.username}</p>
                  <p className="text-gray-600 mb-2">{profileData.email}</p>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {flag === true && currentUser.userType === 'user' && (<div className="max-w-md w-full bg-white p-3 my-3 rounded-lg shadow-md">
        <form onSubmit={handleSubmit(onSubmit)}>
          <label className="block mb-2 text-lg">Upload Resume</label>
          <input
            type="file"
            name='file'
            onChange={uploadResume}
            className='create-job-input' />
          <button
            type="submit"
            className="block mt-2 bg-blue-500 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-sm cursor-pointer"
          >
            Upload
          </button>
        </form>
      </div>
      )}
    </div>
  );
}

export default ProfilePage;