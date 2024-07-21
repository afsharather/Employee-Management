import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const fetchEmployees = async () => {
      const res = await axios.get('http://localhost:5000/api/employees');
      setEmployees(res.data);
    };
    fetchEmployees();
  }, []);

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/api/employees/${id}`);
    setEmployees(employees.filter(emp => emp._id !== id));
  };

  return (
    <div>
      <h2>Employee List</h2>
      <Link to="/employees/create">Create Employee</Link>
      <ul>
        {employees.map(emp => (
          <li key={emp._id}>
            {emp.f_Name} - {emp.f_Email}
            <Link to={`/employees/edit/${emp._id}`}>Edit</Link>
            <button onClick={() => handleDelete(emp._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EmployeeList;
