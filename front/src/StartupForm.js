import React, { useState } from 'react';
import axios from 'axios';

const StartupForm = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [founder, setFounder] = useState('');
  const [fundingGoal, setFundingGoal] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5001/api/startup', {
        name,
        description,
        founder,
        fundingGoal,
      });
      setMessage(response.data.message);
    } catch (error) {
      setMessage('Error listing startup!');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Startup Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Description:</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Founder:</label>
          <input
            type="text"
            value={founder}
            onChange={(e) => setFounder(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Funding Goal:</label>
          <input
            type="number"
            value={fundingGoal}
            onChange={(e) => setFundingGoal(e.target.value)}
            required
          />
        </div>
        <button type="submit">List Startup</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default StartupForm; // Default export