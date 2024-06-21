import React, { useState, useEffect } from "react";
import { studentNotRegistered } from "../../../utility/DataFunction";
import YearSemester from "../Component/YearSemester";
import AdminLayout from './../../../NewVersion/NewLayout/AdminLayout';
import { downloadExcel } from "../../../utility/DataFunction";
import { ToastContainer, toast } from "react-toastify";
import Loading from "../../../Components/loading/Loading";
import axios from "axios";
import { WatchIcon } from "lucide-react";

function NotRegistered() {
  const [notRegistered, setNotRegistered] = useState([]);
  const [isClicked, setIsClicked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [searchFilter, setSearchFilter] = useState({
    Year: "",
    Semester: "",
    school: "",
    numberOfTeammates: "",
  });
  const [isClicked2, setIsClicked2] = useState(false);
  const handleNotRegistered = async () => {
    setIsClicked2(true);
    console.log("clickced");
    try {
      const response = await axios.post(
        "http://localhost:5000/projects/create-rest-group",
        searchFilter
      );
      if (response.status === 200) {
        toast.success("Group created for Not Registered Student");
      }
    } catch (error) {
      if (error.response && error.response.status === 500) {
        toast.error("Unable to create the group! Try again.");
      } else if (error.code === "ECONNREFUSED") {
        toast.error("Unable to connect to the server. Please try again later.");
      } else if (error.isAxiosError) {
        toast.error("Network error. Please check your internet connection.");
      } else {
        toast.error("An unexpected error occurred. Please try again.");
      }
    }
    setIsClicked2(false);
  };
  const getData = async () => {
    setIsClicked(true);

    setIsLoading(true);
    try {
      const result = await studentNotRegistered(
        searchFilter.Year,
        searchFilter.Semester ? searchFilter.Semester : ""
      );
      setNotRegistered(result);
    } catch (error) {
        if (error.response && error.response.status === 500) {
            toast.error("Unable to Find the Deatils");
          } else if (error.code === "ECONNREFUSED") {
            toast.error("Unable to connect to the server. Please try again later.");
          } else if (error.isAxiosError) {
            toast.error("Network error. Please check your internet connection.");
          } else {
            toast.error("An unexpected error occurred. Please try again.");
          }
      // console.error(e);
    }
    setIsLoading(false);
  };

  return (
    <AdminLayout>
      <ToastContainer />
      {isClicked2 && (
        <div className="fixed w-full lg:-mx-20 -mx-2 h-screen bg-black bg-opacity-25 flex flex-col gap-10 justify-center items-center">
          <Loading />
          <p className="text-xl text-blue-800 flex flex-row gap-2">
            We are Creating the group Wait! <WatchIcon />{" "}
          </p>
        </div>
      )}
      <div className="mt-10">
        <div className="flex flex-col lg:flex-row items-center justify-center gap-4">
          <YearSemester
            studentData={searchFilter}
            setStudentData={setSearchFilter}
          />
          <div className="bg-bgBlue w-fit text-white p-2 mt-2 rounded-md border-none">
            <button onClick={getData}>Show List</button>
          </div>
        </div>
        {isLoading ? (
          <div className="flex flex-row justify-center items-center mt-10">
            <Loading />
          </div>
        ) : (
          <div>
            {isClicked && notRegistered && notRegistered.length === 0 && (
              <>
                <h2>No Data Found</h2>
              </>
            )}
            {notRegistered.length > 0 && (
              <div className="flex flex-row gap-2 justify-between ">
                <button
                  className="bg-bgBlue text-white mt-5 py-1 px-2 rounded-md"
                  onClick={() => downloadExcel(notRegistered)}
                >
                  Download As Excel
                </button>
                <div className=" flex flex-row mt-5 gap-2 items-center">
                  <select
                    className="p-2 outline-none rounded-md"
                    onChange={(e) =>
                      setSearchFilter({
                        ...searchFilter,
                        school: e.target.value,
                      })
                    }
                  >
                    <option value="">Select School</option>
                    <option value="SCSE">SCSE</option>
                    <option value="MCA">MCA</option>
                  </select>
                  <select
                    className="p-2 outline-none rounded-md"
                    onChange={(e) =>
                      setSearchFilter({
                        ...searchFilter,
                        numberOfTeammates: e.target.value,
                      })
                    }
                  >
                    <option value="">Select Number of Member</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                  </select>
                  <button
                    className="bg-bgBlue text-white  py-1 px-2 rounded-md"
                    onClick={handleNotRegistered}
                  >
                    Create Group For Not Registered
                  </button>
                </div>
              </div>
            )}
            <div className="overflow-auto" style={{ maxHeight: "100vh" }}>
              {notRegistered.length > 0 && (
                <table className="min-w-full bg-white border border-gray-300 mt-10 overflow-x-auto">
                  <thead>
                    <tr>
                      <th className="border border-gray-300 px-4 py-2">SN</th>
                      <th className="border border-gray-300 px-4 py-2">Name</th>
                      <th className="border border-gray-300 px-4 py-2">Phone</th>
                      <th className="border border-gray-300 px-4 py-2">Email</th>
                    </tr>
                  </thead>
                  <tbody>
                    {notRegistered.map((prData, index) => (
                      <tr key={index}>
                        <td className="border border-gray-300 px-4 py-2">
                          {index + 1}
                        </td>
                        <td className="border border-gray-300 px-4 py-2">
                          {prData.Name + " - " + prData.AdmissionNumber}
                        </td>
                        <td className="border border-gray-300 px-4 py-2">
                          {prData.Phone}
                        </td>
                        <td className="border border-gray-300 px-4 py-2">
                          {prData.Email}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}

export default NotRegistered;
