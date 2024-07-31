import React from 'react'
import Location from './Location'
import Salary from './Salary'
import JobPostingDate from './JobPostingDate'
import WorkExperience from './WorkExperience'
import EmploymentType from './EmploymentType'

const Sidebar = ({ handleChange }) => {
  return (
    <div className=''>
      {/* <div className='space-y-5 hidden md:block'>
        <div className='flex-cols flex'>
        <h3 className='flex text-lg font-bold mr-6'>Filters</h3>
        <label htmlFor='reset' className="mx-auto text-lg inline-block  hover:underline text-black font-bold  rounded cursor-pointer">
       <input type="radio" id='reset' name="test"  value="" onChange={handleChange} className="appearance-none hidden"/>
      Reset
      </label>
        </div>
        
        <Location handleChange={handleChange}/>
        <Salary handleChange={handleChange} />
        <JobPostingDate handleChange={handleChange}/>
        <WorkExperience handleChange={handleChange}/>
        <EmploymentType handleChange={handleChange}/>
    </div> */}


    <div className="flex flex-col gap-4 p-4  rounded-md">
  <div className="flex justify-between items-center">
    <h3 className="text-lg font-bold">Filters</h3>
    <label htmlFor='reset' className="text-lg inline-block hover:underline text-black font-bold rounded cursor-pointer">
      <input type="radio" id='reset' name="test" value="" onChange={handleChange} className="appearance-none hidden" />
      Reset
    </label>
  </div>
  <div className="space-y-4 md:space-y-0">
    <div className="flex flex-row justify-between space-x-4 md:flex-col md:space-x-0 md:space-y-4">
      <Location handleChange={handleChange} />
      <WorkExperience handleChange={handleChange} />
    </div>
    <div className="flex flex-row justify-between space-x-4 md:flex-col md:space-x-0 md:space-y-4">
      <Salary handleChange={handleChange} />
      <EmploymentType handleChange={handleChange} />
    </div>
  </div>
</div>








    </div>
    
  )
}

export default Sidebar