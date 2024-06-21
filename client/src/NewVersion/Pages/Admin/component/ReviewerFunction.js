import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import API_ENDPOINTS from '../../../Helper/ApiConfig';

Modal.setAppElement('#root');

const ReviewerComponent = ({ projectID, token }) => {
  const [guideData, setGuideData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [availableTeachers, setAvailableTeachers] = useState([]);
  const [selectedTeacher, setSelectedTeacher] = useState(null);
 useEffect(()=>{
    fetchGuides();
 },[])
  const fetchGuides = async () => {
    try {
      const response = await axios.get(API_ENDPOINTS.GETREVIEWERBYPROJECTID.replace("{projectID}", projectID), {
        headers: { 'x-access-token': token }
      });
      if (response.status === 200) {
        setGuideData(response.data.data);
      }
    } catch (error) {
      console.log("Error while fetching guide data", error);
    }
  };

  const fetchAvailableTeachers = async () => {
    try {
      const response = await axios.get(API_ENDPOINTS.GETREVIEWERALLOCATEDATA, {
        headers: { 'x-access-token': token }
      });
      if (response.status === 200) {
        setAvailableTeachers(response.data.response);
      }
    } catch (error) {
      console.log("Error while fetching available teachers", error);
    }
  };

  const handleAddGuide = async () => {
    if (!selectedTeacher) return;
    try {
      await axios.post(
        API_ENDPOINTS.ADDNEWREVIEWERTOPROJECT, 
        { teacherID: selectedTeacher,
          projectID:projectID
        }, 
        { headers: { 'x-access-token': token } }
      );
      setGuideData([...guideData, availableTeachers.find(teacher => teacher.TeacherID=== selectedTeacher)]);
      setIsModalOpen(false);
    } catch (error) {
      console.log("Error while adding guide to project", error);
    }
  };

  const openModal = () => {
    fetchAvailableTeachers();
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedTeacher(null);
  };

  return (
    <div>
<h2 className="text-3xl font-bold text-center mt-6 mb-4 relative">
  Reviewer for Project 
  <span className="block w-1/2 h-1 bg-bgBlue mx-auto mt-2"></span>
</h2>      
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
  {guideData.length > 0 ? (
    guideData.map((guide, index) => (
      <div
        key={guide.TeacherID}
        className={`bg-white shadow-md rounded-lg p-6 ${
          index === guideData.length - 1 ? 'border-2 border-green-400' : 'border'
        }`}
      >
        <h3 className="text-lg font-semibold mb-2">{guide.Name}</h3>
        <p className="text-gray-600">Teacher ID: {guide.TeacherID}</p>
        <p className="text-gray-600">Mobile: {guide.Phone}</p>
        <p className="text-gray-600">Email: {guide.Email}</p>
        <p className="text-gray-600">Position: {guide.Position}</p>
        {index === guideData.length - 1 && (
          <span className="inline-block mt-2 bg-yellow-200 text-yellow-800 text-xs font-semibold px-2 py-1 rounded">
            Current Reviewer
          </span>
        )}
      </div>
    ))
  ) : (
    <p>No Reviewer data available.</p>
  )}
</div>
      
      <button
        onClick={openModal}
        className="mt-6 bg-bgBlue text-white font-semibold py-2 px-4 rounded-lg "
      >
        Add Reviewer
      </button>
      
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Add Guide Modal"
        className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50"
        overlayClassName="fixed inset-0 bg-gray-800 bg-opacity-75"
      >
        <div className="bg-white p-6 rounded-lg w-full max-w-lg mx-auto h-4/5 overflow-y-auto relative">
          <h2 className="text-xl font-semibold mb-4">Select Guide to Add</h2>
          <ul className="mb-4">
            {availableTeachers?.map((teacher) => (
              <li key={teacher.TeacherID} className="mb-2 flex justify-between items-center">
                <span>{teacher.TeacherName} </span>
                <span className='text-center'>{teacher.TeacherCount}</span>
                <button
                  onClick={() => setSelectedTeacher(teacher.TeacherID)}
                  className={`py-1 px-3 rounded ${selectedTeacher === teacher.TeacherID ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-800'}`}
                >
                  {selectedTeacher === teacher.TeacherID ? 'Selected' : 'Select'}
                </button>
              </li>
            ))}
          </ul>
          <div className="fixed bottom-0 left-0 right-0 flex justify-end items-center bg-white p-4 border-t">
            <button
              onClick={handleAddGuide}
              className="bg-bgBlue text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-600"
            >
              Add Reviewer
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
  );
};

export default ReviewerComponent;
