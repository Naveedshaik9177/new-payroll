import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import { IoIosPersonAdd } from "react-icons/io";
import { RiArrowDropDownLine, RiLogoutCircleFill } from "react-icons/ri";
import { FaHandsHelping, FaPrescription } from "react-icons/fa";
import { IoSettings } from "react-icons/io5";
import { useResponsiveJSX } from '../hooks/useResponsiveJSX.js';
import logoImage from "../assets/S.jpg"; // Your logo image
import profileImage from "../assets/icons8-menu-vertical-50 (1).png"; // Your profile image

const NavBar = ({ onButtonClick, onHomeClick }) => {
  const [dropdownVisible, setDropdownVisible] = useState({
    profile: false,
    ticket: false,
    team: false,
    recruitment: false,
    training: false,
    attendance: false,
  });

  const dropdownRefs = {
    profile: useRef(null),
    ticket: useRef(null),
    team: useRef(null),
    recruitment: useRef(null),
    training: useRef(null),
    attendance: useRef(null),
  };

  const index = useResponsiveJSX([600, 900]);
  const toggleDropdown = (type) => {
    setDropdownVisible(prev => ({
      ...prev,
      [type]: !prev[type],
      ...Object.keys(dropdownVisible).reduce((acc, key) => {
        if (key !== type) acc[key] = false; 
        return acc;
      }, {}),
    }));
  };

  const handleOutsideClick = (event) => {
    Object.keys(dropdownRefs).forEach(key => {
      if (dropdownVisible[key] && dropdownRefs[key].current && !dropdownRefs[key].current.contains(event.target)) {
        setDropdownVisible(prev => ({ ...prev, [key]: false }));
      }
    });
  };

  useEffect(() => {
    document.addEventListener('click', handleOutsideClick);
    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, [dropdownVisible]);

  return (
    <nav className={`navBar ${index === 0 ? 'small-screen' : index === 1 ? 'medium-screen' : 'large-screen'}`}>
      <div className="navBar-logoContainer">
        <img src={logoImage} alt="Logo" className='navBar-logo' />
      </div>
      <div className="employee-navbar__home-button-container">
        <button className="employee-navbar__home-button" onClick={onHomeClick}>
          <span className="employee-navbar__home-text">Home</span>
        </button>
      </div>

      <div className='navBar-nav'>
        <div className="navBar-dropdownToggle" onClick={() => toggleDropdown('recruitment')} ref={dropdownRefs.recruitment}>
          <div className='navBar-dropdownHeader'>
            <p className='navBar-dropdownTitle'>Recruitment</p>
            <RiArrowDropDownLine className='navBar-dropdownIcon' />
          </div>
          {dropdownVisible.recruitment && (
            <div className='navBar-dropdownMenu navBar-dropdownMenu-recruitment'>
              <button className="navBar-menuItem" onClick={() => onButtonClick('interviewscheduling')}>
                Interview Schedule
              </button>
            </div>
          )}
        </div>

        {/* Profile Dropdown */}
        <div className="navBar-dropdownToggle" onClick={() => toggleDropdown('profile')} ref={dropdownRefs.profile}>
          <img src={profileImage} alt="Profile" className='navBar-profileImage' />
          {dropdownVisible.profile && (
            <div className="navBar-profileDropdownMenu">
              <Link className="navBar-profileMenuItem" to="#" onClick={() => onButtonClick('adminprofile')}>
                <IoIosPersonAdd className='navBar-profileIcon' />
                My Profile
              </Link>
              <Link className="navBar-profileMenuItem" to="#" onClick={() => onButtonClick('adminresignation')}>
                <FaPrescription className='navBar-profileIcon' />
                Resignation
              </Link>
              <Link className="navBar-profileMenuItem" to="#" onClick={() => onButtonClick('adminsettings')}>
                <IoSettings className='navBar-profileIcon' />
                Settings
              </Link>
              <Link className="navBar-profileMenuItem" to="#" onClick={() => onButtonClick('adminhelp')}>
                <FaHandsHelping className='navBar-profileIcon' />
                Help
              </Link>
              <Link className="navBar-profileMenuItem" to="#" onClick={() => onButtonClick('adminlogout')}>
                <RiLogoutCircleFill className='navBar-profileIcon' />
                Logout
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
