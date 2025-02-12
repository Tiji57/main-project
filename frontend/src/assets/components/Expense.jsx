import React, { useState } from 'react';

function Expense() {
  const [expenseCategory, setExpenseCategory] = useState('');
  const [expenseAmount, setExpenseAmount] = useState('');
  const [expenseDescription, setExpenseDescription] = useState('');
  const [busNo, setBusNo] = useState('');

  // Handle Expense Submission
  const handleExpenseSubmit = async (e) => {
    e.preventDefault();
    const expenseData = {
      category: expenseCategory,
      amount: expenseAmount,
      description: expenseDescription,
      busNo,
    };

    try {
      await fetch('http://localhost:4000/api/finance/expense', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(expenseData),
      });
      alert('Expense added successfully');
    } catch (err) {
      console.error('Error adding expense:', err);
    }
  };

  return (
    <div style={{ width: '80%', margin: '0 auto', padding: '20px', backgroundColor: '#f9f9f9', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
      <h1 style={{ textAlign: 'center', fontSize: '2.5em', color: '#333', marginBottom: '30px' }}>Add Expense</h1>

      <form onSubmit={handleExpenseSubmit} style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)' }}>
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '8px' }}>Category</label>
          <select
            value={expenseCategory}
            onChange={(e) => setExpenseCategory(e.target.value)}
            required
            style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '5px', fontSize: '1em', height: '40px' }}
          >
            <option value="">Select Category</option>
            <option value="Workshop Charges">Workshop Charges</option>
            <option value="Bata Salary">Bata Salary</option>
            <option value="Diesel">Diesel</option>
            <option value="Others">Others</option>
          </select>
        </div>
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '8px' }}>Amount</label>
          <input
            type="number"
            value={expenseAmount}
            onChange={(e) => setExpenseAmount(e.target.value)}
            required
            style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '5px', fontSize: '1em' }}
          />
        </div>
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '8px' }}>Description</label>
          <textarea
            value={expenseDescription}
            onChange={(e) => setExpenseDescription(e.target.value)}
            style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '5px', fontSize: '1em', height: '100px' }}
          />
        </div>
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '8px' }}>Bus Number</label>
          <input
            type="text"
            value={busNo}
            onChange={(e) => setBusNo(e.target.value)}
            required
            style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '5px', fontSize: '1em' }}
          />
        </div>
        <button
          type="submit"
          style={{
            padding: '12px 20px',
            backgroundColor: '#4CAF50',
            color: 'white',
            border: 'none',
            cursor: 'pointer',
            fontSize: '1.1em',
            marginTop: '20px',
            width: '100%',
            borderRadius: '5px',
            transition: 'background-color 0.3s ease',
          }}
        >
          Add Expense
        </button>
      </form>
    </div>
  );
}

export default Expense;
