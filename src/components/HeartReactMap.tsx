import React from 'react';

import map from '../resources/map.png';
import './HeartReactMap.css'

type State = {}

class HeartReactMap extends React.Component<{}, State> {
  constructor(props: {}) {
    super(props);

    this.state = {}

  }
  render() {
    return (
      <div className="HeartReactMap">
        <img className="mapImage" src={map} />
      </div>
    );  
  }
}

export default HeartReactMap;
