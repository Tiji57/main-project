import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const UpdateUser = () => {
  const { id } = useParams(); // Get user ID from URL
  const navigate = useNavigate(); // For navigation after update

  const [user, setUser] = useState({
    name: '',
    email: '',
    phone: '',
    role: '',
    className: '',
    division: '',
    busNo: '',
  });

  const [loading, setLoading] = useState(true);

  // Fetch user details by ID when the component mounts
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/user/${id}`);
        setUser(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching user data:', error);
        alert('Failed to fetch user details');
        navigate('/'); // Redirect to dashboard in case of error
      }
    };

    fetchUser();
  }, [id, navigate]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:4000/api/user/${id}`, user);
      alert('User updated successfully');
      navigate('/'); // Redirect to dashboard after successful update
    } catch (error) {
      console.error('Error updating user:', error);
      alert('Failed to update user');
    }
  };

  if (loading) return <p>Loading...</p>; // Show loading message while fetching data

  return (
    <div style={containerStyle}>
      <h2 style={headerStyle}>Update User</h2>
      <form onSubmit={handleSubmit} style={formStyle}>
        <div style={formGroupStyle}>
          <label style={labelStyle}>Name</label>
          <input
            type="text"
            name="name"
            value={user.name}
            onChange={handleChange}
            style={inputStyle}
          />
        </div>
        <div style={formGroupStyle}>
          <label style={labelStyle}>Email</label>
          <input
            type="email"
            name="email"
            value={user.email}
            onChange={handleChange}
            style={inputStyle}
          />
        </div>
        <div style={formGroupStyle}>
          <label style={labelStyle}>Phone</label>
          <input
            type="text"
            name="phone"
            value={user.phone}
            onChange={handleChange}
            style={inputStyle}
          />
        </div>
        <div style={formGroupStyle}>
          <label style={labelStyle}>Role</label>
          <select
            name="role"
            value={user.role}
            onChange={handleChange}
            style={inputStyle}
          >
            <option value="teacher">Teacher</option>
            <option value="driver/helper">Driver/Helper</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        {user.role === 'teacher' && (
          <>
            <div style={formGroupStyle}>
              <label style={labelStyle}>Class</label>
              <input
                type="text"
                name="className"
                value={user.className}
                onChange={handleChange}
                style={inputStyle}
              />
            </div>
            <div style={formGroupStyle}>
              <label style={labelStyle}>Division</label>
              <input
                type="text"
                name="division"
                value={user.division}
                onChange={handleChange}
                style={inputStyle}
              />
            </div>
          </>
        )}
        {user.role === 'driver/helper' && (
          <div style={formGroupStyle}>
            <label style={labelStyle}>Bus No</label>
            <input
              type="text"
              name="busNo"
              value={user.busNo}
              onChange={handleChange}
              style={inputStyle}
            />
          </div>
        )}
        <button type="submit" style={submitButtonStyle}>
          Update
        </button>
      </form>
    </div>
  );
};

// Styles for the Update User form
const containerStyle = {
  maxWidth: '500px',
  margin: '0 auto',
  padding: '20px',
  background: '#f9f9f9',
  borderRadius: '8px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
};

const headerStyle = {
  textAlign: 'center',
  marginBottom: '20px',
  color: '#333',
};

const formStyle = {
  display: 'flex',
  flexDirection: 'column',
};

const formGroupStyle = {
  marginBottom: '15px',
};

const labelStyle = {
  marginBottom: '5px',
  fontWeight: 'bold',
};

const inputStyle = {
  width: '100%',
  padding: '10px',
  border: '1px solid #ddd',
  borderRadius: '4px',
  fontSize: '16px',
};

const submitButtonStyle = {
  backgroundColor: '#4CAF50',
  color: 'white',
  padding: '10px 15px',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
  fontSize: '16px',
};

export default UpdateUser;
