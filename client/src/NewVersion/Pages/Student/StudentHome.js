import React, { useEffect } from "react";
import StudentLayout from "../Student/StudentLayout/Layout";
import { SideBar } from "../../NewLayout/SideBar";
import FeaturesCard from "./../Admin/component/FeaturesCard";
import studentImage from "./../../../assests/images/Icons/student.png";
import teacherImage from "./../../../assests/images/Icons/teacher.png";
import projectImage from "./../../../assests/images/Icons/solution.png";
import DataImage from "./../../../assests/images/Icons/maths.png";
import ProgressImage from "./../../../assests/images/Icons/Progress.jpg";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUserData, userData } from "../../Redux/Slice/UserSlice";
import { ToastContainer } from "react-toastify";
import { fetchProjectID } from "../../Redux/Slice/ProjectSlice";
function StudentHome() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loginData } = useSelector((state) => state.user);
  const{projectID} = useSelector((state)=>state.project);
  useEffect(() => {
    dispatch(fetchProjectID(loginData?.userData.AdmissionNumber));
  }, []);
  console.log(projectID);
  return (
    <StudentLayout>
      <ToastContainer />

      <div className="flex flex-wrap gap-20">
       <FeaturesCard
          imageUrl={studentImage}
          title="Create Project Group"
          description="Create New ProjectGroup"
          onPress={() => navigate("/student/createGroup")}
        />
        <FeaturesCard
          imageUrl={studentImage}
          title="My Project"
          description="Deatils of your Project Group"
          onPress={() => navigate("/student/MyProject")}
        />
        <FeaturesCard
          onPress={() => navigate("/admin/AddTeacher")}
          imageUrl={teacherImage}
          title="Task"
          description="Assigned task by Guide"
        />
        <FeaturesCard
          onPress={() => navigate("/admin/guide")}
          imageUrl={teacherImage}
          title="My guide"
          description="Guide Details/chat"
        />

        <FeaturesCard
          onPress={() => navigate("/admin/reviewer")}
          imageUrl={teacherImage}
          title="My Reveiwer"
          description="Reviewer Detaisl/chat"
        />
      </div>
    </StudentLayout>
  );
}

export default StudentHome;
