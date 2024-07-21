import React, { useState } from 'react';
import axios from 'axios';

const CreateEmployee = () => {
  const [formData, setFormData] = useState({
    f_Id: '',
    f_Name: '',
    f_Email: '',
    f_Mobile: '',
    f_Designation: '',
    f_gender: '',
    f_Course: [],
    f_Image: null
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setFormData({
        ...formData,
        f_Course: checked ? [...formData.f_Course, value] : formData.f_Course.filter(course => course !== value)
      });
    } else if (type === 'file') {
      setFormData({ ...formData, [name]: e.target.files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    for (const key in formData) {
      data.append(key, formData[key]);
    }
    await axios.post('http://localhost:5000/api/employees/create', data);
    alert('Employee created');
  };

  return (
    <div>
      <h2>Create Employee</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="f_Id" placeholder="ID" value={formData.f_Id} onChange={handleChange} />
        <input type="text" name="f_Name" placeholder="Name" value={formData.f_Name} onChange={handleChange} />
        <input type="email" name="f_Email" placeholder="Email" value={formData.f_Email} onChange={handleChange} />
        <input type="text" name="f_Mobile" placeholder="Mobile" value={formData.f_Mobile} onChange={handleChange} />
        <select name="f_Designation" value={formData.f_Designation} onChange={handleChange}>
          <option value="HR">HR</option>
          <option value="Manager">Manager</option>
          <option value="Sales">Sales</option>
        </select>
        <input type="radio" name="f_gender" value="Male" checked={formData.f_gender === 'Male'} onChange={handleChange} /> Male
        <input type="radio" name="f_gender" value="Female" checked={formData.f_gender === 'Female'} onChange={handleChange} /> Female
        <input type="checkbox" name="f_Course" value="MCA" checked={formData.f_Course.includes('MCA')} onChange={handleChange} /> MCA
        <input type="checkbox" name="f_Course" value="BCA" checked={formData.f_Course.includes('BCA')} onChange={handleChange} /> BCA
        <input type="checkbox" name="f_Course" value="BSC" checked={formData.f_Course.includes('BSC')} onChange={handleChange} /> BSC
        <input type="file" name="f_Image" onChange={handleChange} />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default CreateEmployee;
