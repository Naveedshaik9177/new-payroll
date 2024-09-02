import React from 'react';
import axios from 'axios';
import { useLeave } from '../contexts/LeaveContext.js';
import styled from 'styled-components';

const LeaveRequestsContainer = styled.div`
  padding: 2%;
  width: 59%;
  margin-left:0%;
  margin-top:2%;
  max-width: 1200px;
  border: 2px solid #FBFBFB;
 border-radius: 8%;
  box-shadow: 0 2% 5% rgba(0, 0, 0, 0.1);
  height: 70vh;
  background-color: rgba(47, 48, 49, 0.18);
  color: #ffffff;
  // overflow-y: auto;
  // margin: 2% auto;
  box-sizing: border-box;

  @media (max-width: 768px) {
    width: 95%;
  }

  
  &::-webkit-scrollbar {
    display: none;
    
  }
  -ms-overflow-style: none; 
  scrollbar-width: none; 
`;

const LeaveRequestsHeader = styled.h1`
  text-align: center;
  margin-bottom: 2%;
  color: #ffffff;
`;

const LeaveRequestsTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 2%;
`;

const TableHeaderCell = styled.th`
  border: 0.1% solid #ddd;
  padding: 1%;
  text-align: center;
  vertical-align: top;
  background-color: rgba(47, 48, 49, 0.18);
  font-weight: bold;
`;

const TableDataCell = styled.td`
  border: 0.1% solid #ddd;
  padding: 1%;
  text-align: center;
  vertical-align: top;
  word-wrap: break-word;
  white-space: normal;
`;

const LeaveRequestActionButton = styled.button`
  margin: 1%;
  padding: 1% 2%;
  border: none;
  cursor: pointer;
  font-size: 1%;
  width: 20%;
  max-width: 100px;
  border-radius: 0.5%;
  transition: background-color 0.3s ease;

  @media (max-width: 768px) {
    width: 40%;
  }
`;

const LeaveRequestAcceptButton = styled(LeaveRequestActionButton)`
  background-color: #4caf50;
  color: white;

  &:hover {
    background-color: #45a049;
  }
`;

const LeaveRequestRejectButton = styled(LeaveRequestActionButton)`
  background-color: #f44336;
  color: white;

  &:hover {
    background-color: #da190b;
  }
`;

const AdminDashboard = () => {
  const { leaveRequests, updateLeaveRequestStatus } = useLeave();

  const handleAccept = async (index) => {
    const updatedRequest = { ...leaveRequests[index], status: 'Accepted' };
    updateLeaveRequestStatus(index, 'Accepted');
    await handleLeaveRequestUpdate(updatedRequest, 'Accepted');
  };

  const handleReject = async (index) => {
    const updatedRequest = { ...leaveRequests[index], status: 'Rejected' };
    updateLeaveRequestStatus(index, 'Rejected');
    await handleLeaveRequestUpdate(updatedRequest, 'Rejected');
  };

  const handleLeaveRequestUpdate = async (leaveRequest, status) => {
    try {
      await axios.post('http://localhost:5000/update-leave-status', {
        email: 'pooja.vm9671@gmail.com', // Replace with the manager's email
        leaveType: leaveRequest.leaveType,
        leaveFromDate: leaveRequest.leaveFromDate,
        leaveToDate: leaveRequest.leaveToDate,
        status: status,
      });
      alert(`Leave request has been ${status} and the manager has been notified.`);
    } catch (error) {
      console.error('Error sending email:', error);
      alert('Error updating leave request. Please try again later.');
    }
  };

  return (
    <LeaveRequestsContainer>
      <LeaveRequestsHeader>Leave Requests</LeaveRequestsHeader>
      <LeaveRequestsTable>
        <thead>
          <tr>
            <TableHeaderCell>Type of Leave</TableHeaderCell>
            <TableHeaderCell>Start Date</TableHeaderCell>
            <TableHeaderCell>End Date</TableHeaderCell>
            <TableHeaderCell>Reason</TableHeaderCell>
            <TableHeaderCell>Status</TableHeaderCell>
            <TableHeaderCell>Actions</TableHeaderCell>
          </tr>
        </thead>
        <tbody>
          {leaveRequests.map((request, index) => (
            <tr key={index}>
              <TableDataCell>{request.leaveType}</TableDataCell>
              <TableDataCell>{request.leaveFromDate}</TableDataCell>
              <TableDataCell>{request.leaveToDate}</TableDataCell>
              <TableDataCell>{request.reason}</TableDataCell>
              <TableDataCell>{request.status}</TableDataCell>
              <TableDataCell>
                <LeaveRequestAcceptButton onClick={() => handleAccept(index)}>
                  Accept
                </LeaveRequestAcceptButton>
                <LeaveRequestRejectButton onClick={() => handleReject(index)}>
                  Reject
                </LeaveRequestRejectButton>
              </TableDataCell>
            </tr>
          ))}
        </tbody>
      </LeaveRequestsTable>
    </LeaveRequestsContainer>
  );
};

export default AdminDashboard;
