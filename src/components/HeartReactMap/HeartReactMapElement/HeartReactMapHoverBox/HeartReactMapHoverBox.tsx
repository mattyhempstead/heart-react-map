import React from 'react';
import HeartReact from '../../../../types/HeartReact';
import './HeartReactMapHoverBox.css';

type Props = {
  react: HeartReact
}

class HeartReactMapHoverBox extends React.Component<Props> {
  render() {
    // Ensure box always renders inside of map
    const style = {
      top: this.props.react.lat >= 15 ? '0.3vw' : '-16.5vw',
      left: this.props.react.lon <= 0 ? '0.3vw' : '-11.0vw',
    }

    return (
      <div className="HeartReactMapHoverBox" style={style}>
        <b>{this.props.react.id}</b>
        <br/>
        {this.props.react.timestamp.toString().slice(0, 24)}
        <br/>
        {this.props.react.lat}, {this.props.react.lon}
        <br/><br/>
        {this.props.react.city}
        <br/>
        {this.props.react.region}
        <br/>
        {this.props.react.country}
        <br/>
        {this.props.react.continent}
        <br/><br/>
        {this.props.react.uid}
        <br/>
        {this.props.react.utc_offset}
      </div>
    );  
  }
}

export default HeartReactMapHoverBox;
