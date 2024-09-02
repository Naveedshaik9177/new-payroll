import React, { useState } from 'react';
import styled from 'styled-components';

const SideBarContainer = styled.div`
  position: relative;
  height: 100vh;
  width: 6%; 
   transition: width 0.3s ease; 
  
  &.show-dropdown {
    // width: 35%; 
  }
`;

const VerticalBar = styled.div`
  background-color: rgb(7, 10, 92);
  width: 106%;
  height: 100%;
  cursor: pointer;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding-top: 5%;
  margin-top: 0%;
  margin-left: 0%;
  gap: 4%;
  transition: transform 0.3s ease; /* Smooth transition for sidebar movement */
`;

const VerticalBarIcon = styled.img`
  width: 40%;
  height: auto;
  margin: 35% 0;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.05);
    background-color: rgb(7, 10, 92);
  }
`;

const DropdownContent = styled.div`
  position: absolute; 
  top: 0; 
  left: 100%; 
  height: 100%;
  width: 270%;
  display: flex;
  flex-direction: column;
  // border-radius: 5%;
  opacity: 0; 
  pointer-events: none; 
  transition: opacity 0.3s ease; 
  z-index: 3;
  background-color: rgb(7, 10, 92);

  ${SideBarContainer}.show-dropdown & {
    opacity: 1; /* Show dropdown content when sidebar is expanded */
    pointer-events: auto; /* Enable interaction when expanded */
  }
`;

const Button = styled.button`
   padding: 10px;
  text-align: center;
  border: none;
  color: white;
  margin-top: 22%;
  height: 10%;
  width: 90%;
  box-sizing: border-box;
  cursor: pointer;
  margin-left: 5%;
  background-color: transparent;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  transition: background-color 0.3s ease, transform 0.3s ease;
  border-radius: 30px;

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
    transform: scale(1.05); /* Slightly increase the button size */
    box-shadow: 0% 12% 20% 0% rgba(7, 7, 7, 0.3); /* Enhance the shadow effect */
    color: #f0f0f0; /* Change text color on hover for better contrast */
  }
`;

const SideBar = ({ onButtonClick }) => {
  const [isDropdownVisible, setDropdownVisible] = useState(false);

  const handleMouseEnter = () => {
    setDropdownVisible(true);
  };

  const handleMouseLeave = () => {
    setDropdownVisible(false);
  };

  return (
    <SideBarContainer 
      className={isDropdownVisible ? 'show-dropdown' : ''}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <VerticalBar>
        <VerticalBarIcon src="https://img.icons8.com/?size=100&id=7761&format=png&color=FFFFFF" alt="Collaboration Icon" />
        <VerticalBarIcon src="https://img.icons8.com/?size=100&id=99363&format=png&color=FFFFFF" alt="Conference Icon" />
        <VerticalBarIcon src="https://img.icons8.com/?size=100&id=47849&format=png&color=FFFFFF" alt="Leave House Icon" />
        <VerticalBarIcon src="https://img.icons8.com/?size=100&id=50897&format=png&color=FFFFFF" alt="Checked User Male Icon" />
        <VerticalBarIcon src="https://img.icons8.com/?size=100&id=50897&format=png&color=FFFFFF" alt="Checked User Male Icon" />
      </VerticalBar>
      <DropdownContent>
        <Button onClick={() => onButtonClick('addEmployee')}>ADD EMPLOYEE</Button>
        <Button onClick={() => onButtonClick('viewLeaveRequest')}>LEAVE REQUESTS</Button>
        <Button onClick={() => onButtonClick('tickets')}>TICKETS</Button>
        <Button onClick={() => onButtonClick('AttendanceView')}>EMP ATTENDANCE</Button>
      </DropdownContent>
    </SideBarContainer>
  );
};

export default SideBar;
