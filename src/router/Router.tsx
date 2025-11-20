import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Puzzle from '../components/Puzzle';
import Welcome from '../pages/Welcome';
import ButtonExample from '../examples/ButtonExample';

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/puzzle" element={<Puzzle />} />
        <Route path="/button" element={<ButtonExample />} />
      </Routes>
    </BrowserRouter>
  );
}
