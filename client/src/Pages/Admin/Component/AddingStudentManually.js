import React, { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Select from 'react-select';
import YearSemester from './YearSemester'; // Import the YearSemester component
import API_ENDPOINTS from '../../../NewVersion/Helper/ApiConfig';
import { useSelector } from 'react-redux';

function AddingStudentManually(props) {
  const role = props.role;
  const token = useSelector(state=>state.user.token);
  const [studentData, setStudentData] = useState({
    EnrollmentNumber: '',
    AdmissionNumber: '',
    Name: '',
    Branch: '',
    Year: null,
    Semester: null,
    Phone: '',
    Email: '',
    Session:'',
    Course:'',
    Cabin:'',
    isYearSelected: false,

  });

  const handleChange = (value, field) => {
    setStudentData(prevData => ({
      ...prevData,
      [field]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const roleroute  = (role==='Student'?API_ENDPOINTS.ADDSTUDENT:API_ENDPOINTS.ADDTEACHER);
    try {
      // Make an API request to save the student data
      await axios.post(roleroute, studentData,{
        headers: {
          "Content-Type": "application/json",
          "x-access-token":token
        }});
      toast.success('Student added successfully!');
      setStudentData({
        EnrollmentNumber: '',
        AdmissionNumber: '',
        Name: '',
        Branch: '',
        Year: null,
        Semester: null,
        Phone: '',
        Email: '',
        Session:'',
        Course:'',
        Cabin:'',
        isYearSelected: false,
        visibleSemesters: [],
      });
    } catch (error) {
      console.error('Error adding student:', error);
      toast.error('Error adding student. Please try again.');
    }
  };

  const BranchOptions = [
    { value: 'CSE', label: 'CSE' },
    { value: 'BCA', label: 'BCA' },
    { value: 'MCA', label: 'MCA' },
    { value: 'MTECH', label: 'MTECH' },
  ];
  const CourseOptions=[
    {value:'B.Tech',label:'B.Tech'},
    {value:'B.Tech(ML)',label:'B.Tech(ML)'},
    {value:'BCA',label:'BCA'}
  ]
  return (
    <div className="container p-4 mx-auto mt-8 bg-textColor1 text-black cardShadow rounded-md border upCard">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <h2 className="text-2xl font-bold  mb-4 flex justify-center">Add Data Manually</h2>
      <form onSubmit={handleSubmit} className="w-full mx-auto">
        <div className='flex flex-wrap flex-col md:flex-row lg:flex-row xl:flex-row justify-around'>
         {role==='Student' && <label className="block mb-4">
            <span className="text-gray-700">Enrollment Number:</span>
            <input
              type="text"
              placeholder='Enrollment'
              required
              name="EnrollmentNumber"
              value={studentData.EnrollmentNumber}
              onChange={(e) => handleChange(e.target.value, 'EnrollmentNumber')}
              className="form-input mt-1 p-2 border rounded-md border-gray-300 block w-full"
            />
          </label>}

          <label className="block mb-4">
            <span className="text-gray-700">{role==='Student'?"Admission Number":"Teacher ID"}:</span>
            <input
              type="text"
              placeholder={role==='Student'?"Admission Number":"Teacher ID"}
              required
              name={studentData.AdmissionNumber}
              value={studentData.AdmissionNumber}
              onChange={(e) => handleChange(e.target.value, 'AdmissionNumber')}
              className="form-input mt-1 p-2 border rounded-md border-gray-300 block w-full"
            />
          </label>

          <label className="block mb-4">
            <span className="text-gray-700">Name:</span>
            <input
              type="text"
              placeholder='Name'
              required
              name="Name"
              value={studentData.Name}
              onChange={(e) => handleChange(e.target.value, 'Name')}
              className="form-input mt-1 p-2 border rounded-md border-gray-300 block w-full"
            />
          </label>

          
      
       
        {role==='Student'&&<><label className="block mb-4 w-60">
          <YearSemester
        studentData={studentData}
        setStudentData={setStudentData}
      />
            <span className="text-gray-700">Course:</span>
            <Select
              required
              className="text-black w-full"
              options={CourseOptions}
              value={CourseOptions.find((option) => option.value === studentData.Course)}
              onChange={(selectedOption) => handleChange(selectedOption.value, 'Course')}
              isSearchable={false}
              styles={{
                control: (provided, state) => ({
                  ...provided,
                  height: '42px',
                  outline: state.isFocused ? '2px solid black' : 'none',
                  borderRadius: '7px',
                  marginTop: '4px'
                }),
              }}
            />
          </label>

          <label className="block mb-4 w-60">
            <span className="text-gray-700">Branch:</span>
            <Select
              required
              className="text-black w-full"
              options={BranchOptions}
              value={BranchOptions.find((option) => option.value === studentData.Branch)}
              onChange={(selectedOption) => handleChange(selectedOption.value, 'Branch')}
              isSearchable={false}
              styles={{
                control: (provided, state) => ({
                  ...provided,
                  height: '42px',
                  outline: state.isFocused ? '2px solid black' : 'none',
                  borderRadius: '7px',
                  marginTop: '4px'
                }),
              }}
            />
          </label></>}
       

          <label className="block mb-4">
            <span className="text-gray-700">Phone:</span>
            <input
              required
              placeholder='7061454xxx'
              type="text"
              name="Phone"
              value={studentData.Phone}
              onChange={(e) => handleChange(e.target.value, 'Phone')}
              className="form-input mt-1 p-2 border rounded-md border-gray-300 block w-full"
            />
          </label>

          <label className="block mb-4">
            <span className="text-gray-700">Email:</span>
            <input
              required
              placeholder='xyz@abc.com'
              type="text"
              name="Email"
              value={studentData.Email}
              onChange={(e) => handleChange(e.target.value, 'Email')}
              className="form-input mt-1 p-2 border rounded-md border-gray-300 block w-full"
            />
          </label>
          {role==='Teacher'&&<label className="block mb-4">
            <span className="text-gray-700">Cabin:</span>
            <input
              required
              placeholder='C-125'
              type="text"
              name="Cabin"
              value={studentData.Cabin}
              onChange={(e) => handleChange(e.target.value, 'Cabin')}
              className="form-input mt-1 p-2 border rounded-md border-gray-300 block w-full"
            />
          </label>}
          {role==='Student'&&<label className="block mb-4">
            <span className="text-gray-700">Session:</span>
            <input
              placeholder='2020-2024'
              type="text"
              required
              name="Name"
              value={studentData.Session}
              onChange={(e) => handleChange(e.target.value, 'Session')}
              className="form-input mt-1 p-2 border rounded-md border-gray-300 block w-full"
            />
          </label>}
          

          <label className="flex justify-center items-center">
            <span className="text-gray-700"></span>
            <button
              type="submit"
              className="bg-bgBlue mb-4 text-white  buttonShadow hover:bg-hoverButton font-semibold tracking-wider mt-1 w-60 h-12 rounded-md"
            >
              Add {role}
            </button>
          </label>
        </div>
      </form>
    </div>
  );
}

export default AddingStudentManually;
