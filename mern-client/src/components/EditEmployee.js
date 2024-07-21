import React from 'react';
import { useNavigate } from 'react-router-dom';

const EditEmployee = () => {
  const navigate = useNavigate();
  
  // Replace history.push with navigate
  const handleUpdate = () => {
    // Your update logic here

    // Navigate back to the employee list
    navigate('/employee-list');
  };

  return (
    <div>
      {/* Your edit employee form */}
      <button onClick={handleUpdate}>Update</button>
    </div>
  );
};

export default EditEmployee;
