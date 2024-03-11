import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import { useSelector } from "react-redux";
import axios from "axios";
import { LuDot } from "react-icons/lu";

const JobDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  console.log(id);
  const [job, setJob] = useState({});
  const [data, setData] = useState({});
  const [error, setError] = useState('')
  const { currentUser } = useSelector(state => state.loginState)
  let username = currentUser.username;
  let userType = currentUser.userType;
  let resumeUrl = currentUser.resumeUrl;
  let companyUsername = job.username;
  let jobId = job.jobId;
  let fetchedStatus = data?.status || '';
  console.log(fetchedStatus);
  let status = 'Applied'

  useEffect(() => {

    window.scrollTo(0,0);
    
    try {
      let fetchData = async () => {
        const res = await axios.get(`http://localhost:1234/job-api/job/${id}`)
        console.log(res)
        setJob(res.data.payload);
      }

      fetchData();

      let data = async () => {
        const res2 = await axios.post('http://localhost:1234/apply-api/job', {
          username: username,
          jobId: id,
        })
        console.log("res 2 ", res2)
        setData(res2.data.payload);

      }

      data();



    }
    catch (err) {
      setError(err);
    }
  }, []);

  const handleJobApply = async () => {

    const result = await Swal.fire({
      title: 'Apply For This Job',
      text: 'Are you sure you want to apply for this job?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Apply',
      cancelButtonText: 'Cancel',
    });
    if (result.isConfirmed) {

      try {
        // creating data object to apply for job
        let data = { ...job, status }

        const res1 = await axios.post('http://localhost:1234/apply-api/job-apply', {
          username: username,
          resumeUrl: resumeUrl,
          appliedJobs: data
        })
        console.log(res1.data)

        let user = { ...currentUser, status }
        console.log("Company username" + companyUsername)
        const res2 = await axios.post('http://localhost:1234/appliedUsers-api/user-apply', {
          username: companyUsername,
          jobs: [{
            jobId: id,
            users: [user]
          }]
        })
        console.log(res2.data)


        Swal.fire('Success', 'You have successfully applied for the job!', 'success');
      //  navigate('/');
      }
      catch (error) {
        Swal.fire('Error', 'Failed to apply for the Job. Try again later.', 'error');
      }
    }

  }
  return (
    <div className="max-w-screen-2xl container mx-auto xl:px-24 px-4 pb-4 bg-slate-50">
      <div className=" ">

        <div className="flex flex-col md:flex-row justify-between gap-10 pt-6">

          <div className="md:w-1/2 ">

            <div className="flex gap-10">
              <img src={job.imageUrl} alt="" className="w-20 h-20 mb-6 mr-4 flex" />

              <div className=" mb-6">
                <p className="text-xl font-semibold my-2">Job ID: {parseInt(job.jobId)}</p>
                <p className="text-xl font-semibold">Company Name: {job.companyName}</p>
              </div>
            </div>

            <div className="font-semibold">Company Description:</div>
            <p className="font-medium ">
              {job.description}
            </p>

          </div>



          <div className="md:w-1/2 ">
            <div className=" justify-center h-full">

              <div className="text-center">
                {/* <FaBriefcase /> */}
                <h1 className="text-l font-semibold my-2 ">Job Type: {job.employmentType}</h1>

                <h1 className="text-l font-semibold my-2 ">Min Experience Level: {job.experienceLevel}</h1>

                <h1 className="text-l font-semibold my-2 ">Job Location: {job.jobLocation}</h1>

                <h1 className="text-l font-semibold my-2  ">Expected Salary: {job.minSalary}LPA - {job.maxSalary}LPA</h1>

                {userType === 'user' ? (
                  <>
                    {fetchedStatus === '' ? (
                      <button type="button" className=" my-2 w-1/2 bg-blue-500 hover:bg-blue-700 px-6 py-2 text-white rounded-sm " onClick={handleJobApply}>
                        Apply Now
                      </button>
                    ) : (
                      <button type="button" value={fetchedStatus} className=" my-2 w-1/2 bg-blue-500 px-6 py-2 text-white rounded-sm cursor-not-allowed " >
                        {fetchedStatus}
                      </button>
                    )}
                  </>


                ) : (
                  <>
                    <button type="button" className=" my-2 w-1/2 bg-blue-500  px-6 py-2 text-white rounded-sm cursor-not-allowed" >
                      Not Applicable
                    </button>
                  </>
                )}

              </div>
            </div>
          </div>

        </div>



        {/* job details */}
        <div className="flex flex-cols mt-12">
          <div className="md:w-1/3">
            <h4 className="text-lg font-semibold mt-2">Skills:</h4>

            <ol className="list-disc" >
              {job.skills?.map((data, index) => (
                <li key={index} className=" flex-cols flex">
                <span className="items-center flex"> <LuDot /> </span>  {data}
                 </li>
              ))}
            </ol>
          </div>

          <div className="md:w-1/3">
            <h4 className="text-lg font-semibold mt-2">Rounds in Recruitment:</h4>
            <ol className="list-disc" >
              {job.rounds?.map((data, index) => (
                <li key={index} className=" flex-cols flex">
               <span className="items-center flex"> <LuDot /> </span>  {data}
                </li>
              ))}
            </ol>
          </div>

          <div className="md:w-1/3">
            <h4 className="text-lg font-semibold mt-2">Benefits:</h4>
            <ol className="list-disc" >
              {job.benefits?.map((data, index) => (
                <li key={index} className=" flex-cols flex">
                <span className="items-center flex"> <LuDot /> </span>  {data}
                 </li>
                
              ))}
            </ol>
          </div>


        </div>

        <div className=" mt-2 ">
          <div className="text-lg font-semibold">Job Details:</div>
          <p className="font-">{job.detail}</p>
        </div>

        <div className=" mt-2 ">
          <div className="text-lg font-semibold">Company URL:</div>
          <a href={job.companyUrl} className="hover:underline-offset-2">{job.companyUrl}</a>
        </div>

      </div>
    </div>

  );
}

export default JobDetails;
