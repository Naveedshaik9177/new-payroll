import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import StatusPage from './AdminStatusPage';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { IoReturnDownBackSharp } from "react-icons/io5";
import { SiStatuspage } from "react-icons/si";

const AdminResignationContainer = styled.div`
  .admin-form-container {
    width: 70%;
    margin: 5% auto;
    padding: 5%;
    box-shadow: 0 0.5% 2% rgba(0, 0, 0, 0.1);
    border-radius: 1%;
    background-color: #2f30312f;
    margin-right: 0%;
    transition: all 0.3s ease;
    color: #ffffff;
    border: 0.2% solid #fbfbfb;
    box-sizing: border-box;
    height: 70vh;
  }

  .reason-title {
    color: white;
    margin-right: 0%;
  }

  .admin-heading {
    margin-left: 0%;
    color: #fff;
    transition: color 0.3s ease;
  }

  .admin-employee-details {
    margin-bottom: 2%;
    width: 90%;
    padding: 2%;
    background-color: #e9ecefbd;
    border-radius: 1%;
    text-align: center;
    margin-left: 2%;
    transition: background-color 0.3s ease, color 0.3s ease;
  }

  .admin-employee-details p {
    margin: 1% 0;
    color: #333;
    transition: color 0.3s ease;
  }

  .admin-form-group {
    width: 90%;
    margin-bottom: 2%;
    margin-left: 2%;
    transition: margin-left 0.3s ease, margin-bottom 0.3s ease;
  }

  textarea#reasonForLeaving {
    width: 100%;
    padding: 2%;
    border: none;
    border-radius: 0.5%;
    box-sizing: border-box;
    background-color: #f8f9fa;
    transition: background-color 0.3s ease, padding 0.3s ease;
  }

  .admin-form-buttons {
    display: flex;
    justify-content: space-between;
    margin-bottom: 2%;
     margin-left: 5%;
    transition: justify-content 0.3s ease;
  }

  .admin-button {
    display: inline-block;
    padding: 1% 2%;
    margin-left:10%;
    color: #fff;
    border: none;
    border-radius: 0.5%;
    cursor: pointer;
    text-align: center;
    text-decoration: none;
    transition: background-color 0.3s ease, color 0.3s ease, transform 0.3s ease;
  }

  .admin-button-submit {
    margin-top: 3%;
    background-color: #4369e7;
    flex: 1;
    margin-left:10%;
  }

  .admin-button-back {
    margin-top: 3%;
    background-color: transparent;
    color: #e6e9ec;
    border: none;
  
    flex: 1;
  }

  .admin-button-discuss {
    margin-top: 3%;
    background-color: yellowgreen;
    flex: 1;
  }

  .admin-button:hover {
    opacity: 0.9;
    transform: scale(1.05);
  }

  .admin-status-check-icon {
    position: absolute;
    margin-top: 2%;
    right: 2%;
 
    cursor: pointer;
    color: #dde1e6;
    transition: color 0.3s ease, transform 0.3s ease;
  }

  .admin-status-check-icon:hover {
    color: #0056b3;
    transform: rotate(20deg);
  }

  @media screen and (max-width: 768px) {
    .admin-form-container {
      width: 90%;
    }

    .admin-form-buttons {
      flex-direction: column;
    }

    .admin-button {
      margin-bottom: 2%;
      width: 100%;
    }

    .admin-status-check-icon {
      top: 1%;
      right: 1%;
     
    }
  }

  @media screen and (max-width: 480px) {
    .admin-form-container {
      width: 100%;
      padding: 4%;
    }

    .admin-heading {
      

    .admin-form-buttons {
      flex-direction: column;
      align-items: stretch;
    }

    .admin-button {
      padding: 2%;
      margin-bottom: 2%;
    }

    .admin-status-check-icon {
      top: 2%;
      right: 2%;
     
    }

    .reason-title {
      color: white;
      margin-right: 0%;
    }

    .admin-employee-details {
      
    }

    .admin-form-group {
      margin-left: 0%;
      color: white;
    }
  }
`;

function AdminResignation() {
  const [name] = useState('naveed');
  const [id] = useState('SS030');
  const [reasonForLeaving, setReasonForLeaving] = useState('');
  const [domain, setDomain] = useState('');
  const [showStatusPage, setShowStatusPage] = useState(false);
  const [status, setStatus] = useState('pending');
  const navigate = useNavigate();

  useEffect(() => {
    if (showStatusPage) {
      const interval = setInterval(async () => {
        try {
          const response = await axios.get(`http://localhost:5000/check-status?id=${id}`);
          setStatus(response.data.status);
        } catch (error) {
          console.error('Error checking status:', error);
          toast.error('Failed to check status');
        }
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [showStatusPage, id]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post('http://localhost:5000/send-resignation', {
        name,
        id,
        domain,
        reason: reasonForLeaving,
        managerEmail: 'sharathachar55@gmail.com'
      });

      toast.success('Resignation submitted successfully.');
      setStatus('submitted');
      setShowStatusPage(true);
    } catch (error) {
      toast.error('Failed to submit resignation.');
      console.error('Error submitting resignation:', error);
    }
  };

  const handleDiscussWithManager = async () => {
    try {
      await axios.post('http://localhost:5000/send-discussion-notification', {
        name,
        id,
        managerEmail: 'sharathachar55@gmail.com'
      });

      toast.success('Notification sent to manager for discussion.');
    } catch (error) {
      toast.error('Failed to send notification.');
      console.error('Error sending notification:', error);
    }
  };

  const handleBack = () => {
    navigate(0);
  };

  const handleStatusCheck = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/check-status?id=${id}`);
      setStatus(response.data.status);
      setShowStatusPage(true); // Set showStatusPage to true to display the StatusPage
      toast.success('Status updated.');
    } catch (error) {
      toast.error('Failed to check status.');
      console.error('Error checking status:', error);
    }
  };

  return (
    <AdminResignationContainer>
      <div className="admin-resignation-container">
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        {!showStatusPage ? (
          <div className="admin-form-container">
            <div className="admin-status-check-icon" onClick={handleStatusCheck}>
              <SiStatuspage />
            </div>
            <h2 className="admin-heading">Resignation Form</h2>
            <div className="admin-employee-details">
              <p><strong>Name:</strong> {name}</p>
              <p><strong>ID:</strong> {id}</p>
              <p><strong>Domain:</strong> {domain}</p>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="admin-form-group">
                <label className="reason-title">Reason for Leaving:</label>
                <textarea
                  id="reasonForLeaving"
                  value={reasonForLeaving}
                  onChange={(e) => setReasonForLeaving(e.target.value)}
                  required
                />
              </div>
              <div className="admin-form-buttons">
                <button type="button" className="admin-button admin-button-back" onClick={handleBack}>
                  <IoReturnDownBackSharp />
                </button>
                <button type="submit" className="admin-button admin-button-submit">Submit</button>
                <button type="button" className="admin-button admin-button-discuss" onClick={handleDiscussWithManager}>
                  Discuss with Manager
                </button>
              </div>
            </form>
          </div>
        ) : (
          <StatusPage status={status} />
        )}
      </div>
    </AdminResignationContainer>
  );
}

export default AdminResignation;
