import React, { useState } from 'react';
import './App.css';

const team = require('./team.json');

interface IBuddy {
  ix: number;
  isActive: boolean;
  picture: string;
  dob: string;
  age: string;
  name: string;
  gender: string;
  department: string;
  id: string;
  email: string;
  username: string;
}

function App() {
  const [buddy, setBuddy] = useState<IBuddy | null>(null);
  const [department, setDepartment] = useState('Engineering');

  function getABuddy(): any {
    const randomBuddy = team[Math.floor(Math.random() * team.length)];
    if (randomBuddy.department === department) {
      return setBuddy(randomBuddy);
    } else {
      return getABuddy();
    }
  }

  function handleSelect(e: any) {
    setDepartment(e.target.value);
  }

  return (
    <div className="App">
      <section>
        <div className="form-group">
          <label htmlFor="department">Department</label>
          <select id="department" value={department} onChange={handleSelect}>
            <option value="Engineering">Engineering</option>
            <option value="Finance">Finance</option>
            <option value="Research">Research</option>
            <option value="Marketing">Marketing</option>
            <option value="Legal">Legal</option>
            <option value="Administration">Administration</option>
          </select>
        </div>
        <button onClick={getABuddy}>Get a buddy</button>

        {buddy &&
          <div className="buddy">
            <div className="buddy-title">Your Patrium buddy is:</div>
            <div className="buddy-details">
              <h3 className="buddy-name">{buddy.name}</h3>
              <p className="buddy-email">{buddy.email}</p>
              <p className="buddy-department">{buddy.department}</p>
            </div>
          </div>
        }
      </section>
    </div>
  );
}

export default App;
