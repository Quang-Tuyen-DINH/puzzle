import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Welcome from '../pages/Welcome';
import SlideShow from '../pages/SlideShow';

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/welcome" replace />} />
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/slide" element={<SlideShow />} />
      </Routes>
    </BrowserRouter>
  );
}
