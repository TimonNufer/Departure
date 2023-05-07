import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

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
            <button onClick={logout}>Logout</button>
        </>
    );
  }
}
export default Home;