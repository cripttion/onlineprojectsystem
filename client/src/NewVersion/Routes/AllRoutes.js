import React from 'react'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from '../Pages/OnBoarding/Login';
import AdminHome from '../Pages/Admin/AdminHome';
import AddStudent from '../../Pages/Admin/AddStudent';
import NotRegistered from '../../Pages/Admin/Student/NotRegistered';
import AddTeacher from '../../Pages/Admin/AddTeacher';
import CreateGroup from '../../Pages/Student/CreateProject';
import ProjectSetting from '../../Pages/Admin/ProjectData/ProjectSetting';
import ProjectDataByID from '../Pages/Admin/ProjectDataByID';
import Projectdata from '../../Pages/Admin/ProjectData/Projectdata';
import StudentHome from '../Pages/Student/StudentHome';
import CreateGroupStudent from '../../Pages/Student/CreaateProjectStudent'
import MyProject from '../Pages/Student/Myprojects'
export default function AllRoutes() {
  return (
    <Routes>
        <Route path="/" element={<Login/>} />
        <Route path='/admin/home' element={<AdminHome />} />
        <Route path='/admin/AddStudent' element={<AddStudent />} />
        <Route path ='/admin/NotRegistered' element={<NotRegistered />} />
        <Route path = '/admin/AddTeacher' element={<AddTeacher /> } />
        <Route path = '/admin/createGroup' element={<CreateGroup/>} />
        <Route path = '/admin/ProjectData' element ={<Projectdata />}/>
        <Route path='/admin/ProjectGroup/:projectID' element = {<ProjectDataByID />} />
        <Route path = '/student/home' element={<StudentHome />} />
      
        <Route path = '/student/createGroup' element={<CreateGroupStudent/>} />
        <Route path = '/student/MyProject' element={<MyProject />} />


   </Routes>

  )
}
