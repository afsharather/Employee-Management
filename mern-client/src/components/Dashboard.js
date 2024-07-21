import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  return (
    <div>
      <h2>Welcome Admin Panel</h2>
      <Link to="/employees">Employee List</Link>
      <Link to="/employees/create">Create Employee</Link>
    </div>
  );
};

export default Dashboard;
