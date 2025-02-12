import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Students = () => {
  const [students, setStudents] = useState([]);
  const [searchClass, setSearchClass] = useState('');
  const [searchDivision, setSearchDivision] = useState('');

  useEffect(() => {
    // Fetch students from your backend API
    const fetchStudents = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/students/all');
        setStudents(response.data); // Set the fetched students data to the state
      } catch (error) {
        console.error('Error fetching students:', error);
      }
    };

    fetchStudents();
  }, []); // Empty array means this effect will run once when the component mounts

  // Filter students based on class and division
  const filteredStudents = students.filter((student) => {
    return (
      (searchClass === '' || student.class.toLowerCase().includes(searchClass.toLowerCase())) &&
      (searchDivision === '' || student.division.toLowerCase().includes(searchDivision.toLowerCase()))
    );
  });

  return (
    <div style={containerStyle}>
      <h1 style={headingStyle}>Students List</h1>

      {/* Search Fields */}
      <div style={searchContainerStyle}>
        <input
          type="text"
          placeholder="Search by Class"
          value={searchClass}
          onChange={(e) => setSearchClass(e.target.value)}
          style={searchInputStyle}
        />
        <input
          type="text"
          placeholder="Search by Division"
          value={searchDivision}
          onChange={(e) => setSearchDivision(e.target.value)}
          style={searchInputStyle}
        />
      </div>

      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={headerCellStyle}>Name</th>
            <th style={headerCellStyle}>Class</th>
            <th style={headerCellStyle}>Division</th>
            <th style={headerCellStyle}>Guardian Name</th>
            <th style={headerCellStyle}>Guardian Phone</th>
            <th style={headerCellStyle}>Bus Fare</th>
            <th style={headerCellStyle}>Dropping Point</th>
            <th style={headerCellStyle}>Bus Number</th>
          </tr>
        </thead>
        <tbody>
          {filteredStudents.length > 0 ? (
            filteredStudents.map((student, index) => (
              <tr key={index} style={rowStyle}>
                <td style={cellStyle}>{student.name}</td>
                <td style={cellStyle}>{student.class}</td>
                <td style={cellStyle}>{student.division}</td>
                <td style={cellStyle}>{student.guardianName}</td>
                <td style={cellStyle}>{student.guardianPhone}</td>
                <td style={cellStyle}>{student.busFare}</td>
                <td style={cellStyle}>{student.droppingPoint}</td>
                <td style={cellStyle}>{student.busNo}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8" style={noDataStyle}>No students found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Students;

// CSS styles
const containerStyle = {
  padding: '20px',
  fontFamily: 'Arial, sans-serif',
  backgroundColor: '#f4f7fc',
};

const headingStyle = {
  textAlign: 'center',
  color: '#2c3e50',
  fontSize: '2rem',
  marginBottom: '20px',
};

const searchContainerStyle = {
  display: 'flex',
  justifyContent: 'center',
  gap: '10px',
  marginBottom: '20px',
};

const searchInputStyle = {
  padding: '8px',
  width: '200px',
  borderRadius: '4px',
  border: '1px solid #ccc',
};

const tableStyle = {
  width: '100%',
  borderCollapse: 'collapse',
  backgroundColor: '#fff',
  boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
};

const headerCellStyle = {
  backgroundColor: 'grey',
  color: '#fff',
  padding: '12px',
  textAlign: 'left',
  fontWeight: 'bold',
};

const rowStyle = {
  borderBottom: '1px solid #ddd',
};

const cellStyle = {
  padding: '12px',
  textAlign: 'left',
};

const noDataStyle = {
  textAlign: 'center',
  padding: '20px',
  color: '#7f8c8d',
  fontStyle: 'italic',
};
