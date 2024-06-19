const express = require("express");
const AdminAuth  = require("../middleware/AdminAuth");
const addStudent = require("../controller/AdminController/Student/AddStudnet");
const router = express.Router();
const multer = require("multer");
const xlsx = require("xlsx");
const allStudentData = require("../controller/AdminController/Student/AllStudentData");
const getStudentData = require("../controller/StudentController/Student/GetStudentData");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.get('/studentData/:admissionNumber',getStudentData);






module.exports = router;