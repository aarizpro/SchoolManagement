import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Modal, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';

const AddStudentModal = ({ dealId, nucleusID, schoolName, closeModal,onUpdate }) => {
 const[studentName,setStudentName]=useState("");
 const[gender,setGender]=useState(""); 
 const[grade,setGrade]=useState("");
 const[fatherName,setFatherName]=useState("");
 const[fatherMobile,setFatherMobile]=useState("");
 const[motherName,setMotherName]=useState("");
 const[motherMobile,setMotherMobile]=useState("");
 const[city,setCity]=useState("");
 const[state,setState]=useState("");
 const[pincode,setPincode]=useState("");
 const[address,setAddress]=useState("");
 const url ="https://api-services-jg4f.onrender.com/";

 const AddData=async()=>{
  try {
  const response = await axios.post(`${url}api/student`, {
    NucleusID: nucleusID,
    DealID: dealId,
    SchoolName: schoolName,
    StudentName:studentName,
    StudentGender:gender,
    StudentGrade:grade,
    FatherName:fatherName,
    FatherMobile:parseInt(fatherMobile, 10),
    MotherName:motherName,
    MotherMobile:parseInt(motherMobile, 10),
    StudentCity:city,
    StudentState:state,
    StudentAddr:address,
    StudentPincode:parseInt(pincode,10),
  });
    toast.success("Successfully Student Added");
    console.log(response.data);
    handleClose();
    onUpdate();
    
  } catch (error) {
    console.log(error);
  }

 }
  return (
    <Modal show onHide={closeModal}>
      <Modal.Header closeButton>
        <Modal.Title>Add Student</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Add a New Student for:{schoolName}<br/>
        Deal ID: {dealId} - Nucleus ID: {nucleusID}
        </p>
        
        <div class="input-group mb-3">
      <span class="input-group-text">Student Name</span>
        <input type="text"  value={studentName}  onChange={(e)=>setStudentName(e.target.value)} class="form-control " />
      </div>
       <div class="input-group mb-3">
      <span class="input-group-text">Gender & Grade</span>
        <select
        value={gender}
        onChange={(e) => setGender(e.target.value)}
        className="form-control"
        >
        <option value="">Select Gender</option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
         
    </select>
       
        <select
        value={grade}
        onChange={(e) => setGrade(e.target.value)}
        className="form-control"
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
       </div>
       <div class="input-group mb-3">
      <span class="input-group-text">Father Name & No</span>
        <input type="text"  value={fatherName}  onChange={(e)=>setFatherName(e.target.value)} className="form-control " />
        <input type="text"  value={fatherMobile}  onChange={(e)=>setFatherMobile(e.target.value)} className="form-control " />
      </div>
      <div class="input-group mb-3">
      <span class="input-group-text">Mother Name & No</span>
        <input type="text"  value={motherName}  onChange={(e)=>setMotherName(e.target.value)} className="form-control " />
        <input type="text"  value={motherMobile}  onChange={(e)=>setMotherMobile(e.target.value)} className="form-control " />
        </div>
        <div class="input-group mb-3">
      <span class="input-group-text">City & State</span>
        <input type="text"  value={city}  onChange={(e)=>setCity(e.target.value)} className="form-control " />
        <input type="text"  value={state}  onChange={(e)=>setState(e.target.value)} className="form-control " />
        </div>
        <div class="input-group mb-3">
      <span class="input-group-text">Address </span>
        <input type="text"  value={address}  onChange={(e)=>setAddress(e.target.value)} className="form-control " />
        
        </div>
        <div class="input-group mb-3">
      <span class="input-group-text">Pincode</span>
        
        <input type="text"  value={pincode}  onChange={(e)=>setPincode(e.target.value)} className="form-control " />
        </div>
        
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={closeModal}>
          Close
        </Button>
        <Button variant="primary" onClick={AddData}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddStudentModal;
