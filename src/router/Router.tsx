import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Puzzle from '../components/Puzzle';

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/puzzle" replace />} />
        <Route path="/puzzle" element={<Puzzle />} />
      </Routes>
    </BrowserRouter>
  );
}
