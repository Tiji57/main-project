import React, { useEffect, useState } from 'react';
import axios from 'axios';

const FeeRecord = () => {
  const [students, setStudents] = useState([]);
  const [feeDetails, setFeeDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const teacherId = localStorage.getItem('userId');

  const months = [
    'June', 'July', 'August', 'September', 'October', 'November',
    'December', 'January', 'February', 'March'
  ];

  useEffect(() => {
    const fetchData = async () => {
      if (!teacherId) {
        setError('Teacher ID is required.');
        setLoading(false);
        return;
      }

      try {
        const studentsResponse = await axios.get(
          `http://localhost:4000/api/students?teacherId=${teacherId}`
        );

        const feeDetailsResponse = await axios.get(
          `http://localhost:4000/api/feestatus?teacherId=${teacherId}`
        );

        setStudents(studentsResponse.data.data);
        setFeeDetails(feeDetailsResponse.data.data);
      } catch (error) {
        setError('Error fetching data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [teacherId]);

  if (loading) {
    return <div>Loading data...</div>;
  }

  if (error) {
    return <div style={{ color: 'red', fontWeight: 'bold' }}>{error}</div>;
  }

  const groupedFeeDetails = feeDetails.reduce((acc, fee) => {
    if (!acc[fee.studentName]) {
      acc[fee.studentName] = {};
    }
    acc[fee.studentName][fee.month] = fee;
    return acc;
  }, {});

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      {/* Main Page Header */}
      <h2
        style={{
          textAlign: 'center',
          background: 'linear-gradient(45deg, #004085, #007BFF, #66CCFF)',
          padding: '15px',
          borderRadius: '5px',
          color: 'white',
          width: '100%',
          margin: '0 auto',
          marginBottom: '20px'
        }}
      >
        Fee Status Overview
      </h2>

      {/* Divider Line */}
      <hr
        style={{
          border: 'none',
          height: '2px',
          background: 'linear-gradient(to right, #f3ec78, #af4261)',
          marginBottom: '20px'
        }}
      />

      {/* Table */}
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead style={{ backgroundColor: '#f2f2f2', color: '#333' }}>
          <tr>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Student Name</th>
            {months.map((month) => (
              <th key={month} style={{ border: '1px solid #ddd', padding: '8px' }}>
                {month}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {students.length > 0 ? (
            students.map((student) => (
              <tr key={student.name}>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                  {student.name}
                </td>
                {months.map((month) => {
                  const fee = groupedFeeDetails[student.name]?.[month];
                  return (
                    <td key={month} style={{ border: '1px solid #ddd', padding: '8px' }}>
                      {fee ? (fee.feeStatus ? fee.feeStatus : 'Paid') : 'Unpaid'}
                    </td>
                  );
                })}
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan="12"
                style={{
                  border: '1px solid #ddd',
                  padding: '8px',
                  textAlign: 'center'
                }}
              >
                No students found for this teacher.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default FeeRecord;
