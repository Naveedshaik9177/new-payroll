import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAttendance } from '../contexts/AttendanceContext';
import styled from 'styled-components';

const AttendanceView = ({ employees = [] }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [dateFrom, setDateFrom] = useState('');
    const [dateTo, setDateTo] = useState('');
    const [filteredData, setFilteredData] = useState([]);
    const { getAttendanceForDate } = useAttendance();
    const navigate = useNavigate();

    useEffect(() => {
        if (dateFrom && dateTo) {
            const startDate = new Date(dateFrom);
            const endDate = new Date(dateTo);
            const result = employees.map(employee => {
                const attendanceDates = [];
                for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
                    const dayHistory = getAttendanceForDate(d, employee.id);
                    if (dayHistory && dayHistory.length > 0) {
                        attendanceDates.push({
                            date: formatDate(d),
                            entries: dayHistory
                        });
                    }
                }
                return { ...employee, attendance: attendanceDates };
            });
            setFilteredData(result);
        } else {
            setFilteredData([]); // Reset if no date is selected
        }
    }, [dateFrom, dateTo, employees, getAttendanceForDate]);

    const handleSearch = () => {
        if (searchTerm) {
            const searchResults = employees.filter(employee =>
                employee.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredData(searchResults.length > 0 ? searchResults : []);
        } else {
            setFilteredData([]); // Reset if no search term
        }
    };

    const handleGenerateCSV = () => {
        let csvContent = 'Employee ID,Employee Name,Department,Date,Clock In,Clock Out,Total Hours,Manager\n';

        filteredData.forEach(employee => {
            if (employee.attendance && employee.attendance.length > 0) {
                employee.attendance.forEach(record => {
                    const clockIn = record.entries.find(entry => entry.type === 'Clock In');
                    const clockOut = record.entries.find(entry => entry.type === 'Clock Out');
                    const totalHours = clockIn && clockOut ? formatTimeDifference(clockOut.time, clockIn.time) : '---';

                    csvContent += `${employee.id},${employee.name},${employee.department},${record.date},`;
                    csvContent += `${clockIn ? formatTime(clockIn.time) : '---'},`;
                    csvContent += `${clockOut ? formatTime(clockOut.time) : '---'},`;
                    csvContent += `${totalHours},${employee.manager}\n`;
                });
            } else {
                csvContent += `${employee.id},${employee.name},${employee.department},No attendance records found\n`;
            }
        });

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'attendance_report.csv');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const formatDate = (date) => {
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = String(date.getFullYear());
        return `${day}/${month}/${year}`;
    };

    const formatTime = (time) => {
        const date = new Date(time);
        return date.toLocaleTimeString();
    };

    const formatTimeDifference = (end, start) => {
        const totalSeconds = (new Date(end) - new Date(start)) / 1000;
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = Math.floor(totalSeconds % 60);
        return `${hours}h ${minutes}m ${seconds}s`;
    };

    return (
        <AttendanceViewContainer>
            <h1>Attendance View</h1>
            <SearchContainer>
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search by employee name"
                />
                {/* <button onClick={handleSearch}>Search</button> */}
            </SearchContainer>
            <DateFilters>
                <input
                    type="date"
                    value={dateFrom}
                    onChange={(e) => setDateFrom(e.target.value)}
                />
                <input
                    type="date"
                    value={dateTo}
                    onChange={(e) => setDateTo(e.target.value)}
                />
            </DateFilters>
            {filteredData.length > 0 ? (
                <AttendanceTable>
                    <table>
                        <thead>
                            <tr>
                                <th>Employee ID</th>
                                <th>Employee Name</th>
                                <th>Department</th>
                                <th>Date</th>
                                <th>Clock In</th>
                                <th>Clock Out</th>
                                <th>Total Hours</th>
                                <th>Manager</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredData.map((employee, index) =>
                                employee.attendance.map((record, recordIndex) => (
                                    <tr key={`${index}-${recordIndex}`}>
                                        <td>{employee.id}</td>
                                        <td>{employee.name}</td>
                                        <td>{employee.department}</td>
                                        <td>{record.date}</td>
                                        <td>
                                            {record.entries.filter(entry => entry.type === 'Clock In').map((entry, entryIndex) => (
                                                <div key={entryIndex}>{formatTime(entry.time)}</div>
                                            ))}
                                        </td>
                                        <td>
                                            {record.entries.filter(entry => entry.type === 'Clock Out').map((entry, entryIndex) => (
                                                <div key={entryIndex}>{formatTime(entry.time)}</div>
                                            ))}
                                        </td>
                                        <td>
                                            {record.entries.length >= 2 ?
                                                formatTimeDifference(record.entries.find(entry => entry.type === 'Clock Out').time,
                                                    record.entries.find(entry => entry.type === 'Clock In').time) : '---'}
                                        </td>
                                        <td>{employee.manager}</td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                    <button onClick={handleGenerateCSV}>Generate CSV</button>
                </AttendanceTable>
            ) : (
                <p>No data found</p>
            )}
            <BackButton onClick={() => navigate(0)}>Back</BackButton>
        </AttendanceViewContainer>
    );
};

const AttendanceViewContainer = styled.div`
    color: #FFFFFF;
    box-shadow: 0 4% 14% rgba(0, 0, 0, 0.1);
    border: 2px solid #FBFBFB;
    border-radius: 10%;
    width: 52%;
    // height:60%;
    margin: 4% auto;
    padding: 2%;
    box-sizing: border-box;
    background-color: #2f30312f;
    margin-right: 42%;
    position: relative;

    @media (max-width: 800px) {
        width: 90%;
        margin-right: 0;
    }
`;

const SearchContainer = styled.div`
    display: flex;
    justify-content: center;
    margin-bottom: 2%;
    margin-top: 4%;
    color: #FFFFFF;

    input {
        padding: 2%;
        border-radius: 4%;
        border: 1% solid #ccc;
        background-color: transparent;
        color: white;
        flex: 1;
    }

    button {
        padding: 2%;
        // border-radius: 4%;
        // border: 1% solid #ccc;
        background-color: #007bff;
        color: white;
        cursor: pointer;
        flex: 1;
    }

    button:hover {
        background-color: #0056b3;
    }
`;

const DateFilters = styled.div`
    width: 95%;
    display: flex;
    justify-content: center;
    gap: 2%;
    margin-bottom: 2%;
    margin-left: 3%;

    input {
        padding: 1.5%;
        background-color: transparent;
        color: white;
        border: 1% solid white;
        border-radius: 0%;
        font-size: 1.6em;
    }

    input:hover,
    input:focus {
        border-color: #007bff;
        outline: none;
    }

    input[type="date"]::-webkit-calendar-picker-indicator {
        filter: invert(1);
    }
`;

const AttendanceTable = styled.div`
    width: 95%;
    margin: 0 auto;
    color: white;

    table {
        width: 100%;
        border-collapse: collapse;
        margin-bottom: 2%;
        color: white;

        th, td {
            padding: 1%;
            text-align: left;
        }

        th {
            background-color: #007bff;
            color: white;
        }

        td {
            background-color: #2f3031;
        }

        tr:nth-child(even) td {
            background-color: #333;
        }

        tr:nth-child(odd) td {
            background-color: #2f3031;
        }
    }

    button {
        padding: 1%;
        // border-radius: 4%;
        // border: 1% solid #ccc;
        background-color: #007bff;
        color: white;
        cursor: pointer;
        margin-top: 2%;
    }

    button:hover {
        background-color: #0056b3;
    }
`;

const BackButton = styled.button`
    position: absolute;
    bottom: 2%;
    left: 8%;
    padding: 1%;
    // border-radius: 2%;
     border: 1% solid #ccc;
    background-color: #007bff;
    color: white;
    cursor: pointer;

    &:hover {
        background-color: #0056b3;
    }
`;

export default AttendanceView;
