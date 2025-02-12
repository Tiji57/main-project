import React, { useEffect, useState, useRef } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function SummaryPage() {
  const [feeStatus, setFeeStatus] = useState([]);
  const [incomes, setIncomes] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [totalBusFare, setTotalBusFare] = useState(0);
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [profitOrLoss, setProfitOrLoss] = useState(0);
  const reportRef = useRef();

  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  useEffect(() => {
    const fetchSummaryData = async () => {
      try {
        const feeStatusResponse = await fetch('http://localhost:4000/api/finance/feestatus');
        const feeStatusData = await feeStatusResponse.json();
        const financeResponse = await fetch('http://localhost:4000/api/finance/feeManagement');
        const financeData = await financeResponse.json();
        setFeeStatus(feeStatusData);
        setIncomes(financeData.incomes || []);
        setExpenses(financeData.expenses || []);
      } catch (err) {
        console.error('Error fetching summary data:', err);
      }
    };
    fetchSummaryData();
  }, []);

  useEffect(() => {
    const calculateTotals = () => {
      const totalBusFare = months.reduce((acc, month) => acc + feeStatus.filter(item => item.feeStatus === 'Paid' && item.month === month).reduce((sum, item) => sum + (Number(item.busFare) || 0), 0), 0);
      const totalIncome = months.reduce((acc, month) => acc + incomes.filter(item => new Date(item.date).toLocaleString('default', { month: 'long' }) === month).reduce((sum, income) => sum + (Number(income.amount) || 0), 0), 0);
      const totalExpenses = months.reduce((acc, month) => acc + expenses.filter(item => new Date(item.date).toLocaleString('default', { month: 'long' }) === month).reduce((sum, expense) => sum + (Number(expense.amount) || 0), 0), 0);
      setTotalBusFare(totalBusFare);
      setTotalIncome(totalBusFare + totalIncome);
      setTotalExpenses(totalExpenses);
      setProfitOrLoss(totalBusFare + totalIncome - totalExpenses);
    };
    calculateTotals();
  }, [feeStatus, incomes, expenses]);

  const downloadReport = () => {
    window.print();
  };

  const graphData = {
    labels: months,
    datasets: [
      {
        label: 'Bus Fare Collection',
        data: months.map(m => feeStatus.filter(item => item.feeStatus === 'Paid' && item.month === m).reduce((sum, item) => sum + (item.busFare || 0), 0)),
        backgroundColor: 'rgba(54, 162, 235, 0.5)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
      {
        label: 'Income',
        data: months.map(m => incomes.filter(item => new Date(item.date).toLocaleString('default', { month: 'long' }) === m).reduce((sum, income) => sum + (income.amount || 0), 0)),
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
      {
        label: 'Expenses',
        data: months.map(m => expenses.filter(item => new Date(item.date).toLocaleString('default', { month: 'long' }) === m).reduce((sum, expense) => sum + (expense.amount || 0), 0)),
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      }
    ]
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif', backgroundColor: '#f4f4f4', borderRadius: '8px' }}>
      <h1 style={{ color: '#333', textAlign: 'center' }}>School Bus Management - Summary</h1>
      <div ref={reportRef} style={{ marginTop: '20px', padding: '15px', border: '1px solid #ddd', borderRadius: '5px', backgroundColor: '#fff' }}>
        <h2 style={{ textAlign: 'center' }}>Financial Report</h2>
        <p><strong>School Name:</strong> XYZ School</p>
        <p><strong>Financial Year Summary</strong></p>
        <p><strong>Total Bus Fare:</strong> ₹{totalBusFare}</p>
        <p><strong>Total Income:</strong> ₹{totalIncome}</p>
        <p><strong>Total Expenses:</strong> ₹{totalExpenses}</p>
        <p><strong>{profitOrLoss >= 0 ? 'Profit' : 'Loss'}:</strong> ₹{Math.abs(profitOrLoss)}</p>
      </div>
      <button onClick={downloadReport} style={{ marginTop: '10px', padding: '10px', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', display: 'block', margin: '20px auto' }}>Download Report</button>
      <div style={{ marginTop: '20px', backgroundColor: '#fff', padding: '20px', borderRadius: '5px' }}>
        <Bar data={graphData} options={{ responsive: true }} />
      </div>
    </div>
  );
}
export default SummaryPage;
