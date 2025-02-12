import React, { useState, useEffect } from 'react';

const ReportPage = () => {
  const [totalBusFare, setTotalBusFare] = useState(0);
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpenses, setTotalExpenses] = useState(0);

  useEffect(() => {
    // Fetch your data (for simplicity, using hardcoded values here)
    setTotalBusFare(10000);
    setTotalIncome(20000);
    setTotalExpenses(15000);
  }, []);

  return (
    <div>
      <h1>School Bus Management - Financial Report</h1>
      <div>
        <h2>Financial Summary</h2>
        <p>Total Bus Fare: ₹{totalBusFare}</p>
        <p>Total Income: ₹{totalIncome}</p>
        <p>Total Expenses: ₹{totalExpenses}</p>
        <p>Profit or Loss: ₹{totalIncome - totalExpenses}</p>
      </div>
    </div>
  );
};

export default ReportPage;
