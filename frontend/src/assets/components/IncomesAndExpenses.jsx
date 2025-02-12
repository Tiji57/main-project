import React, { useEffect, useState } from 'react';
import "./IncomeAndExpenses.css";

function IncomesAndExpenses() {
  const [incomes, setIncomes] = useState([]);
  const [expenses, setExpenses] = useState([]);

  // Fetch incomes and expenses
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch incomes and expenses
        const financeResponse = await fetch('http://localhost:4000/api/finance/feeManagement');
        const financeData = await financeResponse.json();
        setIncomes(financeData.incomes || []);
        setExpenses(financeData.expenses || []);
      } catch (err) {
        console.error('Error fetching data:', err);
      }
    };

    fetchData();
  }, []);

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', padding: '20px' }}>
      {/* Header */}
      <header style={{ backgroundColor: '#4CAF50', padding: '16px', color: 'white', textAlign: 'center' }}>
        <h1 style={{ margin: '0' }}>School Bus Management</h1>
        <nav style={{ marginTop: '8px' }}>
          <ul style={{ listStyle: 'none', padding: 0, display: 'flex', justifyContent: 'center', gap: '12px' }}>
            <li><a href="/Expense" style={{ color: 'white', textDecoration: 'none', fontSize: '1.1em' }}>Expense</a></li>
            <li><a href="/Income" style={{ color: 'white', textDecoration: 'none', fontSize: '1.1em' }}>Income</a></li>
            <li><a href="/Summary" style={{ color: 'white', textDecoration: 'none', fontSize: '1.1em' }}>Financial Summary</a></li>
            <li><a href="/" style={{ color: 'white', textDecoration: 'none', fontSize: '1.1em' }}>logout</a></li>
          </ul>
        </nav>
      </header>

      {/* Income Table */}
      <h3 style={{ fontSize: '1.6em', marginTop: '30px' }}>Income</h3>
      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '10px' }}>
        <thead>
          <tr style={{ backgroundColor: '#4CAF50', color: 'white' }}>
            <th style={{ padding: '10px', textAlign: 'left' }}>Source</th>
            <th style={{ padding: '10px', textAlign: 'left' }}>Amount</th>
            <th style={{ padding: '10px', textAlign: 'left' }}>Date</th>
          </tr>
        </thead>
        <tbody>
          {incomes.map((income, index) => (
            <tr key={index}>
              <td style={{ padding: '8px' }}>{income.source}</td>
              <td style={{ padding: '8px' }}>₹{income.amount}</td>
              <td style={{ padding: '8px' }}>{new Date(income.date).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Expense Table */}
      <h3 style={{ fontSize: '1.6em', marginTop: '30px' }}>Expenses</h3>
      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '10px' }}>
        <thead>
          <tr style={{ backgroundColor: '#4CAF50', color: 'white' }}>
            <th style={{ padding: '10px', textAlign: 'left' }}>Category</th>
            <th style={{ padding: '10px', textAlign: 'left' }}>Amount</th>
            <th style={{ padding: '10px', textAlign: 'left' }}>Date</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense, index) => (
            <tr key={index}>
              <td style={{ padding: '8px' }}>{expense.category}</td>
              <td style={{ padding: '8px' }}>₹{expense.amount}</td>
              <td style={{ padding: '8px' }}>{new Date(expense.date).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default IncomesAndExpenses;
