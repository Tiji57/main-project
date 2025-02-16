import React, { useState } from 'react';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('teacher'); // Role state
  const [className, setClassName] = useState('');
  const [division, setDivision] = useState('');
  const [busNo, setBusNo] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    setMessage('');

    try {
      const response = await fetch('http://localhost:4000/api/user/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password, role, className, division, busNo, phone }),
      });

      const data = await response.json();

      if (data.success) {
        alert('User registered successfully!');
      } else {
        setMessage(data.message);
      }
    } catch (error) {
      setMessage('Error: ' + error.message);
    }
  };

  return (
    <div style={pageContainer}>
      {/* Compact Header with Dark Blue Gradient */}
      <header style={headerStyle}>
        <h1 style={headerTitleStyle}>School Bus Management System</h1>
      </header>

      {/* Form Container */}
      <div style={formWrapperStyle}>
        <div style={formContainerStyle}>
          <h2 style={formTitleStyle}>User Registration</h2>
          {message && <p style={errorMessageStyle}>{message}</p>}
          <form onSubmit={handleRegister}>
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              style={inputStyle}
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={inputStyle}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={inputStyle}
            />
            <input
              type="text"
              placeholder="Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              style={inputStyle}
            />
            <select
              value={role}
              onChange={(e) => {
                setRole(e.target.value);
                // Reset teacher-specific fields when role changes
                setClassName('');
                setDivision('');
                setBusNo('');
              }}
              style={inputStyle}
            >
              <option value="teacher">Teacher</option>
              <option value="driver/helper">Driver/Helper</option>
              <option value="finance_manager">Finance Manager</option>
            </select>
            {role === 'teacher' && (
              <>
                <input
                  type="text"
                  placeholder="Class Name"
                  value={className}
                  onChange={(e) => setClassName(e.target.value)}
                  required
                  style={inputStyle}
                />
                <input
                  type="text"
                  placeholder="Division"
                  value={division}
                  onChange={(e) => setDivision(e.target.value)}
                  required
                  style={inputStyle}
                />
              </>
            )}
            {role === 'driver/helper' && (
              <input
                type="text"
                placeholder="Bus Number"
                value={busNo}
                onChange={(e) => setBusNo(e.target.value)}
                required
                style={inputStyle}
              />
            )}
            <button type="submit" style={buttonStyle}>
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

// --- Page Container --- //
const pageContainer = {
  width: '100%',
  minHeight: '100vh',
  backgroundColor: '#f0f8ff', // AliceBlue for a clean blue-white feel
  fontFamily: 'Times new Roman, sans-serif',
};

// --- Header Styles --- //
const headerStyle = {
  background: 'linear-gradient(45deg,rgb(60, 128, 231),rgb(22, 42, 61))', // Dark blue gradient
  color: '#fff',
  padding: '20px 10px', // Reduced vertical padding
  textAlign: 'center',
};

const headerTitleStyle = {
  fontSize: '28px', // Smaller font size for a compact header
  margin: 0,
  fontWeight: 'bold',
  textShadow: '1px 1px 3px rgba(0, 0, 0, 0.3)',
};

// --- Form Wrapper and Container --- //
const formWrapperStyle = {
  display: 'flex',
  justifyContent: 'center',
  padding: '20px',
};

const formContainerStyle = {
  backgroundColor: '#fff',
  padding: '40px 30px',
  borderRadius: '8px',
  boxShadow: '0 4px 12px rgba(201, 225, 230, 0.6)', // Blue-tinted shadow for a glossy look
  width: '100%',
  maxWidth: '500px',
};

// --- Form Title and Error Message --- //
const formTitleStyle = {
  textAlign: 'center',
  marginBottom: '20px',
  color: '#333',
  fontSize: '28px',
};

const errorMessageStyle = {
  textAlign: 'center',
  marginBottom: '15px',
  fontSize: '16px',
  color: '#e74c3c',
};

// --- Input and Button Styles --- //
const inputStyle = {
  width: '100%',
  padding: '12px',
  marginBottom: '15px',
  borderRadius: '5px',
  border: '1px solid #ccc',
  fontSize: '16px',
  boxSizing: 'border-box',
  transition: 'border-color 0.3s ease',
};

const buttonStyle = {
  width: '100%',
  padding: '12px',
  background: 'linear-gradient(to right, #21CBF3, #2196F3)', // Glossy blue gradient
  color: '#fff',
  border: 'none',
  borderRadius: '5px',
  fontSize: '16px',
  cursor: 'pointer',
  transition: 'background-color 0.3s ease, transform 0.2s ease',
};

export default Register;
