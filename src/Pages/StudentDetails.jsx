import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import SchoolDetails from '../Components/SchoolDetails';
import DataTable from 'react-data-table-component';
import { FaTrashAlt,FaSearch,FaEdit } from "react-icons/fa";
import { IoPersonAddSharp } from "react-icons/io5";
import EditStudentModal from '../Components/EditStudentModal';
import AddStudentModal from '../Components/AddStudentModal';
const StudentDetails = () => {
    const [dlID, setDlID] = useState("");
    const [nuID, setNUID] = useState("");
    const [schoolName, setSchoolName] = useState("");
    const [students, setStudents] = useState([]);
    const [search, setSearch] = useState("");
    const [grade, setGrade] = useState("");
    const [filteredData,setFilteredData]=useState([]);
    const [isEditModalOpen, setEditModalOpen] = useState(false);
    const [isAddModalOpen, setAddModalOpen] = useState(false);
    const [currentStudent, setCurrentStudent] = useState(null);
    const url = "https://api-services-jg4f.onrender.com/";
    const fetchProfile = async () => {
        try {
            const response = await axios.get(`${url}api/profileschool`);
            if (response.data.length > 0) {
                setDlID(response.data[0].DealID);
                setNUID(response.data[0].NucleusID);
                setSchoolName(response.data[0].SchoolName);               
            } else {
                toast.error('No Such Deal ID');
            }
        } catch (error) {
            console.log(error);
        }
    };
    const fetchStudent = async () => {
        try {
            const response = await axios.get(`${url}api/student/search?field[]=DealID&value[]=${dlID}`);
            if (response.data.length > 0) {
                setStudents(response.data);
            }
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        fetchProfile();
        fetchStudent();
    }, [dlID]);
    // const filteredData = students.filter(row => 
    //     row.StudentName.toLowerCase().includes(search.toLowerCase())
    //   );
    const handleSearch = () => {
      const filtered = students.filter(row => {
        const matchesStudentName = search ? row.StudentName.toLowerCase().includes(search.toLowerCase()) : true;
        const matchesGrade = grade ? row.StudentGrade.toLowerCase() === grade.toLowerCase() : true;
    
        return matchesStudentName && matchesGrade;
      });
    
      setFilteredData(filtered);
    };
    const handleUpdate = () => {
      fetchStudent(); // Refresh the teacher list after update
  }; 
    const columns = [
        { name: 'Student Name', selector: row => row.StudentName, sortable: true },
        { name: 'Gender', selector: row => row.StudentGender, sortable: true },
        { name: 'Grade', selector: row => row.StudentGrade, sortable: true },
        { name: 'Father Name', selector: row => row.FatherName, sortable: true },
        { name: 'Father Mobile', selector: row => row.FatherMobile, sortable: true },
        { name: 'Mother Name', selector: row => row.MotherName, sortable: true },
        { name: 'Mother Mobile', selector: row => row.MotherMobile, sortable: true },
        { name: 'City', selector: row => row.StudentCity, sortable: true },
        {
          name: 'Action',
          cell: row => (
            <div className="d-flex justify-content-between">
                 <button
            onClick={() => editStudent(row)}
            className="me-2 bg-warning text-white px-2 py-1 rounded"
          >
           <FaEdit />
          </button>
              <button
                onClick={() => deleteStudent(row._id)}
                className="me-2 bg-danger text-white px-2 py-1 rounded"
              >
                <FaTrashAlt />
              </button>
            </div>
          ),
        },
      ];
      const deleteStudent=async(id)=>{
        try {
          const response = await axios.delete(`${url}api/student/${id}`);
          toast.success(`Successfully Deleted..`);
         window.location.reload();
      } catch (error) {
          toast.error(error);
      }
      }
      const editStudent=async(row)=>{
        openEditModal(row);
      }
      const handleAddStudent = () => {
        openAddModal();
      };
      const openEditModal = (student) => {
        setCurrentStudent(student);
        setEditModalOpen(true);
      };
      
      const closeEditModal = () => {
        setEditModalOpen(false);
        setCurrentStudent(null);
      };
      
      const openAddModal = () => {
        setAddModalOpen(true);
      };
      
      const closeAddModal = () => {
        setAddModalOpen(false);
      };
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
    <div className='bg-white shadow-lg p-7 rounded-lg max-w-7xl w-full'>
            <h4>Student Details</h4>
            <div>
                <SchoolDetails />
            </div>
            <div className="container mt-2">
            <div className="mb-4 d-flex align-items-center justify-content-between">
  <input 
    type="text" 
    placeholder="Search by Student" 
    value={search} 
    onChange={(e) => setSearch(e.target.value)} 
    className="form-control me-2 w-50"
  />
 
   <select
        value={grade}
        onChange={(e) => setGrade(e.target.value)}
        className="form-control me-2 w-25"
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
  <button type="button" onClick={handleSearch} className="btn btn-primary me-2 w-25 d-flex align-items-center justify-content-center">
    <FaSearch  className="me-2" /> Search
  </button>
  <button type="button" className="btn btn-success w-25 d-flex align-items-center justify-content-center"
  onClick={handleAddStudent}
  >
    <IoPersonAddSharp className="me-2" /> Add Student
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
            {isEditModalOpen && (
      <EditStudentModal
        student={currentStudent}
        closeModal={closeEditModal}
        onUpdate={handleUpdate}
      />
    )}
     {isAddModalOpen && (
      <AddStudentModal
        dealId={dlID}
        nucleusID={nuID}
        schoolName={schoolName}
        closeModal={closeAddModal}
        onUpdate={handleUpdate}
      />
    )}    
    </div>
  )
}

export default StudentDetails