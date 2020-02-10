import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import heartImage from '../resources/heart.png';
import infoImage from '../resources/info.png';
import globeImage from '../resources/globe.png';
import statsImage from '../resources/statistics.png';
import './Sidebar.css';

const Sidebar = function() {
  const loc = useLocation();

  return (
    <div className="Sidebar">
      <Link to="/">
        <div className="sidebar-header">
          <div className="contracted-content">
            <img src={heartImage} alt="heart" />
          </div>
          <div className="expanded-content">
            Heart React Map
          </div>
        </div>
      </Link>

      <div className="top-seperator" />

      <Link to="/">
        <div className={`nav-link ${loc.pathname === '/' && 'selected'}`}>
          <div className="contracted-content">
            <img src={infoImage} alt="globe" />
          </div>
          <div className="expanded-content">
            What?
          </div>
        </div>
      </Link>

      <Link to="/map">
        <div className={`nav-link ${loc.pathname === '/map' && 'selected'}`}>
          <div className="contracted-content">
            <img src={globeImage} alt="globe" />
          </div>
          <div className="expanded-content">
            Live Map
          </div>
        </div>
      </Link>
      
      <Link to="/stats">
        <div className={`nav-link ${loc.pathname === '/stats' && 'selected'}`}>
          <div className="contracted-content">
          <img src={statsImage} alt="stats" />
          </div>
          <div className="expanded-content">
            Statistics
          </div>
        </div>
      </Link>

    </div>
  );
}

export default Sidebar;
