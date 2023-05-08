import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Search from './Connections/Search';
import "./HomePage.css";
import Favorites from './Connections/Favorites';
import SaveConnection from './Connections/SaveConnections';

function Home() {
  const token = sessionStorage.getItem('token');
  const [timestamp, setTimestamp] = useState(Date.now());
  const [reloadFavorites, setReloadFavorites] = useState(false);
  const [reloadPage, setReloadPage] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const forwardRouting = () => {
      navigate('/login');
    };

    if (!token || token === null) {
      forwardRouting();
    }
  }, [navigate, token]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimestamp(Date.now());
      setReloadFavorites((prevReload) => !prevReload);
    }, 30000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const logout = () => {
    sessionStorage.removeItem('token');
    navigate('/login');
  };

  const handleSaveConnection = () => {
    setReloadPage((prevReload) => !prevReload);
  };

  if (!token || token === null) {
    return null;
  } else {
    return (
      <>
        <button className='logout-button' onClick={logout}>Logout</button>
        <div className='search'>
          <Search />
        </div>
        <Favorites key={reloadFavorites ? 'reload' : 'no-reload'} timestamp={timestamp} />
        <SaveConnection onConnectionSaved={handleSaveConnection} />
        {reloadPage && window.location.reload()}
      </>
    );
  }
}

export default Home;
