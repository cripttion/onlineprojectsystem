import React, { useState, useEffect } from "react";
import Select from "react-select";
import axios from "axios";
import Layouts from "../../Layouts/Layouts";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import AdminLayout from './../../NewVersion/NewLayout/AdminLayout'
import API_ENDPOINTS from "../../NewVersion/Helper/ApiConfig";
import { useSelector } from "react-redux";
// { onNumberOfMemberSelection, onprojectIdGeneration, studentDetails1 }
const CreateProject = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const {userData} = useSelector((state)=>state.user);
  // console.log(userData);
  const [member, setMember] = useState(0);
  const [admissionNumber, setAdmissionNumber] = useState("");
  const [selectedYear, setSelectedYear] = useState(0);
  const [selectedSemester, setSelectedSemester] = useState(0);
  const [optionsSemester, setOptionsSemester] = useState([]);
  const [isCreateGroupDisabled, setIsCreateGroupDisabled] = useState(true);
  const [addclass, setClass] = useState("");
  const [selectedDomain, setSelectedDomain] = useState("");
  const [selectedoutcome, setSelectedOutcome] = useState("");
  const optionsYear = [
    { value: 1, label: "1" },
    { value: 2, label: "2" },
    { value: 3, label: "3" },
    { value: 4, label: "4" },
  ];
  const optionDomain = [
    { value: "AI/ML", label: "AI/ML" },
    { value: "web Dev", label: "Web dev" },
    { value: "Mobile dev", label: "Mobile Dev" },
    { value: "cybersecurity", label: "cybersecurity" },
  ];
  const optionOutcome = [
    { value: "Project & Research Paper", label: "Project & Research Paper" },
    { value: "Project & Patent", label: "Project & Patent" },
    { value: "Project and Book Chapter", label: "Project and Book Chapter" },
  ];
  const handleButtonClick = (numberOfMembers) => {
    setMember(numberOfMembers);
    setClass(numberOfMembers);
    // onNumberOfMemberSelection(numberOfMembers);
  };

  const handleClick = async () => {
    // setIsClicked(true);

    try {
      const response = await axios.post(
       API_ENDPOINTS.CREATEPROJECTGROUP,
        {
          admissionNumber: admissionNumber,
          year: selectedYear,
          semester: selectedSemester,
          members: member,
          user: userData.Name,
          domain:selectedDomain,
          outcome:selectedoutcome,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "x-access-token":token
          },
        }
      );
      if (response.status === 200) {
        toast.success("Group created Successfully!");
        // navigate("/projects/myProject", { state: { userI: admissionNumber } });
      }
    } catch (error) {
      if (error.response.status === 500) {
        setAdmissionNumber("");
        setMember("");
        setSelectedSemester("");
        setSelectedYear("");
        setSelectedOutcome('');
        setSelectedDomain("");
        toast.error("Already registered to some other project");
      }
      console.error("Error fetching project data:", error);
      // Handle error as needed
    }finally{
        setAdmissionNumber("");
        setMember("");
        setSelectedSemester("");
        setSelectedYear("");
        setSelectedOutcome('');
        setSelectedDomain("");
    }
  };
  const [studentData, setStudentData] = useState([]);
  useEffect(() => {
    // This useEffect will run whenever selectedYear or selectedSemester changes
    let visibleSemesters = [];
    let isYearSelected = false;
    const getData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/s/studentNotRegistered?year=${selectedYear}&semester=${selectedSemester}`
        );
        setStudentData(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };

    // Check if year is selected
    if (selectedYear > 0) {
      isYearSelected = true;

      // Set visible semesters based on the selected year
      if (selectedYear === 1) {
        visibleSemesters = [1, 2];
      } else if (selectedYear === 2) {
        visibleSemesters = [3, 4];
      } else if (selectedYear === 3) {
        visibleSemesters = [5, 6];
      } else if (selectedYear === 4) {
        visibleSemesters = [7, 8];
      }
    }

    setOptionsSemester(
      visibleSemesters.map((semester) => ({
        value: semester,
        label: semester.toString(),
      }))
    );

    // Reset selected semester when year changes
    if (!isYearSelected) {
      setSelectedSemester(0);
    }
    getData();
    // Disable "Create Group" button if either year or semester is not selected
    setIsCreateGroupDisabled(!isYearSelected || selectedSemester === 0);
  }, [selectedYear, selectedSemester]);
  // console.log(studentData);

  return (
    <AdminLayout>
      <ToastContainer />
      <div className="w-full h-screen flex justify-center items-center">
        <div className="w-5/6 min-w-xl  p-6 bg-white border-4 border-gray-200 upDown shadow-md rounded-md">
          <label className="block text-sm font-semibold mb-2">
            Select Year:
          </label>
          <Select
            className="text-black w-full"
            options={optionsYear}
            value={optionsYear.find((option) => option.value === selectedYear)}
            onChange={(selectedOption) => setSelectedYear(selectedOption.value)}
            isSearchable={false} // Disable typing input
          />

          <label className="block text-sm font-semibold mb-2 mt-4">
            Select Semester:
          </label>
          <Select
            className="text-black w-full"
            options={optionsSemester}
            value={optionsSemester.find(
              (option) => option.value === selectedSemester
            )}
            onChange={(selectedOption) =>
              setSelectedSemester(selectedOption.value)
            }
            isSearchable={false} // Disable typing input
          />
          <label className="block text-sm font-semibold mb-2 mt-4">
            Select Domain of Project:
          </label>

          <Select
            className="text-black w-full"
            options={optionDomain}
            value={optionDomain.find(
              (option) => option.value === selectedDomain
            )}
            onChange={(selectedOption) =>
              setSelectedDomain(selectedOption.value)
            }
            isSearchable={false} // Disable typing input
          />
          <label className="block text-sm font-semibold mb-2 mt-4">
            Select Outcome:
          </label>

          <Select
            className="text-black w-full"
            options={optionOutcome}
            value={optionOutcome.find(
              (option) => option.value === optionOutcome
            )}
            onChange={(selectedOption) =>
              setSelectedOutcome(selectedOption.value)
            }
            isSearchable={false} // Disable typing input
          />
          <div className="flex flex-col w-full">
            <label className="block text-sm font-semibold mb-2 mt-4">
              Leader Admission Number:
            </label>
            <select
              value={admissionNumber}
              onChange={(e) => setAdmissionNumber(e.target.value)}
              className="p-4 border border-gray-300 bg-white  outline-none"
            >
              <option value="" disabled>
                Select Admission Number
              </option>
              {studentData.map((student) => (
                <option
                  key={student.AdmissionNumber}
                  value={student.AdmissionNumber}
                  style={{ marginTop: "5px" }}
                >
                  {`${student.AdmissionNumber} - ${student.Name}`}
                </option>
              ))}
            </select>{" "}
          </div>
          <div className="mt-6 flex flex-col justify-center">
            <h2 className="text-lg flex justify-center font-semibold mb-4 text-black tracking-wider">
              Select the number of members in the group
            </h2>
            <div className="gap-5 flex justify-center">
              {[1, 2, 3, 4, 5].map((number) => (
                <button
                  key={number}
                  onClick={() => handleButtonClick(number)}
                  className={`${
                    addclass === number ? "bg-gray-500" : "bg-bgBlue"
                  } rounded-full w-12 text-white p-3 hover:scale-110 hover:bg-hoverButton transition duration-300`}
                >
                  {number}
                </button>
              ))}
            </div>
          </div>

          <div className="flex justify-center">
            <button
              onClick={handleClick}
              className={`mt-4 bg-bgBlue buttonShadow text-white rounded-md px-4 py-2 hover:bg-hoverButton tracking-wider transition duration-300 ${
                isCreateGroupDisabled ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={isCreateGroupDisabled}
            >
              Create Group
            </button>
          </div>
          {/* 
      {isclicked && (
        
      )} */}
        </div>
      </div>
    </AdminLayout>
  );
};

export default CreateProject;
