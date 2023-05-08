import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

// eslint-disable-next-line react/prop-types
function SaveConnection({ from, to, onComplete }) {
  const { t } = useTranslation();
  const [existingConnection, setExistingConnection] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const checkConnectionExistence = async () => {
      try {
        const token = sessionStorage.getItem('token');

        // Get all existing connections
        const response = await fetch('http://localhost:4242/api/connections', {
          headers: {
            'x-access-token': token,
          },
        });

        if (response.ok) {
          const connections = await response.json();
          const connectionExists = connections.some(
            (connection) => connection.from === from && connection.to === to,
          );

          if (connectionExists) {
            setExistingConnection(true);
          } else {
            // Create the connection if it doesn't already exist
            const createResponse = await fetch('http://localhost:4242/api/connections', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'x-access-token': token,
              },
              body: JSON.stringify({ from, to }),
            });

            if (createResponse.ok) {
              setSuccessMessage('Connection created successfully!');
            } else {
              console.error('Failed to create connection.');
              return;
            }
          }
        } else {
          console.error('Failed to fetch connections.');
          return;
        }
      } catch (error) {
        console.error('Error checking connection existence:', error);
      }
    };

    if (from && to) {
      checkConnectionExistence();
    }
  }, [from, to]);

  useEffect(() => {
    if (existingConnection || successMessage) {
      onComplete();
    }
  }, [existingConnection, successMessage, onComplete]);

  if (existingConnection) {
    return <div>{t('alreadyExists')}</div>;
  } if (successMessage) {
    return <div>{successMessage}</div>;
  }
  return <div />;
}

export default SaveConnection;
