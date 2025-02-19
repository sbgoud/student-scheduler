import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Schedule from './components/Schedule';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/schedule" element={<Schedule username="alex" />} />
      </Routes>
    </Router>
  );
}