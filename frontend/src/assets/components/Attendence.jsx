import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Attendance = () => {
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  const userId = localStorage.getItem('userId');
  // Fetch attendance data based on userId
  const fetchAttendanceData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`http://localhost:4000/api/students/attendance?userId=${userId}`);
      setAttendanceRecords(response.data?.data || []);
      setError('');
    } catch (err) {
      console.error(err);
      setError('Error fetching attendance data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAttendanceData();
  }, [userId]);

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h2 style={{ textAlign: 'center', color: '#4CAF50' }}>Attendance Records</h2>

      {loading && <p style={{ textAlign: 'center', color: 'blue' }}>Loading...</p>}

      {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}

      {!loading && !error && (
        <>
          {attendanceRecords.length > 0 ? (
            <div style={{ marginTop: '20px' }}>
              <table
                style={{
                  width: '100%',
                  borderCollapse: 'collapse',
                  marginTop: '20px',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                }}
              >
                <thead>
                  <tr>
                    <th
                      style={{
                        padding: '12px',
                        borderBottom: '2px solid #ddd',
                        textAlign: 'left',
                        backgroundColor: '#f4f4f4',
                      }}
                    >
                      Student Name
                    </th>
                    <th
                      style={{
                        padding: '12px',
                        borderBottom: '2px solid #ddd',
                        textAlign: 'left',
                        backgroundColor: '#f4f4f4',
                      }}
                    >
                      Bus No
                    </th>
                    <th
                      style={{
                        padding: '12px',
                        borderBottom: '2px solid #ddd',
                        textAlign: 'left',
                        backgroundColor: '#f4f4f4',
                      }}
                    >
                      Attendance Status
                    </th>
                    <th
                      style={{
                        padding: '12px',
                        borderBottom: '2px solid #ddd',
                        textAlign: 'left',
                        backgroundColor: '#f4f4f4',
                      }}
                    >
                      Date
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {attendanceRecords.map((record) => (
                    <tr key={record._id}>
                      <td style={{ padding: '12px', borderBottom: '1px solid #ddd' }}>
                        {record.studentId && record.studentId.name ? record.studentId.name : 'N/A'}
                      </td>
                      <td style={{ padding: '12px', borderBottom: '1px solid #ddd' }}>
                        {record.studentId && record.studentId.busNo ? record.studentId.busNo : 'N/A'}
                      </td>
                      <td style={{ padding: '12px', borderBottom: '1px solid #ddd' }}>
                        {record.status === 'present' ? (
                          <span style={{ color: 'green' }}>Present</span>
                        ) : (
                          <span style={{ color: 'red' }}>Absent</span>
                        )}
                      </td>
                      <td style={{ padding: '12px', borderBottom: '1px solid #ddd' }}>
                        {new Date(record.timestamp).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p style={{ textAlign: 'center', fontSize: '16px', color: '#888' }}>
              No attendance records found.
            </p>
          )}
        </>
      )}
    </div>
  );
};

export default Attendance;
