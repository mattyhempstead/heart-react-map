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
      top: this.props.react.lat >= 15 ? '1vw' : '-16.5vw',
      left: this.props.react.lon <= 0 ? '1vw' : '-11vw',
    }

    return (
      <div className="HeartReactMapHoverBox" style={style}>
        {this.props.react.id}
        <br/>
        {this.props.react.lat}
        <br/>
        {this.props.react.lon}
      </div>
    );  
  }
}

export default HeartReactMapHoverBox;
