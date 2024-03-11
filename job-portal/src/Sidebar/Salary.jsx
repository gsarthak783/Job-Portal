import React from "react";
import InputField from "../components/InputField";


const Salary = ({ handleChange }) => {
  return (
    <div>
      <h4 className="text-lg font-medium mb-2">Salary</h4>
      
      <div>
        <label className="sidebar-label-container">
          <input onChange={handleChange} type="radio" value="" name="test2" />
          <span className="checkmark"></span>Any
        </label>

        <InputField
          handleChange={handleChange}
          value={10}
          title="< 10LPA"
          name="test2"
        />

        <InputField
          handleChange={handleChange}
          value={20}
          title="< 20LPA"
          name="test2"
        />

        <InputField
          handleChange={handleChange}
          value={30}
          title="< 30LPA"
          name="test2"
        />

        <InputField
          handleChange={handleChange}
          value={40}
          title="< 40LPA"
          name="test2"
        />

        <InputField
          handleChange={handleChange}
          value={50}
          title="< 50LPA"
          name="test2"
        />
      </div>
    </div>
  );
};

export default Salary;
