import React from 'react';

import { GoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import googleLogo from './assets/icons8-google-logo-48.png';
import yourLogo from './assets/image (2).png';

const LoginPage = () => {
  const navigate = useNavigate();

  const handleLoginSuccess = (response) => {
    console.log('Login Success:', response);
    navigate('/admin.js');
  };

  const handleLoginFailure = (response) => {
    console.log('Login Failed:', response);
  };

  return (
    <LoginPageContainer>
      <LoginContainer>
        <LoginForm>
          <FormLogo>
            <YourLogo src={yourLogo} alt="Your Logo" />
          </FormLogo>
          <LoginAdmin>Admin Login</LoginAdmin>
          <FormGroup>
            <Input type="email" id="email" name="email" required />
            <Label htmlFor="email">Email:</Label>
            
          </FormGroup>
          <FormGroup>
            <Input type="password" id="password" name="password" required />
            <Label htmlFor="password">Password:</Label>
          </FormGroup>
          <ForgotPasswordButton className='forgot'>Forgot password?</ForgotPasswordButton>
          <SignInButton type="submit">Login</SignInButton>
          <ButtonGroup>
            <GoogleLogin
              onSuccess={handleLoginSuccess}
              onError={handleLoginFailure}
              cookiePolicy={'single_host_origin'}
              render={renderProps => (
                <GoogleButton onClick={renderProps.onClick} disabled={renderProps.disabled}>
                  <GoogleLogo src={googleLogo} alt="Google Logo" />
                  Sign in with Google
                </GoogleButton>
              )}
            />
          </ButtonGroup>
        </LoginForm>
      </LoginContainer>
    </LoginPageContainer>
  );
};

export default LoginPage;

const LoginPageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5%;
  
`;

const LoginContainer = styled.div`
  display: flex;
  margin-top:5%
  flex-direction: column;
  align-items: center;
  width: 70%;
  height: 70%;
  margin-left:32%;
`;

const LoginForm = styled.form`
  background: rgba(255, 255, 255, 0.9);
  padding: 5%;
  border-radius: 10px;
  box-shadow: 0 4% 10% rgba(0, 0, 0, 0.1);
  width: 80%;
  max-width: 400px;
  text-align: center;
  margin-top: -5%;

  @media (min-width: 768px) {
    width: 40%;
  }
`;

const FormLogo = styled.div`
  margin-bottom: %;
`;

const YourLogo = styled.img`
  width: 50%;
  height: 50%;
   margin-top:-20%;
`;

const LoginAdmin = styled.h1`
  color: black;
margin-top:-10%;
  margin-bottom:20%;
`;

const FormGroup = styled.div`
  position: relative;
  margin: 5% 0;
  text-align: left;
  margin-bottom: 20px; /* Gap between input fields */
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background: transparent;
  outline: none;
  font-size: 1rem;
  color: black;

  &:focus ~ label,
  &:not(:placeholder-shown) ~ label {
    top: -10px;
    left: 5px;
    font-size: 0.75rem;
    color: #black;
  }
`;

const Label = styled.label`
  position: absolute;
  top: 50%;
  left: 10px;
  transform: translateY(-50%);
  color: black;
  font-size: 1rem;
  pointer-events: none;
  transition: all 0.2s ease-in-out;
`;

const SignInButton = styled.button`
  width: 70%;
  padding: 5%;
  margin-top: 7%;
   margin-left: 15%;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  background-color: #564CAF;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 5%;
  transition: transform 0.3s, border 0.3s;

  &:hover {
    transform: scale(1.05);
  }
`;

const ButtonGroup = styled.div`
  width: auto;
  padding: 5%;
  transition: transform 0.3s, border 0.3s;
  border-radius: 20px;
  cursor: pointer;
  color: rgb(8, 7, 7);
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 5%;
`;

const GoogleButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  padding: 5%;
`;

const GoogleLogo = styled.img`
  width: 20%;
  height: auto;
  margin-left: 2%;
`;

const ForgotPasswordButton = styled.button`
  border: none;
  text-decoration: underline;
  margin-top: -15%;
  margin-left:55%;

   &:hover {
    transform: scale(1.05);
  }
`;
