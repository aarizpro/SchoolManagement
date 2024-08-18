import React, { useState,useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const SchoolDetails = () => {
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
    
 const url1="https://awsupload.onrender.com/";
 const url ="https://api-services-jg4f.onrender.com/";
 useEffect(() => {
       
    fetchProfile();
 
}, []);
 const fetchProfile = async () => {
    
    try {
      const response = await axios.get(`${url}api/profileschool`);
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
       
      } else {
        

        toast.error('No Such Nucleus ID');
      }
    } catch (error) {
      console.log(error);
    }
    
  };
  return (
    <div className="container mt-4">
    <div class="card mb-3"style={{ width: '1100px' }} >
         <div class="row g-0">
            <div class="col-md-4 p-2">
                <img src={schoolLogo} class="img-fluid rounded-start" style={{ width: '150px', height: '150px' }} alt=" "/>
            </div>
            <div class="col-md-8">
                <div class="card-body">
                    <h5 class="card-title">{schoolName}</h5>
                    <p class="card-text">
                        Deal ID : {dlID} / Nucleus ID : {nuclID}<br/>
                        Owner Name : {ownerName} / Owner Mobile : {ownerMob}<br/>
                        School Email ID : {schoolEmail} / Latitude & Longitude : {lat},{long}
                       
                    </p>
                    <p class="card-text">
                        <small class="text-body-secondary">Address: {schoolAddr} District: {district}</small>
                    </p>
            </div>
        </div>
    </div>
</div>
</div>
  )
}

export default SchoolDetails