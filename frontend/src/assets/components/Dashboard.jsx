import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';


const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingUser, setEditingUser] = useState(null);
  const [updatedUser, setUpdatedUser] = useState({
    name: '',
    email: '',
    phone: '',
    role: '',
    className: '',
    division: '',
    busNo: '',
  });

  // Fetch users from the backend when the component mounts
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/user/all');
        setUsers(response.data); // Store users in state
        setLoading(false); // Set loading to false once data is fetched
      } catch (error) {
        console.error('Error fetching users:', error);
        setLoading(false); // Set loading to false in case of an error
      }
    };

    fetchUsers();
  }, []);

  // Filter users based on role
  const teachers = users.filter(user => user.role === 'teacher');
  const drivers = users.filter(user => user.role === 'driver/helper');
  const others = users.filter(user => user.role !== 'teacher' && user.role !== 'driver/helper');

  // Delete user by ID
  const handleDelete = async (id) => {
    console.log("Deleting user with id:", id); // Log the id to verify it
    try {
      await axios.delete(`http://localhost:4000/api/user/${id}`);
      setUsers(users.filter(user => user._id !== id)); // Remove user from the state
      alert('User deleted successfully');
    } catch (error) {
      console.error('Error deleting user:', error);
      alert('Failed to delete user');
    }
  };

  // Handle the edit form submission
  const handleUpdate = async (id) => {
    try {
      await axios.put(`http://localhost:4000/api/user/${id}`, updatedUser);
      setUsers(users.map(user => user._id === id ? { ...user, ...updatedUser } : user));
      setEditingUser(null);
      alert('User updated successfully');
    } catch (error) {
      console.error('Error updating user:', error);
      alert('Failed to update user');
    }
  };

  // Table component for user list
  const renderUserTable = (users, role) => {
    if (users.length === 0) return null;

    return (
      <div>
        <h3>{role}</h3>
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={tableHeaderStyle}>Name</th>
              <th style={tableHeaderStyle}>Email</th>
              <th style={tableHeaderStyle}>Phone</th>
              <th style={tableHeaderStyle}>Role</th>
              {role === 'Teachers' ? (
                <>
                  <th style={tableHeaderStyle}>Class</th>
                  <th style={tableHeaderStyle}>Division</th>
                </>
              ) : (
                <th style={tableHeaderStyle}>Bus No</th>
              )}
              <th style={tableHeaderStyle}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id} style={tableRowStyle}>
                <td style={tableDataStyle}>{user.name || 'N/A'}</td>
                <td style={tableDataStyle}>{user.email || 'N/A'}</td>
                <td style={tableDataStyle}>{user.phone || 'N/A'}</td>
                <td style={tableDataStyle}>{user.role || 'N/A'}</td>
                {role === 'Teachers' ? (
                  <>
                    <td style={tableDataStyle}>{user.className || 'N/A'}</td>
                    <td style={tableDataStyle}>{user.division || 'N/A'}</td>
                  </>
                ) : (
                  <td style={tableDataStyle}>{user.busNo || 'N/A'}</td>
                )}
                <td style={tableDataStyle}>
                  <button onClick={() => handleDelete(user._id)} style={deleteButtonStyle}>Delete</button>
                  <button onClick={() => {
                    setEditingUser(user);
                    setUpdatedUser({
                      name: user.name,
                      email: user.email,
                      phone: user.phone,
                      role: user.role,
                      className: user.className,
                      division: user.division,
                      busNo: user.busNo,
                    });
                  }} style={editButtonStyle}>Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedUser((prev) => ({ ...prev, [name]: value }));
  };

  if (loading) return <p>Loading...</p>; // Show loading message while fetching data

  return (
    <div>
      <header style={headerStyle}>
        <h2 style={headerTitleStyle}>Admin Dashboard</h2>
        <nav>
          <ul style={navListStyle}>
            <li style={navItemStyle}><Link to="/" style={linkStyle}>Home</Link></li>
            <li style={navItemStyle}><Link to="/Students" style={linkStyle}>Students</Link></li>
            <li style={navItemStyle}><Link to="/Register" style={linkStyle}>Register</Link></li>
            <li style={navItemStyle}><Link to="/login" style={linkStyle}>Logout</Link></li>
          </ul>
        </nav>
      </header>

      <div style={{ padding: '20px' }}>
        {/* Render the Teachers table */}
        {renderUserTable(teachers, 'Teachers')}

        {/* Render the Drivers table */}
        {renderUserTable(drivers, 'Drivers/Helpers')}

        {/* Render the Others table if any */}
        {renderUserTable(others, 'Others')}

        {/* Modal for Edit Form */}
        {editingUser && (
          <div style={modalOverlayStyle}>
            <div style={modalStyle}>
            <h3 style={modalHeadingStyle}>Edit User</h3>

              <form onSubmit={(e) => { e.preventDefault(); handleUpdate(editingUser._id); }}>
                <input
                  type="text"
                  name="name"
                  value={updatedUser.name}
                  onChange={handleInputChange}
                  placeholder="Name"
                  required
                  style={inputStyle}
                />
                <input
                  type="email"
                  name="email"
                  value={updatedUser.email}
                  onChange={handleInputChange}
                  placeholder="Email"
                  required
                  style={inputStyle}
                />
                <input
                  type="text"
                  name="phone"
                  value={updatedUser.phone}
                  onChange={handleInputChange}
                  placeholder="Phone"
                  required
                  style={inputStyle}
                />
                <select
                  name="role"
                  value={updatedUser.role}
                  onChange={handleInputChange}
                  required
                  style={inputStyle}
                >
                  <option value="teacher">Teacher</option>
                  <option value="driver/helper">Driver/Helper</option>
                  <option value="other">Other</option>
                </select>
                {updatedUser.role === 'teacher' && (
                  <>
                    <input
                      type="text"
                      name="className"
                      value={updatedUser.className}
                      onChange={handleInputChange}
                      placeholder="Class"
                      required
                      style={inputStyle}
                    />
                    <input
                      type="text"
                      name="division"
                      value={updatedUser.division}
                      onChange={handleInputChange}
                      placeholder="Division"
                      required
                      style={inputStyle}
                    />
                  </>
                )}
                {updatedUser.role === 'driver/helper' && (
                  <input
                    type="text"
                    name="busNo"
                    value={updatedUser.busNo}
                    onChange={handleInputChange}
                    placeholder="Bus No"
                    required
                    style={inputStyle}
                  />
                )}
                <div style={modalButtonsStyle}>
                  <button type="submit" style={updateButtonStyle}>Update</button>
                  <button type="button" onClick={() => setEditingUser(null)} style={cancelButtonStyle}>Cancel</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};


// Styles for the dashboard, table, and modal
const tableStyle = { width: '100%', borderCollapse: 'collapse', marginTop: '20px' };
const headerStyle = { background: 'linear-gradient(to right, rgb(43, 49, 59), rgb(27, 72, 99))', padding: '10px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: '#fff', fontSize: '1.2rem', fontWeight: 'bold' };
const headerTitleStyle = { margin: 0 };
const tableHeaderStyle = { borderBottom: '2px solid #ddd', padding: '10px', textAlign: 'left', backgroundColor: '#f2f2f2', fontWeight: 'bold' };
const tableRowStyle = { borderBottom: '1px solid #ddd' };
const tableDataStyle = { padding: '10px', textAlign: 'left' };
const deleteButtonStyle = { backgroundColor: '#f44336', color: 'white', padding: '5px 10px', border: 'none', cursor: 'pointer' };
const editButtonStyle = { backgroundColor: '#4CAF50', color: 'white', padding: '5px 10px', border: 'none', cursor: 'pointer', marginLeft: '10px' };
const navListStyle = { listStyle: 'none', padding: 0, display: 'flex', justifyContent: 'center' };
const navItemStyle = { margin: '0 15px' };
const linkStyle = { color: '#fff', textDecoration: 'none', fontSize: '1rem', fontWeight: 'bold', transition: 'color 0.3s' };

const modalOverlayStyle = { position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0, 0, 0, 0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center' };
const modalStyle = { 
  backgroundColor: '#fff', 
  padding: '20px', 
  borderRadius: '5px', 
  width: '600px', // Increased width from 400px to 600px
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)' 
};
const modalHeadingStyle = {
  textAlign: 'center', // Center the heading
  marginBottom: '20px', // Add some space below the heading
};

const inputStyle = {
  width: '90%',  // Adjusted width to make inputs more compact
  padding: '10px',
  margin: '10px 0',
  borderRadius: '5px',
  border: '1px solid #ccc'
};
const updateButtonStyle = { backgroundColor: '#4CAF50', color: 'white', padding: '10px 20px', border: 'none', cursor: 'pointer' };
const cancelButtonStyle = { backgroundColor: '#f44336', color: 'white', padding: '10px 20px', border: 'none', cursor: 'pointer', marginLeft: '10px' };
const modalButtonsStyle = {
  display: 'flex',
  justifyContent: 'center', // Center the buttons horizontally
  gap: '10px' // Add space between buttons
};

export default Dashboard;
