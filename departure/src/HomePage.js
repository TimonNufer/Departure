import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Search  from './Connections/Search'

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
            <h1>Home Component</h1>

            <Search />

            <button onClick={logout}>Logout</button>
        </>
    );
  }
}
export default Home;