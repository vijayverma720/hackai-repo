import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Report from './pages/Report';
import Volunteer from './pages/Volunteer';
import Donate from './pages/Donate';
import Startups from './pages/Startups';
import Invest from './pages/Invest';

function App() {
  return (
    <Router>
      <div className="app">
        {/* Navbar */}
        <nav className="navbar">
          <h1>NGO Support & Startup Investment Platform</h1>
          <div className="nav-links">
            <Link to="/">Home</Link>
            <Link to="/report">Report</Link>
            <Link to="/volunteer">Volunteer</Link>
            <Link to="/donate">Donate</Link>
            <Link to="/startups">Startups</Link>
            <Link to="/invest">Invest</Link>
          </div>
        </nav>

        {/* Main Content */}
        <div className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/report" element={<Report />} />
            <Route path="/volunteer" element={<Volunteer />} />
            <Route path="/donate" element={<Donate />} />
            <Route path="/startups" element={<Startups />} />
            <Route path="/invest" element={<Invest />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;