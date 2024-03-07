import React, { useEffect, useState } from 'react'
import Layouts from '../../Layouts/Layouts'
import axios from 'axios';
import { toast,ToastContainer } from 'react-toastify';
import { downloadExcel } from '../../utility/DataFunction';
import Loading from '../../Components/loading/Loading';

function SupervisiorDetails() {
    const [data,setData] = useState([]);
    const[loading,setLoading] = useState(false);
   useEffect(()=>{
    const getData=async()=>{
        setLoading(true);
        try{
        const response = await axios.get("http://localhost:5000/t/teacher-as-guide");
        if(response.status===200)
        {
            setData(response.data.response);
        }
        else{
            toast.error("Unable of fetch the data");
        }
    }
    catch(error)
    {
        
            toast.error("Internal sever Error");
        
    }
    finally{
        setLoading(false);
    }
    }
    getData();
   },[]);
  return (
    <Layouts>
       <ToastContainer />
       {loading?(
       <div className='h-screen flex justify-center items-center'><Loading />
       </div>):(
        <>
        <div className='mt-10'>
        <h2 className='text-2xl font-bold text-center'>Project with Guide</h2>
        <div className='bg-blue-500 p-2 text-white w-fit mt-5'>
            <button className='border-none' onClick={()=>downloadExcel(data)}>Download in excel</button>
        </div>
        <div className="overflow-auto mt-5 mb-2" style={{ maxHeight: "85vh" }} >
        <table className="min-w-full max-h-screen bg-white border border-gray-300 mt-10">
                        <tr>
                        <th className="py-2 px-4 border-b text-center">SNO.</th>
                        <th className="py-2 px-4 border-b text-center">Name</th>
                        <th className="py-2 px-4 border-b text-center">TeacherID</th>
                        <th className="py-2 px-4 border-b text-center">Email</th>
                        <th className="py-2 px-4 border-b text-center">Phone</th>
                        <th className="py-2 px-4 border-b text-center">Project-Count</th>

                        </tr>
            {data&&data?.map((d,index)=>(
                <tr key={index}>
                    
                  <td className="py-2 px-4 border-b text-center">{index+1}</td>      
                    <td className="py-2 px-4 border-b text-center">{d.TeacherName}</td>
                    <td className="py-2 px-4 border-b text-center">{d.TeacherID}</td>
                    <td className="py-2 px-4 border-b text-center">{d.Email}</td>
                    <td className="py-2 px-4 border-b text-center">{d.Phone}</td>
                    <td className="py-2 px-4 border-b text-center">{d.TeacherCount}</td>

                </tr>
            ))}
            </table>
        </div>
        </div>
        </>
        )}
    </Layouts>
  )
}

export default SupervisiorDetails