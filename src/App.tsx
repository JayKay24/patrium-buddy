import React, { useState } from 'react';
import { Department } from './Department/Department';
import { Buddy } from './Buddy/Buddy';
import './App.css';

function App() {
  const [department, setDepartment] = useState('Engineering');

  return (
    <div className="App">
      <section>
        <Department department={department} setDepartment={setDepartment} />
        <Buddy department={department} /> 
      </section>
    </div>
  );
}

export default App;
