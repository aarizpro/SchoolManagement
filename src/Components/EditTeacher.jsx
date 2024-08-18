
import { Modal, Button } from 'react-bootstrap';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';


const EditTeacher = ({ show, handleClose, teacher,onUpdate }) => {
    const [teacherName,setTeacherName]= useState("");
    const [teacherEmail,setTeacherEmail]= useState("");
    const [teacherRole,setTeacherRole]= useState("");
    const [mobileNo,setMobileNo]= useState("");
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
                MobileNo:mobileNo
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
        <Modal.Title>Edit Teacher Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Edit details for {teacher.TeacherName}</p>
        <input type="text"  value={teacherName}  onChange={(e)=>setTeacherName(e.target.value)} className="form-control mb-3" />
        <input type="text" value={mobileNo}  onChange={(e)=>setMobileNo(e.target.value)} className="form-control mb-3" />
        <input type="text" value={teacherEmail}  onChange={(e)=>setTeacherEmail(e.target.value)} className="form-control mb-3" />
        <select
        value={teacherRole}
        onChange={(e) => setTeacherRole(e.target.value)}
        className="form-control mb-3 w-75"
    >
        <option value="">Select Role</option>
        <option value="Teacher">Teacher</option>
        <option value="Principal">Principal</option>
        <option value="Academic Co-ordinator">Academic Co-ordinator</option>
                
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

export default EditTeacher;
