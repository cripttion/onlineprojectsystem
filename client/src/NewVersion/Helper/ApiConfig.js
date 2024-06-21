// src/config/apiConfig.js

const BASE_URL = "http://localhost:5000";

const API_ENDPOINTS = {
  LOGIN: `${BASE_URL}/login`,
  ADDSTUDENT: `${BASE_URL}/v1/admin/addStudent`,
  GETALLSTUDENT:`${BASE_URL}/v1/admin/allStudents`,
  GETALLTEACHER:`${BASE_URL}/v1/admin/allTeacher`,
  ADDTEACHER:`${BASE_URL}/v1/admin/addTeacher`,
  CREATEPROJECTGROUP : `${BASE_URL}/v1/admin/createProjectGroup`,
  GETUSERBYID:`${BASE_URL}/v1/student/studentData/{userID}`,
  GETSTUDENTBYPROJECTID:`${BASE_URL}/v1/admin/project/getStudent/{projectID}`,
  GETNOTREGISTEREDSTUDENTS:`${BASE_URL}/v1/admin/unregisteredStudent`,
  ADDSTUDENTTOPROJECT:`${BASE_URL}/v1/admin/project/addStudent/{projectID}`,
  GETGUIDEBYPROJECTID:`${BASE_URL}/v1/admin/project/getGuide/{projectID}`,
  GETGUIDEALLOCATEDDATA:`${BASE_URL}/v1/admin/project/projectToGuides`,
  ADDNEWGUIDETOPROJECT:`${BASE_URL}/v1/admin/project/addNewGuide`,
  GETREVIEWERBYPROJECTID:`${BASE_URL}/v1/admin/project/getReviewer/{projectID}`,
  GETREVIEWERALLOCATEDATA:`${BASE_URL}/v1/admin/project/projectToReviewer`,
  ADDNEWREVIEWERTOPROJECT:`${BASE_URL}/v1/admin/project/addNewReviewer`,
  GET_MARKS_API:`${BASE_URL}/v1/admin/marks/ProjectMarks/{projectID}`,
  UPDATE_GUIDE_MARKS:`${BASE_URL}/v1/admin/marks/updateGuideTable`,
  UPDATE_REVIEWER_MARKS:`${BASE_URL}/v1/admin/marks/updateReviewerTable`,
  UPDATE_MARKS:`${BASE_URL}/v1/admin/marks/updateMarksTable`,



  GET_PROJECTDATA_STUDENTID : `${BASE_URL}/v1/student/getProjectData/{StudentID}`,
  GET_PROJECTMEMBER_DETAILS:`${BASE_URL}/v1/student/getStudentData/{projectID}`,
  GET_PROJECTDATA_PROEJCTID:`${BASE_URL}/v1/student/projectData/{projectID}`,
  GET_UNREGISTERED_STUDENT:`${BASE_URL}/v1/student/notRegisteredStudent`,
  GET_SEND_FOR_VERIFICATION: `${BASE_URL}/v1/student/verify`
};

export default API_ENDPOINTS;
