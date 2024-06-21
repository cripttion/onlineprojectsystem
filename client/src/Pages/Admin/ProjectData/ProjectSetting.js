import React, { useEffect, useState } from 'react';
import { useAsyncError, useParams } from 'react-router-dom';
import Layouts from '../../../Layouts/Layouts';
import { ArrowRight, BookOpenCheck, FileStackIcon, GraduationCap, LucideSmartphoneNfc, MessageSquareWarningIcon, TrendingUpIcon, User2, X } from 'lucide-react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import {studentNotRegistered} from '../../../utility/DataFunction';
import Swal from 'sweetalert2';
import DocumentStatus from '../../Student/Components/DocumentStatus';
import MarksDetails from './components/MarksDetails';
import AddGuide from './components/AddGuide';
import AddReviewer from './components/AddReviewer';
import AdminLayout from './../../../NewVersion/NewLayout/AdminLayout'
function ProjectSetting() {
    const { projectID } = useParams();
    const [data, setData] = useState([]);
    const currentUser = JSON.parse(sessionStorage.getItem('sessionData'));
    const[notRegistered,setNotRegistered] = useState([]);
    const [selectedAdmissionNumber, setSelectedAdmissionNumber] = useState("");
    const[isClickedAdd,setIsClickedAdd] = useState(false);
    const[isClickedAdd2,setIsClickedAdd2] = useState(false);
    const [key, setKey] = useState(0); // Key for forcing re-render

    const[studentDetailsClick,setStudnetDetailsClick] = useState(false);
    const[guideDetailsClick,setGuideDetailsClick] = useState(false);
    const[reveiwerDetailsClick,setReviewerDetailsClick] =useState(false);
    const[documentShow ,setDocumentShow] = useState(false);
    const [marksShow,setMarksShow] =useState(false);
    const getData = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/projects/projectData/${projectID}`);
        
            if (response && response.data) {
                setData(response.data.data); // Assuming response.data is an object with a 'data' property
            }
            const result = await studentNotRegistered(response.data.data[0].Year, response.data.data[0].Semester);
            setNotRegistered(result);
        } catch (e) {
            console.error(e);
        }

    }
   
    const[guideData,setGuideData] = useState([]);
const getGuideData = async ()=>{
    try{
        const response = await axios.get(`http://localhost:5000/t/guide/${projectID}`);
        if(response)
        {
            setGuideData(response.data.data);
        }
    }catch(error)
    {
        if(error.response.status===500)
        {
            toast.error("unable to get the data");
        }
    }
}
const[reviewerData,setReviewerData] = useState([]);
const getReviewerData = async ()=>{
    try{
        const response = await axios.get(`http://localhost:5000/t/reviwer/${projectID}`);
        if(response)
        {
            setReviewerData(response.data.data);
        }
    }catch(error)
    {
        if(error.response.status===500)
        {
            toast.error("unable to get the data");
        }
    }
}


  const handleAddNewMember = async()=>{
        if(selectedAdmissionNumber==="")
        {
            toast.warning("Select a student befor save");
            return;
        }
        try{
             const response = axios.post(`http://localhost:5000/projects/addStudnets/${projectID}`,{
                admissionNumber:selectedAdmissionNumber,
                user:currentUser.data[0].Name,
             });
             if (response) {
                
                toast.success('Student added successfully');
                getData();  
                setKey(prevKey => prevKey + 1); // Increment key to force re-render

                
            } else {
                toast.error("Unable to add student");
            }
             setIsClickedAdd(!isClickedAdd);
             setSelectedAdmissionNumber("");
             getData();  
            setKey(prevKey => prevKey + 1);
        }catch(error)
        {
           if(error.response.status===404)
           {

               toast.error("Unable to add studnet ")
           }
        }
  }

  const handleDeleteMember = (admissionNumber)=>{
    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then(async(result) => {
        if (result.isConfirmed) {
        const response = await axios.delete(`http://localhost:5000/s/delete-student/${selectedAdmissionNumber}`);

          Swal.fire({
            title: "Deleted!",
            text: "Select studenet delete from project.",
            icon: "success"
          });
          getData(); // Fetch updated data
          setKey(prevKey => prevKey + 1);
        }
      });
  }
  console.log(reveiwerDetailsClick);
    return (
        <AdminLayout>
            <ToastContainer />
            <div className='mt-10'>
                <h2 className='text-center font-bold text-3xl'>{projectID}</h2>
                <div className='flex flex-wrap mt-5 gap-5'>
                    <button onClick={()=>{
                     setStudnetDetailsClick(!studentDetailsClick);
                     getData();
                    }} className='text-xl bg-blue-200 w-fit p-2 rounded-xl font-bold flex flex-row gap-2 items-center'><User2 /> Student Details </button>
                     <button onClick={()=>{
                    setGuideDetailsClick(!guideDetailsClick);
                    getGuideData();
                    }} className='text-xl bg-blue-200 w-fit p-2 rounded-xl font-bold flex flex-row gap-2 items-center'> <BookOpenCheck /> Guide Details</button>
               
               <button onClick={()=>{
                        setReviewerDetailsClick(!reveiwerDetailsClick)
                        getReviewerData();
                    }} className='text-xl bg-blue-200 w-fit p-2 rounded-xl font-bold flex flex-row gap-2 items-center'> <TrendingUpIcon /> Reviewer Details </button>
                <button onClick={()=>{
                    setDocumentShow(!documentShow)
                    }} className='text-xl bg-blue-200 w-fit p-2 rounded-xl font-bold flex flex-row gap-2 items-center'> <FileStackIcon /> Project Documents</button>
                    <button onClick={()=>{
                      setMarksShow(!marksShow)
                    }} className='text-xl bg-blue-200 w-fit p-2 rounded-xl font-bold flex flex-row gap-2 items-center'><GraduationCap /> Project Marks </button>
                </div>
               
                {data.length>0 ||guideData.length>0||documentShow||marksShow||reviewerData.length>0?<>
                {studentDetailsClick&& 
               <>               <div className='flex flex-wrap items-center lg:justify-start justify-center gap-10 w-full  mt-5'>
                    {data && data?.map((d,index)=>(
                        <div key={index}>
                            <p className='text-center'>Student - {index+1}</p>
                            <div className='border mt-2 shadow-xl bg-blue-100 rounded-md border-gray-500 p-2 w-full'>
                            <p>Name:- {d.Name}</p>
                            <p>Admission number:- {d.AdmissionNumber}</p>
                            <p>Email:- {d.Email}</p>
                            <p>Phone:- {d.Phone}</p>
                            <p>Year:- {d.Year}</p>
                            <p>Semester:- {d.Semester}</p>

                            </div>
                        </div>
                    ))}
                </div>
               <div className='flex flex-col md:flex-row lg:flex-row gap-2 items-center'>
                <div className='bg-blue-500 p-3 text-white w-fit mt-5 rounded-md'>
                    <div className='flex flex-row justify-between items-center'>
                        <button onClick={()=>setIsClickedAdd(!isClickedAdd)}>Add New Member</button>
                        {isClickedAdd && <button onClick={()=>setIsClickedAdd(!isClickedAdd)} ><X color='white' /></button>}
                        </div>
                        {isClickedAdd&&
                        <>
                         <div className='mt-5'>
                         <select className='p-2 outline-none text-black' onChange={(e)=>setSelectedAdmissionNumber(e.target.value)} value={selectedAdmissionNumber}>
                             <option disabled value="">
                             ------ Select Student ------
                             </option>
                             {notRegistered&& notRegistered?.map((nt,index)=>(
                                 <option key={index} value={nt.AdmissionNumber} className='bg-white text-black'>
                                     {nt.AdmissionNumber + " - "+nt.Name}
                                 </option>
                             ))
                                 
                             }
                         </select>
                         
                     </div>
                     <button className="bg-gray-200 mt-4 w-full p-2 rounded-xl text-black"onClick={handleAddNewMember}>Save</button>

                     </>
                     }
                </div>

                <div className='deleteStudnet'>
                <div className='bg-blue-500 p-3 text-white w-fit mt-5 rounded-md'>
                    <div className='flex flex-row justify-between items-center'>
                        <button onClick={()=>setIsClickedAdd2(!isClickedAdd2)}>Delete Student</button>
                        {isClickedAdd2 && <button onClick={()=>setIsClickedAdd2(!isClickedAdd2)} ><X color='white' /></button>}
                        </div>
                        {isClickedAdd2&&
                        <>
                         <div className='mt-5'>
                         <select className='p-2 outline-none text-black' onChange={(e)=>setSelectedAdmissionNumber(e.target.value)} value={selectedAdmissionNumber}>
                             <option disabled value="">
                             ------ Select Student ------
                             </option>
                             {data&& data?.map((nt,index)=>(
                                 <option key={index} value={nt.AdmissionNumber} className='bg-white text-black'>
                                     {nt.AdmissionNumber + " - "+nt.Name}
                                 </option>
                             ))
                                 
                             }
                         </select>
                         
                     </div>
                     <button className="bg-gray-200 mt-4 w-full p-2 rounded-xl text-black" onClick={handleDeleteMember}>Delete</button>

                     </>
                     }
                </div>
                </div>
                </div>
                </>
}
{guideDetailsClick&&<>
    <div className='flex flex-wrap items-center lg:justify-start justify-center gap-10 w-full  mt-5'>
                    {guideData && guideData?.map((d,index)=>(
                        <div key={index}>
                            <p className='text-center'>Guide - {index+1}</p>
                            <div className='border mt-2 shadow-xl bg-blue-100 rounded-md border-gray-500 p-2 w-full'>
                            {index===guideData.length-1&&<p className='w-fit rounded-md p-1 text-white bg-green-500 font-bold text-sm'>current</p>}
                            <p className='mt-2'>Name:- {d.Name}</p>
                            <p>Admission number:- {d.TeacherID}</p>
                            <p>Email:- {d.Email}</p>
                            <p>Phone:- {d.Phone}</p>



                            </div>
                        </div>
                    ))}
                </div>
                <div>
                    <AddGuide projectID={projectID} getData={getData} />
                </div>

</>}

{reveiwerDetailsClick&&<>
    <div className='flex flex-wrap items-center lg:justify-start justify-center gap-10 w-full  mt-5'>
                    {reviewerData && reviewerData?.map((d,index)=>(
                        <div key={index}>
                            <p className='text-center'>Reviewer - {index+1}</p>
                            <div className='border mt-2 shadow-xl bg-blue-100 rounded-md border-gray-500 p-2 w-full'>
                            {index===reviewerData.length-1&&<p className='w-fit rounded-md p-1 text-white bg-green-500 font-bold text-sm'>current</p>}
                            <p className='mt-2'>Name:- {d.Name}</p>
                            <p>Admission number:- {d.TeacherID}</p>
                            <p>Email:- {d.Email}</p>
                            <p>Phone:- {d.Phone}</p>



                            </div>
                        </div>
                    ))}
                </div>
                <div>
                    <AddReviewer projectID={projectID} getData={getData} />
                </div>

</>}
      {documentShow&&<><DocumentStatus projectId={projectID}/></>}
       {marksShow&&<><MarksDetails ProjectID={projectID}/></>}     
             
             
             
             </>:<>
               <h2 className='text-red-500 mt-10 flex flex-row items-center gap-2'><MessageSquareWarningIcon />Data Not found or Click any of the above button</h2>
             </>}
            </div>
        </AdminLayout>
    )
}

export default ProjectSetting;
