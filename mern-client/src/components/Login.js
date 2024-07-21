import React from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  
  // Replace history.push with navigate
  const handleLogin = () => {
    // Your login logic here

    // Navigate to dashboard
    navigate('/dashboard');
  };

  return (
    <div>
      {/* Your login form */}
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;
