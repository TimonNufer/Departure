/* eslint-disable prefer-destructuring */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Button from 'react-bootstrap/Button';
import SaveConnection from './SaveConnections';

function Search() {
  // State variables for input values, connections, and location previews
  const { t } = useTranslation();
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [connections, setConnections] = useState([]);
  const [fromLocationPreviews, setFromLocationPreviews] = useState([]);
  const [toLocationPreviews, setToLocationPreviews] = useState([]);
  const [showComponent, setShowComponent] = useState(false);

  // Fetch connections when 'from' or 'to' values change
  useEffect(() => {
    const fetchConnections = async () => {
      try {
        const response = await fetch(
          `http://transport.opendata.ch/v1/connections?from=${from}&to=${to}`,
        );
        const data = await response.json();
        setConnections(data.connections);
      } catch (error) {
        console.error('Error fetching connections:', error);
      }
    };

    fetchConnections();
  }, [from, to]);

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
      const response = await fetch(
        `http://transport.opendata.ch/v1/locations?query=${query}`,
      );
      const data = await response.json();
      setLocationPreviews(data.stations);
    } catch (error) {
      console.error('Error fetching location previews:', error);
    }
  };

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

  const saveConnection = () => {
    setShowComponent(true);
  };

  return (
    <div className="connections-Page">
      <div className="search-box">
        <div className="connections-ajustment">
          {/* 'From' input field */}
          <input
            className="from"
            type="text"
            value={from}
            onChange={handleFromChange}
            placeholder={t('from')}
            autoComplete="off"
          />

          {/* 'To' input field */}
          <input
            className="to"
            type="text"
            value={to}
            onChange={handleToChange}
            placeholder={t('to')}
            autoComplete="off"
          />

          {/* Display location previews for 'from' */}
          {fromLocationPreviews.length > 0 && (
          <ul className="location-previews-from">
            {fromLocationPreviews.map((location) => (
              <li
                key={location.id} // Assign a unique key prop to each list item
                onClick={() => handleLocationClick(location, 'from')}
              >
                {location.name}
              </li>
            ))}
          </ul>
          )}

          {/* Display location previews for 'to' */}
          {toLocationPreviews.length > 0 && (
          <ul className="location-previews-to">
            {toLocationPreviews.map((location) => (
              <li
                key={location.id} // Assign a unique key prop to each list item
                onClick={() => handleLocationClick(location, 'to')}
              >
                {location.name}
              </li>
            ))}
          </ul>
          )}

          {/* Display connections */}
          <Button className="safe-button" onClick={saveConnection} variant="primary" type="submit">
            {t('saveConnection')}
          </Button>

          <h3 className="connections-text">{t('connections')}</h3>

          {showComponent ? (
            <SaveConnection
              from={from}
              to={to}
              onComplete={() => setShowComponent(false) && setFrom('') && setTo('') && window.location.reload()}
            />
          ) : null}
          <ul className="connections-box">
            {connections.map((connection) => (
              <div className="connections">
                <li key={connection.id}>
                  {connection.from.station.name}
                  {' '}
                  to
                  {connection.to.station.name}
                </li>
              </div>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Search;
