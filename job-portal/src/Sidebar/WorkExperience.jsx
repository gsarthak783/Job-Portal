import React from 'react'
import InputField from '../components/InputField'

const WorkExperience = ({handleChange}) => {
  return (
    <div>
         <h4 className="text-lg font-medium mb-2">Work experience</h4>
      <div>
        <label className="sidebar-label-container">
          <input onChange={handleChange} type="radio" value="" name="test" />
          <span className="checkmark"></span>Any experience
        </label>
        <InputField
          handleChange={handleChange}
          value="Entry-Level"
          title="Entry-Level"
          name="test"
        />
        <InputField
          handleChange={handleChange}
          value="Intermediate"
          title="Intermediate"
          name="test"
        />
        <InputField
          handleChange={handleChange}
          value="Mid-Level"
          title="Mid-Level"
          name="test"
        />
        <InputField
          handleChange={handleChange}
          value="Senior"
          title="Senior"
          name="test"
        />
      </div>
    </div>
  )
}

export default WorkExperience