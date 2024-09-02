import React, { useContext, useRef } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import styled from 'styled-components'; // Import styled-components
import { TicketContext } from '../contexts/TicketContext'; // Import TicketContext

const TicketContainer = styled.div`
  width: 55%;
  height: 70vh;
  padding: 2%;
  border-radius: 8%;
  border: 2px solid #FBFBFB;
  background-color: rgba(47, 48, 49, 0.18);
  position: relative;
  color: #ffffff;
  border: 0.2% solid #fbfbfb;
  margin: 4% auto;
  box-sizing: border-box;
  background-color: rgba(47, 48, 49, 0.18);
  margin-right: 42%;

  @media (max-width: 800px) {
    padding: 1%;
    margin-right: 0;
    width: 95%;
  }
`;

const Title = styled.h1`
  text-align: center;
  margin-bottom: 2%;
  color: white;
`;

const TicketCount = styled.p`
  color: white;
  font-size: 100%;
`;

const TicketsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 2%;
  max-height: 40vh;
  overflow-y: auto;
  margin-bottom: 2%;
`;

const TicketCard = styled.div`
  flex: 1 1 calc(33.333% - 2%);
  padding: 2%;
  border: 0.1% solid #ddd;
  border-radius: 1%;
  box-shadow: 0 0.2% 0.5% rgba(0, 0, 0, 0.1);
  background-color: #fff;
  transition: transform 0.2s, box-shadow 0.2s;

  &:hover {
    transform: translateY(-0.5%);
    box-shadow: 0 0.4% 1% rgba(0, 0, 0, 0.2);
  }
`;

const TicketText = styled.p`
  margin: 1% 0;
  font-size: 1.6%;
  color: #555;
`;

const TicketLink = styled.a`
  color: #007bff;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const BackButton = styled.button`
  margin-top: 45%;
  width:15%;
  height:5%;
  padding: 1% 2%;
  font-size: 10.6%;
  border: none;
  border-radius: 8.5%;
  cursor: pointer;
  background-color: #007bff;
  color: #fff;
  transition: background-color 0.3s, transform 0.3s;

  &:hover {
    background-color: #0056b3;
    transform: scale(1.05);
  }
`;

const Ticket = () => {
  const { tickets } = useContext(TicketContext); // Access tickets from context
  const ticketsContainerRef = useRef(null);
  const navigate = useNavigate(); // Initialize navigate

  const scrollToTop = () => {
    if (ticketsContainerRef.current) {
      ticketsContainerRef.current.scrollTop = 0;
    }
  };

  const handleBackClick = () => {
    navigate(-1); // Navigate to the previous page
  };

  return (
    <TicketContainer>
      <Title>My Tickets</Title>
      <TicketCount>Total Tickets: {tickets.length}</TicketCount>
      <TicketsContainer ref={ticketsContainerRef}>
        {tickets.map((ticket) => (
          <TicketCard key={ticket.id}>
            <TicketText><strong>ID:</strong> {ticket.id}</TicketText>
            <TicketText><strong>Support Team:</strong> {ticket.supportTeam}</TicketText>
            <TicketText><strong>Reason:</strong> {ticket.reason}</TicketText>
            <TicketText><strong>Priority:</strong> {ticket.priority}</TicketText>
            <TicketText><strong>Description:</strong> {ticket.description}</TicketText>
            <TicketText>
              <strong>Attachment:</strong>{' '}
              {ticket.attachment && (
                <TicketLink href={`path/to/attachments/${ticket.attachment}`} download>
                  {ticket.attachment}
                </TicketLink>
              )}
            </TicketText>
          </TicketCard>
        ))}
      </TicketsContainer>
      <BackButton onClick={handleBackClick}>Back</BackButton>
    </TicketContainer>
  );
};

export default Ticket;
