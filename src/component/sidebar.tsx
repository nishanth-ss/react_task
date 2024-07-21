// Sidebar.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/sidebar.css';
import { GiHamburgerMenu } from 'react-icons/gi';
import { useMediaQuery } from 'react-responsive';
import { IoCloseCircle } from 'react-icons/io5';

const tasklist: string[] = ["weather-app", "bmi-calculator", "currency-convertor", "todo-list", "profile-card", "stop-clock"];

const Sidebar: React.FC = () => {
  
  const [openSidebar,setopenSidebar] = useState(false);
  const isMobile = useMediaQuery({ query: '(max-width: 600px)' });
  const navigate = useNavigate();

  const handleNavigate = (task: string) => {
    navigate(`/${task}`)
  }

  const convertToTitleCase = (title: string) => {
    return title.split("-").map((word: string) => word.charAt(0).toUpperCase() + word.slice(1)).join(" ")
  }
  return (
    <div style={{backgroundColor: isMobile ? '#dfe6e9' : 'transparent'}}>
      {isMobile && !openSidebar && <GiHamburgerMenu className='icon' onClick={()=>setopenSidebar(!openSidebar)} />}
      <div className={openSidebar && isMobile ? "style-container" : "sidebar-container"}>
        <h1 className='title'>Tasklist {isMobile && openSidebar && <IoCloseCircle  onClick={()=>setopenSidebar(!openSidebar)} />}</h1>
        <ul>
          {tasklist.map((task, index) => (
            <li key={index} onClick={() => {handleNavigate(task),setopenSidebar(!openSidebar)}} className='menu-list'>{convertToTitleCase(task)}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
