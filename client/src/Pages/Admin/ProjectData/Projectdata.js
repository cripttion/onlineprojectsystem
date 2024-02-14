import React, { useState, useEffect } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import Layouts from "../../../Layouts/Layouts";
import axios from "axios";
import YearSemester from "../Component/YearSemester";
import Select from "react-select";
import * as XLSX from "xlsx";
function Projectdata() {
  const [data, setData] = useState([]);
  const [guide, setGuideData] = useState([]);
  const [reviewer, setReviewerData] = useState([]);
  const navigate = useNavigate();

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
  };

  // console.log("The vlue",reviewer);

  // const findReviewerById = (reviewerId) => {

  //   return reviewer[reviewerId];
  // };
  const handleShowClick = (pID) => {
    console.log(pID);
    navigate("/projects/myProject", {
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
    <Layouts>
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
          <button type="submit" className="bg-blue-500 text-white py-1 px-2 rounded-md h-fit">
            Get Project Data
          </button>
        </form>
        <button className="bg-blue-500 text-white py-1 px-2 rounded-md" onClick={() => downloadExcel(data.projects)}>Download As Excel</button>
        <table className="min-w-full bg-white border border-gray-300 mt-10">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b text-left">SN</th>
              <th className="py-2 px-4 border-b text-left">ProjectID</th>
              <th className="py-2 px-4 border-b text-left">Name</th>
              <th className="py-2 px-4 border-b text-left">Phone</th>
              <th className="py-2 px-4 border-b text-left">Email</th>
              <th className="py-2 px-4 border-b text-left">
                SupervisorDetails
              </th>
              <th className="py-2 px-4 border-b text-left">ProjectTitle</th>

              <th className="py-2 px-4 border-b text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {data?.projects?.map((prData, index) => {
              return (
                <tr key={index}>
                  <td className="py-2 px-4 border-b text-left">{index + 1}</td>
                  <td className="py-2 px-4 border-b text-left">
                    {prData.ProjectID}
                  </td>
                  <td className="py-2 px-4 border-b text-left">
                    {prData.superviorName}
                  </td>
                  <td className="py-2 px-4 border-b text-left">
                    {prData.Name}
                  </td>
                  <td className="py-2 px-4 border-b text-left">
                    {prData.Phone}
                  </td>
                  <td className="py-2 px-4 border-b text-left">
                    {prData.Email}
                  </td>
                  <td className="py-2 px-4 border-b text-left">
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
                  <td className="py-2 px-4 border-b text-left">
                    <button
                      onClick={() => handleShowClick(prData.ProjectID)}
                      className="bg-blue-500 text-white py-1 px-2 rounded-md"
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
    </Layouts>
  );
}

export default Projectdata;
