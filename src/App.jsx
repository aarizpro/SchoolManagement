import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './Pages/Dashboard';
// import Profile from './Pages/Profile';
import StaffDetails from './Pages/StaffDetails';
// import Settings from './Pages/Settings';
import Navbarcomp from './Components/Navbarcomp';
import StudentDetails from './Pages/StudentDetails';
import AddAsm from './Pages/AddAsm';
import Sidebar from './Components/Sidebar';
import Profile from './Pages/Profile';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const App = () => {
  return (
    <div>
    <Router>
      <Sidebar />
      <div className="d-flex flex-column" style={{ marginLeft: '120px', width: '100%' }}>
        <Navbarcomp />
        <div
          className="container d-flex justify-content-center align-items-top"
          style={{ height: '100vh', width:'100%', marginTop: '56px' }}
        >
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/staff-details" element={<StaffDetails />} />
            <Route path="/student-details" element={<StudentDetails />} />
            <Route path="/addasm" element={<AddAsm />} />
          </Routes>
        </div>
      </div>
    </Router>
    <ToastContainer/>
    </div>
  );
};

export default App;
