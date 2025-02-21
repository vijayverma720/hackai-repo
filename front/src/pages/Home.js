import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      <h2>Welcome to Our Platform</h2>
      <p>
        Join us in making a difference! Report issues, donate to causes, or invest in innovative startups.
      </p>

      {/* Buttons */}
      <div className="buttons">
        <Link to="/report" className="btn-report">Report an Issue</Link>
        <Link to="/donate" className="btn-donate">Donate</Link>
        <Link to="/volunteer" className="btn-volunteer">Volunteer</Link>
      </div>
    </div>
  );
};

export default Home;