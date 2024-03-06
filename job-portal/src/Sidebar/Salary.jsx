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
          value={6}
          title="< 6LPA"
          name="test2"
        />

        <InputField
          handleChange={handleChange}
          value={10}
          title="< 10LPA"
          name="test2"
        />

        <InputField
          handleChange={handleChange}
          value={15}
          title="< 15LPA"
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
          value={25}
          title="< 25LPA"
          name="test2"
        />
      </div>
    </div>
  );
};

export default Salary;
