import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from './Pages/Home';
import Login from './Pages/Login';
import Forbidden from './Pages/Forbidden';
import AddStudent from './Pages/Admin/AddStudent';
import AddTeacher from './Pages/Admin/AddTeacher';
import CreateProject from './Pages/Student/CreateProject';
import MyProject from './Pages/Student/MyProject';
import ProjectToGuide from './Pages/Teacher/ProjectToGuide';
import ProjectToReview from './Pages/Teacher/ProjectToReview';
import MyGuide from './Pages/Student/MyGuide';
import MyReviewer from './Pages/Student/MyReviewer';
import PageNotFound from './Pages/PageNotFound';
import Projectdata from './Pages/Admin/ProjectData/Projectdata';
import UpdateGuide from './Pages/Admin/Guide/UpdateGuide';
import ProjectSetting from './Pages/Admin/ProjectData/ProjectSetting';
import NotRegistered from './Pages/Admin/Student/NotRegistered';
import ProjectMarks from './Pages/Admin/ProjectData/ProjectMarks';
import SupervisiorDetails from './Pages/Teacher/SupervisiorDetails';
import AllRoutes from './NewVersion/Routes/AllRoutes';
const isAuthenticated = () => {
  const loginStatus = localStorage.getItem('isLogedIn');
  return loginStatus === 'true';
};

const hasRole = (requiredRoles) => {
  const userRole = sessionStorage.getItem('role');
  return requiredRoles.includes(userRole);
};

const PrivateRoute = ({ element, requiredRoles, ...rest }) => {
  const authenticated = isAuthenticated();
  const userHasRequiredRole = hasRole(requiredRoles);

  if (authenticated && userHasRequiredRole) {
    return element;
  } else if (!authenticated) {
    // Redirect to login page if not authenticated
    return <Navigate to="/" replace />;
  } else {
    // Redirect to forbidden page if authenticated but doesn't have the required role
    return <Navigate to="/forbidden" replace />;
  }
};

const App = () => {
  return (
    <AllRoutes />
      // <Routes>
      //   <Route path="/" element={<Login />} />
      //   <Route path="/Home" element={<PrivateRoute element={<Home />} requiredRoles={['Admin']} />} />
      //   <Route path="/s/Home" element={<PrivateRoute element={<Home />} requiredRoles={['Student']} />} />
      //   <Route path="/t/Home" element={<PrivateRoute element={<Home />} requiredRoles={['Teacher']} />} />
      //   <Route path="/t/Home" element={<PrivateRoute element={<Home />} requiredRoles={['Teacher']} />} />
      //   <Route path="/p/Home" element={<PrivateRoute element={<Home />} requiredRoles={['Admin']} />} />
      //   <Route path="/a/addStudent" element={<PrivateRoute element={<AddStudent />} requiredRoles={['Admin']} />} />
      //   <Route path="/a/addTeacher" element={<PrivateRoute element={<AddTeacher />} requiredRoles={['Admin']} />} />
      //   <Route path="/project/createProject" element={<PrivateRoute element={<CreateProject />} requiredRoles={['Student', 'Admin', 'Teacher']} />} />
      //   <Route path="/projects/myProject/:Student" element={<PrivateRoute element={<MyProject />} requiredRoles={['Student', 'Admin', 'Teacher']} />} />
      //   <Route path="/projects/myProject" element={<PrivateRoute element={<MyProject />} requiredRoles={['Student', 'Admin', 'Teacher']} />} />
      //   <Route path="/g/allProjects" element={<PrivateRoute element={<ProjectToGuide />} requiredRoles={['Admin', 'Teacher']} />} />
      //   <Route path="/r/allProjects" element={<PrivateRoute element={<ProjectToReview />} requiredRoles={['Admin', 'Teacher']} />} />
      //   <Route path="/projects/myguide" element={<PrivateRoute element={<MyGuide />} requiredRoles={['Student']} />} />
      //   <Route path="/projects/myreviewer" element={<PrivateRoute element={<MyReviewer />} requiredRoles={['Student']} />} />
      //   <Route path="/projects/projectData" element={<PrivateRoute element={<Projectdata />} requiredRoles={['Admin']} />} />
      //   <Route path="/a/updateGuide" element={<PrivateRoute element={<UpdateGuide />} requiredRoles={['Admin']} />} />
      //   <Route path="/projects/:projectID" element={<PrivateRoute element={<ProjectSetting />} requiredRoles={['Admin']} />} />
      //   <Route path="/a/not-registered" element={<PrivateRoute element={<NotRegistered />} requiredRoles={['Admin']} />} />
      //   <Route path="/a/marks-setting" element={<PrivateRoute element={<ProjectMarks />} requiredRoles={['Admin']} />} />
      //   <Route path="/a/allocated-guide" element={<PrivateRoute element={<SupervisiorDetails />} requiredRoles={['Admin']} />} />

      //  {/* Temproty route000 */}
      //  <Route path="/Shome" element={<PrivateRoute element={<Home />} requiredRoles={['Admin']} />} />
      //  <Route path="/Thome" element={<PrivateRoute element={<Home />} requiredRoles={['Admin']} />} />
      //  <Route path="/Ghome" element={<PrivateRoute element={<Home />} requiredRoles={['Admin']} />} />
      //  <Route path="/Rhome" element={<PrivateRoute element={<Home />} requiredRoles={['Admin']} />} />
      //  <Route path="/Phome" element={<PrivateRoute element={<Home />} requiredRoles={['Admin']} />} />
      //   <Route path="/forbidden" element={<Forbidden />} />
      //   <Route path="*" element={<PageNotFound />} />
      // </Routes>
    
  );
};

export default App;
