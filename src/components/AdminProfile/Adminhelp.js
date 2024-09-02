import React from 'react';
import styled, { keyframes } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { IoReturnDownBack } from "react-icons/io5";

const AdminHelp = () => {
    const navigate = useNavigate();

    const handleBack = () => {
        navigate(0);
    };

    return (
        <AdminHelpMenu>
            <AdminHelpTitle>Help Menu</AdminHelpTitle>
            <AdminHelpContact>Contact Information:</AdminHelpContact>
            <AdminContactInfo>
                <AdminHelpList>
                    <AdminHelpListItem>Company Email: syliqonsoftware.com</AdminHelpListItem>
                    <AdminHelpListItem>HR Email: hr@syliqonsoftware.com</AdminHelpListItem>
                    <AdminHelpListItem>Manager Email: manager@syliqonsoftware.com</AdminHelpListItem>
                    <AdminHelpListItem>Team Leader Email: teamleader@syliqon.com</AdminHelpListItem>
                </AdminHelpList>
            </AdminContactInfo>
            <AdminBackButton onClick={handleBack}>Back</AdminBackButton>
        </AdminHelpMenu>
    );
};

const fadeIn = keyframes`
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
`;

const slideIn = keyframes`
    from {
        transform: translateY(20%);
        opacity: 0;
    }
    to {
        transform: translateY(0);
        opacity: 1;
    }
`;

const AdminHelpMenu = styled.div`
    width: 70%;
    margin: 5% auto;
    padding: 2%;
    background-color: rgba(47, 48, 49, 0.18);
    border-radius: 5%;
    box-shadow: 0 4% 14% rgba(0, 0, 0, 0.1);
    animation: ${fadeIn} 0.5s ease-in-out;
    max-height: 70vh;
    text-align: center;
    color: #ffffff;
    border: 0.1% solid #fbfbfb;
    box-sizing: border-box;
`;

const AdminHelpTitle = styled.h2`
    text-align: center;
    margin-bottom: 2%;
    color: white;
    margin-left:-1%;
`;

const AdminHelpContact = styled.p`
    color: white;
    margin-bottom: 1%;
`;

const AdminContactInfo = styled.div`
    margin-top: 2%;
    background: #fafafa;
    padding: 2%;
    border-radius: 2%;
    border: 0.1% solid #eee;
    animation: ${slideIn} 0.5s ease-in-out;
    color: #333;
`;

const AdminHelpList = styled.ul`
    list-style: none;
    padding: 0;
    margin: 0;
`;

const AdminHelpListItem = styled.li`
    margin-bottom: 2%;
    font-size: 1rem;
    color: #333;

    @media (max-width: 600px) {
        font-size: 0.875rem;
    }
`;

const AdminBackButton = styled.button`
    margin-top: 3%;
    width: 20%;
    padding: 2%;
    background: #0056b3;
    color: white;
    border: none;
    border-radius: 2%;
    cursor: pointer;
    transition: background-color 0.3s ease, transform 0.3s ease, opacity 0.3s ease;

    &:hover {
        background: #0c345e;
        transform: scale(1.05);
        opacity: 0.9;
    }

    &:active {
        background: #083978;
        transform: scale(0.95);
    }

    @media (max-width: 600px) {
        width: 100%;
        text-align: center;
    }
`;

export default AdminHelp;
