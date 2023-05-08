import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import moment from 'moment';

function ConnectionsMenu() {
  const { t } = useTranslation();
  const [connections, setConnections] = useState([]);
  const [expandedConnection, setExpandedConnection] = useState(null);

  useEffect(() => {
    const fetchConnections = async () => {
      try {
        const token = sessionStorage.getItem('token');

        const response = await axios.get('http://localhost:4242/api/connections', {
          headers: {
            'x-access-token': token,
          },
        });
        const savedConnections = response.data;

        const updatedConnections = await Promise.all(
          savedConnections.map(async (connection) => {
            const { from, to } = connection;
            const transportResponse = await axios.get(
              `http://transport.opendata.ch/v1/connections?from=${encodeURIComponent(
                from,
              )}&to=${encodeURIComponent(to)}`,
            );

            const transportConnections = transportResponse.data.connections.slice(0, 5);
            const formattedConnections = transportConnections.map((conn) => {
              const departureTime = moment.unix(conn.from.departureTimestamp).format('HH:mm');
              const arrivalTime = moment.unix(conn.to.arrivalTimestamp).format('HH:mm');
              const delay = conn.to.delay / 60; // Convert delay to minutes
              const { platform } = conn.to;

              // Check if the connection spans to the next day
              const isNextDay = moment.unix(conn.from.departureTimestamp).isAfter(moment.unix(conn.to.arrivalTimestamp), 'day');

              return {
                departureTime, arrivalTime, delay, platform, isNextDay,
              };
            });

            return {
              id: connection.id, from, to, connections: formattedConnections,
            };
          }),
        );

        setConnections(updatedConnections);
      } catch (error) {
        console.error('Error fetching connections:', error);
      }
    };

    fetchConnections();
  }, []);

  const toggleExpand = (connection) => {
    if (expandedConnection === connection) {
      setExpandedConnection(null);
    } else {
      setExpandedConnection(connection);
    }
  };

  const removeConnection = async (connectionId) => {
    try {
      const token = sessionStorage.getItem('token');

      await axios.delete(`http://localhost:4242/api/connections/${connectionId}`, {
        headers: {
          'x-access-token': token,
        },
      });

      setConnections(
        (prevConnections) => prevConnections.filter((conn) => conn.id !== connectionId),
      );
    } catch (error) {
      console.error('Error removing connection:', error);
    }
  };

  return (
    <div>
      <p>{t('favorites')}</p>
      {connections.map((connection) => (
        <div key={`${connection.id}`}>
          <div>
            <button type="button" onClick={() => toggleExpand(connection)}>{`${connection.from} to ${connection.to}`}</button>
            <button type="button" onClick={() => removeConnection(connection.id)}>X</button>
          </div>
          {expandedConnection === connection && (
            <div>
              {connection.connections.map((conn, index) => (
                // eslint-disable-next-line react/no-array-index-key
                <div key={index}>
                  <p>
                    Departure:
                    {' '}
                    {conn.departureTime}
                    {conn.isNextDay && <span> (Next day)</span>}
                  </p>
                  <p>
                    Arrival:
                    {' '}
                    {conn.arrivalTime}
                  </p>
                  <p>
                    Delay:
                    {' '}
                    {conn.delay}
                    {' '}
                    minutes
                  </p>
                  <p>
                    Platform:
                    {' '}
                    {conn.platform}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default ConnectionsMenu;
