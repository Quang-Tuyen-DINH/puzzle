import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Puzzle from './components/Puzzle';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/puzzle" replace />} />
        <Route path="/puzzle" element={<Puzzle />} />
      </Routes>
    </Router>
  );
}

export default App;
