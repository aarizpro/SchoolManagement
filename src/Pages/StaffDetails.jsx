import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import SchoolDetails from '../Components/SchoolDetails';
import EditTeacher from '../Components/EditTeacher';
import AddTeacher from '../Components/AddTeacher';
import AllocateGrade from '../Components/AllocateGrade';
import { FaPhoneVolume } from "react-icons/fa6";
import { MdOutlineMailOutline } from "react-icons/md";
import { GiTeacher } from "react-icons/gi";
import { FaRegEdit, FaTrashAlt } from "react-icons/fa";
import { IoPersonAddSharp } from "react-icons/io5";

const StaffDetails = () => {
    const [dlID, setDlID] = useState("");
    const [teachers, setTeachers] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [showModal1, setShowModal1] = useState(false);
    const [showModal2, setShowModal2] = useState(false);
    const [selectedTeacher, setSelectedTeacher] = useState(null);
    const [selectedTeacher1, setSelectedTeacher1] = useState(null);
    const [tcount, setTcount] = useState('');
    const [pcount, setPcount] = useState('');
    const [aacount, setAacount] = useState('');
    const [ncid, setNcid] = useState('');
    const [schoolname, setSchoolName] = useState('');
    const url = "https://api-services-jg4f.onrender.com/";
    const imgurl = 'https://dingdongcourier.s3.ap-south-1.amazonaws.com/Teacher.jpg';

    const fetchProfile = async () => {
        try {
            const response = await axios.get(`${url}api/profileschool`);
            if (response.data.length > 0) {
                setDlID(response.data[0].DealID);
                setNcid(response.data[0].NucleusID);
                setSchoolName(response.data[0].SchoolName);
            } else {
                toast.error('No Such Deal ID');
            }
        } catch (error) {
            console.log(error);
        }
    };

    const fetchTeacher = async () => {
        try {
            const response = await axios.get(`${url}api/teacher/search?field[]=DealID&value[]=${dlID}`);
            if (response.data.length > 0) {
                setTeachers(response.data);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const fetchTCount = async () => {
        try {
            const response = await axios.get(`${url}api/teacher/search?field[]=DealID&value[]=${dlID}&field[]=TeacherRole&value[]=Teacher`);
            if (response.data.length > 0) {
                setTcount(response.data.length);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const fetchPCount = async () => {
        try {
            const response = await axios.get(`${url}api/teacher/search?field[]=DealID&value[]=${dlID}&field[]=TeacherRole&value[]=Principal`);
            if (response.data.length > 0) {
                setPcount(response.data.length);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const fetchAACount = async () => {
        try {
            const response = await axios.get(`${url}api/teacher/search?field[]=DealID&value[]=${dlID}&field[]=TeacherRole&value[]=Academic Co-ordinator`);
            if (response.data.length > 0) {
                setAacount(response.data.length);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchProfile();
        fetchTeacher();
        fetchTCount();
        fetchPCount();
        fetchAACount();
    }, [dlID]);

    const handleUpdate = () => {
        fetchTeacher(); // Refresh the teacher list after update
    };

    const handleEdit = (teacher) => {
        setSelectedTeacher(teacher);
        setShowModal(true);
    };
    const handleGrade = (teacher) => {
      setSelectedTeacher1(teacher);
      setShowModal2(true);
  };


    const handleAdd = () => {
        setShowModal1(true);
    };

    const handleClose = () => {
        setShowModal(false);
        setShowModal1(false);
        setShowModal2(false);
        setSelectedTeacher(null);
        setSelectedTeacher1(null);
    };

    const handleDelete = async (id, name) => {
        try {
            const response = await axios.delete(`${url}api/teacher/${id}`);
            toast.success(`Successfully ${name} Deleted..`);
            window.location.reload();
        } catch (error) {
            toast.error(error);
        }
    };

    return (
        <div className="text-right p-2">
            <h4>Staff Details</h4>
            <div>
                <SchoolDetails />
            </div>

            <div className="container mt-2">
                <div className='d-flex justify-content-between p-1 ml-1 mb-2'>
                    <button type="button" className="btn btn-info w-25">
                        Principal <span className="badge text-bg-secondary">{pcount}</span>
                    </button>
                    <button type="button" className="btn btn-info w-25">
                        Co-ordinators <span className="badge text-bg-secondary">{aacount}</span>
                    </button>
                    <button type="button" className="btn btn-info w-25">
                        Teachers <span className="badge text-bg-secondary">{tcount}</span>
                    </button>
                    <button type="button" className="btn btn-success w-25" onClick={handleAdd}>
                        <IoPersonAddSharp /> Add Staff
                    </button>
                </div>
                <div className="row justify-content-center">
                    {teachers.map((teacher, index) => (
                        <div className="col-md-3 mb-3 justify-content-center" key={index}>
                            <div className="card">
                                <img src={imgurl} className="card-img-top rounded-circle mx-auto mt-3" style={{ width: '150px', height: '150px' }} alt={teacher.TeacherName} />
                                <div className="card-body text-center">
                                    <h5 className="card-title">{teacher.TeacherName}</h5>
                                    <p className="card-text">
                                        <FaPhoneVolume /> {teacher.MobileNo} <br />
                                        <span className="text-truncate" style={{ maxWidth: "200px" }}> <MdOutlineMailOutline /> {teacher.TeacherEmail}</span> <br />
                                        <GiTeacher /> {teacher.TeacherRole}<br/>
                                        Subject: {teacher.Subject}<br/>
                                        Grade : {teacher.Grade}
                                    </p>
                                    <div className="d-flex justify-content-between">
                                        <button
                                            type="button"
                                            className="btn btn-primary"
                                            onClick={() => handleEdit(teacher)}
                                        >
                                            <FaRegEdit />
                                        </button>
                                        <button
                                            type="button"
                                            className="btn btn-warning"
                                            onClick={() => handleGrade(teacher)}
                                        >
                                           Allocate
                                        </button>
                                        <button
                                            type="button"
                                            className="btn btn-danger"
                                            onClick={() => handleDelete(teacher._id, teacher.TeacherName)}
                                        >
                                            <FaTrashAlt />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {selectedTeacher && (
                <EditTeacher
                    show={showModal}
                    handleClose={handleClose}
                    teacher={selectedTeacher}
                    onUpdate={handleUpdate}
                />
            )}
            {selectedTeacher1 && (
                <AllocateGrade
                    show={showModal2}
                    handleClose={handleClose}
                    teacher={selectedTeacher1}
                    onUpdate={handleUpdate}
                />
            )}

            <AddTeacher
                show={showModal1}
                handleClose={handleClose}
                onUpdate={handleUpdate}
                nucid={ncid}
                deal={dlID}
                school={schoolname}
            />
        </div>
    );
}

export default StaffDetails;
