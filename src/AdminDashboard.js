import React from 'react';
import styled from 'styled-components';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';

const AdminDashboard = () => {
  // Sample data for the charts
  const ticketData = [
    { name: 'Raised Tickets', value: 35 },
  ];
  const leaveData = [
    { name: 'Approved', value: 15 },
    { name: 'Pending', value: 5 },
    { name: 'Rejected', value: 2 },
  ];
  const resignationData = [
    { name: 'January', Resignations: 2 },
    { name: 'February', Resignations: 1 },
    { name: 'March', Resignations: 3 },
    { name: 'April', Resignations: 0 },
    { name: 'May', Resignations: 1 },
    { name: 'June', Resignations: 2 },
  ];
  const COLORS = ['#0088FE', '#FF8042'];

  return (
    <DashboardContainer>
      <DashboardHeader>
        <h1>Admin Dashboard</h1>
      </DashboardHeader>
      <DashboardContent>
        {/* Summary Metrics */}
        <DashboardMetrics>
          <MetricCard1>
            <H2222>Raised Tickets</H2222>
            <p>35</p>
          </MetricCard1>
          <MetricCard2>
            <H2222>Upcoming Interviews</H2222>
            <p>5</p>
          </MetricCard2>
          <MetricCard3>
            <H2222>Total Employees</H2222>
            <p>170</p>
          </MetricCard3>
          <MetricCard1>
            <H2222>Team Leaders</H2222>
            <p>10</p>
          </MetricCard1>
          <MetricCard2>
            <H2222>Pending Leave Requests</H2222>
            <p>5</p>
          </MetricCard2>
          <MetricCard3>
            <H2222>Recent Resignations</H2222>
            <p>3</p>
          </MetricCard3>
        </DashboardMetrics>
        {/* Graphical Representations */}
        <DashboardGraphs>
          {/* Tickets Status */}
          <ChartContainer>
            <h3>Ticket Status</h3>
            <ResponsiveContainer width="100%" height="90%">
              <PieChart>
                <Pie
                  data={ticketData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius="80%"
                  fill="#8884D8"
                  dataKey="value"
                >
                  {ticketData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </ChartContainer>
          {/* Leave Requests */}
          <ChartContainer>
            <h3>Leave Requests</h3>
            <ResponsiveContainer width="100%" height="90%" margin-top="10%">
              <BarChart data={leaveData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill="#82CA9D" />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
          {/* Resignations */}
          <ChartContainer>
            <h3>Monthly Resignations</h3>
            <ResponsiveContainer width="100%" height="90%">
              <LineChart data={resignationData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="Resignations" stroke="#FF7300" />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </DashboardGraphs>
      </DashboardContent>
    </DashboardContainer>
  );
};


const DashboardContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2%;
  width: 102%;
  margin-left: -2%;
  margin-top: -4%;
  background-color: #F5F5F5;
  height: 80vh;
  overflow: auto;
`;

const DashboardHeader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1% 2%;
  // background-color: #3498DB;
  color: rgb(7, 10, 92);
  border-radius: 1%;
  margin-bottom: 2%;
`;

const H2222 = styled.h2`
  margin-left: -6px;
  text-align: center;
  color: white;
`;

const DashboardContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2%;
`;

const DashboardMetrics = styled.div`
  display: flex;
  gap: 2%;
  flex-wrap: wrap;
  justify-content: center;
`;

const MetricCard1 = styled.div`
  flex: 1;
 background-color: rgb(7, 10, 92);
  padding: 2%;
  color: white;
  border-radius: 1%;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
  min-width: 10%; 
  transition: transform 0.3s ease-in-out;

  &:hover {
    transform: scale(1.1);
    box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.5);
  }
`;

const MetricCard2 = styled.div`
  flex: 1;
 background-color: rgb(7, 10, 92);
  padding: 2%;
  color: white;
  border-radius: 1%;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
  min-width: 10%; 
  transition: transform 0.3s ease-in-out;

  &:hover {
    transform: scale(1.1); 
    box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.5);
  }
`;

const MetricCard3 = styled.div`
  flex: 1;
  // background-color: #f3e5f5; 
    background-color: rgb(7, 10, 92);
  padding: 2%;
  color: white;
  border-radius: 1%;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
  min-width: 10%; 
  transition: transform 0.3s ease-in-out;

  &:hover {
    transform: scale(1.1); /* Zoom in by 10% on hover */
     box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.5);
  }
`;

const DashboardGraphs = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 2%;
  justify-content: center;
  height:100%
`;

const ChartContainer = styled.div`
  flex: 1;
  background-color: white;
  padding: 2%;
  border-radius: 1%;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  min-width: 30%;
  height: 300px;
`;

export default AdminDashboard;
