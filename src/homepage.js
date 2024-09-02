import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
// import './homepage.css';
import img1 from './assets/image (2).png';

const HomePage = () => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate('/login');
  };

  const handleEmployeeLoginClick = () => {
    navigate('/Employeelogin');
  };

  return (
    <Container>
      <BoxContainer>
        <LogoContainer>
          <Logo src={img1} alt="Company Logo" />
        </LogoContainer>
        <Title>SYLIQON SOFTWARE MANAGEMENT</Title>
        <ButtonContainer>
          <Button onClick={handleButtonClick}>LOGIN as Admin</Button>
          <Button onClick={handleEmployeeLoginClick}>LOGIN as Employee</Button>
        </ButtonContainer>
      </BoxContainer>
    </Container>
  );
};

export default HomePage;


const Container = styled.main`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  width: 100%;
  background-image: url("./assets/bc.png");
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
`;

const BoxContainer = styled.div`
  background-color: rgba(255, 255, 255, 0.4);
  backdrop-filter: blur(10px);
  border-radius: 2.5%;
  box-shadow: 0 1.33% 5.33% rgba(0, 0, 0, 0.25);
  padding: 3.33%;
  max-width: 100%;
  width: 40%;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;

  @media (max-width: 600px) {
    padding: 8%;
  }

  @media (min-width: 768px) {
    max-width: 60%;
  }

  @media (min-width: 1200px) {
    max-width: 66.67%;
    padding: 6.67%;
  }
`;

const LogoContainer = styled.div`
  margin-bottom: 3.33%;
`;

const Logo = styled.img`
  width: 40%;
  height: 40%;
  margin-top: -19%;
  margin-bottom: -12%;

  @media (max-width: 600px) {
    width: 20%;
    height: 20%;
  }
`;

const Title = styled.h1`
  font-size: 1.8rem;
  color: white;
  margin-bottom: 8%;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 6.67%;
  width: 100%;
  border-radius: 20.33%;
  margin-top: 3.33%;
  

  @media (max-width: 600px) {
    flex-direction: column;
  }
`;

const Button = styled.button`
  width: 50%;
  padding: 3.33%;
  border: none;
  border-radius: 20.33%;
  cursor: pointer;
  background-color: #f5f5f5;
  color: #000;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.3s, border 0.3s;
  font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
  font-size: 1rem;

  &:hover {
    transform: scale(1.05);
  }

  @media (max-width: 600px) {
    width: 50%;
    font-size: 0.875rem;
  }

  @media (min-width: 1200px) {
    padding: 4.67%;
    font-size: 1.125rem;
  }
`;
