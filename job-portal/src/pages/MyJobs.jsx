import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";


const MyJobs = () => {

  const { currentUser, loginStatus } = useSelector(state => state.loginState)
  let username = currentUser.username;
  let userType = currentUser.userType || '';
  console.log(currentUser.userType);

  const [expandedJobIndex, setExpandedJobIndex] = useState(null);
  const [data, setData] = useState({});
  const [error, setError] = useState('');
  const [login, setLogin] = useState(false)
  const [state, setState] = useState('');
  const [flag, setFlag] = useState('');

  const toggleJob = (index) => {
    if (expandedJobIndex === index) {
      setExpandedJobIndex(null);
    } else {
      setExpandedJobIndex(index);
    }
  };

  const handleStatus = async (user, jobId, username, status) => {
    // Handle action

    setState(status)
    let data = { user, jobId, username, status }
    let res1 = await axios.put('https://job-portal-server-tau-one.vercel.app/appliedUsers-api/user-update', data)

    let res2 = await axios.put('https://job-portal-server-tau-one.vercel.app/apply-api/job-update', data)
    console.log(res1);

    if (res1.data.message === 'Status Updated') {
      setFlag(status)
    }
    console.log(status)
  };

  const handleViewResume = (resumeUrl) => {
    window.open(resumeUrl, '_blank');
  };

  useEffect(() => {
    window.scrollTo(0,0);

    try {
      if (userType === 'user') {
        let fetchData = async () => {
          const res = await axios.get(`https://job-portal-server-tau-one.vercel.app/apply-api/job/${username}`)
          console.log(res)
          setData(res.data.payload);
          if (res.data.message === 'Jobs found') {
            setLogin(true);
          }
        }

        fetchData();
      }
      else {
        let fetchData = async () => {
          const res = await axios.get(`https://job-portal-server-tau-one.vercel.app/appliedUsers-api/user/${username}`)
          console.log(res)
          setData(res.data.payload);

          if (res.data.message === 'Applications found') {
            setLogin(true);
          }
        }

        fetchData();
      }

    }
    catch (err) {
      setError(err);
    }
  }, [flag]);



  return (
    <div>
      {loginStatus === false ? (
        <>
          <div className="min-h-screen flex flex-col justify-between bg-slate-50">
            <div className="flex-grow flex justify-center items-center">
              <p className="text-center text-2xl font-semibold">Please Login to continue.</p>
            </div>
          </div>
        </>
      ) : (
        <>
          {userType === 'user' ? (

            <div className="min-h-screen flex flex-col justify-between bg-slate-50">
              <div className="flex-grow flex justify-center items-center">
                <div className="max-w-4xl w-full bg-white p-8 rounded-lg shadow-md">
                  <h1 className="text-2xl font-bold mb-4 text-center">Applied Jobs</h1>
                  {data && data.appliedJobs?.length > 0 ? (
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse">
                        <thead>
                          <tr className="bg-gray-200">
                            <th className="border p-2">S. No.</th>
                            <th className="border p-2">Job ID</th>
                            <th className="border p-2">Job Title</th>
                            <th className="border p-2">Company Name</th>
                            <th className="border p-2">Job Location</th>
                            <th className="border p-2">Min Salary</th>
                            <th className="border p-2">Max Salary</th>
                            <th className="border p-2">Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {data.appliedJobs?.map((job, index) => (
                            <tr key={index} className="border">
                              <td className="border p-2">{index + 1}.</td>
                              <td className="border p-2">
                                <Link to={`/jobs/${job.jobId}`} className="hover:underline">
                                  {job.jobId}
                                </Link>
                              </td>
                              <td className="border p-2">{job.jobTitle}</td>
                              <td className="border p-2">{job.companyName}</td>
                              <td className="border p-2">{job.jobLocation}</td>
                              <td className="border p-2">{job.minSalary}</td>
                              <td className="border p-2">{job.maxSalary}</td>
                              <td className={`border p-2 font-semibold ${job.status === 'Accepted' ? 'text-green-500' : job.status === 'Rejected' ? 'text-red-500' : ''}`}>{job.status}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <p className="text-center">No applied jobs found.</p>
                  )}
                </div>
              </div>

            </div>

          ) : (

            <div className="min-h-screen flex flex-col justify-between bg-slate-50 ">

              <div className="flex-grow flex justify-center items-center my-6">
                <div className="max-w-6xl w-full bg-white p-8 rounded-lg shadow-md">
                  <h1 className="text-2xl font-bold mb-6 text-center">Job Applications</h1>
                  <div className="space-y-4 overflow-x-auto">
                    {data?.jobs?.map((job, jobIndex) => (
                      <div key={jobIndex} className="border p-4 rounded-lg">
                        <div className="flex justify-between items-center">
                          <h2 className="text-lg font-semibold">Job:
                            <Link to={`/jobs/${job.jobId}`} className="hover:underline">
                              {job.jobId}
                            </Link></h2>

                          <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-sm cursor-pointer"
                            onClick={() => toggleJob(jobIndex)}
                          >
                            {expandedJobIndex === jobIndex ? 'Hide Users' : 'Show Users'}
                          </button>
                        </div>
                        {expandedJobIndex === jobIndex && (
                          <table className="w-full border-collapse overflow-x-auto">
                            <thead>
                              <tr className="bg-gray-200">
                                <th className="border p-2">S. No.</th>
                                <th className="border p-2">First Name</th>
                                <th className="border p-2">Last Name</th>
                                <th className="border p-2">Email</th>
                                <th className="border p-2">Contact Number</th>
                                <th className="border p-2">Status</th>
                                <th className="border p-2">Resume</th>
                                <th className="border p-2">Actions</th>
                              </tr>
                            </thead>
                            <tbody>
                              {job.users?.map((user, userIndex) => (
                                <tr key={userIndex} className="border">
                                  <td className="border p-2">{userIndex + 1}.</td>
                                  <td className="border p-2">{user.firstName}</td>
                                  <td className="border p-2">{user.lastName}</td>
                                  <td className="border p-2">{user.email}</td>
                                  <td className="border p-2">{user.contactNumber}</td>
                                  <td className={`border p-2 font-semibold ${user.status === 'Accepted' ? 'text-green-500' : user.status === 'Rejected' ? 'text-red-500' : ''}`}>{user.status}</td>
                                  <td className="border p-2">

                                    <button
                                      className="bg-blue-500 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-sm cursor-pointer "
                                      onClick={() => handleViewResume(user.resumeUrl)}
                                    >
                                      Resume
                                    </button>
                                  </td>
                                  <td className="border p-2 flex flex-cols">
                                    <button
                                      className="bg-green-500 text-white font-semibold px-4 py-2 mx-2 rounded-sm cursor-pointer flex"
                                      onClick={() => handleStatus(user.username, job.jobId, username, 'Accepted')}
                                    >
                                      Accept
                                    </button>
                                    <button
                                      className="bg-red-500 text-white font-semibold px-4 py-2 mx-2 rounded-sm cursor-pointer"
                                      onClick={() => handleStatus(user.username, job.jobId, username, 'Rejected')}
                                    >
                                      Reject
                                    </button>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </>

      )}

    </div>


  );
};

export default MyJobs;
