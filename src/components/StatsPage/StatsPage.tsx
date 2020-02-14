import React from 'react';
import './StatsPage.css';
import HeartReact from '../../types/HeartReact';
import ReactsOverTime from './graphs/ReactsOverTime';
import ReactsPerContinent from './graphs/ReactsPerContinent';
import ReactsPerHour from './graphs/ReactsPerHour';

type Props = {
  reacts: HeartReact[]
}

const StatsPage = (props:Props) => {
  // console.log(Object.values(props.reacts).length)

  return (
    <div className="StatsPage">
      <h2>A few random graphs i threw together just now</h2>

      <ReactsOverTime reacts={props.reacts} />
      <ReactsPerContinent reacts={props.reacts} />
      <ReactsPerHour reacts={props.reacts} />


    </div>
  );
}

export default StatsPage;
