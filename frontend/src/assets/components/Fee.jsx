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

  useEffect(() => {
    if (currentUserId) {
      fetchStudents();
    }
  }, [currentUserId]);

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

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'studentId') {
      const selectedStudent = students.find(student => student._id === value);
      setFeeData(prevData => ({
        ...prevData,
        [name]: value,
        busFare: selectedStudent ? selectedStudent.busFare : 0,
      }));
    } else {
      setFeeData(prevData => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const monthName = months[feeData.month - 1];

    try {
      const response = await axios.post(`http://localhost:4000/api/fees`, {
        studentId: feeData.studentId,
        feeStatus: feeData.feeStatus,
        month: monthName,
        busFare: feeData.busFare
      });

      if (response.status === 201) {
        alert('Fee status added successfully.');
      } else {
        alert('Failed to add fee status.');
      }
    } catch (error) {
      alert('Error adding fee status.');
    }
  };

  return (
    <div>
      <div style={{
        width: '100%',
        background: 'linear-gradient(45deg, #003366, #007BFF, #99CCFF)',
        color: 'white',
        textAlign: 'center',
        padding: '20px',
        fontSize: '28px',
        fontWeight: 'bold',
        marginBottom: '20px'
      }}>
        School Bus Fee Management System
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <div style={{ width: '500px', padding: '30px', borderRadius: '10px', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)', textAlign: 'left' }}>
          <form onSubmit={handleSubmit}>
            <div>
              <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px' }}>Select Student</label>
              <select name="studentId" value={feeData.studentId} onChange={handleChange} style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc', marginBottom: '15px' }} required>
                <option value="">--Select a student--</option>
                {students.map(student => (
                  <option key={student._id} value={student._id}>{student.name}</option>
                ))}
              </select>
            </div>

            {feeData.studentId && (
              <>
                <div>
                  <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px' }}>Bus Fare</label>
                  <input type="number" name="busFare" value={feeData.busFare} readOnly style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc', marginBottom: '15px' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px' }}>Select Month</label>
                  <select name="month" value={feeData.month} onChange={handleChange} style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc', marginBottom: '15px' }} required>
                    <option value="">--Select Month--</option>
                    {[...Array(12)].map((_, index) => (
                      <option key={index} value={index + 1}>{['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'][index]}</option>
                    ))}
                  </select>
                </div>
              </>
            )}

            <div>
              <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px' }}>Fee Status</label>
              <select name="feeStatus" value={feeData.feeStatus} onChange={handleChange} style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc', marginBottom: '15px' }} required>
                <option value="">--Select Status--</option>
                <option value="Paid">Paid</option>
                <option value="Unpaid">Unpaid</option>
                <option value="Pending">Pending</option>
              </select>
            </div>

            <button type="submit" style={{
              width: '100%',
              background: 'linear-gradient(45deg, #004085, #007BFF, #66CCFF)',
              color: 'white',
              padding: '12px',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              fontWeight: 'bold'
            }}>Add Fee Status</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Fee;
