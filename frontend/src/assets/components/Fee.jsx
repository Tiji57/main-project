import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Fee = () => {
  const [students, setStudents] = useState([]);
  const [feeData, setFeeData] = useState({
    studentId: '',
    busFare: 0,
    feeStatus: '',
    month: ''
  });

  const currentUserId = localStorage.getItem('userId');

  const fetchStudents = async () => {
    try {
      if (!currentUserId) {
        alert('User not logged in.');
        return;
      }

      const response = await axios.get(`http://localhost:4000/api/students?teacherId=${currentUserId}`);
      setStudents(response.data.data);
    } catch (error) {
      alert('Error fetching student records.');
    }
  };

  useEffect(() => {
    if (currentUserId) {
      fetchStudents();
    }
  }, [currentUserId]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // If the selected student, update busFare
    if (name === 'studentId') {
      const selectedStudent = students.find(student => student._id === value);
      setFeeData((prevData) => ({
        ...prevData,
        [name]: value,
        busFare: selectedStudent ? selectedStudent.busFare : 0,  // Update busFare based on selected student
      }));
    } else {
      setFeeData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Get the month name from the array
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];

    const monthName = months[feeData.month - 1]; // month is 1-based index

    try {
      const response = await axios.post(`http://localhost:4000/api/fees`, {
        studentId: feeData.studentId,
        feeStatus: feeData.feeStatus,
        month: monthName,  // Send the month name instead of index
        busFare: feeData.busFare // Send the busFare
      });

      if (response.status === 201) {
        alert('Fee status added successfully.');
      } else {
        alert('Failed to add fee status.');
      }
    } catch (error) {
      console.error('Error adding fee status:', error);
      alert('Error adding fee status.');
    }
  };

  const getMonthOptions = () => {
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    return months.map((month, index) => (
      <option key={index} value={index + 1}>
        {month}
      </option>
    ));
  };

  const containerStyle = {
    maxWidth: '600px',
    margin: '0 auto',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '8px',
    backgroundColor: '#f9f9f9',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
  };

  const labelStyle = {
    display: 'block',
    marginBottom: '8px',
    fontWeight: 'bold'
  };

  const inputStyle = {
    width: '100%',
    padding: '8px',
    marginBottom: '16px',
    borderRadius: '4px',
    border: '1px solid #ccc'
  };

  const buttonStyle = {
    padding: '10px 20px',
    backgroundColor: '#007BFF',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer'
  };

  const buttonHoverStyle = {
    ...buttonStyle,
    backgroundColor: '#0056b3'
  };

  return (
    <div style={containerStyle}>
      <h2>Fee Management</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label style={labelStyle} htmlFor="student">Select Student</label>
          <select
            id="student"
            name="studentId"
            value={feeData.studentId}
            onChange={handleChange}
            style={inputStyle}
          >
            <option value="">--Select a student--</option>
            {students.map((student) => (
              <option key={student._id} value={student._id}>
                {student.name}
              </option>
            ))}
          </select>
        </div>

        {feeData.studentId && (
          <>
            <div>
              <label style={labelStyle} htmlFor="busFare">Bus Fare</label>
              <input
                type="number"
                id="busFare"
                name="busFare"
                value={feeData.busFare || students.find(student => student._id === feeData.studentId)?.busFare}
                onChange={handleChange}
                style={inputStyle}
                required
              />
            </div>

            <div>
              <label style={labelStyle} htmlFor="month">Select Month</label>
              <select
                id="month"
                name="month"
                value={feeData.month}
                onChange={handleChange}
                style={inputStyle}
                required
              >
                <option value="">--Select Month--</option>
                {getMonthOptions()}
              </select>
            </div>
          </>
        )}

        <div>
          <label style={labelStyle} htmlFor="feeStatus">Fee Status</label>
          <select
            id="feeStatus"
            name="feeStatus"
            value={feeData.feeStatus}
            onChange={handleChange}
            style={inputStyle}
            required
          >
            <option value="">--Select Status--</option>
            <option value="Paid">Paid</option>
            <option value="Unpaid">Unpaid</option>
            <option value="Pending">Pending</option>
          </select>
        </div>

        <div>
          <button
            type="submit"
            style={buttonStyle}
            onMouseOver={(e) => (e.target.style.backgroundColor = '#0056b3')}
            onMouseOut={(e) => (e.target.style.backgroundColor = '#007BFF')}
          >
            Add Fee Status
          </button>
        </div>
      </form>
    </div>
  );
};

export default Fee;
