import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { EmployeeContext } from '../contexts/EmployeeContext';

const EmployeeFormContainer = styled.div`
  width: 50%;
  padding: 2%;
  border: 2px solid #FBFBFB;
  background-color: rgba(47, 48, 49, 0.18);
  border-radius: 8%;
  box-shadow: 0 2% 5% rgba(0, 0, 0, 0.1);
  margin: 2% auto;
  margin-left: 8%;
  color: #FFFFFF;
  box-sizing: border-box;
  
  @media (max-width: 768px) {
    width: 90%;
  }
`;

const EmployeeFormTitle = styled.h1`
  text-align: center;
  margin-bottom: 5%;
  color: white;
`;

const EmployeeFormGroup = styled.div`
  position: relative;
  margin-bottom: 5%;
  width: 100%;
`;

const EmployeeInputField = styled.input`
  width: 100%;
  padding: 2% 3%;
  box-sizing: border-box;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-top: 1%;
  transition: border-color 0.3s ease-in-out, box-shadow 0.3s ease-in-out;

  &:focus + label,
  &:not(:placeholder-shown) + label {
    top: -20%;
    left: 5%;
    color: #FFFFFF;
  }
`;

const EmployeeInputLabel = styled.label`
  position: absolute;
  top: 50%;
  left: 5%;
  transform: translateY(-50%);
  color: #888;
  transition: 0.2s;
  pointer-events: none;
  background-color: transparent;
`;

const EmployeeSubmitButton = styled.button`
  width: 20%;
  padding: 3%;
  border: none;
  border-radius: 5px;
  background-color: #04AA6D;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out, transform 0.3s ease-in-out;

  &:hover {
    background-color: #45A049;
    transform: scale(1.05);
  }

  @media (max-width: 768px) {
    width: 40%; /* Adjust width for smaller screens */
  }
`;

const Popup = styled.div`
  position: fixed;
  transform: translate(-50%, -50%);
  padding: 2% 4%;
  background-color: #357235;
  color: #333;
  border-radius: 10px;
  box-shadow: 0 4% 8% rgba(0, 0, 0, 0.1);
  text-align: center;
  z-index: 2050;
  opacity: 0.9;
  margin-left: 33%;
  top: 50%;
  left: 50%;
`;

const AddEmployee = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [project, setProject] = useState('');
  const [role, setRole] = useState('Employee');
  const [showPopup, setShowPopup] = useState(false);
  const { addEmployee } = useContext(EmployeeContext);

  const handleSubmit = (event) => {
    event.preventDefault();
    const newEmployee = { name, email, project, role, experience: '0 years', skills: [] };
    addEmployee(newEmployee);
    setName('');
    setEmail('');
    setProject('');
    setRole('Employee');
    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 3000);
  };

  return (
    <EmployeeFormContainer className="employee-form-container">
      <EmployeeFormTitle className="employee-form-title">Add Employee</EmployeeFormTitle>
      <form onSubmit={handleSubmit}>
        <EmployeeFormGroup className="employee-form-group">
          <EmployeeInputField
            type="name"
            id="name"
            className="employee-input-field"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <EmployeeInputLabel htmlFor="name" className="employee-input-label">Name</EmployeeInputLabel>
        </EmployeeFormGroup>

        <EmployeeFormGroup className="employee-form-group">
          <EmployeeInputField
            type="email"
            id="email"
            className="employee-input-field"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <EmployeeInputLabel htmlFor="email" className="employee-input-label">Email</EmployeeInputLabel>
        </EmployeeFormGroup>

        <EmployeeFormGroup className="employee-form-group">
          <select
            id="project"
            className="employee-input-field"
            value={project}
            onChange={(e) => setProject(e.target.value)}
            required
            style={{
              width: '100%',
              padding: '2% 3%',
              boxSizing: 'border-box',
              border: '1px solid #ccc',
              borderRadius: '5px',
              marginTop: '1%',
              transition: 'border-color 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
            }}
          >
            <option value="" disabled>Select Project</option>
            <option value="Payroll">Payroll</option>
            <option value="XML">XML</option>
          </select>
          <EmployeeInputLabel htmlFor="project" className="employee-input-label"></EmployeeInputLabel>
        </EmployeeFormGroup>

        <EmployeeFormGroup className="employee-form-group">
          <select
            id="role"
            className="employee-input-field"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
            style={{
              width: '100%',
              padding: '2% 3%',
              boxSizing: 'border-box',
              border: '1px solid #ccc',
              borderRadius: '5px',
              marginTop: '1%',
              transition: 'border-color 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
            }}
          >
            <option value="">Select Role</option>
            <option value="Team Lead">Team Lead</option>
            <option value="Manager">Manager</option>
            <option value="Developer">Developer</option>
            <option value="Designer">Designer</option>
            <option value="QA">QA</option>
          </select>
          <EmployeeInputLabel htmlFor="role" className="employee-input-label"></EmployeeInputLabel>
        </EmployeeFormGroup>

        <EmployeeSubmitButton type="submit" className="employee-submit-">
          Add Employee
        </EmployeeSubmitButton>
      </form>
      {showPopup && (
        <Popup className="popup">
          Employee added successfully!
        </Popup>
      )}
    </EmployeeFormContainer>
  );
};

export default AddEmployee;
