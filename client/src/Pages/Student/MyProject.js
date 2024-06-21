import React, { useEffect, useState } from "react";
import Layouts from "../../Layouts/Layouts";
import axios from "axios";
import { PlusCircle } from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import { useLocation, useParams } from "react-router-dom";
import Approve from "../Teacher/Components/Approve";
import { useNavigate } from "react-router-dom";
import AddTitle from "./Components/AddTitle";
import DocumentStatus from "./Components/DocumentStatus";
import UpdateMarks from "../Teacher/Components/UpdateMarks";
import AddDocumentLink from "./Components/AddDocumentLink";
import MarksDetails from "../Admin/ProjectData/components/MarksDetails";
import Loading from "../../Components/loading/Loading";
import StudentLayout from './../../NewVersion/Pages/Student/StudentLayout/Layout'
import Swal from "sweetalert2";
function MyProject(props) {
 
  const navigate = useNavigate();
  const documentupdateRole = useParams();
  const location = useLocation();
  const [projectData, setprojectData] = useState();
  const userData = sessionStorage.getItem("sessionData");
  const [isClicked, setIsClicked] = useState(false);
  const [selectedAdmissionNumber, setSelectedAdmissionNumber] = useState("");
  const [isLoading,setIsLoading] = useState(false);
  // const [roleId,setRoleID] = useState("");
  const[Otpbox,setOptBox] = useState(false);
  const[Otp,setOtp] =useState("");
  const [addClick, setaddClick] = useState();
  const handleSelectChange = (event) => {
    setSelectedAdmissionNumber(event.target.value);
  };
  // console.log(selectedAdmissionNumber);
  let admissionNumber;
  if (userData) {
    admissionNumber = JSON.parse(userData);
  }
  // console.log(admissionNumber);

  const [studentData, setStudentData] = useState();
  let myData;
  const [userID, setUserID] = useState();
  let temp;
  if (sessionStorage.getItem("role") === "Admin") {
    temp = location.state && location.state.userI;
  }
  const yourData = location.state && location.state.ProjectId;
  myData = yourData;
  const roleId = location.state && location.state.roleID;
  // console.log(roleId);
  let x;
  const xtemp = location.state && location.state.xtemp;
  x = xtemp;
  //  console.log(roleValue);
  // / Set userID based on role
  let userI;
  if (sessionStorage.getItem("role") === "Student") {
    userI = admissionNumber && admissionNumber.data[0].AdmissionNumber;
  } else if (sessionStorage.getItem("role") === "Teacher") {
    userI = myData;
  } else if (sessionStorage.getItem("role") === "Admin" && x !== "pData") {
    // console.log("the llocation value is",temp);
    userI = temp;
  } else {
    userI = myData;
  }
  // console.log(userI);
  useEffect(() => {
    // Access the passed data

    // Fetch project data based on userID and role
    const getProjectData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/projects/pdSpecific/?userID=${userI}&role=${sessionStorage.getItem(
            "role"
          )}`,
          {
            params: { xData: x },
            // Other options like headers can be added here
          }
        );
        setprojectData(response.data.data);
      } catch (error) {
        console.error("Error fetching project data:", error);
        // Handle errors as needed
      }
    };

    // Check if userID and role are defined before making the request

    getProjectData();
  }, [userI]);
const handleOtpgeneration = async ()=>{
  if (sessionStorage.getItem("role")!== "Student") {
    return Swal.fire("You are not allowed to add student", "", "error");
  }
  try{
    setIsLoading(true);
    const filteredData = studentData.filter(item => item.AdmissionNumber === selectedAdmissionNumber);
    const response  = await axios.post('http://localhost:5000/projects/generate-otp',{
      requestUser:admissionNumber.data[0].Name,
      Email:filteredData[0].Email,
      // Email:"raj@rycientech.online"
    })
    if(response.status===200)
    {
      setIsLoading(false);
      toast.success(`OTP sent on Email ${filteredData[0].Email} `);
       setOptBox(true);
    }
  }catch(error)
  {
     console.log(error);
     Swal.fire("Something went wroing while sending OTP","","warning");
  }finally{
    setIsLoading(false);
  }
}
  const handleAddMember = async () => {
   
    if (sessionStorage.getItem("role")!== "Student") {
      return Swal.fire("You are not allowed to add student", "", "error");
    }
    try {
      // Replace with the actual admission num  ber
      const filteredData = studentData.filter(item => item.AdmissionNumber === selectedAdmissionNumber);
      const response = await axios.post(
        `http://localhost:5000/projects/addStudnets/${projectData[0].ProjectID}`,
        {
          admissionNumber: selectedAdmissionNumber,
          user: admissionNumber.data[0].Name,
          otp:Otp,
          email:filteredData[0].Email,
          // email:"raj@rycientech.online"
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
     
      setSelectedAdmissionNumber("");
      setIsClicked(false);
      const updatedProjectData = await axios.get(
        `http://localhost:5000/projects/pdSpecific/?userID=${userI}&role=${sessionStorage.getItem(
          "role"
        )}`,
        {
          params: { xData: x },
          // Other options like headers can be added here
        }
      );
      setprojectData(updatedProjectData.data.data);

      // Reset the form or any other state if needed
    } catch (error) {
      // Handle errors
      if(error.response.status===400)
      {
        setOtp("");
        toast.error("Incorrect OTP!");
      }
      // console.error("Error adding member:", error);
    }
  };
  const handleAddTtile = async (data) => {
    try {
      const updatedProjectData = await axios.get(
        `http://localhost:5000/projects/pdSpecific/?userID=${userI}&role=${sessionStorage.getItem(
          "role"
        )}`,
        {
          params: { xData: x },
          // Other options like headers can be added here
        }
      );

      setaddClick(0);
      setprojectData(updatedProjectData.data.data);
    } catch (error) {
      // console.log(error);
       Swal.fire("Unable to add","","error");
    }
  };
  const handleUpdateMarks = async (data) => {
    try {
      const updatedProjectData = await axios.get(
        `http://localhost:5000/projects/pdSpecific/?userID=${userID}&role=${sessionStorage.getItem(
          "role"
        )}`,
        {
          params: { xData: x },
          // Other options like headers can be added here
        }
      );

      setprojectData(updatedProjectData.data.data);
    } catch (error) {
      Swal.fire("Unable to add","","error");

    }
  };

  const handleClick = async (index) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/s/studentNotRegistered?year=${
          projectData && projectData[0].Year
        }&semester=${projectData && projectData[0]?.Semester}`
      );
      setStudentData(response.data.data);
    } catch (error) {
      Swal.fire("Unable to add","","error");

    }
    const newClickedCards = [...clickedCards];
    newClickedCards[index] = !newClickedCards[index]; // Toggle the clicked state
    setClickedCards(newClickedCards);
  };
  const handleAddClick = (value) => {
    setaddClick(value);
  };
  const [clickedCards, setClickedCards] = useState(
    Array(projectData && projectData[0] && projectData[0].ProjectNumber).fill(
      false
    )
  );

  const renderCards = () => {
    const numberOfCards =
      projectData && projectData[0] && projectData[0].ProjectNumber;

    if (!numberOfCards) {
      return null; // Return null if the number of cards is not available
    }

    const cards = [];
    for (let i = 0; i < numberOfCards; i++) {
      const isCardClicked = clickedCards[i];

      const cardContent =
        i < projectData.length ? (
          <div className="flex flex-col gap-2">
            <div>Admission Number: {projectData[i].AdmissionNumber}</div>
            <div>Name: {projectData[i].Name}</div>
            <div>Email: {projectData[i].Email}</div>
            <div>Phone: {projectData[i].Phone}</div>

            <div>Branch: {projectData[i].Branch}</div>

            <div>Year: {projectData[i].Year}</div>

            <div>Semester: {projectData[i].Semester}</div>
            <div>Registered by: {projectData[i].Addby}</div>
          </div>
        ) : (
          <p>
            {!isCardClicked && (
              <button onClick={() => handleClick(i)}>
                <PlusCircle size={100} strokeWidth={1} />
                Add member
              </button>
            )}
            {isCardClicked && (
              <div className="flex flex-col justify-center items-center gap-5">
                <select
                  value={selectedAdmissionNumber}
                  onChange={handleSelectChange}
                  className="p-4 border border-black upCard"
                >
                  <option value="" disabled>
                    Select Admission Number
                  </option>
                  {studentData &&
                    studentData.map((student) => (
                      <option
                        key={student.AdmissionNumber}
                        value={student.AdmissionNumber}
                        style={{ marginTop: "5px" }}
                      >
                        {`${student.AdmissionNumber} - ${student.Name}`}
                      </option>
                    ))}
                </select>
                {!Otpbox&&<button
                  onClick={handleOtpgeneration}
                  className="bg-bgBlueDark p-4 text-md text-white rounded-xl hoverButtons"
                >
                  Ask concent
                </button>}
                
                {isLoading?(<>
                  <Loading />
                </>):(Otpbox&&<>
                  <input
                    type="text"
                    placeholder="concent code"
                    className="w-full p-3 outline-none border border-gray-400 upCard text-center"
                    style={{letterSpacing:'1rem'}}
                    value={Otp}
                    onChange={(e)=>setOtp(e.target.value)}
                  />
                  <button
                  onClick={handleAddMember}
                  className="bg-bgBlueDark p-4 text-md text-white rounded-xl hoverButtons"
                >
                  Add member
                </button>
                </>)}
              </div>
            )}
          </p>
        );

      cards.push(
        <div
          key={i}
          className="p-10 bg-white upCard border  text-black w-fit flex justify-center items-center"
        >
          {cardContent}
        </div>
      );
    }

    return cards;
  };

  return (
    <StudentLayout>
      <div className="mt-10">
        <ToastContainer />
        <div className="text-center bg-bgBlueDark text-white text-3xl rounded-2xl p-2 relative">
          <h1>{projectData && projectData[0].ProjectID}</h1>
          <div className="absolute top-2 right-2 flex flex-row gap-4">
            <div
              className={`flex justify-center items-center gap-2 ${
                projectData && projectData[0].Status === "Pending"
                  ? "bg-red-500"
                  : "bg-green-500"
              } p-1 rounded-xl pl-2 pr-2 pb-2 text-white`}
            >
              <div
                className={`bg-white rounded-full `}
                style={{ width: "10px", height: "10px" }}
              ></div>
              <p className="text-base">
                {projectData && projectData[0].Status}
              </p>
            </div>
            {(roleId === "Guide" || roleId === "Admin") &&
              projectData &&
              projectData.length > 0 &&
              projectData[0].Status === "Pending" && (
                <Approve projectId={projectData[0].ProjectID} />
              )}
          </div>
        </div>
        <div className="flex flex-col md:flex-row lg:flex-row items-center w-full justify-around gap-20 mt-10">
          {renderCards()}
        </div>
        {documentupdateRole.Student === "Student" && (
          <>
            <div>
              <div className="flex m-10 justify-center items-center">
                <div className="flex-1">
                  <div style={{ height: "2px" }} className="bg-gray-300"></div>
                </div>

                <div className="flex-0 ml-4 mr-4 font-bold">
                  <h2>Project Details</h2>
                </div>

                <div className="flex-1">
                  <div style={{ height: "2px" }} className="bg-gray-300"></div>
                </div>
              </div>

              <div className="flex justify-center items-center">
                {" "}
                <div className="flex flex-col md:flex-row lg:flex-row justify-around items-center gap-4 w-5/6 ">
                  <button
                    className="w-full p-2 bg-bgBlueDark text-white rounded-xl"
                    onClick={() => handleAddClick(1)}
                  >
                    Add title and Abstract
                  </button>
                  <button
                    className="w-full p-2 bg-bgBlueDark text-white rounded-xl"
                    onClick={() => handleAddClick(3)}
                  >
                    Add PPT
                  </button>
                  <button
                    className="w-full p-2 bg-bgBlueDark text-white rounded-xl"
                    onClick={() => handleAddClick(2)}
                  >
                    Add Project Report
                  </button>
                  <button
                    className="w-full p-2 bg-bgBlueDark text-white rounded-xl"
                    onClick={() => handleAddClick(4)}
                  >
                    {" "}
                    Project Link
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
        {documentupdateRole.Student === "Student" && (
          <>
            {addClick === 1 && (
              <AddTitle
                onlick={handleAddTtile}
                projectId={projectData && projectData[0].ProjectID}
              />
            )}

            {addClick > 1 && (
              <AddDocumentLink
                onlick={handleAddTtile}
                documentName={
                  addClick === 2
                    ? "ProjectReport"
                    : addClick === 3
                    ? "ProjectPresentaion"
                    : "ProjectLink"
                }
                projectId={projectData && projectData[0].ProjectID}
              />
            )}
          </>
        )}

        <DocumentStatus projectId={userI} />
        <div className="mt-16">
          {roleId === "Reveiwer" && (
            //  <h1>{projectData &&  projectData[0].ProjectID}</h1>
            <MarksDetails ProjectID={projectData && projectData[0].ProjectID} />
          )}
        </div>
      </div>
    </StudentLayout>
  );
}

export default MyProject;
