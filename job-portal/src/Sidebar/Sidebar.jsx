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
        <h3 className='text-lg font-bold mb-2'>Filters</h3>
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