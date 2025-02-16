import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './DisplayStudent.css';

const DisplayStudents = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch students from the API based on the teacher ID
  const fetchStudents = async (userId) => {
    try {
      const response = await axios.get(`http://localhost:4000/api/students?teacherId=${userId}`);
      
      if (response.data.data.length === 0) {
        setStudents([]); // No students found
      } else {
        setStudents(response.data.data);
      }
      
    } catch (error) {
      console.error('Error fetching students:', error);
      setError('No Students Found');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    if (userId) {
      fetchStudents(userId);
    } else {
      setError('User ID not found. Please log in.');
      setLoading(false);
    }
  }, []);

  if (loading) {
    return <div>Loading students...</div>;
  }

  return (
    <div className="container">
      {/* Page Header */}
      <header className="header">
        <div className="header-left">Teacher Dashboard</div>
        {/* Right Side - Navigation Links */}
        <nav className="header-nav">
          <ul>
            <li><Link to="/Fee">Fee Collection</Link></li>
            <li><Link to="/Teacher">Add Students</Link></li>
            <li><Link to="/Record">Fee Status</Link></li>
            <li><Link to="/">Logout</Link></li>
          </ul>
        </nav>
      </header>

      {/* Display student data */}
      <section className="student-section">
        {error ? (
          <p>{error}</p>
        ) : students.length === 0 ? (
          <p>No students found for this teacher.</p>
        ) : (
          <table className="student-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Class</th>
                <th>Guardian Name</th>
                <th>Guardian Number</th>
                <th>Bus Number</th>
                <th>Bus Fare</th>
                <th>Dropping Point</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr key={student._id}>
                  <td>{student.name}</td>
                  <td>{student.class}</td>
                  <td>{student.guardianName}</td>
                  <td>{student.guardianPhone}</td>
                  <td>{student.busNo}</td>
                  <td>{student.busFare}</td>
                  <td>{student.droppingPoint}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
    </div>
  );
};

export default DisplayStudents;
