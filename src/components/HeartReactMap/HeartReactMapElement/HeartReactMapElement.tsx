import React from 'react';
import './HeartReactMapElement.css';
import HeartReact from '../../../types/HeartReact';
import heartImage from '../../../resources/heart.png';
import HeartReactMapHoverBox from './HeartReactMapHoverBox/HeartReactMapHoverBox';

type Props = {
  react: HeartReact
}

class HeartReactMapElement extends React.Component<Props> {
  render() {


    return (
      <div 
        className="HeartReactMapElement" 
        id={this.props.react.id} 
        style={{
          top: `${100 * (90 - this.props.react.lat)/150}%`,
          left: `${100 * (180 + this.props.react.lon)/360}%`,
        }}  
      >

        <img 
          className="mapHeart" 
          src={heartImage} 
          key={this.props.react.id}
          style={{
            opacity: 0.5//((idx+1) / HEART_RENDER_COUNT)
          }} 
        />

        <HeartReactMapHoverBox react={this.props.react} />
      </div>
    );  
  }
}

export default HeartReactMapElement;
