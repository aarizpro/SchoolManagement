
import { Modal, Button } from 'react-bootstrap';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';


const AllocateGrade = ({ show, handleClose, teacher,onUpdate }) => {
    const [teacherName,setTeacherName]= useState("");
    const [teacherEmail,setTeacherEmail]= useState("");
    const [teacherRole,setTeacherRole]= useState("");
    const [mobileNo,setMobileNo]= useState("");
    const [grade,setGrade]= useState("");
    const [subject,setSubject]= useState("");
    const url ="https://api-services-jg4f.onrender.com/";
    useEffect(() => {
        if (teacher) {
            setTeacherName(teacher.TeacherName);
            setTeacherEmail(teacher.TeacherEmail);
            setTeacherRole(teacher.TeacherRole);
            setMobileNo(teacher.MobileNo);
        }
    }, [teacher]);
    const EditData= async()=>{
        try {
            const response = await axios.put(`${url}api/teacher/${teacher._id}`, {
                TeacherName:teacherName,
                TeacherEmail:teacherEmail,
                TeacherRole:teacherRole,
                MobileNo:mobileNo,
                Subject:subject,
                Grade:grade
              });
              console.log(response);
              toast.success(`Updated ${teacher.TeacherName} Successfully`);
              setTeacherName("");
              setTeacherEmail("");
              setMobileNo("");
              setTeacherRole("");
              handleClose();
              if (onUpdate) onUpdate();
        } catch (error) {
            console.log(error);
        }
    }
    
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add Grade & Subject</Modal.Title>
      </Modal.Header>
      <Modal.Body className="d-flex flex-column align-items-center justify-content-center" >
        <div  className='text-center'>
        <p>Grade & Subject Allocation for {teacherName}</p>
        <p>{mobileNo} </p>
        <p>{teacherEmail} </p>
        <p>{teacherRole} </p>
        </div>
        <select
        value={grade}
        onChange={(e) => setGrade(e.target.value)}
        className="form-control mb-3 w-75"
    >
        <option value="">Select Grade</option>
        <option value="Nursery">Nursery</option>
        <option value="JKG">JKG</option>
        <option value="SKG">SKG</option>
        <option value="Class 1">Class-1</option>
        <option value="Class 2">Class-2</option>
        <option value="Class 3">Class-3</option>
        <option value="Class 4">Class-4</option>
        <option value="Class 5">Class-5</option>
        <option value="Class 6">Class-6</option>
        <option value="Class 7">Class-7</option>
        <option value="Class 8">Class-8</option>
        <option value="Class 9">Class-9</option>
        <option value="Class 10">Class-10</option>
        <option value="Class 11">Class-11</option>
        <option value="Class 12">Class-12</option>
    </select>
    <select
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
        className="form-control mb-3 w-75"
    >
        <option value="">Select Subject</option>
        <option value="Math">Math</option>
        <option value="EVS">EVS</option>
        <option value="ENGLISH">ENGLISH</option>
        <option value="HINDI">HINDI</option>
        <option value="CCS">CCS</option>
        <option value="Others">Others</option>
        
    </select>
    </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={EditData}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AllocateGrade;
