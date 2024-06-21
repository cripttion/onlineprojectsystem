import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EditableCell from './EditableCell'; // Component for editable cells, defined below
import API_ENDPOINTS from '../../../Helper/ApiConfig';
import {ToastContainer, toast} from 'react-toastify';
const MarksComponent = ({ projectID,token }) => {
  const [marksData, setMarksData] = useState([]);
  const[updatedMarks,setUpdatedMarks] = useState([]);
  const [guideMarksData, setGuideMarksData] = useState([]);
  const [reviewerMarksData, setReviewerMarksData] = useState([]);
  const [selectedTab, setSelectedTab] = useState('marks'); // State to manage which tab is selected
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchMarksData();
 
  }, []);

  const fetchMarksData = async () => {
    try {
      const response = await axios.get(API_ENDPOINTS.GET_MARKS_API.replace("{projectID}",projectID), {
        headers: { 'x-access-token': token }
      });
      if (response.status === 200) {
        setMarksData(response.data.Makrs);
        setUpdatedMarks(response.data.Makrs);
        setGuideMarksData(response.data.GuideMarks);
        setReviewerMarksData(response.data.ReviewerMarks);
      }
    } catch (error) {
      console.log('Error fetching marks data:', error);
    }
  };

  const handleMarkChange = (e, index, key) => {
    const updatedMarksCopy = [...updatedMarks];
    updatedMarksCopy[index][key] = e.target.value;
    setUpdatedMarks(updatedMarksCopy);
  }

  const handleTabChange = (tab) => {
    setSelectedTab(tab);
  };

  const handleUpdateMarks = async (index,id) => {
    console.log(id);
    try {
        const { Name, ...rest } = updatedMarks[index];

      const response = await axios.put(API_ENDPOINTS.UPDATE_MARKS, {
        ProjectID:projectID,
        StudentID:id,
        marks: rest
      }, {
        headers: { 'x-access-token': token }
      });
      if (response.status === 200) {
        // Update marksData state with updated data
        const updatedData = marksData.map(item => item.id === id ? { ...item, marks: updatedMarks } : item);
        setMarksData(updatedData);
        setIsEditing(false);
      }
    } catch (error) {
      console.log('Error updating marks:', error);
    }
  };

  const handleUpdateGuideMarks = async (id) => {
    try {
      const response = await axios.put(API_ENDPOINTS.UPDATE_GUIDE_MARKS, {
        guideMarks: updatedMarks
      }, {
        headers: { 'x-access-token': token }
      });
      if (response.status === 200) {
        // Update guideMarksData state with updated data
        toast.success('Marks Updated successfully');

        const updatedData = guideMarksData.map(item => item.id === id ? { ...item, guideMarks: updatedMarks } : item);
        setGuideMarksData(updatedData);
      }
    } catch (error) {
      console.log('Error updating guide marks:', error);
    }
  };

  const handleUpdateReviewerMarks = async (id, updatedMarks) => {
    try {
      const response = await axios.put(API_ENDPOINTS.UPDATE_REVIEWER_MARKS_API.replace("{id}", id), {
        reviewerMarks: updatedMarks
      }, {
        headers: { 'x-access-token': token }
      });
      if (response.status === 200) {
        // Update reviewerMarksData state with updated data
        const updatedData = reviewerMarksData.map(item => item.id === id ? { ...item, reviewerMarks: updatedMarks } : item);
        setReviewerMarksData(updatedData);
      }
    } catch (error) {
      console.log('Error updating reviewer marks:', error);
    }
  };

  return (
    <div className="mt-6">
        <ToastContainer />
   <div className="flex mb-4">
  <button
    onClick={() => handleTabChange('marks')}
    className={`text-lg text-gray-700 hover:text-gray-900 focus:outline-none ${selectedTab === 'marks' ? 'border-b-2 border-bgBlue text-bgBlue' : ''} py-3 px-6 w-full`}
  >
    Marks
  </button>
  <button
    onClick={() => handleTabChange('guideMarks')}
    className={`text-lg text-gray-700 hover:text-gray-900 focus:outline-none ${selectedTab === 'guideMarks' ? 'border-b-2 border-bgBlue text-bgBlue' : ''} py-3 px-6 ml-4 w-full`}
  >
    Guide Marks
  </button>
  <button
    onClick={() => handleTabChange('reviewerMarks')}
    className={`text-lg text-gray-700 hover:text-gray-900 focus:outline-none ${selectedTab === 'reviewerMarks' ? 'border-b-2 border-bgBlue text-bgBlue' : ''} py-3 px-6 ml-4 w-full`}
  >
    Reviewer Marks
  </button>
</div>


      {selectedTab === 'marks' && (
        <>
        <table className="table-auto w-full">
          <thead>
           {marksData?.length > 0 && Object.keys(marksData[0]).map((key) => (
                key !== 'MarksID' && <th key={key} className="border border-gray-400 px-4 py-2">{key}</th>
              ))}
              <th className="border border-gray-400 px-4 py-2">Action</th>
          </thead>
          <tbody>
            {updatedMarks?.map((mark,index) => (
              <tr key={index} className={index % 2 === 0 ? 'bg-gray-100' : ''}>
              {Object.keys(mark).map((key) => (
                key !== 'MarksID' &&
                <td key={key} className="border border-gray-400 px-4 py-2">
                  {isEditing ? (
                    <input
                      type="text"
                      value={mark[key]}
                      onChange={(e) => handleMarkChange(e, index, key)}
                      className="w-full"
                    />
                  ) : (
                    mark[key]
                  )}
                </td>
              ))}
             <td className="border border-gray-400 px-4 py-2">
             <div className=' flex flex-row gap-10 items-center'>
        <button
        onClick={()=>setIsEditing(true)}
        className="mt-6 bg-bgBlue text-white font-semibold py-2 px-4 rounded-lg "
      >
       Update Marks
      </button>
      {isEditing&&<button
        onClick={()=>handleUpdateMarks(index,mark.StudentID)}
        className="mt-6 bg-bgBlue text-white font-semibold py-2 px-4 rounded-lg "
      >
        Save 
      </button>}
      </div>
             </td>
            </tr>
           
            ))}
          </tbody>
        </table>
        
        </>
      )}

      {selectedTab === 'guideMarks' && (
        <table className="table-auto w-full">
          <thead>
            <tr className="bg-gray-200">
              <th className="border px-4 py-2">Guide Name</th>
              <th className="border px-4 py-2">Guide Marks</th>
            </tr>
          </thead>
          <tbody>
            {guideMarksData?.map((item) => (
              <tr key={item.id}>
                <td className="border px-4 py-2">{item.guideName}</td>
                <td className="border px-4 py-2">
                  <EditableCell
                    value={item.guideMarks}
                    onSave={(updatedMarks) => handleUpdateGuideMarks(item.id, updatedMarks)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {selectedTab === 'reviewerMarks' && (
        <table className="table-auto w-full">
          <thead>
            <tr className="bg-gray-200">
              <th className="border px-4 py-2">Reviewer Name</th>
              <th className="border px-4 py-2">Reviewer Marks</th>
            </tr>
          </thead>
          <tbody>
            {reviewerMarksData?.map((item) => (
              <tr key={item.id}>
                <td className="border px-4 py-2">{item.reviewerName}</td>
                <td className="border px-4 py-2">
                  <EditableCell
                    value={item.reviewerMarks}
                    onSave={(updatedMarks) => handleUpdateReviewerMarks(item.id, updatedMarks)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default MarksComponent;
