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
console.log(isSidebarOpen);
  return (
   <div className='MainPage'>
          <div className='topbar'>
            <div ></div>
            <Topnav openData={isSidebarOpen} setOpenData={receiveDataFromSideNav}/>
            </div>
          <div className='centerElement flex flex-row gap-10 relative bg-blue-100'>
            <div className='top-0 left-0 fixed  z-10'><SideNav sendDataToLayout={receiveDataFromSideNav} openData={isSidebarOpen} /></div>
            <div className={`${isSidebarOpen?'w-full':'w-full mx-20'}`}>{ children }</div>
          </div>
          <div className='footer'><Footer /></div>
   </div>
  );
}

export default Layouts;
