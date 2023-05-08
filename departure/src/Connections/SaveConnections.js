import React, { useState } from 'react';

const SaveConnection = ({ from, to }) => {
  const [connectionFrom, setConnectionFrom] = useState(from);
  const [connectionTo, setConnectionTo] = useState(to);

  const handleSubmit = async (e) => {
    e.preventDefault();
    debugger;
    try {
        const token = sessionStorage.getItem('token');

        const response = await fetch('http://localhost:4242/api/connections', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-access-token': token,
          },
          body: JSON.stringify({ from: connectionFrom, to: connectionTo }),
        });

      if (response.ok) {
        // Handle successful response
        console.log('Connection created successfully!');
      } else {
        // Handle error response
        console.error('Failed to create connection.');
      }
    } catch (error) {
      console.error('Error creating connection:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        From:
        <input
          type="text"
          value={connectionFrom}
          onChange={(e) => setConnectionFrom(e.target.value)}
        />
      </label>
      <br />
      <label>
        To:
        <input
          type="text"
          value={connectionTo}
          onChange={(e) => setConnectionTo(e.target.value)}
        />
      </label>
      <br />
      <button type="submit">Create Connection</button>
    </form>
  );
};

export default SaveConnection;