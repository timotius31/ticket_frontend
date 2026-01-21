import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Overview from './pages/Overview';
import Actors from './pages/Actors';
import Orders from './pages/Orders';
import Sponsors from './pages/Sponsors';
import './styles/theme.css';

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Overview />} />
        <Route path="/actors" element={<Actors />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/sponsors" element={<Sponsors />} />
      </Routes>
    </BrowserRouter>
  );
}
