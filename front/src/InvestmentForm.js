import React, { useState } from 'react';
import axios from 'axios';

const InvestmentForm = () => {
  const [startupId, setStartupId] = useState('');
  const [amount, setAmount] = useState('');
  const [investorName, setInvestorName] = useState('');
  const [investorEmail, setInvestorEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5001/api/invest', {
        startupId,
        amount,
        investorName,
        investorEmail,
      });
      setMessage(response.data.message);
    } catch (error) {
      setMessage('Error processing investment!');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Startup ID:</label>
          <input
            type="text"
            value={startupId}
            onChange={(e) => setStartupId(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Amount:</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Investor Name:</label>
          <input
            type="text"
            value={investorName}
            onChange={(e) => setInvestorName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Investor Email:</label>
          <input
            type="email"
            value={investorEmail}
            onChange={(e) => setInvestorEmail(e.target.value)}
            required
          />
        </div>
        <button type="submit">Invest</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default InvestmentForm; // Default export