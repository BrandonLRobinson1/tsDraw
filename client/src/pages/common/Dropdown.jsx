import * as React from "react";
import "./index.css";

// TODO:
/* eslint-disable */
const Dropdown = ({ label, value, options, onChange }) => (
  <label>
    <span className='dropdown-label'>{`${label}: `}</span>
    <select value={value} onChange={onChange} className="select-dropdown">
      {options.map((option) => (
        <option value={option.value} key={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  </label>
);

export default Dropdown;
