import React, { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FetchedStudentData from "./Component/FetchedStudent";
import AddingStudentManually from "./Component/AddingStudentManually";
import Layouts from "../../Layouts/Layouts";
import {downloadExcel} from './../../utility/DataFunction';
import AdminLayout from './../../NewVersion/NewLayout/AdminLayout'
import { useSelector } from "react-redux";
import API_ENDPOINTS from "../../NewVersion/Helper/ApiConfig";
const AddStudent = () => {
  const token = useSelector(state=>state.user.token);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

 const excelFormatData = [{
       SNO:'',
       Name:'',
       AdmissionNumber:'',
       Email:'',
       Phone:'',
       EnrollmentNumber:'',
       Year:'',
       Semester:'',
       Course:'',
       Branch:'',
       Session:'',


 }]

 const handleDownloadFormat = ()=>{
  downloadExcel(excelFormatData);
 }
  const handleUploadClick = async () => {
    try {
      if (!file) {
        toast.error("Please choose a file before uploading.", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        return;
      }

      setLoading(true);

      const formData = new FormData();
      formData.append("file", file);

      await axios.post("http://localhost:5000/s/studentDataUpload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          "x-access-token":token
        },
      });

      toast.success("File uploaded successfully", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });

      console.log("File uploaded successfully");
    } catch (error) {
      console.error("Error uploading File", error);

      toast.error("Error uploading file. Please try again.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleStudentAdded = async (newStudentData) => {
    try {
      toast.success("Student added successfully", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });

      console.log("Student added successfully");
    } catch (error) {
      console.error("Error adding student", error);

      toast.error("Error adding student. Please try again.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  return (
    <AdminLayout>
      <div>
        <ToastContainer />

        <div className="max-w-md mx-2 lg:mx-auto mt-20 p-6 bg-textColor1 cardShadow rounded-md shadow-md upCard border">
          <h2 className="text-2xl bg-color1 text-black font-semibold mb-4">
            Upload Student List
          </h2>

          {/* File Input */}
          <div className="mb-4">
            <label
              htmlFor="fileInput"
              className="bg-color1 text-black block text-sm font-medium text-color3"
            >
              Choose Excel File (.xlsx)
            </label>
            <input
              type="file"
              id="fileInput"
              required // <-- Remove "true" from here
              accept=".xlsx"
              cursor="pointer"
              className="bg-color1 text-black cursor-pointer p-2 w-full"
              onChange={handleFileChange}
              title="Please choose an Excel file (.xlsx)" // <-- Add a title attribute for more clarity
            />
          </div>

          {/* Show and Upload Buttons */}
          <div className="flex space-x-4 flex-row justify-between items-center">
            <button onClick={handleDownloadFormat} className="bg-bgBlue buttonShadow text-white hover:bg-hoverButton w-full rounded-md shadow-lg hover:shadow-2xl px-4 py-2">
              Download Format
            </button>
            <button
              className="bg-bgBlue buttonShadow text-white hover:bg-hoverButton w-full rounded-md shadow-lg hover:shadow-2xl px-4 py-2"
              onClick={handleUploadClick}
            >
              {loading ? "Uploading..." : "Upload to Database"}
            </button>
          </div>
        </div>

        <div className="flex m-10 justify-center items-center">
          <div className="flex-1">
            <div style={{ height: "2px" }} className="bg-gray-300"></div>
          </div>

          <div className="flex-0 ml-4 mr-4 font-bold">
            <h2>Or</h2>
          </div>

          <div className="flex-1">
            <div style={{ height: "2px" }} className="bg-gray-300"></div>
          </div>
        </div>

        <AddingStudentManually
          onStudentAdded={handleStudentAdded}
          role="Student"
        />

        {/* Rest of your component */}
        <FetchedStudentData role="Student" />
      </div>
    </AdminLayout>
  );
};

export default AddStudent;
