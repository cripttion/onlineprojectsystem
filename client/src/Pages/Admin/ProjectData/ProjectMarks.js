import React, { useEffect, useState } from "react";
import Layouts from "../../../Layouts/Layouts";
import axios from "axios";
import Swal from "sweetalert2";
import { Trash, Trash2Icon } from "lucide-react";
function ProjectMarks() {
  const [marksParameter, setMarksParameter] = useState("");
  const [currentParameter, setCurrentParamet] = useState([]);
  const [Key, setKey] = useState(0);

  const getData = async () => {
    try {
      const responses = await axios.get(
        "http://localhost:5000/projects/marks-parameter"
      );

      if (responses.status === 200) {
        setCurrentParamet(responses.data.response);
      }
    } catch (error) {
      setCurrentParamet([]);
      console.log("Unable to find the Parameter");
    }
  };
  useEffect(() => {
    getData();
  }, []);
  const handleAddParameter = () => {
    const temp = marksParameter.split(" ");
    let answer = temp.join("_");
    Swal.fire({
      title: "Do you want to save the changes?",
      showDenyButton: true,
      confirmButtonText: "Save",
      denyButtonText: `Don't save`,
    }).then(async (result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        try {
          const response = await axios.post(
            "http://localhost:5000/m/add-parameter",
            {
              ColumnName: answer,
            }
          );
          if (response.status === 201) {
            Swal.fire("Saved!", "", "success");
            getData();
            setKey((prevKey) => prevKey + 1);
          } else {
            Swal.fire("Error occured", "", "error");
          }
        } catch (error) {
          Swal.fire("Error occured", "", "error");
        }
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    });
    getData();
    setKey((prevKey) => prevKey + 1);
  };
  const handleDeleteClick = (ColumnNames) => {
    console.log(ColumnNames);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await axios.delete(
            `http://localhost:5000/m/remove-paramter/${ColumnNames}`,
            
          );
          if (response.status === 200) {
            Swal.fire({
              title: "Deleted!",
              text: "Your Marks parameter is Successfully removed.",
              icon: "success",
            });
            getData();
            setKey((prev) => prev + 1);
          } else {
            Swal.fire("Unable to Delete Try Again!", "", "error");
          }
        } catch (error) {
          Swal.fire("Unable to Delete Try Again!", "", "error");
          console.log(error);
        }
      }
    });
  };
  return (
    <Layouts>
      <div className="mt-10">
        <h2 className="text-xl font-bold">Marks Parameter Setting</h2>
      </div>

      <div className="mt-10 w-full ">
        <h2 className="text-md">Write the Marks Parameter below</h2>
        <input
          className="mt-5 p-2 outline-none w-full border-gray-400 border-2 rounded-md"
          type="text"
          placeholder="Paramerter-name"
          required
          onChange={(e) => setMarksParameter(e.target.value)}
        />
        <button
          className="bg-blue-800 mt-5 text-white border-md p-2 rounded-md"
          onClick={handleAddParameter}
        >
          Add parameter
        </button>
      </div>

      <div className="mt-10">
        <h2 className="mt-5">Current Marks Parameter</h2>
        <div className="flex flex-wrap gap-2 mt-4">
          {currentParameter &&
            currentParameter?.map((parameter, index) => (
              <>
                <div
                  key={index}
                  className=" flex flex-row justify-between gap-5 w-fit bg-blue-200 p-2 "
                >
                  <p>{parameter.Field}</p>
                  <div
                    className="text-red-500 cursor-pointer "
                    onClick={() => handleDeleteClick(parameter.Field)}
                  >
                    <Trash2Icon />
                  </div>
                </div>
              </>
            ))}
        </div>
      </div>
    </Layouts>
  );
}

export default ProjectMarks;
