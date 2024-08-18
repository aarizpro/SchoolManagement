import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { FaTrashAlt,FaSearch,FaTripadvisor ,FaPlusCircle  } from "react-icons/fa";
import { FaClipboardQuestion } from "react-icons/fa6";
import DataTable from 'react-data-table-component';
import SchoolDetails from '../Components/SchoolDetails';
import AddAsmModal from '../Components/AddAsmModal';
const AddAsm = () => {
    const [grade, setGrade] = useState("");
    const [subject, setSubject] = useState("");
    const [asmtype, setAsmtype] = useState("");
    const [filteredData,setFilteredData]=useState([]);
    const [students, setStudents] = useState([]);
    const [isAddModalOpen, setAddModalOpen] = useState(false);
    const url ="http://localhost:5000/";
    const fetchAsm = async () => {
        try {
            const response = await axios.get(`${url}api/asmfinder`);
            if (response.data.length > 0) {
                setStudents(response.data);
            }
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        fetchAsm();
        
    }, []);
    const handleSearch = () => {
        const filtered = students.filter(row => {
          const matchesGrade = grade ? row.Grade.toLowerCase().includes(grade.toLowerCase()) : true;
          const matchesSubject = subject ? row.Subject.toLowerCase() === subject.toLowerCase() : true;
      
          return matchesSubject && matchesGrade;
        });
      
        setFilteredData(filtered);
      };
     
      const deleteAsm=async(id)=>{
        try {
            const response= await axios.delete(`${url}api/asmfinder/${id}`)
            toast.success(`Successfully Deleted..`);
         window.location.reload();
        } catch (error) {
            toast.error(error);
        }
      }
      const columns = [
        { name: 'Grade', selector: row => row.Grade, sortable: true },
        { name: 'Subject', selector: row => row.Subject, sortable: true },
        { name: 'Asm Type', selector: row => row.AsmType, sortable: true },
        { name: 'Marks', selector: row => row.Marks, sortable: true },
        {
            name: 'Download',
            cell: row => (
              <div className="d-flex justify-content-between">
                <a
                  className="nav-link"
                  href={row.AsmLink} // Dynamically assign AsmLink
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaClipboardQuestion className="p-1" style={{ fontSize: '28px', color: 'blue' }} />
                  ASM
                </a>
                <a
                  className="nav-link"
                  href={row.AnsLink} // Dynamically assign AnsLink
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaTripadvisor  className="p-1" style={{ fontSize: '28px', color: 'green' }} />
                  Answer
                </a>
              </div>
            ),
          },
            {
            name: 'Action',
            cell: row => (
              <div className="d-flex justify-content-between">
                  
                <button
                  onClick={() => deleteAsm(row._id)}
                  className="me-2 bg-danger text-white px-2 py-1 rounded"
                >
                  <FaTrashAlt /> Delete
                </button>
              </div>
            ),
          }
      ];
    const openAddModal = () => {
        setAddModalOpen(true);
      };
      const handleAddAsm = () => {
        openAddModal();
      };
      const closeAddModal = () => {
        setAddModalOpen(false);
      };
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
    <div className='bg-white shadow-lg p-7 rounded-lg max-w-7xl w-full'>
            <h4>Question Paper & Answer Key Details</h4>
            <div>
                <SchoolDetails />
            </div>
<div className="container mt-2 p-2">
  <div className="mb-4 d-flex align-items-center justify-content-between">
   <select
        value={grade}
        onChange={(e) => setGrade(e.target.value)}
        className="form-control me-2 flex-fill"
    >
        <option value="">Select Grade</option>
        <option value="Nursery">Nursery</option>
        <option value="JKG">JKG</option>
        <option value="SKG">SKG</option>
        <option value="Class 1">Class 1</option>
        <option value="Class 2">Class 2</option>
        <option value="Class 3">Class 3</option>
        <option value="Class 4">Class 4</option>
        <option value="Class 5">Class 5</option>
        <option value="Class 6">Class 6</option>
        <option value="Class 7">Class 7</option>
        <option value="Class 8">Class 8</option>
        <option value="Class 9">Class 9</option>
        <option value="Class 10">Class 10</option>
        <option value="Class 11">Class 11</option>
        <option value="Class 12">Class 12</option>
    </select>
    <select
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
        className="form-control me-2 flex-fill"
    >
        <option value="">Select Subject</option>
        <option value="MATH">MATH</option>
        <option value="EVS">EVS</option>
        <option value="ENGLISH">ENGLISH</option>
        <option value="HINDI">HINDI</option>
        <option value="CCS">CCS</option>
        <option value="OTHERS">OTHERS</option>
        
    </select>
    <select
        value={asmtype}
        onChange={(e) => setAsmtype(e.target.value)}
        className="form-control me-2 flex-fill"
    >
        <option value="">Select ASM TYPE</option>
        <option value="UNIT-1">UNIT-1</option>
        <option value="UNIT-2">UNIT-2</option>
        <option value="UNIT-3">UNIT-3</option>
        <option value="UNIT-4">UNIT-4</option>
        <option value="UNIT-5">UNIT-5</option>
        <option value="UNIT-6">UNIT-6</option>
        <option value="UNIT-7">UNIT-7</option>
        <option value="UNIT-8">UNIT-8</option>
        <option value="MOY">MOY</option>
        <option value="EOY">EOY</option>
        <option value="BOY">BOY</option>
    </select>
  <button type="button" onClick={handleSearch}  className="btn btn-primary me-2 flex-fill d-flex align-items-center justify-content-center">
    <FaSearch  className="me-2" /> Search
  </button>
  <button type="button" className="btn btn-success flex-fill d-flex align-items-center justify-content-center"
 onClick={handleAddAsm}
  >
    <FaPlusCircle  className="me-2" /> Add
  </button>
</div>
<div className="flex-grow">
        
  <DataTable
    columns={columns}
    data={filteredData}
    fixedHeader
    pagination
    responsive
    highlightOnHover
    striped
    customStyles={{
      headCells: {
        style: {
          fontSize: '16px',
          fontWeight: 'bold',
          backgroundColor: '#f5f5f5',
          textAlign: 'center',
        },
      },
      cells: {
        style: {
          fontSize: '14px',
          textAlign: 'center',
        },
      },
      rows: {
        style: {
          minHeight: '56px', // override the row height
        },
      },
    }}
  />
    </div>
</div>
</div>
{isAddModalOpen && (
      <AddAsmModal
        grade={grade}
        subject={subject}
        asmtype={asmtype}
        closeModal={closeAddModal}
        
      />
    )}    
 </div>
  )
}

export default AddAsm