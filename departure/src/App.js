import Login from './Login';
import HomePage from './HomePage'
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Login />} />
        <Route path='home' element={<HomePage />}/>
      </Routes>
    </BrowserRouter>
    
  );
}

export default App;
 