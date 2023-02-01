import React from 'react';
import './Department.css';

interface PropTypes {
  department: string;
  setDepartment: (value: string) => void;
}

export function Department(props: PropTypes) {
  const { department, setDepartment } = props;
  return (
    <div className="form-group">
      <label htmlFor="department">Department</label>
      <select id="department" value={department} onChange={(e) => {
        setDepartment(e.target.value);
      }}>
        <option value="Engineering">Engineering</option>
        <option value="Finance">Finance</option>
        <option value="Research">Research</option>
        <option value="Marketing">Marketing</option>
        <option value="Legal">Legal</option>
        <option value="Administration">Administration</option>
      </select>
    </div>
  );
}
