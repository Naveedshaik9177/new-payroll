import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import img2 from "../../assets/profile.png";

const AdminProfile = styled.div`
  color: #FFFFFF;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.1);
  border: 2% solid #FBFBFB;
  border-radius: 5%;
  width: 70%;
  margin: 5% auto;
  padding: 2%;
  box-sizing: border-box;
  background-color: #2f30312f;
  height: 70vh;
  overflow-y: auto;
  
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE and Edge */

  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera */
  }

  @media (max-width: 768%) {
    width: 90%;
    height: auto;
  }
`;

const AdminProfileContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const AdminProfileImage = styled.div`
  margin-bottom: 5%;
`;

const AdminProfileImageImg = styled.img`
  border-radius: 50%;
  width: 20%;
  height: auto;
  object-fit: cover;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;

  &:hover {
    transform: scale(1.1); /* Scale up image on hover */
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.3); /* Add shadow on hover */
  }
`;

const AdminProfileData = styled.div`
  width: 100%;
`;

const AdminProfileSection = styled.div`
  width: 80%;
  color: rgb(17, 16, 16);
  margin: 5% auto;
  display: flex;
  border-radius: 2%;
  flex-direction: column;
  background-color: rgba(255, 255, 255, 0.699);
  box-shadow: 0 0 15px rgba(20, 18, 18, 0.884); /* Add box shadow to profile section */
  padding: 2%;

  @media (max-width: 768px) {
    width: 95%;
  }
`;

const AdminProfileInfo = styled.h1`
  padding-bottom: 5%;
  margin-bottom: 3%;
`;

const InputRow = styled.div`
  display: flex;
  align-items: center;
  margin: 2% 0;
`;

const InputLabel = styled.span`
  font-weight: bold;
  margin-right: 1%;
  white-space: nowrap; /* Ensure the label doesn't wrap */
`;

const InputValue = styled.span`
  color: rgb(22, 21, 21);
`;

const InputText = styled.input`
  width: 100%;
  padding: 3%;
  margin-left: 2%;
  border: 1px solid #ccc;
  border-radius: 4px;
  transition: border-color 0.3s ease-in-out;

  &:focus {
    border-color: #007BFF; /* Change border color on focus */
  }
`;

const ProfileBack = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 2%;
`;

const AdminProfileButton = styled.button`
  margin-left: 0%;
  background-color: #007BFF;
  padding: 1%;
  border-radius: 5px;
  transition: transform 0.3s ease-in-out;

  &:hover {
    transform: scale(1.05); /* Slightly scale up button on hover */
  }
`;

const AdminEditButton = styled(AdminProfileButton)`
  margin-right: auto;
  background-color: #28A745;
