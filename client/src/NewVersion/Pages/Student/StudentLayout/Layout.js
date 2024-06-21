import React from 'react';
import './custom-scrollbar.css'; // Import the custom CSS
import Profile from './../../../Components/Profile';
import { SideBar } from './SideBar';

const Layout = ({children}) => {
  return (
    <div className="flex flex-col h-screen lg:flex-row">
      <header className="bg-bgBlue text-white p-4 lg:w-64 lg:h-full lg:overflow-y-auto lg:hide-scrollbar overflow-x-auto hide-scrollbar custom-scrollbar">
        <div className="flex lg:flex-col lg:h-full">
          
          <div className="flex lg:flex-col p-4 lg:p-0 lg:mt-4">
            <h2 className="text-xl font-bold hidden lg:block">Galgotias University </h2>
            <div className="mt-10 lg:h-full flex  lg:block">
              <SideBar />
            </div>
          </div>
        </div>
      </header>
      <div className="flex-1 flex flex-col">
        <header className="bg-bgBlue text-white p-4 hidden  lg:flex lg:flex-row justify-between items-center ">
          <h1 className="text-xl font-bold">Welcome</h1>
          <Profile />
        </header>
        <main className="flex-1 overflow-y-auto p-4 bg-gray-100 custom-scrollbar">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
