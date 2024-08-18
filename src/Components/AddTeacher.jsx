import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';
import { toast } from 'react-toastify';

const AddTeacher = ({ show, handleClose, onUpdate, nucid, deal, school }) => {
    const [teacherName, setTeacherName] = useState('');
    const [mobileNo, setMobileNo] = useState('');
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('');

    const handleSave = async () => {
        try {
            const newTeacher = {
                NucleusID: nucid,
                DealID: deal,
                SchoolName: school,
                TeacherName: teacherName,
                MobileNo: mobileNo,
                TeacherEmail: email,
                TeacherRole: role,
                Grade: "Not Allocated",
                Subject:"Not Allocated"
            };

            await axios.post('https://api-services-jg4f.onrender.com/api/teacher', newTeacher);
            toast.success('Teacher added successfully');
            handleClose();
            onUpdate();
        } catch (error) {
            toast.error('Failed to add teacher');
            console.error(error);
        }
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Add Staff</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group>
                        <Form.Label>Deal ID</Form.Label>
                        <Form.Control type="text" value={deal} readOnly />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Nucleus ID</Form.Label>
                        <Form.Control type="text" value={nucid} readOnly />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>School Name</Form.Label>
                        <Form.Control type="text" value={school} readOnly />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Staff Name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter Staff Name"
                            value={teacherName}
                            onChange={(e) => setTeacherName(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Mobile No</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter Mobile No"
                            value={mobileNo}
                            onChange={(e) => setMobileNo(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Enter Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Role</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter Role"
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleSave}>
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default AddTeacher;
