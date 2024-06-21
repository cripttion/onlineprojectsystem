import React,{useEffect} from 'react'
import AdminLayout from '../../NewLayout/AdminLayout'
import { SideBar } from '../../NewLayout/SideBar'
import FeaturesCard from './component/FeaturesCard'
import studentImage from './../../../assests/images/Icons/student.png'
import teacherImage from './../../../assests/images/Icons/teacher.png'
import projectImage from './../../../assests/images/Icons/solution.png'
import DataImage from './../../../assests/images/Icons/maths.png'
import ProgressImage from './../../../assests/images/Icons/Progress.jpg'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setUserData, userData } from '../../Redux/Slice/UserSlice'
import { ToastContainer } from 'react-toastify'
function AdminHome() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {loginData} = useSelector((state)=>state.user);
  useEffect(()=>{
    if(loginData?.role==="Admin")
      {
        dispatch(setUserData({
          Name:"Admin"
        }))
      }
      else if(loginData?.role==='Student')
        {
          dispatch(userData(loginData.userData.AdmissionNumber))

        }
        else if(loginData?.role==='Teacher')
          {
            console.log("Teacher Login")

          }
  

  },[])
  return (
    <AdminLayout>
    <ToastContainer />

     <div className='flex flex-wrap gap-20'> 
     <FeaturesCard
        imageUrl={studentImage}
        title="Add Student"
        description="Upload/entry of Student Data"
        onPress={()=>navigate('/admin/AddStudent')}
      />
       <FeaturesCard
        imageUrl={studentImage}
        title="Not Registred"
        description="Allocate/not registered"
        onPress={()=>navigate('/admin/NotRegistered')}
      />
       <FeaturesCard
       onPress={()=>navigate('/admin/AddTeacher')}
        imageUrl={teacherImage}
        title="Add Teacher"
        description="upload/entry of Teacher Data"
      />
      <FeaturesCard
       onPress={()=>navigate('/admin/guide')}
        imageUrl={teacherImage}
        title="Supervisor Deatails"
        description="Teacher list as Supervisor"
      />

      <FeaturesCard
       onPress={()=>navigate('/admin/reviewer')}
        imageUrl={teacherImage}
        title="Reveiwer Details"
        description="Teacher list as Reviewer"
      />
       <FeaturesCard
       onPress={()=>navigate('/admin/createGroup')}
        imageUrl={projectImage}
        title="Create Group"
        description="Create Project Group"
      />
       <FeaturesCard
       onPress={()=>navigate('/admin/ProjectData')}
        imageUrl={DataImage}
        title="Project Data"
        description="All Project Group Data"
      />
      <FeaturesCard
       onPress={()=>navigate('/admin/UpdateGuide')}
        imageUrl={DataImage}
        title="Update Guide"
        description="Update Guide of Project Group"
      />
       <FeaturesCard
       onPress={()=>navigate('/admin/UpdateReviewer')}
        imageUrl={DataImage}
        title="Update Reviewer"
        description="Update Reviewer of Project Group"
      />
      <FeaturesCard
       onPress={()=>navigate('/admin/MarksSetting')}
        imageUrl={ProgressImage}
        title="Marks Setting"
        description="Add/Remove makrs crateria"
      />
   </div>
    </AdminLayout>
  )
}

export default AdminHome