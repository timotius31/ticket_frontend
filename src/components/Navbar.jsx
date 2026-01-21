import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="nav">
      <div className="nav-logo">A TRACE OF US</div>

      <div className="nav-links">
        <Link to="/">Overview</Link>
        <Link to="/actors">Actors</Link>
        <Link to="/orders">Orders</Link>
        <Link to="/sponsors">Sponsors</Link>
      </div>
    </nav>
  );
}
