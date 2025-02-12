import React, { useState } from 'react';

function Income() {
  const [incomeSource, setIncomeSource] = useState('');
  const [incomeAmount, setIncomeAmount] = useState('');
  const [incomeDescription, setIncomeDescription] = useState('');

  // Handle Income Submission
  const handleIncomeSubmit = async (e) => {
    e.preventDefault();
    const incomeData = {
      source: incomeSource,
      amount: incomeAmount,
      description: incomeDescription,
    };

    try {
      await fetch('http://localhost:4000/api/finance/income', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(incomeData),
      });
      alert('Income added successfully');
    } catch (err) {
      console.error('Error adding income:', err);
    }
  };

  return (
    <div style={{ width: '80%', margin: '0 auto', padding: '20px', backgroundColor: '#f9f9f9', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
      <h1 style={{ textAlign: 'center', fontSize: '2.5em', color: '#333', marginBottom: '30px' }}>Add Income</h1>

      <form onSubmit={handleIncomeSubmit} style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)' }}>
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '8px' }}>Source</label>
          <select
            value={incomeSource}
            onChange={(e) => setIncomeSource(e.target.value)}
            required
            style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '5px', fontSize: '1em', height: '40px' }}
          >
            <option value="">Select Source</option>
            <option value="Fees">Fees</option>
            <option value="Donation">Donation</option>
            <option value="Others">Others</option>
          </select>
        </div>
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '8px' }}>Amount</label>
          <input
            type="number"
            value={incomeAmount}
            onChange={(e) => setIncomeAmount(e.target.value)}
            required
            style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '5px', fontSize: '1em' }}
          />
        </div>
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '8px' }}>Description</label>
          <textarea
            value={incomeDescription}
            onChange={(e) => setIncomeDescription(e.target.value)}
            style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '5px', fontSize: '1em', height: '100px' }}
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
          Add Income
        </button>
      </form>
    </div>
  );
}

export default Income;
