import React, { useState,useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { AlignJustify, ArrowBigRightDash, Book, BookAIcon, CheckCircleIcon, Cross, HomeIcon, InspectionPanelIcon, LogOutIcon, PersonStanding, Route, RouterIcon, SquareStack, User, UserRound, X } from "lucide-react";

import student from './../assests/images/Icons/student.png';
import guide from './../assests/images/Icons/teacher.png';
import reveiwer from './../assests/images/Icons/teacher(1).png';
import project from './../assests/images/Icons/solution.png'
 

function SideNav({ sendDataToLayout,openData }) {
  let role = sessionStorage.getItem('role');
  const[crossClicked,setCrossClicked] = useState(false);
  const [height, setHeight] = useState(window.innerHeight);
  const[number,setNumber] =useState(0);
  const handleCorssClicked = ()=>{
    setCrossClicked(!crossClicked);
    sendDataToLayout(!openData);


  }
  useEffect(() => {
    const handleResize = () => {
      setHeight(window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
 const  location = useLocation();
 const{pathname} = location;
 const splitLocation = pathname.split('/')
//  console.log(splitLocation);
 const changeNumber = (value)=>{
  setNumber(value);
 }
  return (
    <div style={{ height: `${height}px` }} className={`sidebar relative sidebar bg-bgBlue   p-5  flex flex-col  gap-0 text-textColor1 text-lg ${!openData?'hidden':'w-fit'}`} >

         <div className="justify-self-end self-end lg:block hover:cursor-pointer pb-5" onClick={handleCorssClicked}>{!openData?<AlignJustify/>:<X color='white' />}</div>
    
        {role==='Student'&&
        <>
        
        
          <NavLink to='/s/Home' onClick={()=>changeNumber(0)} >
          <div className={`flex flex-col  gap-0 p-5 rounded-xl justify-between  items-center ${splitLocation&&splitLocation[2]==='Home'?'bg-blue-100 text-blue-700':'text-white'}`}>
            <div><HomeIcon  size={28}/></div>
            <p className={`  text-xl `}>Home</p>
           
            </div>
          </NavLink>

          <NavLink to='/projects/myguide' onClick={()=>changeNumber(1)}>
          <div className={`flex flex-col  gap-0 p-5 rounded-xl justify-between  items-center ${splitLocation&&splitLocation[2]==='myguide'?'bg-blue-100 text-blue-700':'text-white'}`}>
            <div><RouterIcon  size={28}/></div>
            <p className={`text-xl  `}>My Guide</p>
            
            </div>
          </NavLink>

          <NavLink to='/projects/myreviewer' onClick={()=>changeNumber(2)}>
          <div className={`flex flex-col  gap-0 p-5 rounded-xl justify-between  items-center ${splitLocation&&splitLocation[2]==='myreviewer'?'bg-blue-100 text-blue-700':'text-white'}`}>
            <div><CheckCircleIcon  size={28}/></div>
            <p className={`font-bold text-xl  `}>My Reviewer</p>
            
            </div>
          </NavLink>
  

          <NavLink to='/projects/myProject' onClick={()=>changeNumber(3)}>
          <div className={`flex flex-col  gap-0 p-5 rounded-xl justify-between  items-center ${splitLocation&&splitLocation[2]==='myProject'?'bg-blue-100 text-blue-700':'text-white'}`}>
            <div><BookAIcon  size={28}/></div>
            <p className={`font-bold text-xl  `}>My Project</p>
            
            </div>
          </NavLink>
        </>}


{role==="Teacher"&&<>


<NavLink to='/t/Home' onClick={()=>changeNumber(0)} >
          <div className={`flex flex-col  gap-0 p-5 rounded-xl justify-between  items-center ${splitLocation&&splitLocation[2]==='Home'?'bg-blue-100 text-blue-700':'text-white'}`}>
            <div><HomeIcon  size={28}/></div>
            <p className={` font-bold text-xl `}>Home</p>
            </div>
          </NavLink>

          <NavLink to='/g/allProjects' onClick={()=>changeNumber(1)}>
          <div className={`flex flex-col  gap-0 p-5 rounded-xl justify-between  items-center ${splitLocation&&splitLocation[1]==='g'?'bg-blue-100 text-blue-700':'text-white'}`}>
            <div><RouterIcon  size={28}/></div>
            <p className={`font-bold text-xl  `}>To Guide</p>
            
            </div>
          </NavLink>

          <NavLink to='/r/allProjects' onClick={()=>changeNumber(2)}>
          <div className={`flex flex-col  gap-0 p-5 rounded-xl justify-between  items-center ${splitLocation&&splitLocation[1]==='r'?'bg-blue-100 text-blue-700':'text-white'}`}>
            <div><CheckCircleIcon  size={28}/></div>
            <p className={`font-bold text-xl  `}>To Reveiw</p>
            
            </div>
          </NavLink>
  

</>}


{role==='Admin'&&

<>
<NavLink to='/Home' onClick={()=>changeNumber(0)} >
          <div className={`flex flex-col  gap-2 p-5 rounded-xl justify-between  items-center ${splitLocation&&splitLocation[1]==='Home'?'bg-blue-100 text-blue-700':'text-white'}`}>
            <div><HomeIcon  size={28}/></div>
            <p className={`text-xl }`}>Home</p>
            </div>
          </NavLink>

          <NavLink to='/Shome' onClick={()=>changeNumber(1)}>
          <div className={`flex flex-col  gap-0 p-5 rounded-xl justify-between  items-center ${splitLocation&&splitLocation[1]==='Shome'?'bg-blue-100 text-blue-700':'text-white'}`}>
            <div><User  size={28}/></div>
            <p className={`text-xl  `}>Students</p>
            
            </div>
          </NavLink>

          <NavLink to='/Thome' onClick={()=>changeNumber(2)}>
          <div className={`flex flex-col  gap-0 p-5 rounded-xl justify-between  items-center ${splitLocation&&splitLocation[1]==='Thome'?'bg-blue-100 text-blue-700':'text-white'}`}>
            <div><PersonStanding  size={28}/></div>
            <p className={`text-xl  `}>Teacher</p>
            
            </div>
          </NavLink>

          <NavLink to='/Ghome' onClick={()=>changeNumber(2)}>
          <div className={`flex flex-col  gap-0 p-5 rounded-xl justify-between  items-center ${splitLocation&&splitLocation[1]==='Ghome'?'bg-blue-100 text-blue-700':'text-white'}`}>
            <div><Book  size={28}/></div>
            <p className={`text-xl  `}>Guide</p>
            
            </div>
          </NavLink>

          <NavLink to='/Rhome' onClick={()=>changeNumber(2)}>
          <div className={`flex flex-col  gap-0 p-5 rounded-xl justify-between  items-center ${splitLocation&&splitLocation[1]==='Rhome'?'bg-blue-100 text-blue-700':'text-white'}`}>
            <div><CheckCircleIcon  size={28}/></div>
            <p className={`text-xl  `}>Reveiwer</p>
            
            </div>
          </NavLink>
          <NavLink to='/Phome' onClick={()=>changeNumber(2)}>
          <div className={`flex flex-col  gap-0 p-5 rounded-xl justify-between  items-center ${splitLocation&&splitLocation[1]==='Phome'?'bg-blue-100 text-blue-700':'text-white'}`}>
            <div><InspectionPanelIcon  size={28}/></div>
            <p className={`text-xl  `}>Projects</p>
            
            </div>
          </NavLink>
      </>}
    </div>
  );
}

export default SideNav;
