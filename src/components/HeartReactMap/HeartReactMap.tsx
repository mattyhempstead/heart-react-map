import React from 'react';

import './HeartReactMap.css'
import mapImage from '../../resources/map.png';
import HeartReact from '../../types/HeartReact';
import HeartReactMapElement from './HeartReactMapElement/HeartReactMapElement';

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
    
    const mapOverlayElements:JSX.Element[] = [];

    this.props.reacts
      .filter(react => new Date().getTime() - react.timestamp.getTime() < 1000 * 60 * 60 * 24)
      .forEach((react,idx) => {
        mapOverlayElements.push(<HeartReactMapElement react={react} key={react.id} />)
      })

    return (
      <div className="HeartReactMap">
        <img className="mapImage" src={mapImage} alt='map'></img>
        <div className="mapOverlay">{mapOverlayElements}</div>
      </div>
    );  
  }
}

export default HeartReactMap;
