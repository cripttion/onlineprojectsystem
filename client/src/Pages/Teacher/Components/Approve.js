import { CheckCircle } from 'lucide-react';
import React from 'react'
import axios from 'axios';
import {toast} from 'react-toastify';
import Swal from 'sweetalert2'

function Approve(props) {
    const projectID = props.projectId;
    const handleApproveClick = async () => {
        Swal.fire({
            title: "Have you read the Project title and Abstract , If yes then approve the project",
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: "Approve",
            denyButtonText: `Don't Approve`
          }).then(async(result) => {
            if (result.isConfirmed) {

                try {
                    const response = await axios.post(`http://localhost:5000/projects/changeprojectStatus/${projectID}`, {
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    });
                    if (response.status === 200) {
                        Swal.fire("Approved!", "", "success");
                    }
                    if (response.status === 404) {
                        Swal.fire('Project Id not found',"error");
                    }
                }catch (error) {
                    if (error.response.status === 500) {
                        toast.error('Unable to approve. Server Error');
                    }
            }
            }else if (result.isDenied) {
              Swal.fire("Changes are not saved", "", "info");
            }
          });
        
        } 
   
    

  return (
    <div className='bg-white rounded-full hover:cursor-pointer'>
            <div className='flex flex-row gap-2  items-center p-2' onClick={handleApproveClick}>
                <p className='text-black text-sm'>Approve</p>
                <CheckCircle color='black ' />
            </div>
    </div>
  )
}

export default Approve