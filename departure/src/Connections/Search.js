import React, { useState, useEffect } from 'react';
import SaveConnection from './SaveConnections';
import Button from 'react-bootstrap/Button';

const Search = () => {
  // State variables for input values, connections, and location previews
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [connections, setConnections] = useState([]);
  const [fromLocationPreviews, setFromLocationPreviews] = useState([]);
  const [toLocationPreviews, setToLocationPreviews] = useState([]);

  // Fetch connections when 'from' or 'to' values change
  useEffect(() => {
    const fetchConnections = async () => {
      try {
        const response = await fetch(
          `http://transport.opendata.ch/v1/connections?from=${from}&to=${to}`
        );
        const data = await response.json();
        setConnections(data.connections);
      } catch (error) {
        console.error('Error fetching connections:', error);
      }
    };

    fetchConnections();
  }, [from, to]);

  // Event handler for 'from' input change
  const handleFromChange = (e) => {
    const value = e.target.value;
    setFrom(value);
    getLocationPreviews(value, setFromLocationPreviews);
  };

  // Event handler for 'to' input change
  const handleToChange = (e) => {
    const value = e.target.value;
    setTo(value);
    getLocationPreviews(value, setToLocationPreviews);
  };

  // Handle location selection from previews
  const handleLocationClick = (location, inputField) => {
    if (inputField === 'from') {
      setFrom(location.name);
      setFromLocationPreviews([]);
    } else if (inputField === 'to') {
      setTo(location.name);
      setToLocationPreviews([]);
    }
  };

  // Fetch location previews based on query
  const getLocationPreviews = async (query, setLocationPreviews) => {
    try {
      const response = await fetch(`http://transport.opendata.ch/v1/locations?query=${query}`);
      const data = await response.json();
      setLocationPreviews(data.stations);
    } catch (error) {
      console.error('Error fetching location previews:', error);
    }
  };

  const saveConnection = () => {
    <SaveConnection from={from} to={to} />
  }

  return (
    <div>
      {/* 'From' input field */}
      <input
        type="text"
        value={from}
        onChange={handleFromChange}
        placeholder="From"
        autoComplete="off"
      />
      {/* Display location previews for 'from' */}
      {fromLocationPreviews.length > 0 && (
        <ul className="location-previews">
          {fromLocationPreviews.map((location) => (
            <li
              key={location.id}
              onClick={() => handleLocationClick(location, 'from')}
            >
              {location.name}
            </li>
          ))}
        </ul>
      )}

      {/* 'To' input field */}
      <input
        type="text"
        value={to}
        onChange={handleToChange}
        placeholder="To"
        autoComplete="off"
      />
      {/* Display location previews for 'to' */}
      {toLocationPreviews.length > 0 && (
        <ul className="location-previews">
          {toLocationPreviews.map((location) => (
            <li
              key={location.id}
              onClick={() => handleLocationClick(location, 'to')}
            >
              {location.name}
            </li>
          ))}
        </ul>
      )}

      {/* Display connections */}
      <h3>Connections:</h3>
      <Button onClick={saveConnection} variant="primary" type="submit">
        Save Connection
      </Button>
      <ul>
        {connections.map((connection) => (
          <li key={connection.id}>
            {connection.from.station.name} to {connection.to.station.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Search;