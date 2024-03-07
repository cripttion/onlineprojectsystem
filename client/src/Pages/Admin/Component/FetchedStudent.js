import React, { useState, useEffect } from "react";
import axios from "axios";
import { PenBoxIcon, SaveIcon, Trash, X } from "lucide-react";
import Swal from "sweetalert2";
// Loader component with Tailwind CSS styling
const Loader = () => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-50 bg-gray-500 backdrop-filter backdrop-blur-md">
    <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-solid"></div>
  </div>
);

export default function FetchedStudentData(props) {
  const role = props.role;
  const [studentData, setStudentData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [isFiltered, setIsFiltered] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showClicked, setShowClicked] = useState(false);
  const [editingIndex, setEditingIndex] = useState(-1);
  const [editedData, setEditedData] = useState({
    Name: "",
    Branch: "",
    Year: "",
    Semester: "",
    Email: "",
    Phone: "",
    Cabin: "",
    Position: ""
  });

  useEffect(() => {
    const getData = async () => {
      try {
        setIsLoading(true); // Show loader while fetching data
        const getRoute = role === "Student" ? "s/allStudents" : "t/allTeacher";
        const response = await axios.get(`http://localhost:5000/${getRoute}`);
        console.log("Response data:", response.data);
        setStudentData(response.data);
        setFilteredData([]);
        setIsFiltered(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        // Hide loader after fetching data, even if there's an error
        setIsLoading(false);
      }
    };

    if (showClicked) {
      getData();
    }
  }, [showClicked]); // Dependency on fetchData

  const handleClick = () => {
    setShowClicked(true); // Trigger data fetching when the button is clicked
  };

  const handleToggleFilterAlphabetically = () => {
    if (isFiltered) {
      setFilteredData([]);
    } else {
      const sortedData = [...studentData].sort((a, b) =>
        a.Name.localeCompare(b.Name)
      );
      setFilteredData(sortedData);
    }
    setIsFiltered(!isFiltered);
  };

  const handleSearch = () => {
    const searchTermLower = searchTerm.toLowerCase();
    const searchData = studentData.filter(
      (data) =>
        String(data?.EnrollmentNumber)?.toLowerCase()?.includes(searchTermLower) ||
        String(data?.TeacherID)?.toLowerCase()?.includes(searchTermLower) ||

        String(data?.AdmissionNumber)?.toLowerCase()?.includes(searchTermLower) ||
        String(data?.Name)?.toLowerCase()?.includes(searchTermLower) ||
        String(data?.Branch)?.toLowerCase()?.includes(searchTermLower) ||
        (typeof data?.Year === "number" ? String(data?.Year) : data?.Year)
          ?.toLowerCase()
          ?.includes(searchTermLower) ||
        String(data?.Semester)?.toLowerCase()?.includes(searchTermLower) ||
        String(data?.Phone)?.toLowerCase()?.includes(searchTermLower) ||

        String(data?.Email)?.toLowerCase()?.includes(searchTermLower)
    );
    setFilteredData(searchData);
    setIsFiltered(searchTerm !== "");
  };
  

  const handleRefreshData = async () => {
    try {
      setIsLoading(true); // Show loader while refreshing data
      const getRoute = role === "Student" ? "s/allStudents" : "t/allTeacher";
      const response = await axios.get(`http://localhost:5000/${getRoute}`);
      setStudentData(response.data);
      setFilteredData([]);
      setIsFiltered(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      // Hide loader after refreshing data, even if there's an error
      setTimeout(() => setIsLoading(false), 700); // Show loader for 3 seconds
    }
  };

  const handleEditClick = (index) => {
    setEditingIndex(index);
    setEditedData(studentData[index]);
  };

  const handleSaveClick = async (index) => {
    try {
      setIsLoading(true); // Show loader while updating data
      const updateRoute = role === "Student" ? "/s/updateStudentData" : "/t/updateTeacherData";
      const keyToUpdate = role === "Student" ?"AdmissionNumber":"TeacherID" ;
      const response = await axios.put(`http://localhost:5000${updateRoute}/${studentData[index][keyToUpdate]}`, editedData);
      console.log(response.data.message);
      setEditingIndex(-1);
    } catch (error) {
      console.error("Error updating data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancelClick = () => {
    setEditingIndex(-1);
  };
  const handleDeleteClick =async(index)=>{
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then(async(result) => {
      if (result.isConfirmed) {
        const updateRoute = role === "Student" ? "/s/dltStudent" : "/t/dlt-teacher";

        const keyToUpdate = role === "Student" ?"AdmissionNumber":"TeacherID" ;

      const response = await axios.delete(`http://localhost:5000${updateRoute}/${studentData[index][keyToUpdate]}`);

        Swal.fire({
          title: "Deleted!",
          text: "Select studenet delete from project.",
          icon: "success"
        });
     
      }
    });
  }

  const handleChange = (e, key) => {
    setEditedData((prevData) => ({
      ...prevData,
      [key]: e.target.value,
    }));
  };

  return (
    <div className="w-full mx-auto mt-16 ">
      {isLoading && <Loader />}
      <center>
        <div
          className="flex justify-center text-md pt-4 pb-4  text-textColor1 bg-bgBlueDark w-fit p-2 rounded-md hover:cursor-pointer hover:bg-textGray"
          onClick={handleClick}
        >
          {" "}
          Show List
        </div>
      </center>
      <div className="mb-4 mt-4 flex justify-start md:justify-end xl:justify-end lg:justify-end mr-2">
        {showClicked && (
          <div className="flex flex-col md:flex-row lg:flex-row xl:flex-row items-center mb-2">
            <div className="mb-4 md:mb-0 lg:mb-0 xl:mb-0">
              <input
                type="text"
                placeholder="Search..."
                className="mr-2 p-2 border border-gray-400 rounded-md"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button
                className="bg-button text-textColor buttonShadow hover:bg-hoverButton tracking-wider py-2 mr-4 px-4 rounded-md"
                onClick={handleSearch}
              >
                Search
              </button>
            </div>
            <div className=" flex justify-between">
              <button
                className="bg-button text-textColor buttonShadow hover:bg-hoverButton tracking-wider py-2 px-4 rounded-md"
                onClick={handleToggleFilterAlphabetically}
              >
                {isFiltered ? "Clear Filter" : "Sort by Name"}
              </button>
              <button
                className="bg-button text-textColor buttonShadow hover:bg-hoverButton tracking-wider py-2 px-4 rounded-md ml-4 mr-4"
                onClick={handleRefreshData}
              >
                Refresh Data
              </button>
            </div>
          </div>
        )}
      </div>
      {showClicked && (
        <div className="overflow-auto max-h-screen m-2">
          <table className="min-w-full bg-white shadow-md rounded-md">
            <thead>
              <tr className="bg-color1 text-black">
                <th className="py-3 px-4 text-left">Action</th>
                <th className="py-3 px-4 text-left">S.N.</th>
                {role === "Teacher" && (
                  <>
                    {" "}
                    <th className="py-3 px-4 text-left">TeacherID.</th>
                  </>
                )}
                {role === "Student" && (
                  <>
                    <th className="py-3 px-4 text-left">Enrollment No.</th>
                    <th className="py-3 px-4 text-left">Admission No.</th>
                  </>
                )}
                <th className="py-3 px-4 text-left">Name</th>
                {role === "Student" && (
                  <>
                    <th className="py-3 px-4 text-left">Branch</th>
                    <th className="py-3 px-4 text-left">Year</th>
                    <th className="py-3 px-4 text-left">Semester</th>
                  </>
                )}
                <th className="py-3 px-4 text-left">Email</th>

                {role === "Teacher" && (
                  <>
                    <th className="py-3 px-4 text-left">Phone</th>
                    <th className="py-3 px-4 text-left">Cabin</th>
                    <th className="py-3 px-4 text-left">Position</th>
                  </>
                )}
              </tr>
            </thead>
            <tbody>
              {(isFiltered ? filteredData : studentData).map((data, index) => (
                <tr
                  key={index}
                  className={
                    index % 2 === 0
                      ? "bg-blue-100 even:bg-blue-50"
                      : "odd:bg-gray-200"
                  }
                >
                    <td className="py-2 px-4 flex flex-wrap gap-4">
                    {editingIndex === index ? (
                      <>
                        <button
                          className="text-green-800"
                          onClick={() => handleSaveClick(index)}
                        >
                          <SaveIcon />
                        </button>
                        <button
                          className="text-red-500"
                          onClick={handleCancelClick}
                        >
                          <X />
                        </button>
                      </>
                    ) : (
                      <div className="flex flex-col md:flex-row gap-4 border border-gray-300 p-2">
                      <button
                        className="text-blue-800"
                        onClick={() => handleEditClick(index)}
                      >
                        <PenBoxIcon />
                      </button>

                      <button
                        className="text-red-600"
                        onClick={() => handleDeleteClick(index)}
                      >
                        <Trash />
                      </button>
                      </div>
                    )}
                  </td>
                  <td className="py-2 px-4">{index + 1}</td>
                  {role === "Teacher" && (
                    <>
                      {" "}
                      <td className="py-2 px-4">{data.TeacherID}</td>
                    </>
                  )}
                  {role === "Student" && (
                    <>
                      <td className="py-2 px-4">{data.EnrollmentNumber}</td>
                      <td className="py-2 px-4">{data.AdmissionNumber}</td>
                    </>
                  )}
                  <td className="py-2 px-4">
                    {editingIndex === index ? (
                      <input
                        className="bg-gray-500 outline text-white border-black p-2"
                        type="text"
                        value={editedData.Name}
                        onChange={(e) => handleChange(e, "Name")}
                      />
                    ) : (
                      data.Name
                    )}
                  </td>
                  {role === "Student" && (
                    <>
                      <td className="py-2 px-4">
                        {editingIndex === index ? (
                          <input
                          className="bg-gray-500 outline text-white border-black p-2"

                            type="text"
                            value={editedData.Branch}
                            onChange={(e) => handleChange(e, "Branch")}
                          />
                        ) : (
                          data.Branch
                        )}
                      </td>
                      <td className="py-2 px-4">
                        {editingIndex === index ? (
                          <input
                          className="bg-gray-500 outline text-white border-black p-2"

                            type="text"
                            value={editedData.Year}
                            onChange={(e) => handleChange(e, "Year")}
                          />
                        ) : (
                          data.Year
                        )}
                      </td>
                      <td className="py-2 px-4">
                        {editingIndex === index ? (
                          <input
                          className="bg-gray-500 outline text-white border-black p-2"

                            type="text"
                            value={editedData.Semester}
                            onChange={(e) => handleChange(e, "Semester")}
                          />
                        ) : (
                          data.Semester
                        )}
                      </td>
                    </>
                  )}
                  <td className="py-2 px-4">
                    {editingIndex === index ? (
                      <input
                        type="text"
                        className="bg-gray-500 outline text-white border-black p-2"

                        value={editedData.Email}
                        onChange={(e) => handleChange(e, "Email")}
                      />
                    ) : (
                      data.Email
                    )}
                  </td>
                  {role === "Teacher" && (
                    <>
                      {" "}
                      <td className="py-2 px-4">
                    {editingIndex === index ? (
                      <input
                        type="text"
                        className="bg-gray-500 outline text-white border-black p-2"

                        value={editedData.Phone}
                        onChange={(e) => handleChange(e, "Phone")}
                      />
                    ) : (
                      data.Phone
                    )}
                  </td>
                  <td className="py-2 px-4">
                    {editingIndex === index ? (
                      <input
                        type="text"
                        className="bg-gray-500 outline text-white border-black p-2"

                        value={editedData.Cabin}
                        onChange={(e) => handleChange(e, "Cabin")}
                      />
                    ) : (
                      data.Cabin
                    )}
                  </td>
                  <td className="py-2 px-4">
                    {editingIndex === index ? (
                      <input
                        type="text"
                        className="bg-gray-500 outline text-white border-black p-2"

                        value={editedData.Position}
                        onChange={(e) => handleChange(e, "Email")}
                      />
                    ) : (
                      data.Position
                    )}
                  </td>
                    </>
                  )}
                
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
