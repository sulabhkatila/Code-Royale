import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Arena from './pages/Arena';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/accounts/register" element={<Register />} />
        <Route path="/accounts/login" element={<Login />} />
        <Route path="/problem/:problem" element={<Arena />} />
      </Routes>
    </Router>
  );
}

export default App;
