import React, { useState, useEffect } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import Layouts from "../../../Layouts/Layouts";
import axios from "axios";
import YearSemester from "../Component/YearSemester";
import Select from "react-select";
import * as XLSX from "xlsx";
import AdminLayout from './../../../NewVersion/NewLayout/AdminLayout'
function Projectdata() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [guide, setGuideData] = useState([]);
  const [reviewer, setReviewerData] = useState([]);
  const[projectID,setProjectID] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(
        `http://localhost:5000/projects/allProjects?year=${
          serachFilter.Year === null ? "" : serachFilter.Year
        }&semester=${
          serachFilter.Semester === null ? "" : serachFilter.Semester
        }&course=${serachFilter.course}&branch=${serachFilter.branch}`
      );
      if (response) {
        setData(response.data);
        setGuideData(response.data.guide || []);
        setReviewerData(response.data.reveiwer || []);
      }
    } catch (error) {
      console.log("Error while fetching data");
    }
    finally{
      setSearchFilter({
        //here year and semester will come form year and semester component
        Year: "",
        Semester: "",
        course: "",
        branch: "",
      })
    }
  };


  const handleShowClick = (pID) => {
    console.log(pID);
    navigate(`/admin/ProjectGroup/${pID}`, {
      state: { ProjectId: pID, xtemp: "pData" },
    });
  };
  const [serachFilter, setSearchFilter] = useState({
    //here year and semester will come form year and semester component
    Year: "",
    Semester: "",
    course: "",
    branch: "",
  });
  const BranchOptions = [
    { value: "CSE", label: "CSE" },
    { value: "BCA", label: "BCA" },
    { value: "MCA", label: "MCA" },
    { value: "MTECH", label: "MTECH" },
  ];
  const CourseOptions = [
    { value: "B.Tech", label: "B.Tech" },
    { value: "B.Tech(ML)", label: "B.Tech(ML)" },
    { value: "BCA", label: "BCA" },
  ];
  const handleChange = (value, field) => {
    setSearchFilter((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const downloadExcel = (data) => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    XLSX.writeFile(workbook, "ProjectData.xlsx");
  };
  return (
    <AdminLayout>
      <div className="container mx-auto px-4 mt-8">
        <form onSubmit={handleSubmit} className="flex flex-wrap gap-10 justify-center items-center">
          <YearSemester
            studentData={serachFilter}
            setStudentData={setSearchFilter}
          />

          <label className="block mb-4 w-60">
            <span className="text-gray-700">Course:</span>
            <Select
              className="text-black w-full"
              options={CourseOptions}
              value={CourseOptions.find(
                (option) => option.value === serachFilter.course
              )}
              onChange={(selectedOption) =>
                handleChange(selectedOption.value, "course")
              }
              isSearchable={false}
              styles={{
                control: (provided, state) => ({
                  ...provided,
                  height: "42px",
                  outline: state.isFocused ? "2px solid black" : "none",
                  borderRadius: "7px",
                  marginTop: "4px",
                }),
              }}
            />
          </label>

          <label className="block mb-4 w-60">
            <span className="text-gray-700">Branch:</span>
            <Select
              className="text-black w-full"
              options={BranchOptions}
              value={BranchOptions.find(
                (option) => option.value === serachFilter.branch
              )}
              onChange={(selectedOption) =>
                handleChange(selectedOption.value, "branch")
              }
              isSearchable={false}
              styles={{
                control: (provided, state) => ({
                  ...provided,
                  height: "42px",
                  outline: state.isFocused ? "2px solid black" : "none",
                  borderRadius: "7px",
                  marginTop: "4px",
                }),
              }}
            />
          </label>
          <button type="submit" className="bg-bgBlue text-white py-2 px-4 rounded-md h-fit mt-3">
            Get Project Data
          </button>
        </form>
        
        <div className="flex flex-row mt-5 gap-4 items-center justify-between">
          <div className="flex flex-row gap-4 items-center">
          <input className="outline-none p-2 border-gray-300 border rounded-md" type="text" placeholder="Serach:ProjectID" onChange={(e)=>setProjectID(e.target.value.toUpperCase())} />
          <button className="bg-bgBlue p-2 text-white rounded-md" onClick={()=>navigate(`/admin/ProjectGroup/${projectID}`)}>Search</button>
          </div>
          <button className="bg-bgBlue text-white py-1 px-2 rounded-md" onClick={() => downloadExcel(data.projects)}>Download As Excel</button>

        </div>
        <div className="overflow-auto" style={{ maxHeight: "70vh" }}>
        <table className="min-w-full max-h-screen bg-white border border-gray-300 mt-10">
          <thead>
            <tr>
              <th className="border border-gray-300 px-4 py-2">SN</th>
              <th className="border border-gray-300 px-4 py-2">ProjectID</th>
              <th className="border border-gray-300 px-4 py-2">Name</th>
              <th className="border border-gray-300 px-4 py-2">Phone</th>
              <th className="border border-gray-300 px-4 py-2">Email</th>
              <th className="border border-gray-300 px-4 py-2">
                SupervisorDetails
              </th>
              <th className="border border-gray-300 px-4 py-2">ProjectTitle</th>

              <th className="border border-gray-300 px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {data?.projects?.map((prData, index) => {
              return (
                <tr key={index}>
                  <td className="border border-gray-300 px-4 py-2">{index + 1}</td>
                  <td className="border border-gray-300 px-4 py-2">
                    {prData.ProjectID}
                  </td>
                  {/* <td className="py-2 px-4 border-b text-left">
                    {prData.superviorName}
                  </td> */}
                  <td className="border border-gray-300 px-4 py-2">
                    {prData.Name + " - "+prData.AdmissionNumber}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {prData.Phone}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {prData.Email}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {prData.superviorName +
                      " - " +
                      prData.SupervisorID +
                      " - " +
                      prData.Position +
                      " - " +
                      prData.SupervisorPhone +
                      " - " +
                      prData.SupervisorEmail +
                      " - " +
                      prData.SupervisorCabin}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {prData.ProjectTitle}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    <button
                      onClick={() => handleShowClick(prData.ProjectID)}
                      className="bg-bgBlue text-white py-1 px-2 rounded-md"
                    >
                      Show
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        </div>
      </div>
    </AdminLayout>
  );
}

export default Projectdata;
