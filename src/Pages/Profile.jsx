import React, { useState,useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { BsSearch } from "react-icons/bs";

const Profile = () => {
    const [file, setFile] = useState(null);
    const [cimgurl, setCimgurl] = useState("");
    const[nucleusID,setNucleusID]= useState("");
    const[dealID,setDealID]= useState("");
    const[nuclID,setNuclID]= useState("");
    const[dlID,setDlID]= useState("");
    const[schoolName,setSchoolName]= useState("");
    const[schoolAddr,setSchoolAddr]= useState("");
    const[lat,setLat]= useState("");
    const[long,setLong]= useState("");
    const[district,setDistrict]= useState("");
    const[schoolEmail,setSchoolEmail]= useState("");
    const[ownerName,setOwnerName]= useState("");
    const[ownerMob,setOwnerMob]= useState("");
    const[schoolLogo,setSchoolLogo]= useState("");
    const[editID,setEditId]=useState("");
    const url1="https://awsupload.onrender.com/";
    const url ="https://api-services-jg4f.onrender.com/";
    const handleNucId = (e) => {
        setNucleusID(e.target.value);
       
       
      };
      const handleDealId = (e) => {
        setDealID(e.target.value);
       
      };
      const fetchDealId = async () => {
    
        try {
          const response = await axios.get(`${url}api/newschool/search?field[]=DealID&value[]=${dealID}`);
          if (response.data.length > 0) {
            setNuclID(response.data[0].NucleusID);
            setDlID(response.data[0].DealID);
            setSchoolName(response.data[0].SchoolName);
            setSchoolAddr(response.data[0].Address);
            setSchoolEmail(response.data[0].SchoolEmail);
            setDistrict(response.data[0].District);
            setLat(response.data[0].loc_lat);
            setLong(response.data[0].loc_long);
            setOwnerMob(response.data[0].OwnerMob);
            setOwnerName(response.data[0].OwnerName);
            setSchoolLogo(response.data[0].SchoolLogo);
            toast.success('School Found');
          } else {
            
    
            toast.error('No Such Deal ID');
          }
        } catch (error) {
          console.log(error);
        }
        
      };
      const fetchNucleusId = async () => {
    
        try {
          const response = await axios.get(`${url}api/newschool/search?field[]=NucleusID&value[]=${nucleusID}`);
          if (response.data.length > 0) {
            setNuclID(response.data[0].NucleusID);
            setDlID(response.data[0].DealID);
            setSchoolName(response.data[0].SchoolName);
            setSchoolAddr(response.data[0].Address);
            setSchoolEmail(response.data[0].SchoolEmail);
            setDistrict(response.data[0].District);
            setLat(response.data[0].loc_lat);
            setLong(response.data[0].loc_long);
            setOwnerMob(response.data[0].OwnerMob);
            setOwnerName(response.data[0].OwnerName);
            setSchoolLogo(response.data[0].SchoolLogo);
            toast.success('School Found');
          } else {
            
    
            toast.error('No Such Nucleus ID');
          }
        } catch (error) {
          console.log(error);
        }
        
      };
      useEffect(() => {
       
          fetchProfile();
       
      }, []);
      const updateProfile = async()=>{
       
        try {
            const response = await axios.put(`${url}api/profileschool/${editID}`,{
                DealID: dlID,
                NucleusID: nuclID,
                SchoolName: schoolName,
                District: district,
                loc_lat: lat,
                loc_long: long,
                Address: schoolAddr,
                SchoolEmail: schoolEmail,
                OwnerName: ownerName,
                OwnerMob: ownerMob,
                SchoolLogo:cimgurl     

            });
            toast.success("Updated Successfully");
        } catch (error) {
            console.log(error);
            toast.error("Unable to Save the Profile");
        }
      }
      const fetchProfile = async () => {
    
        try {
          const response = await axios.get(`${url}api/profileschool`);
          if (response.data.length > 0) {
            setEditId(response.data[0]._id);
            setNuclID(response.data[0].NucleusID);
            setDlID(response.data[0].DealID);
            setSchoolName(response.data[0].SchoolName);
            setSchoolAddr(response.data[0].Address);
            setSchoolEmail(response.data[0].SchoolEmail);
            setDistrict(response.data[0].District);
            setLat(response.data[0].loc_lat);
            setLong(response.data[0].loc_long);
            setOwnerMob(response.data[0].OwnerMob);
            setOwnerName(response.data[0].OwnerName);
            setSchoolLogo(response.data[0].SchoolLogo);
           
          } else {
            
    
            toast.error('No Such Nucleus ID');
          }
        } catch (error) {
          console.log(error);
        }
        
      };
    const uploadFile = async () => {
        if (!file) {
          alert("Please select a file first");
          return;
        }
    
        const formData = new FormData();
        formData.append("file", file,"Harish.png");
    
        try {
          const response = await axios.post(`${url1}upload`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          });
          console.log(response.data);
          setCimgurl(response.data); // Ensure you are setting a valid string
          toast.success("File uploaded successfully");
        } catch (error) {
          toast.error("File upload failed");
          console.log(error);
        }
      };
  return (
    <div>

    <div className="text-right">
    <h4>Profile of the School</h4>
    </div>
    <div class="container text-center ">
     <div class="row ">
      <div class="col-auto">
      <label className='mt-1'>Deal ID:</label>
       
        </div>
       <div class="col-auto">
       <input type="text" value={dealID}
          onChange={handleDealId} class="form-control" id="dealid" placeholder="Search By Deal ID"/>
        </div>
        <div class="col-auto">
        <button type="button"   onClick={fetchDealId} class="btn btn-primary"><BsSearch />
</button>
        </div>
        <div class="col-auto">
        <label className='mt-1'>Nucleus ID:</label>
        </div>
        <div class="col-auto">
        <input type="text" value={nucleusID}
          onChange={handleNucId} class="form-control" id="nucleusid" placeholder="Search By Nucleus ID"/>
        </div>
        <div class="col-auto">
        <button type="button" onClick={fetchNucleusId} class="btn btn-primary"><BsSearch />
</button>
        </div>
     </div>
     <div class="row mt-4">
     <div class="input-group">
  <span class="input-group-text">Deal and Nucleus ID</span>
  <input type="text" aria-label="Deal ID" placeholder='Enter Deal ID' value={dlID} onChange={(e)=>setDlID(e.target.value)} class="form-control"/>
  <input type="text" aria-label="Nucleus ID" placeholder='Enter Nucleus ID' value={nuclID}  onChange={(e)=>setNuclID(e.target.value)} class="form-control"/>
</div>
</div>
<div class="row mt-4">
     <div class="input-group">
        <span class="input-group-text">School Name</span>
        <input type="text" aria-label="School Name" value={schoolName}  onChange={(e)=>setSchoolName(e.target.value)} placeholder='Enter School Name' class="form-control"/>
  </div>
</div>
<div class="row mt-4">
  <div class="input-group">
    <span class="input-group-text">School Address</span>
    <textarea aria-label="School Address" value={schoolAddr}  onChange={(e)=>setSchoolAddr(e.target.value)} placeholder="Enter School Address" class="form-control" rows="3"></textarea>
  </div>
</div>
<div class="row mt-4">
     <div class="input-group">
        <span class="input-group-text">Latitude & Longitude</span>
        <input type="text" aria-label="latitude" value={lat}  onChange={(e)=>setLat(e.target.value)} placeholder='Enter School Lat' class="form-control"/>
        <input type="text" aria-label="longitude" value={long}  onChange={(e)=>setLong(e.target.value)} placeholder='Enter School Long' class="form-control"/>
  </div>
</div>
<div class="row mt-4">
     <div class="input-group">
        <span class="input-group-text">District and Email ID</span>
        <input type="text" aria-label="latitude" value={district}  onChange={(e)=>setDistrict(e.target.value)} placeholder='Enter District' class="form-control"/>
        <input type="text" aria-label="longitude" value={schoolEmail}  onChange={(e)=>setSchoolEmail(e.target.value)} placeholder='Enter School Email ID' class="form-control"/>
  </div>
</div>
<div class="row mt-4">
     <div class="input-group">
        <span class="input-group-text">Owner Name & Contact Number</span>
        <input type="text" aria-label="latitude" value={ownerName}  onChange={(e)=>setOwnerName(e.target.value)} placeholder='Enter Owner Name' class="form-control"/>
        <input type="text" aria-label="longitude" value={ownerMob}  onChange={(e)=>setOwnerMob(e.target.value)} placeholder='Enter Owner Contact No' class="form-control"/>
  </div>

</div>
<div class="row mt-4">
<div class="input-group">
    <input type="file"onChange={(e) => setFile(e.target.files[0])} aria-label="Upload File" class="form-control" id="fileInput" />
    <button class="btn btn-primary"  onClick={uploadFile} type="button" >Upload School logo</button>
  </div>
</div>
<div class="row mt-4">
<div class="input-group">
    <span class="input-group-text">Logo Link</span>
    <input type="text" aria-label="latitude" value={cimgurl}  onChange={(e)=>setCimgurl(e.target.value)} readOnly class="form-control"/>
    <button class="btn btn-primary" type="button" onClick={updateProfile}>Save Profile</button>
  </div>
</div>
    </div>
    </div>
  )
}

export default Profile