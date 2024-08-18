import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Modal, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';


const AddAsmModal = ({grade,subject,asmtype,closeModal}) => {
    const [marks,setMarks]= useState("");
    const [asmlink,setAsmLink]= useState("");
    const [anslink,setAnsLink]= useState("");
    const [file, setFile] = useState(null);
    const [file1, setFile1] = useState(null);
    
    const url1="https://awsupload.onrender.com/";
    const url = "https://api-services-jg4f.onrender.com/";
const AddData =async()=>{
try {
    
    const response = await axios.post(`${url}api/asmfinder`,{
        Grade:grade,
        Subject:subject,
        AsmType:asmtype,
        Marks:marks,
        AsmLink:asmlink,
        AnsLink:anslink
    });
    toast.success("ASM Added Successfully");
    console.log(response.data);
} catch (error) {
    console.log(error);
    toast.error(error);
}
}
const uploadFile = async () => {
  if (!file) {
    alert("Please select a file first");
    return;
  }

  const formData = new FormData();
  const newfilename = `${grade}_${subject}_${asmtype}.pdf`;
  formData.append("file", file,newfilename);
  try {
    const response = await axios.post(`${url1}upload`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    console.log(response.data);
    setAsmLink(response.data); // Ensure you are setting a valid string
    toast.success("File uploaded successfully");
  } catch (error) {
    toast.error("File upload failed");
    console.log(error);
  }
};
const uploadFile1 = async () => {
  if (!file1) {
    alert("Please select a file first");
    return;
  }

  const formData = new FormData();
  const newfilename = `${grade}_${subject}_${asmtype}_answer.pdf`;
  formData.append("file", file1,newfilename);
  try {
    const response = await axios.post(`${url1}upload`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    console.log(response.data);
    setAnsLink(response.data); // Ensure you are setting a valid string
    toast.success("File uploaded successfully");
  } catch (error) {
    toast.error("File upload failed");
    console.log(error);
  }
};
    
  return (
    <Modal show onHide={closeModal}>
      <Modal.Header closeButton>
        <Modal.Title>Add ASM & Answer Key</Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <p>Grade: {grade} - Subject: {subject} - ASM Type: {asmtype}
        </p>
  <div class="input-group mb-2">
    <input type="file"onChange={(e) => setFile(e.target.files[0])} aria-label="Upload File" class="form-control" id="fileInput" />
    <button class="btn btn-primary"  onClick={uploadFile} type="button" >Upload ASM</button>
  </div>
  <div class="input-group mb-2">
    <span class="input-group-text">ASM Link</span>
    <input type="text" aria-label="latitude" value={asmlink}  onChange={(e)=>setAsmLink(e.target.value)} readOnly class="form-control"/>
   </div>
   <div class="input-group mb-2">
    <input type="file"onChange={(e) => setFile1(e.target.files[0])} aria-label="Upload File" class="form-control" id="fileInput" />
    <button class="btn btn-primary"  onClick={uploadFile1} type="button" >Upload Answer</button>
  </div>
  <div class="input-group mb-2">
    <span class="input-group-text">Answer Link</span>
    <input type="text" aria-label="latitude" value={anslink}  onChange={(e)=>setAnsLink(e.target.value)} readOnly class="form-control"/>
   </div>
   <div class="input-group mb-2">
      <span class="input-group-text">Marks Fixed</span>
        <input type="text"  value={marks}  onChange={(e)=>setMarks(e.target.value)} class="form-control " />
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
  )
}

export default AddAsmModal