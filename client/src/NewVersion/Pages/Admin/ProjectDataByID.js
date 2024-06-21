import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import AdminLayout from './../../NewLayout/AdminLayout';
import API_ENDPOINTS from '../../Helper/ApiConfig';
import axios from 'axios';
import StudentDetailsCard from './component/StudentDetailsCard';
import Modal from 'react-modal';
import{useSelector} from 'react-redux';
import GuideFunction from './component/GuideFunction';
import ReviewerFunction from './component/ReviewerFunction';
import MarksFunction from './component/MarksFunction';
Modal.setAppElement('#root');

function ProjectDataByID() {
  const { projectID } = useParams();
  const {userData} = useSelector((state)=>state.user);

  const token = localStorage.getItem('token');
  const [studentData, setStudentData] = useState([]);
  const [availableStudents, setAvailableStudents] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const studentResponse = await axios.get(API_ENDPOINTS.GETSTUDENTBYPROJECTID.replace("{projectID}", projectID), {
          headers: {
            'x-access-token': token
          }
        });
        if (studentResponse.status === 200) {
          setStudentData(studentResponse.data.data);
        }
      } catch (error) {
        console.log("Error while fetching student data", error);
      }
    };
    getData();
  }, [projectID, token]);

  const fetchAvailableStudents = async () => {
    try {
        const data ={
            year:studentData[0]?.Year,
            semester:studentData[0]?.Semester
          }
      const response = await axios.post(API_ENDPOINTS.GETNOTREGISTEREDSTUDENTS, data ,{
        headers: {
          'x-access-token': token
        }
      });
      if (response.status === 200) {
        setAvailableStudents(response.data.data);
      }
    } catch (error) {
      console.log("Error while fetching available students", error);
    }
  };

  const handleAddStudent = async () => {
    if (!selectedStudent) return;
    try {
      await axios.post(
        API_ENDPOINTS.ADDSTUDENTTOPROJECT.replace("{projectID}", projectID), 
        { admissionNumber: selectedStudent,
           user:userData.Name
        }, 
        { headers: { 'x-access-token': token } }
      );
      setStudentData([...studentData, availableStudents.find(student => student.AdmissionNumber === selectedStudent)]);
      setIsModalOpen(false);
    } catch (error) {
      console.log("Error while adding student to project", error);
    }
  };

  const openModal = () => {
    fetchAvailableStudents();
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedStudent(null);
  };
  console.log("The student data is ",studentData);
  return (
    <AdminLayout>
      <div className="p-6 bg-gray-100 min-h-screen">
        <h1 className="text-2xl font-semibold text-gray-900 mb-6">Project Details</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {studentData.length > 0 ? studentData.map((student) => (
            <StudentDetailsCard
              key={student.AdmissionNumber}
              name={student.Name}
              admissionNumber={student.AdmissionNumber}
              email={student.Email}
              phone={student.Phone}
            />
          )) : (
            <p>No student data available.</p>
          )}
        </div>
        <button
          onClick={openModal}
          className="mt-6 bg-bgBlue text-white font-semibold py-2 px-4 rounded-lg "
        >
          Add Student to Project
        </button>
        <GuideFunction projectID={projectID} token={token} />
        <ReviewerFunction projectID={projectID} token={token} />
        <MarksFunction projectID={projectID} token={token}/>
        <Modal
          isOpen={isModalOpen}
          onRequestClose={closeModal}
          contentLabel="Add Student Modal"
          className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50"
          overlayClassName="fixed inset-0 bg-gray-800 bg-opacity-75"
        >
          <div className="relative bg-white p-6 rounded-lg w-full max-w-lg mx-auto h-4/5 overflow-y-auto">
            <h2 className="text-xl font-semibold mb-4">Select Student to Add</h2>
            <ul className="mb-4">
              {availableStudents.map((student) => (
                <li key={student.AdmissionNumber} className="mb-2 flex justify-between items-center">
                  <span>{student.Name} ({student.AdmissionNumber})</span>
                  <button
                    onClick={() => setSelectedStudent(student.AdmissionNumber)}
                    className={`py-1 px-3 rounded ${selectedStudent === student.AdmissionNumber ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-800'}`}
                  >
                    {selectedStudent === student.AdmissionNumber ? 'Selected' : 'Select'}
                  </button>
                </li>
              ))}
            </ul>
          
  <div className="fixed bottom-0 left-0 right-0 flex justify-end items-center bg-white p-4 border-t">
    <button
      onClick={handleAddStudent}
      className="bg-bgBlue text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-600"
    >
      Add Student
    </button>
    <button
      onClick={closeModal}
      className="ml-4 bg-red-700 text-white font-semibold py-2 px-4 rounded-lg hover:bg-red-600"
    >
      Cancel
    </button>
  </div>

          </div>
        </Modal>
      </div>
    </AdminLayout>
  );
}

export default ProjectDataByID;
