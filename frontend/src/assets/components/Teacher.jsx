import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Teacher = () => {
  const [studentName, setStudentName] = useState('');
  const [studentClass, setStudentClass] = useState('');
  const [studentDivision, setStudentDivision] = useState('');
  const [guardianName, setGuardianName] = useState('');
  const [guardianPhone, setGuardianPhone] = useState('');
  const [busFare, setBusFare] = useState('');
  const [droppingPoint, setDroppingPoint] = useState('');
  const [busNo, setBusNo] = useState('');

  // Function to get teacherId from localStorage
  const getTeacherId = () => {
    const teacherId = localStorage.getItem('userId'); // Retrieve teacherId from localStorage
    if (!teacherId) {
      alert('Teacher ID is required');
      return null;
    }
    return teacherId;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const teacherId = getTeacherId(); // Get the teacherId from localStorage
    if (!teacherId) {
      alert('Teacher ID is required');
      return;
    }

    const studentData = {
      name: studentName,
      class: studentClass,
      division: studentDivision,
      guardianName,
      guardianPhone,
      busFare,
      droppingPoint,
      busNo,
      teacherId, // Include teacherId in the request
    };

    console.log('Sending student data:', studentData);
    alert('Student added successfully!');

    try {
      const response = await axios.post(
        'http://localhost:4000/api/students/addStudent',
        studentData,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      console.log('Response:', response.data);
    } catch (error) {
      console.error(
        'Error adding student:',
        error.response ? error.response.data : error
      );
    }
    console.log('Student Data:', studentData);
  };

  return (
    <div>
      {/* Header with navigation links (unchanged) */}
      <header style={headerStyle}>
        <nav>
          <ul style={navListStyle}>
            <li style={navItemStyle}>
              <Link to="/" style={linkStyle}>
                Home
              </Link>
            </li>
            <li style={navItemStyle}>
              <Link to="/logout" style={linkStyle}>
                Logout
              </Link>
            </li>
            <li style={navItemStyle}>
              <Link to="/Display" style={linkStyle}>
                Students
              </Link>
            </li>
            <li style={navItemStyle}>
              <Link to="/Fee" style={linkStyle}>
                Fee
              </Link>
            </li>
          </ul>
        </nav>
      </header>

      {/* Full-width Form Container */}
      <div style={fullWidthContainer}>
        <div style={formContainerStyle}>
          <h2 style={{ textAlign: 'center', marginBottom: '20px', color: '#333' }}>
            Add Student
          </h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Student Name"
              onChange={(e) => setStudentName(e.target.value)}
              style={inputStyle}
            />
            <input
              type="text"
              placeholder="Class"
              onChange={(e) => setStudentClass(e.target.value)}
              style={inputStyle}
            />
            <input
              type="text"
              placeholder="Division"
              onChange={(e) => setStudentDivision(e.target.value)}
              style={inputStyle}
            />
            <input
              type="text"
              placeholder="Guardian Name"
              onChange={(e) => setGuardianName(e.target.value)}
              style={inputStyle}
            />
            <input
              type="text"
              placeholder="Guardian Phone"
              onChange={(e) => setGuardianPhone(e.target.value)}
              style={inputStyle}
            />
            <input
              type="number"
              placeholder="Bus Fare"
              onChange={(e) => setBusFare(e.target.value)}
              style={inputStyle}
            />
            <input
              type="text"
              placeholder="Dropping Point"
              onChange={(e) => setDroppingPoint(e.target.value)}
              style={inputStyle}
            />
            <input
              type="text"
              placeholder="Bus Number"
              onChange={(e) => setBusNo(e.target.value)}
              style={inputStyle}
            />
            <button
              type="submit"
              style={buttonStyle}
              onMouseOver={(e) => (e.target.style.backgroundColor = '#0056b3')}
              onMouseOut={(e) => (e.target.style.backgroundColor = '#007bff')}
            >
              Add Student
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

// --- Full-width Container Style --- //
const fullWidthContainer = {
  width: '100%',
  padding: '20px',
  boxSizing: 'border-box',
};

// --- Enhanced Form CSS --- //
const formContainerStyle = {
  backgroundColor: '#fff',
  padding: '40px 30px',
  borderRadius: '8px',
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
  width: '100%',
  maxWidth: '800px', // Adjust max-width as needed
  margin: '0 auto',
};

const inputStyle = {
  width: '100%',
  padding: '12px',
  marginBottom: '15px',
  border: '1px solid #ccc',
  borderRadius: '4px',
  fontSize: '1rem',
  boxSizing: 'border-box',
  transition: 'border-color 0.3s ease',
};

const buttonStyle = {
  width: '100%',
  padding: '12px',
  backgroundColor: '#007bff',
  color: '#fff',
  border: 'none',
  borderRadius: '5px',
  fontSize: '1rem',
  fontWeight: 'bold',
  cursor: 'pointer',
  transition: 'background-color 0.3s ease',
};

// --- Header and Link Styles (Unchanged) --- //
const headerStyle = {
  background: 'linear-gradient(to right, rgb(43, 49, 59), rgb(27, 72, 99))',
  padding: '10px 20px',
  display: 'flex',
  justifyContent: 'flex-end',
  alignItems: 'center',
  color: '#fff',
  fontSize: '1.2rem',
  fontWeight: 'bold',
};

const navListStyle = {
  listStyle: 'none',
  padding: 0,
  display: 'flex',
  justifyContent: 'center',
};

const navItemStyle = {
  margin: '0 15px',
};

const linkStyle = {
  color: '#fff',
  textDecoration: 'none',
  fontSize: '1rem',
  fontWeight: 'bold',
  transition: 'color 0.3s',
};

export default Teacher;
