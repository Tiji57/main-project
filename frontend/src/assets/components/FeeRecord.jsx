import React, { useEffect, useState } from 'react';
import axios from 'axios';

const FeeRecord = () => {
  const [students, setStudents] = useState([]); // List of all students
  const [feeDetails, setFeeDetails] = useState([]); // Fee details for students
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Assuming teacher ID is stored in localStorage
  const teacherId = localStorage.getItem('userId'); // Replace with logic to get teacherId

  // Array of months from June to March
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
        // Fetch all students
        const studentsResponse = await axios.get(
          `http://localhost:4000/api/students?teacherId=${teacherId}`
        );

        // Fetch fee details
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

  // Group fee details by student and month
  const groupedFeeDetails = feeDetails.reduce((acc, fee) => {
    if (!acc[fee.studentName]) {
      acc[fee.studentName] = {};
    }
    acc[fee.studentName][fee.month] = fee;
    return acc;
  }, {});

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h2 style={{ textAlign: 'center', color: '#333' }}>Fee Status Overview</h2>

      {/* Render tables for each student */}
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead style={{ backgroundColor: '#f4f4f4' }}>
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
                  const fee = groupedFeeDetails[student.name]?.[month]; // Access fee by month name
                  return (
                    <td key={month} style={{ border: '1px solid #ddd', padding: '8px' }}>
                      {fee ? (
                        fee.feeStatus ? fee.feeStatus : 'Paid'
                      ) : (
                        'No record' // Default message for missing fee details
                      )}
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
                  textAlign: 'center',
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
