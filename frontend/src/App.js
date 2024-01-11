import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Arena from './pages/Arena';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/problem/:problem" element={<Arena />} />
      </Routes>
    </Router>
  );
}

export default App;
