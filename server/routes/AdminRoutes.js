const express = require("express");
const AdminAuth  = require("../middleware/AdminAuth");
const addStudent = require("../controller/AdminController/Student/AddStudnet");
const router = express.Router();
const multer = require("multer");
const xlsx = require("xlsx");
const allStudentData = require("../controller/AdminController/Student/AllStudentData");
const UpdateStudentData = require("../controller/AdminController/Student/UpdateStudent");
const deleteStudentData = require("../controller/AdminController/Student/DeleteStudent");
const notRegisteredStudent = require("../controller/AdminController/Student/NotRegisteredStudent");
const deleteStudentFromProject = require("../controller/AdminController/Project/DeleteStudentFromProject");
const addTeacher = require("../controller/AdminController/Teacher/AddTeacher");
const getTeacherByID = require("../controller/AdminController/Teacher/GetTeacherByID");
const getAllTeacherData = require("../controller/AdminController/Teacher/AllTeacherData");
const updateTeacherData = require("../controller/AdminController/Teacher/UpdateTeacherData");
const deleteTeacherData = require("../controller/AdminController/Teacher/DeleteTeacher");
const getallProjectData = require("../controller/AdminController/Project/project/GetProjectData");
const {createGroupForProject} = require("../controller/AdminController/Project/project/CreateGroup");
const allocateRemaningStudentToGroup = require("../controller/AdminController/Project/project/AllocatedRemaningStudent");
const addParameterToReviewerMakrs = require("../controller/AdminController/Marks/AddFieldInReviewer");
const addParameterToGuideMakrs = require("../controller/AdminController/Marks/AddFieldInGuide");
const addParameterToMakrs = require("../controller/AdminController/Marks/AddFiledInMakrs");
const getMakrsByProjectID = require("../controller/AdminController/Marks/GetMakrsByProjectID");
const { updateMarksTable, updateGuideTable, updateReviewerTable } = require("../controller/AdminController/Marks/UpdateMarksByProjectID");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });


// --------------------------- Students Routes ----------------------------------------------- //

router.get('/allStudents',AdminAuth,allStudentData);
router.post('/addStudent',AdminAuth,addStudent);
router.put('/updateStudent/:admissionNumber',AdminAuth,UpdateStudentData);
router.delete('/deleteStudentRecord/:admissionNumber',AdminAuth,deleteStudentData);
router.get('/unregisteredStudent',AdminAuth,notRegisteredStudent);

//------------------------------ Teacher Related Routes --------------------------------//
router.get('/allTeacher',AdminAuth,getAllTeacherData);
router.get('/teacherData/:teacherID',AdminAuth,getTeacherByID);
router.post('/addTeacher',AdminAuth,upload.single("file"),addTeacher);
router.put('/updateTeacher/:teacherID',AdminAuth,updateTeacherData);
router.delete('/deleteTeacherRecord/:teacherID',AdminAuth,deleteTeacherData);

//----------------------------Project Related Routes -----------------------------/////////
router.get('/allProjectData',AdminAuth,getallProjectData);
router.delete('/removestudnetFromPrj/:admissionNumber',AdminAuth,deleteStudentFromProject)
router.post('/createProjectGroup',AdminAuth,createGroupForProject);

router.post('/allocateLeftStudent',AdminAuth,allocateRemaningStudentToGroup);


//----------------------------Marks Related routes ----------------------------////
router.post('/marks/addreviewerParameter',AdminAuth,addParameterToReviewerMakrs);
router.post('/marks/addGuideParamter',AdminAuth,addParameterToGuideMakrs);
router.post('/marks/addMarksParamter',AdminAuth,addParameterToMakrs);

router.get('/marks/ProjectMarks/:projectID',AdminAuth,getMakrsByProjectID);
router.put('/makrs/updateMarksTable',AdminAuth,updateMarksTable);
router.put('/marks/updateGuideTable',AdminAuth,updateGuideTable);
router.put('/marks/updateReviewerTable',AdminAuth,updateReviewerTable);
module.exports = router;