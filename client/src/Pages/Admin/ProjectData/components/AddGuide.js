import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

function AddGuide({ projectID ,getData }) {
  const [data, setData] = useState([]);
  const [isClicked, setIsClicked] = useState(false);
  const [selectedTeacherId,setSelectedTeacherID] =useState("");
  const handleAddClick = async () => {
    setIsClicked(true);
    try {
      const response = await axios.get(
        "http://localhost:5000/t/teacher-as-guide"
      );
      if (response.status === 200) {
        setData(response.data.response);
      } else {
        toast.error("Unable to fetch the teacher details");
      }
    } catch (error) {
      toast.error("Internal server Error");
    }
  };
  const handleSave=async()=>{
    if(selectedTeacherId==="")
        {
            toast.warning("Select a student befor save");
            return;
        }
        try{
             const response =await axios.post(`http://localhost:5000/t/update-guide`,{
              
              teacherId:selectedTeacherId,
              projectID:projectID,
             });
             console.log(response.status);
             if (response.status===200) {
                
                toast.success('Superviser updated succssfully');
                getData()
                
            } else {
                toast.error("Unable to update the data");
            }
            setIsClicked(false);
             setSelectedTeacherID("");
             getData();  
            
        }catch(error)
        {
           if(error.response.status===404 || error.response.status===500)
           {

               toast.error("Unable to update the data")
           }
        }
  }
  
  return (
    <div>
      <div className="flex flex-col gap-2 ">
        <button
          className="bg-blue-500 p-3 text-white w-fit mt-5 rounded-md"
          onClick={() => handleAddClick()}
        >
          Add Guide
        </button>
        {isClicked && (
          <>
            <select className="p-2 outline-none border border-gray-300 overflow-auto" onChange={(e)=>setSelectedTeacherID(e.target.value)} value={selectedTeacherId}>
              <option disabled value="">
                Number of projects -------------------- Name -------------------- Phone -------------------- Email
              </option>
              {data &&
                data?.map((datas, index) => (
                  <option key={index} className="p-2" value={datas.TeacherID}>
                   
                      {" "}
                      {datas.TeacherCount} --------------------{" "}
                      {datas.TeacherName} --------------------{" "}
                      {datas.Phone}
                      -------------------- {datas.Email}
                    
                  </option>
                ))}
            </select>

            <button className="bg-gray-400 rounded-md border-none p-2" onClick={handleSave}>Save</button>
          </>
        )}
      </div>
    </div>
  );
}

export default AddGuide;
