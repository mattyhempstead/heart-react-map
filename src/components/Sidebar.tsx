import React from 'react';
import heartImage from '../resources/heart.png';
import globeImage from '../resources/globe.png';
import statsImage from '../resources/statistics.png';
import './Sidebar.css';

class Sidebar extends React.Component<{}, {}> {
  constructor(props: {}) {
    super(props);
    this.state = {}
  }

  render() {
    return (
      <div className="Sidebar">
        <div className="sidebar-header">
          <div className="contracted-content">
            <img src={heartImage} alt="heart" />
          </div>
          <div className="expanded-content">
            Heart React Map
          </div>
        </div>

        <div className="top-seperator" />

        <div className="nav-link selected">
          <div className="contracted-content">
            <img src={globeImage} alt="globe" />
          </div>
          <div className="expanded-content">
            Live Map
          </div>
        </div>

        <div className="nav-link">
          <div className="contracted-content">
          <img src={statsImage} alt="stats" />
          </div>
          <div className="expanded-content">
            Statistics
          </div>
        </div>

      </div>
    );  
  }
}

export default Sidebar;
