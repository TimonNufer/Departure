import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Search  from './Connections/Search'
import "./HomePage.css"
import Favorites from './Connections/Favorites'

function Home() {
  const token = sessionStorage.getItem('token');
  const navigate = useNavigate();

  useEffect(() => {
    const forwardRouting = () => {
      navigate('/login');
    };

    if (!token || token === null) {
      forwardRouting();
    }
  }, [navigate, token]);

  const logout = () => {
    sessionStorage.removeItem('token');
    navigate('/login');
  };

  if (!token || token === null) {
    return null;
  } else {
    return(
        <>

        <button className='logout-button' onClick={logout}>Logout</button>

        <div className='search'>
            <Search />
            <Favorites />
            </div>
        </>
    );
  }
}
export default Home;