import React from "react";
import { Home } from 'lucide-react';
import { useNavigate } from "react-router-dom";

export function SideBar() {
  const navigate = useNavigate();

  return (
    <div>
           <div onClick={()=>navigate('/student/home')} className='flex flex-col lg:flex-row lg:gap-4 justify-center items-center bg-white rounded-full p-2 cursor-pointer'>
                <Home  size={28} color='#0A2647'/>
                <p className='text-xl text-textColor font-bold'>Home</p>
            </div>
            <div onClick={()=>navigate('/student/home')} className='mt-5 flex flex-col lg:flex-row lg:gap-4 justify-center items-center bg-white rounded-full p-2 cursor-pointer'>
                <Home  size={28} color='#0A2647'/>
                <p className='text-xl text-textColor font-bold'>My Guide</p>
            </div>
            <div onClick={()=>navigate('/student/home')} className='mt-5 flex flex-col lg:flex-row lg:gap-4 justify-center items-center bg-white rounded-full p-2 cursor-pointer'>
                <Home  size={28} color='#0A2647'/>
                <p className='text-xl text-textColor font-bold'>My Reviewer</p>
            </div>
    </div>
  );
}