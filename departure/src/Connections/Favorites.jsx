import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';

const ConnectionsMenu = () => {
  const [connections, setConnections] = useState([]);

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
                from
              )}&to=${encodeURIComponent(to)}`
            );

            const transportConnections = transportResponse.data.connections.slice(0, 5);
            const formattedConnections = transportConnections.map((conn) => {
              const departureTime = moment.unix(conn.from.departureTimestamp).format('HH:mm');
              const arrivalTime = moment.unix(conn.to.arrivalTimestamp).format('HH:mm');
              return { departureTime, arrivalTime };
            });

            return { from, to, connections: formattedConnections };
          })
        );

        setConnections(updatedConnections);
      } catch (error) {
        console.error('Error fetching connections:', error);
      }
    };

    fetchConnections();
  }, []);

  return (
    <div>
      {connections.map((connection) => (
        <div key={`${connection.from}-${connection.to}`}>
          <button>{`${connection.from} to ${connection.to}`}</button>
          {connection.connections.map((conn, index) => (
            <div key={`${connection.from}-${connection.to}-${index}`}>
              Departure: {conn.departureTime} - Arrival: {conn.arrivalTime}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default ConnectionsMenu;