import React, { useState, useEffect } from 'react';
import StudentLayout from './StudentLayout/Layout';
import { useSelector } from 'react-redux';
import API_ENDPOINTS from '../../Helper/ApiConfig';
import axios from 'axios';

import 'tailwindcss/tailwind.css'; // Import Tailwind CSS
import { PlusCircleIcon } from 'lucide-react';
import { ToastContainer, toast } from 'react-toastify';

function Myprojects() {
    const { projectID } = useSelector((state) => state.project);
    const [studentData, setStudentData] = useState([]);
    const [projectData, setProjectData] = useState({});
    const [unregisteredStudents, setUnregisteredStudents] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedStudent, setSelectedStudent] = useState(null);
    
    useEffect(() => {
        getStudentData();
        getProjectData();
        getUnregisteredStudents();
    }, []);

    const getStudentData = async () => {
        try {
            const response = await axios.get(API_ENDPOINTS.GET_PROJECTMEMBER_DETAILS.replace("{projectID}", projectID[0].ProjectID));
            if (response.status === 200) {
                setStudentData(response.data.data);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const getProjectData = async () => {
        try {
            const response = await axios.get(API_ENDPOINTS.GET_PROJECTDATA_PROEJCTID.replace("{projectID}", projectID[0].ProjectID));
            if (response.status === 200) {
                setProjectData(response.data[0]);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const getUnregisteredStudents = async () => {
        try {
            const response = await axios.post(API_ENDPOINTS.GET_UNREGISTERED_STUDENT,{
                "year":projectData.Year,
                "semester":projectData.semester           
             });
            if (response.status === 200) {
                setUnregisteredStudents(response.data.data);
            }
        } catch (error) {
            console.log(error);
        }
    };


    const addStudentToProject = async () => {
        if (selectedStudent) {
            try {
                const response = await axios.post(API_ENDPOINTS.GET_SEND_FOR_VERIFICATION, {
                    projectID: projectID[0].ProjectID,
                    requestUser:"Your Friend",
                    Email:selectedStudent.Email
                });
                if (response.status === 200) {
                    // Refresh student data
                    toast.success('Verification send on Email');
                    
                    getStudentData();
                    setShowModal(false);
                    setSelectedStudent(null);
                }
            } catch (error) {
                console.log(error);
            }
        }
    };
console.log(selectedStudent);
    return (
        <StudentLayout>
            <ToastContainer />
            <div className="p-6 bg-white shadow-md rounded-md">
                <h1 className="text-2xl font-bold mb-4">Project ID: {projectData.ProjectID}</h1>
                <p className="text-lg mb-6">Status: {projectData.Status}</p>
                <div className="mb-6">
                    <h2 className="text-xl font-semibold mb-2">Project Members</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {studentData.map((student) => (
                            <div key={student.id} className="p-4 border rounded-md shadow-md">
                                <p>{student.Name}</p>
                                <p>{student.AdmissionNumber}</p>
                                <p>{student.Email}</p>
                                <p>{student.Phone}</p>
                            </div>
                        ))}
                        {studentData.length < projectData.ProjectNumber && (
                            <div
                                className="p-4 border rounded-md shadow-md flex items-center justify-center cursor-pointer"
                                onClick={() => setShowModal(true)}
                            >
                                <PlusCircleIcon className="h-10 w-10 text-gray-500" />
                            </div>
                        )}
                    </div>
                </div>
                {showModal && (
                    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
                        <div className="bg-white p-6 rounded-md shadow-md w-1/2 max-h-96 overflow-y-auto">
                            <h2 className="text-xl font-semibold mb-4">Add Students</h2>
                            <ul>
                                {unregisteredStudents.map((student) => (
                                    <li
                                        key={student.id}
                                        className={`mb-2 p-2 cursor-pointer rounded-md ${selectedStudent?.AdmissionNumber === student.AdmissionNumber ? 'bg-bgBlue text-white' : ''}`}
                                        onClick={() => setSelectedStudent(student)}
                                    >
                                        {student.Name} - {student.AdmissionNumber}
                                    </li>
                                ))}
                            </ul>
                            <div className="flex w-full fixed bottom-0 right-0 justify-center mt-4 bg-white p-5">
                                <button
                                    className="p-2 bg-red-700 text-white rounded-md mr-2"
                                    onClick={() => setShowModal(false)}
                                >
                                    Cancel
                                </button>
                                <button
                                    className="p-2 bg-bgBlue text-white rounded-md"
                                    onClick={addStudentToProject}
                                    disabled={!selectedStudent}
                                >
                                    Save
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </StudentLayout>
    );
}

export default Myprojects;
