import React from 'react';

import mapImage from '../resources/map.png';
import heartImage from '../resources/heart.png'
import './HeartReactMap.css'
import HeartReact from '../types/HeartReact';

type Props = {
  reacts: HeartReact[]
}

type State = {}

class HeartReactMap extends React.Component<Props, State> {
  constructor(props:Props) {
    super(props);

    this.state = {}

  }
  render() {
    const overlayHearts:JSX.Element[] = [];
    const HEART_RENDER_COUNT = 100;

    this.props.reacts.slice(-HEART_RENDER_COUNT).forEach((react,idx) => {
      overlayHearts.push(
        <img className={"mapHeart " + react.id} src={heartImage} key={react.id} style={{
          top: `${100 * (90 - react.lat)/150}%`,
          left: `${100 * (180 + react.lon)/360}%`,
          opacity: ((idx+1) / HEART_RENDER_COUNT)
        }} />
      )
    })

    return (
      <div className="HeartReactMap">
        <img className="mapImage" src={mapImage} alt='map'></img>
        <div className="mapOverlay">{overlayHearts}</div>
      </div>
    );  
  }
}

export default HeartReactMap;
