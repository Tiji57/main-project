import React, { useEffect, useState } from 'react';

function Finance() {
  const [feeStatus, setFeeStatus] = useState([]);
  const [totalBusFare, setTotalBusFare] = useState(0);
  const [groupedData, setGroupedData] = useState({});

  // Fetching fee status data
  useEffect(() => {
    const fetchFeeStatus = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/finance/feestatus');
        const data = await response.json();
        setFeeStatus(data);

        // Group fee details by month
        const grouped = data.reduce((acc, item) => {
          const month = item.month || 'Unknown'; // Default if no month is found
          if (!acc[month]) {
            acc[month] = [];
          }
          acc[month].push(item);
          return acc;
        }, {});
        setGroupedData(grouped);

        // Calculate total bus fare
        const total = data.reduce((accum, item) => accum + (item.busFare || 0), 0);
        setTotalBusFare(total);

        // Store total bus fare in localStorage
        localStorage.setItem('totalBusFare', total);
      } catch (err) {
        console.error('Error fetching fee status:', err);
      }
    };

    fetchFeeStatus();
  }, []);

  return (
    <div>
      {/* Header */}
      <header style={{ backgroundColor: '#4CAF50', padding: '10px 20px', color: 'white', textAlign: 'center' }}>
        <h1 style={{ margin: 0 }}>School Bus Management</h1>
        <nav style={{ marginTop: '10px' }}>
          <ul style={{ listStyle: 'none', padding: 0, display: 'flex', justifyContent: 'center', gap: '20px' }}>
            <li><a href="/Expense" style={{ color: 'white', textDecoration: 'none', fontSize: '1.2em' }}>Expense</a></li>
            <li><a href="/Income" style={{ color: 'white', textDecoration: 'none', fontSize: '1.2em' }}>Income</a></li>
            <li><a href="/All" style={{ color: 'white', textDecoration: 'none', fontSize: '1.2em' }}>List</a></li>
            <li><a href="/" style={{ color: 'white', textDecoration: 'none', fontSize: '1.2em' }}>Logout</a></li>
          </ul>
        </nav>
      </header>

      {/* Content */}
      <div style={{
        width: '80%', margin: '0 auto', padding: '20px',
        backgroundColor: '#f9f9f9', borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
      }}>
        <h1 style={{
          textAlign: 'center', fontSize: '2.5em', color: '#333',
          marginBottom: '30px'
        }}>Fee Status</h1>

        {/* Loop through each month and display the grouped details */}
        {Object.keys(groupedData).length > 0 ? (
          Object.keys(groupedData).map((month) => (
            <div key={month} style={{ marginBottom: '40px' }}>
              <h2 style={{ color: '#4CAF50', textAlign: 'left', marginBottom: '15px' }}>
                {month} Fee Details
              </h2>
              <table style={{
                width: '100%', borderCollapse: 'collapse',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
              }}>
                <thead>
                  <tr>
                    <th style={{
                      padding: '12px', border: '1px solid #ddd',
                      textAlign: 'left', backgroundColor: '#4CAF50', color: 'white'
                    }}>Student Name</th>
                    <th style={{
                      padding: '12px', border: '1px solid #ddd',
                      textAlign: 'left', backgroundColor: '#4CAF50', color: 'white'
                    }}>Class</th>
                    <th style={{
                      padding: '12px', border: '1px solid #ddd',
                      textAlign: 'left', backgroundColor: '#4CAF50', color: 'white'
                    }}>Division</th>
                    <th style={{
                      padding: '12px', border: '1px solid #ddd',
                      textAlign: 'left', backgroundColor: '#4CAF50', color: 'white'
                    }}>Fee Status</th>
                    <th style={{
                      padding: '12px', border: '1px solid #ddd',
                      textAlign: 'left', backgroundColor: '#4CAF50', color: 'white'
                    }}>Fee Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {groupedData[month].map((item) => (
                    <tr key={item._id}>
                      <td style={{ padding: '12px', border: '1px solid #ddd' }}>
                        {item.studentId ? item.studentId.name : 'Unknown'}
                      </td>
                      <td style={{ padding: '12px', border: '1px solid #ddd' }}>
                        {item.studentId ? item.studentId.class : 'N/A'}
                      </td>
                      <td style={{ padding: '12px', border: '1px solid #ddd' }}>
                        {item.studentId ? item.studentId.division : 'N/A'}
                      </td>
                      <td style={{ padding: '12px', border: '1px solid #ddd' }}>
                        {item.feeStatus}
                      </td>
                      <td style={{ padding: '12px', border: '1px solid #ddd' }}>
                        ₹{item.busFare || 0}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))
        ) : (
          <p style={{ textAlign: 'center', fontStyle: 'italic', color: '#888' }}>
            No fee data available.
          </p>
        )}

        {/* Total Fee */}
        <div style={{ marginTop: '30px', textAlign: 'right' }}>
          <h2 style={{ fontSize: '1.8em', color: '#333' }}>
            Total Bus Fare: ₹{totalBusFare}
          </h2>
        </div>
      </div>
    </div>
  );
}

export default Finance;
