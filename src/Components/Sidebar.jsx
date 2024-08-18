import React from 'react';
import { Link } from 'react-router-dom';
import { BsBrowserEdge,BsCupHotFill,BsCpuFill  } from "react-icons/bs";

const Sidebar = () => {
  return (
    <div className="d-flex flex-column vh-100 bg-light" style={{ width: '180px', position: 'fixed', top: '55px', left: '0' }}>
      <div className="p-3">
        <h6>School Details</h6>
        <ul className="nav flex-column">
          
          <li className="nav-item">
         
            <Link className="nav-link"  to="/profile"><BsBrowserEdge className='p-1'style={{ fontSize: '24px', color: 'lightblack' }} />  Profile</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/staff-details"><BsCupHotFill className='p-1'style={{ fontSize: '24px', color: 'lightblack' }}/>Staff Details</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/student-details"><BsCpuFill className='p-1'style={{ fontSize: '24px', color: 'lightblack' }} />Students</Link>
          </li>
        </ul>
      </div>

      <div className="p-3">
        <h6>Assesments</h6>
        <ul className="nav flex-column">
          
          <li className="nav-item">
         
            <Link className="nav-link"  to="/addasm"><BsBrowserEdge className='p-1'style={{ fontSize: '24px', color: 'lightblack' }} />Add ASM</Link>
          </li>
         
        </ul>
      </div>
      <div className="p-3">
        <h6>Tasks</h6>
        <ul className="nav flex-column">
          
          <li className="nav-item">
         
            <Link className="nav-link"  to="/"><BsBrowserEdge className='p-1'style={{ fontSize: '24px', color: 'lightblack' }} />Marks Entry</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/"><BsCupHotFill className='p-1'style={{ fontSize: '24px', color: 'lightblack' }}/>Attendance</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/"><BsCpuFill className='p-1'style={{ fontSize: '24px', color: 'lightblack' }} />Homework</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
