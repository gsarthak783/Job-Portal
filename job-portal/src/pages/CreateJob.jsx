/* eslint-disable react/no-unknown-property */
import React, { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import axios from "axios";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CreateJob = () => {


  const [selectedOption, setSelectedOption] = useState([]);
  const { currentUser, loginStatus } = useSelector(state => state.loginState)
  const [status, setStatus] = useState('active')

  const username = currentUser.username;

  let currentDate = new Date().toISOString().slice(0,10);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm();

  const { fields: fields1, append: append1, remove: remove1 } = useFieldArray({
    control,
    name: 'benefits',
  });

  const { fields: fields2, append: append2, remove: remove2 } = useFieldArray({
    control,
    name: 'rounds',
  });

  const [error, setError] = useState('');
  const [result, setResult] = useState('');

  const onSubmit = async (data) => {

    try {

      data.skills = selectedOption;
      const imageUrl = currentUser.imageUrl
      console.log("username -" + username)
      const formData = { ...data, imageUrl, status, username }
      const benefitArray = formData.benefits.map((item) => item.name)
      formData.benefits = benefitArray;

      const roundArray = formData.rounds.map((item) => item.name)
      formData.rounds = roundArray;

      const skillArray = formData.skills.map((item) => item.label)
      formData.skills = skillArray;

      if (formData.jobId !== '' && formData.jobTitle !== ''
        && formData.minSalary !== '' && formData.maxSalary !== ''
        && formData.jobLocation !== '' && formData.experienceLevel !== ''
        && formData.description !== '' && formData.detail !== ''
        && formData.rounds !== null
      ) {
        // console.log(formData)
        //make http post request
        const res = await axios.post('http://localhost:1234/job-api/job-create', formData)
        console.log(res);
        
       
        if (res.status === 201) {  
          reset();
          setResult(res.data.message)

        }
        else {
          setError(res.data.message)
        }
      }
      else {
        console.log(currentDate)
        toast.error('Mandatory fields are required!!')
      }

    }
    catch (err) {
      setError(err.message)
    }

    // console.log(data)
  };

  const options = [
    { value: "JavaScript", label: "JavaScript" },
    { value: "C++", label: "C++" },
    { value: "HTML", label: "HTML" },
    { value: "CSS", label: "CSS" },
    { value: "React", label: "React" },
    { value: "Node", label: "Node" },
    { value: "MongoDB", label: "MongoDB" },
    { value: "Redux", label: "Redux" },
  ];

  // console.log(watch("example"));

  return (
    <div className="max-w-screen-2xl container mx-auto xl:px-24 px-4">
      {/* <PageHeader title={"Post A Job"} path={"Create Job"} /> */}

      {/* form */}
      <div className="bg-blue-50 py-10 px-4 lg:px-16">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* 1st row */}
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">Job ID <span className='text-red-500'>*</span></label>
              <input
                placeholder="Enter Job Id"
                {...register("jobId")}
                className="create-job-input"
              />
            </div>
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">Job Title <span className='text-red-500'>*</span></label>
              <input
                placeholder="Enter Job Title"
                {...register("jobTitle")}
                className="create-job-input"
              />
            </div>
          </div>
          {/* 2nd row */}
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">Industry</label>
              <select
                {...register("industry")}
                className="create-job-input "
              >
                <option value="">Select Industry</option>
                <option value="Technology">Technology</option>
                <option value="Finance">Finance</option>
                <option value="Education">Education</option>
                <option value="Healthcare">Healthcare</option>
                <option value="Media-Entertainment">Media Entertainment</option>
              </select>
            </div>

            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">Company Name </label>
              <input
                value={currentUser.companyName}
                {...register("companyName")}
                className="create-job-input "
              />
            </div>
          </div>

          {/* 3rd row */}
          <div className="create-job-flex">
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">Minimum Salary <span className='text-red-500'>*</span></label>
              <input
                placeholder="Min Salary in LPA"
                {...register("minSalary")}
                className="create-job-input "
              />
            </div>
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">Maximum Salary <span className='text-red-500'>*</span></label>
              <input
                placeholder="Max Salary in LPA"
                {...register("maxSalary")}
                className="create-job-input "
              />
            </div>
          </div>

          {/* 4th row */}
          <div className="create-job-flex">
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">Job Posting Date</label>
              <input
                className="create-job-input "
                {...register("jobPostingDate")}
                type="text"
                value={currentDate}
              />
            </div>

            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">Job Location <span className='text-red-500'>*</span></label>
              <select
                {...register("jobLocation")}
                className="create-job-input "
              >
                <option value="">Select Location</option>
                <option value="Bangalore">Bangalore</option>
                <option value="Mumbai">Mumbai</option>
                <option value="Delhi">Delhi</option>
                <option value="Noida">Noida</option>
                <option value="Gurgaon">Gurgaon</option>
                <option value="Hyderabad">Hyderabad</option>
                <option value="Chennai">Chennai</option>
                <option value="Pune">Pune</option>
                <option value="Kolkata">Kolkata</option>
                <option value="Coimbatore">Coimbatore</option>

              </select>
            </div>
          </div>

          {/* 5th row */}
          <div className="create-job-flex">
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">Employment Type</label>
              <select
                {...register("employmentType")}
                className="create-job-input "
              >
                <option value="">Select your job type</option>
                <option value="Full-Time">Full-Time</option>
                <option value="Part-Time">Part-Time</option>
                <option value="Temporary">Temporary</option>
              </select>
            </div>

            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">Experience Level <span className='text-red-500'>*</span></label>
              <select
                {...register("experienceLevel")}
                className="create-job-input "
              >
                <option value="">Select Your Experience Level</option>
                <option value="Entry-Level">Entry-Level</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Mid-Level">Mid-Level</option>
                <option value="Senior">Senior</option>
              </select>
            </div>
          </div>

          {/* 6th row */}
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className=" w-full">
              <label className="block mb-2 text-lg">Company URL</label>
              <input
                placeholder="Enter the url"
                {...register("companyUrl")}
                className="create-job-input "
              />
            </div>
          </div>

          {/* 7th row */}
          <div className="w-full">
            <label className="block mb-2 text-lg">Company Description <span className='text-red-500'>*</span></label>
            <textarea
              className="w-full pl-3 py-1.5 focus:outline-none "
              rows={3}
              {...register("description")}
              placeholder="Company description"
              defaultValue={"Mollit in laborum tempor Lorem incididunt irure. Aute eu ex ad sunt. Pariatur sint culpa do incididunt eiusmod eiusmod culpa. laborum tempor Lorem incididunt."}
            />
          </div>

          {/* 7th row */}
          <div className="w-full">
            <label className="block mb-2 text-lg">Job Detail <span className='text-red-500'>*</span></label>
            <textarea
              className="w-full pl-3 py-1.5 focus:outline-none "
              rows={5}
              {...register("detail")}
              placeholder="Enter the job details..."
            />
          </div>

          <div className="flex gap-6">

            <div className="lg:w-1/2 w-full ">
              <label className="block mb-2 text-lg">Benefits</label>
              {fields1.map((field, index) => (
                <div key={field.id}>
                  <input type="text"
                    className="create-job-input w-3/4"
                    {...register(`benefits.${index}.name`)}
                    placeholder={`Benefit ${index + 1}`}
                  />
                  <button type="button"
                    className="  bg-gray-300  text-black font-semibold px-4 py-2 rounded-sm"
                    onClick={() => remove1(index)}>
                    Remove
                  </button>
                </div>
              ))}
              <button type="button"
                className=" mt-4 bg-gray-300  text-black font-semibold px-4 py-2 rounded-sm"
                onClick={() => append1({ name: "" })}>
                Add Benefit
              </button>
            </div>

            <div className="lg:w-1/2 w-full ">
              <label className="block mb-2 text-lg">Rounds <span className='text-red-500'>*</span></label>
              {fields2.map((field, index) => (
                <div key={field.id}>
                  <input type="text"
                    className="create-job-input w-3/4"
                    {...register(`rounds.${index}.name`)}
                    placeholder={`Round ${index + 1}`}
                  />
                  <button type="button"
                    className="  bg-gray-300  text-black font-semibold px-4 py-2 rounded-sm"
                    onClick={() => remove2(index)}>
                    Remove
                  </button>
                </div>
              ))}
              <button type="button"
                className=" mt-4 bg-gray-300  text-black font-semibold px-4 py-2 rounded-sm"
                onClick={() => append2({ name: "" })}>
                Add Round
              </button>
            </div>

          </div>


          {error.length !== 0 && <p className='text-red-500'>{error}</p>}
          {result.length !== 0 && <p className='text-green-500'>{result}</p>}


          <input
            type="submit"
            className=" w-1/4 block  bg-blue-500 hover:bg-blue-700 text-white font-semibold px-8 py-2 rounded-sm cursor-pointer"
          />
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default CreateJob;
