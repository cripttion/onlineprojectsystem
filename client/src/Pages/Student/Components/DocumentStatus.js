import { ViewIcon, X } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function DocumentStatus(props) {
  const [data,setData] = useState();
   

  let x='';
  useEffect(()=>{
    const getProjectData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/projects/pdSpecific/?userID=${props.projectId}&role=${sessionStorage.getItem(
            "role"
          )}`,{
            params: { xData: 'pData' },
            // Other options like headers can be added here
          }
        );
        try{
          const response1 = await axios.get(`http://localhost:5000/projects/documentDetails/${response.data.data[0].ProjectID}`)
          setData(response1.data);
        }catch(error)
         {
          console.log("unable to fetch the project Documents");
         }
        
        
      } catch (error) {
        console.error("Error fetching project data:", error);
        // Handle errors as needed
      }
    };
  
    //  const getData = async()=>{
   
    // }
    getProjectData();
    // getData();
  },[])
  console.log(data);
  const onViewFile=(value)=>{
    window.open(value, '_blank', 'noreferrer');
  }
const [openAb,setopenAb] = useState(false);
  const openAbstract =()=>{
     setopenAb(!openAb);
  }
  // console.log(data);
  return (
    <>
    {openAb && <div className='absolute top-0 -ml-20 h-screen bg-black bg-opacity-25 p-10 flex justify-center items-center'>
      <div className='bg-white p-5 mr-20 ml-20 relative'>
     <div className='flex flex-col gap-10 justify-center items-center'>
      <h1 className='text-3xl font-bold'>{data&&data[0].ProjectTitle}</h1>
      <div className='bg-gray-400 w-full' style={{height:'1px'}}> </div>
      <p>{data&&data[0].ProjectAbstract}</p>
      </div>
      <button className='absolute top-5 right-2' onClick={openAbstract}><X /></button>
      </div>
      </div>
     }
    <div className='mt-10 mx-10 '>
      

      <table className="min-w-full bg-cardColor shadow-md  rounded-md overflow-hidden">
        <thead className="bg-color1 text-black">
          <tr>
            <th className="py-3 px-4 text-left">SN.</th>
            <th className="py-3 px-4 text-left">Title</th>
            <th className="py-3 px-4 text-left">Action</th>
            <th className="py-3 px-4 text-left">Remarks</th>
          </tr>
        </thead>
        <tbody>
          <tr className="bg-gray-100">
            <td className="py-2 px-4">1.</td>
            <td className="py-2 px-4">Project Report</td>
            <td className="py-2 px-4">
            <button className='bg-green-500 p-2 rounded-full text-white flex flex-row gap-2 items-center justify-center' title='View' onClick={()=>onViewFile(data&&data[0].ProjectReport)}><ViewIcon color='white' /></button>

            </td>
            <td className="py-2 px-4">
              {/* Remarks Content */}
              {data &&data.length>0&&data[0].ProjectReport ==='Not uploaded'?'Not uploaded':'uploaded'}
            </td>
          </tr>
          <tr className="bg-gray-200">
            <td className="py-2 px-4">2.</td>
            <td className="py-2 px-4">Abstract</td>
            <td className="py-2 px-4">
               <button className='bg-green-500 p-2 rounded-full text-white flex flex-row gap-2 items-center justify-center' title='View' onClick={openAbstract} ><ViewIcon color='white' /></button>
            </td>
            <td className="py-2 px-4">
            {data&&data.length>0&&data[0].ProjectAbstract ==='Not uploaded'?'Not uploaded':'uploaded'}

            </td>
          </tr>
          <tr className="bg-gray-100">
            <td className="py-2 px-4">3.</td>
            <td className="py-2 px-4">Presentation</td>
            <td className="py-2 px-4">
            <button className='bg-green-500 p-2 rounded-full text-white flex flex-row gap-2 items-center justify-center' title='View' onClick={()=>onViewFile(data&&data[0].ProjectPresentaion)}><ViewIcon color='white' /></button>

              </td>
            <td className="py-2 px-4">
            {data&&data.length>0&&data[0].ProjectPresentaion ==='Not uploaded'?'Not uploaded':'uploaded'}

              {/* Remarks Content */}
            </td>
          </tr>
          <tr className="bg-gray-200">
            <td className="py-2 px-4">4.</td>
            <td className="py-2 px-4">Project Link</td>
            <td className="py-2 px-4">
            <button className='bg-green-500 p-2 rounded-full text-white flex flex-row gap-2 items-center justify-center' title='View' onClick={()=>onViewFile(data&&data[0].ProjectLink)}><ViewIcon color='white' /></button>

            </td>
            <td className="py-2 px-4">
            {data&&data.length>0&&data[0].ProjectLink ==='Not uploaded'?'Not uploaded':'uploaded'}

              {/* Remarks Content */}
            </td>
          </tr>
          <tr className="bg-gray-100">
            <td className="py-2 px-4">5.</td>
            <td className="py-2 px-4">Research Paper</td>
            <td className="py-2 px-4">
                  <button className='bg-green-500 p-2 rounded-full text-white flex flex-row gap-2 items-center justify-center' title='View' onClick={()=>onViewFile(data&&data[0].ProjectResearchPaper)}> <ViewIcon color='white' /></button>

            </td>
            <td className="py-2 px-4">
            {data&&data.length>0&&data[0].ProjectResearchPaper ==='Not uploaded'?'Not uploaded':'uploaded'}

              {/* Remarks Content */}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    </>
  );
}

export default DocumentStatus;
