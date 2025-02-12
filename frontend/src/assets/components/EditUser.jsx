import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useHistory } from 'react-router-dom';

const EditUser = () => {
  const { id } = useParams(); // Get user ID from URL params
  const history = useHistory(); // For navigation after update
  const [user, setUser] = useState({
    name: '',
    email: '',
    phone: '',
    role: '',
    className: '',
    division: '',
    busNo: ''
  });

  const [loading, setLoading] = useState(true);

  // Fetch user details
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/user/${id}`);
        setUser(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    fetchUser();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:4000/api/user/${id}`, user);
      alert('User updated successfully');
      history.push('/dashboard'); // Navigate to the dashboard after successful update
    } catch (error) {
      console.error('Error updating user:', error);
      alert('Failed to update user');
    }
  };

  if (loading) return <p>Loading...</p>; // Show loading message while fetching data

  return (
    <div>
      <h2>Edit User</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={user.name}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={user.email}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Phone:
          <input
            type="tel"
            name="phone"
            value={user.phone}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Role:
          <input
            type="text"
            name="role"
            value={user.role}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        {user.role === 'teacher' && (
          <>
            <label>
              Class:
              <input
                type="text"
                name="className"
                value={user.className}
                onChange={handleChange}
              />
            </label>
            <br />
            <label>
              Division:
              <input
                type="text"
                name="division"
                value={user.division}
                onChange={handleChange}
              />
            </label>
            <br />
          </>
        )}
        {user.role === 'driver/helper' && (
          <label>
            Bus No:
            <input
              type="text"
              name="busNo"
              value={user.busNo}
              onChange={handleChange}
            />
          </label>
        )}
        <br />
        <button type="submit">Update User</button>
      </form>
    </div>
  );
};

export default EditUser;
