import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SalaryPage = () => {

  const [salary, setSalary] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [flag, setFlag] = useState(false);
  const [result, setResult] = useState('');
  const [error, setError] = useState('');

  const { currentUser } = useSelector(state => state.loginState)
  let userType = currentUser?.userType || '';

  const { register, handleSubmit, reset } = useForm();
  useEffect(() => {
    window.scrollTo(0,0);

    const fetchData = async () => {
      try {
        const res = await axios.get('http://localhost:1234/salary-api/salary-active')

        console.log(res)
        setSalary(res.data.payload)

      }
      catch (err) {

      }
    }
    fetchData();
  }, [searchText]);

  const onSubmit = async (userObj) => {
    try{
      if(userObj.industry !== '' && userObj.jobTitle !== ''
       && userObj.description !== '' && userObj.salary !== ''
       && userObj.education !== '' && userObj.skills !== ''){
        let status = 'active';
        let data = { ...userObj, status }
    
        let res = await axios.post('http://localhost:1234/salary-api/salary-create', data)
    
        console.log(res)

        if (res.status === 201) {  
          reset();
          setResult(res.data.message)
        }
      }
      else{
        toast.error('Mandatory fields are required!!',{
          position:'top-right',
          autoClose:3000,
        })
      }
      
    }
    catch(err){
      setError(err.message)
    }
    
  }

  const handleToggle = () => {
    if (flag === false) {
      setFlag(true)
    }
    else {
      setFlag(false)
    }
  }

  const handleSearch = () => {
    const filter = salary.filter(
      (job) =>
        job.jobTitle.toLowerCase().indexOf(searchText.toLowerCase()) !== -1
    );
    console.log(filter);
    setSalary(filter);
  };


  return (
    <div className=" min-h-screen flex flex-cols">
      <div className={`bg-slate-50  ${userType === 'company' ? 'w-2/3 py-6' : 'w-full py-10'}`}>
        <h1 className="text-center text-3xl font-bold mb-8">Estimated Salary</h1>
        <div className="container mx-auto flex flex-wrap justify-center">
          {salary.map((job, index) => (
            <div key={index} className={`shadow-lg rounded-lg m-4 overflow-hidden max-w-sm w-full ${index % 2 === 0 ? 'bg-gray-200' : 'bg-gray-300'}`}>
              <div className="p-4">

                <h2 className="text-lg font-semibold mb-2 text-center underline">{job.jobTitle}</h2>
                <h2 className="text-md mb-2">Industry: {job.industry}</h2>
                <p className="text-gray-700 mb-2">{job.description}</p>
                <p className="text-gray-700 mb-2"> Average Salary: ₹{job.salary}</p>
                <div className='flex'>
                  <p className="flex w:1/2 text-gray-700 mb-2 mx-2">Education: {job.education}</p>
                  <p className="flex w:1/2 text-gray-700 mb-2 mx-2">Skills: {job.skills}</p>
                </div>

              </div>
            </div>
          ))}
        </div>
      </div>


      {userType === 'company' && (
        <div className=" w-1/3 bg-blue-50 py-6">

          <h1 className='text-2xl text-center underline'>Post New Estimate</h1>
          <div className='flex flex-wrap' >


            <form className="space-y-5 w-full  py-6 px-10" onSubmit={handleSubmit(onSubmit)}>



              <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
                <div className="lg:w-1/2 w-full">
                  <label className="block mb-2 text-lg">Industry <span className='text-red-500'>*</span></label>
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
                  <label className="block mb-2 text-lg">Job Title <span className='text-red-500'>*</span></label>
                  <input
                    placeholder="Enter JobTitle"
                    {...register("jobTitle")}
                    className="create-job-input"
                  />
                </div>
              </div>

              <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
                <div className=" w-full">
                  <label className="block mb-2 text-lg">Description <span className='text-red-500'>*</span></label>
                  <input
                    placeholder="Enter Description"
                    {...register("description")}
                    className="create-job-input"
                  />
                </div>
              </div>


              <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
                <div className="lg:w-1/2 w-full">
                  <label className="block mb-2 text-lg">Average Salary <span className='text-red-500'>*</span></label>
                  <input
                    type='text'
                    placeholder="Salary"
                    {...register("salary")}
                    className="create-job-input"
                  />
                </div>
                <div className="lg:w-1/2 w-full">
                  <label className="block mb-2 text-lg">Education <span className='text-red-500'>*</span></label>
                  <input

                    placeholder="Education"
                    {...register("education")}
                    className="create-job-input"
                  />
                </div>
              </div>


              <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
                <div className=" w-full">
                  <label className="block mb-2 text-lg">Skills <span className='text-red-500'>*</span></label>
                  <input
                    placeholder="Skills"
                    {...register("skills")}
                    className="create-job-input"
                  />
                </div>
              </div>
              {error?.length !== 0 && <p className='text-red-500'>{error}</p>}
              {result?.length !== 0 && <p className='text-green-500'>{result}</p>}


              <div className=" items-center justify-between">
                <button
                  type="submit"

                  className=" lg:w-1/3 w-full block mt-6 bg-blue-500 hover:bg-blue-700 text-white font-semibold px-8 py-2 rounded-sm cursor-pointer items-center"
                >
                  Submit
                </button>

              </div>
            </form>
          </div>

        </div>
      )}
    <ToastContainer />
    </div>
  )
}

export default SalaryPage