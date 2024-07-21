const express = require('express');
const Employee = require('../models/Employee');
const multer = require('multer');
const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now() + '.' + file.mimetype.split('/')[1]);
  }
});

const upload = multer({ storage });

router.post('/create', upload.single('f_Image'), async (req, res) => {
  const { f_Id, f_Name, f_Email, f_Mobile, f_Designation, f_gender, f_Course } = req.body;
  const f_Image = req.file ? req.file.path : '';
  try {
    const newEmployee = new Employee({ f_Id, f_Image, f_Name, f_Email, f_Mobile, f_Designation, f_gender, f_Course });
    await newEmployee.save();
    res.json({ msg: 'Employee created' });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

router.get('/', async (req, res) => {
  try {
    const employees = await Employee.find();
    res.json(employees);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

router.put('/:id', upload.single('f_Image'), async (req, res) => {
  const { f_Id, f_Name, f_Email, f_Mobile, f_Designation, f_gender, f_Course } = req.body;
  const f_Image = req.file ? req.file.path : '';
  try {
    await Employee.findByIdAndUpdate(req.params.id, { f_Id, f_Image, f_Name, f_Email, f_Mobile, f_Designation, f_gender, f_Course });
    res.json({ msg: 'Employee updated' });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await Employee.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Employee deleted' });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;
