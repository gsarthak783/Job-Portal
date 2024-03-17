import React from 'react'
import Location from './Location'
import Salary from './Salary'
import JobPostingDate from './JobPostingDate'
import WorkExperience from './WorkExperience'
import EmploymentType from './EmploymentType'

const Sidebar = ({ handleChange }) => {
  return (
    <div className=''>
      <div className='space-y-5 hidden md:block'>
        <div className='flex-cols flex'>
        <h3 className='flex text-lg font-bold mr-6'>Filters</h3>
        <label htmlFor='reset' className="mx-auto text-lg inline-block  hover:underline text-black font-bold  rounded cursor-pointer">
       <input type="radio" id='reset' name="test"  value="" onChange={handleChange} className="appearance-none hidden"/>
      Reset
      </label>
        </div>
        
        <Location handleChange={handleChange}/>
        <Salary handleChange={handleChange} />
        {/* <JobPostingDate handleChange={handleChange}/> */}
        <WorkExperience handleChange={handleChange}/>
        <EmploymentType handleChange={handleChange}/>
    </div>

    <div
        className={`md:hidden flex flex-cols gap-10 px-2 py-2 bg- rounded-m  `}
      >
        <h3 className='text-lg font-bold flex:none mb-2'>Filters</h3>
        <Location handleChange={handleChange}/>
        <WorkExperience handleChange={handleChange}/>
        {/* <div className='sm:hidden'>
        <EmploymentType  handleChange={handleChange}/>
        </div> */}
        

    </div>

    </div>
    
  )
}

export default Sidebar