`;

function Myprofile() {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [profileImage, setProfileImage] = useState(img2);
  const [employeeInfo, setEmployeeInfo] = useState({
    fullName: 'Shahbaz Khan',
    employeeId: 'SS1234',
    emailId: 'shahbaz@gmail.com',
    personalNumber: '9876543210',
    personalName: 'Shahbaz',
    bloodGroup: 'O+',
    nationality: 'Indian',
    state: 'Telangana',
    permanentAddress: 'HYD',
    currentAddress: 'HYD',
    emergencyContact: {
      name: 'Shoeb',
      mobileNumber: '1234567890',
      address: 'HYD',
      relation: 'Brother'
    },
    professionalBackground: {
      jobTitle: 'Software Engineer',
      companyName: 'Tech Company',
      educationQualification: 'Mechanical Engineer',
      certification: 'Certified Java Developer',
      skills: ['React', 'JavaScript', 'CSS']
    }
  });

  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployeeInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value
    }));
  };

  const handleChangeNested = (e, section) => {
    const { name, value } = e.target;
    setEmployeeInfo((prevInfo) => ({
      ...prevInfo,
      [section]: {
        ...prevInfo[section],
        [name]: value
      }
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const renderInput = (label, value, name, section) => (
    <InputRow>
      <InputLabel>{label}</InputLabel>
      {isEditing ? (
        <InputText
          type="text"
          name={name}
          value={value}
          onChange={(e) => handleChangeNested(e, section)}
        />
      ) : (
        <InputValue>{value}</InputValue>
      )}
    </InputRow>
  );

  const handleBack = () => {
    navigate(0); 
  };

  return (
    <AdminProfile>
      <AdminProfileContent>
        <AdminProfileImage>
          <AdminProfileImageImg src={profileImage} alt="Profile" />
          {isEditing && (
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
            />
          )}
        </AdminProfileImage>
        <AdminProfileData>
          <AdminProfileSection>
            <AdminProfileInfo>About Information</AdminProfileInfo>
            {renderInput('Full Name:', employeeInfo.fullName, 'fullName')}
            {renderInput('Employee ID:', employeeInfo.employeeId, 'employeeId')}
            {renderInput('Email ID:', employeeInfo.emailId, 'emailId')}
          </AdminProfileSection>
          <AdminProfileSection>
            <AdminProfileInfo>Personal Information</AdminProfileInfo>
            {renderInput('Personal Number:', employeeInfo.personalNumber, 'personalNumber')}
            {renderInput('Personal Name:', employeeInfo.personalName, 'personalName')}
            {renderInput('Blood Group:', employeeInfo.bloodGroup, 'bloodGroup')}
            {renderInput('Nationality:', employeeInfo.nationality, 'nationality')}
            {renderInput('State:', employeeInfo.state, 'state')}
            {renderInput('Permanent Address:', employeeInfo.permanentAddress, 'permanentAddress')}
            {renderInput('Current Address:', employeeInfo.currentAddress, 'currentAddress')}
          </AdminProfileSection>
          <AdminProfileSection>
            <AdminProfileInfo>Emergency Contact Details</AdminProfileInfo>
            {renderInput('Contact Name:', employeeInfo.emergencyContact.name, 'name', 'emergencyContact')}
            {renderInput('Mobile Number:', employeeInfo.emergencyContact.mobileNumber, 'mobileNumber', 'emergencyContact')}
            {renderInput('Address:', employeeInfo.emergencyContact.address, 'address', 'emergencyContact')}
            {renderInput('Relation:', employeeInfo.emergencyContact.relation, 'relation', 'emergencyContact')}
          </AdminProfileSection>
          <AdminProfileSection>
            <AdminProfileInfo>Professional Background</AdminProfileInfo>
            {renderInput('Job Title:', employeeInfo.professionalBackground.jobTitle, 'jobTitle', 'professionalBackground')}
            {renderInput('Company Name:', employeeInfo.professionalBackground.companyName, 'companyName', 'professionalBackground')}
            {renderInput('Education Qualification:', employeeInfo.professionalBackground.educationQualification, 'educationQualification', 'professionalBackground')}
            {renderInput('Certification:', employeeInfo.professionalBackground.certification, 'certification', 'professionalBackground')}
            <InputRow>
              <InputLabel>Skills:</InputLabel>
              {isEditing ? (
                <InputText
                  type="text"
                  name="skills"
                  value={employeeInfo.professionalBackground.skills.join(', ')}
                  onChange={(e) => handleChangeNested(e, 'professionalBackground')}
                />
              ) : (
                <InputValue>{employeeInfo.professionalBackground.skills.join(', ')}</InputValue>
              )}
            </InputRow>
          </AdminProfileSection>
        </AdminProfileData>
        <ProfileBack>
          <AdminProfileButton onClick={handleBack}>Back</AdminProfileButton>
          <AdminEditButton onClick={handleEditClick}>
            {isEditing ? 'Save' : 'Edit'}
          </AdminEditButton>
        </ProfileBack>
      </AdminProfileContent>
    </AdminProfile>
  );
}

export default Myprofile;
