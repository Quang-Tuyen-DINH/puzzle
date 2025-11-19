import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Puzzle from '../components/Puzzle';

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Puzzle />} />
        <Route path="/puzzle" element={<Puzzle />} />
      </Routes>
    </BrowserRouter>
  );
}
