// Layouts.js

import React, { useState } from 'react';
import Topnav from './Topnav'; 
import SideNav from './SideNav';
import Footer from './Footer';

function Layouts({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const receiveDataFromSideNav = (data) => {
    setIsSidebarOpen(data);
  };
  return (
   <div className='MainPage'>
          <div className='topbar fixed w-full z-10'>
         
            <Topnav openData={isSidebarOpen} setOpenData={receiveDataFromSideNav}/>
            </div>

          <div className='centerElement flex flex-row gap-10 bg-blue-100'>
            <div className='fixed z-10'><SideNav sendDataToLayout={receiveDataFromSideNav} openData={isSidebarOpen} /></div>
            <div className={`${isSidebarOpen?'w-full':'w-full lg:mx-20 mx-2'} h-screen childMain overflow-auto mt-10`}>{ children }</div>
          </div>
          <div className='footer'><Footer /></div>
   </div>
  );
}

export default Layouts;
