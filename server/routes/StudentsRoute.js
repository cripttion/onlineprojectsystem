const express = require("express");
const AdminAuth  = require("../middleware/AdminAuth");
const addStudent = require("../controller/AdminController/Student/AddStudnet");
const router = express.Router();
const multer = require("multer");
const path = require('path');

const xlsx = require("xlsx");
const allStudentData = require("../controller/AdminController/Student/AllStudentData");
const getStudentData = require("../controller/StudentController/Student/GetStudentData");
const getProjectDataByStudentID = require("../controller/StudentController/Project/GetProjectDataByStudentID");
const getStudentByProjectID = require("../controller/AdminController/Project/GetStudnetByProjectID");
const getProjectDataByID = require("../controller/StudentController/Project/GetProjectDataByProjectID");
const notRegisteredStudent = require("../controller/AdminController/Student/NotRegisteredStudent");
const AddStudentToProjectGroup = require("../controller/AdminController/Project/AddStudentToProject");
const sendForVerificataion = require("../controller/StudentController/Project/SendForVerificatiaon");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.get('/studentData/:admissionNumber',getStudentData);
router.get('/getProjectData/:StudentID',getProjectDataByStudentID);
router.get('/getStudentData/:projectID',getStudentByProjectID);
router.get('/projectData/:projectID',getProjectDataByID);
router.post('/notRegisteredStudent',notRegisteredStudent);
router.post('/addStudentToGroup/:projectID',AddStudentToProjectGroup);
router.get('/addStudentHTML',async(req,res)=>{
    res.sendFile(path.join(__dirname, 'verify.html'));
} );
router.post('/verify',sendForVerificataion);

module.exports = router;