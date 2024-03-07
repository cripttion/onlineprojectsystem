import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';

function MarksDetails({ ProjectID }) {
  const [marks, setMarks] = useState([]);
  const [updatedMarks, setUpdatedMarks] = useState([]);
  const [isEditing, setIsEditing] = useState(false);

  const getData = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/m/projectMarks/${ProjectID}`);

      if (response.status === 200) {
        setMarks(response.data);
        setUpdatedMarks(response.data); // Initialize updatedMarks with current marks
      } else {
        toast.error("Unable to get the Marks Details");
      }
    } catch (error) {
      toast.error(error.message);
    }
  }

  useEffect(() => {
    getData();
  }, [ProjectID]);

  const handleMarkChange = (e, index, key) => {
    const updatedMarksCopy = [...updatedMarks];
    updatedMarksCopy[index][key] = e.target.value;
    setUpdatedMarks(updatedMarksCopy);
  }

  const handleUpdateMarks = async () => {
    console.log(updatedMarks);
    try {

      const response =  await axios.put(`http://localhost:5000/m/updateMarks/${ProjectID}`, updatedMarks);
      if(response.status===200)
            toast.success("Marks updated successfully");
      setMarks(updatedMarks); // Update marks in the UI
      setIsEditing(false); // Reset isEditing
    } catch (error) {
      toast.error("Error updating marks");
    }
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Marks of the group are as follows:</h1>
      <div className="overflow-x-auto">
        <table className="table-auto border-collapse border border-gray-400">
          <thead>
            <tr>
              {marks.length > 0 && Object.keys(marks[0]).map((key) => (
                key !== 'MarksID' && <th key={key} className="border border-gray-400 px-4 py-2">{key}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {updatedMarks.map((mark, index) => (
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
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {isEditing ? (
        <button onClick={handleUpdateMarks} className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Update Marks
        </button>
      ) : (
        <button onClick={() => setIsEditing(true)} className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Edit Marks
        </button>
      )}
    </div>
  )
}

export default MarksDetails;
