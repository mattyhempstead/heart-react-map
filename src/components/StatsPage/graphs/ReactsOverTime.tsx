import React from 'react';
import HeartReact from '../../../types/HeartReact';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Text } from 'recharts';


type Props = {
  reacts: HeartReact[];
}

const ReactsOverTime = (props: Props) => {

  const data = Object.entries(
    props.reacts.reduce((data, react) => {
      const reactDate = react.timestamp.toISOString().slice(0, 10);
      if (reactDate in data) {
        data[reactDate]++;
      } else {
        data[reactDate] = 1;
      }
      return data;
    }, {} as Record<string, number>)
  )
    .map(entry => ({
      name: entry[0],
      count: entry[1]
    }))
    .sort((a,b) => (a.name > b.name) ? 1 : -1);


  return (
    <div className="graphReactsOverTime">
      Reacts over time

      <LineChart width={1200} height={300} data={data} >
        <XAxis dataKey="name" minTickGap={40} interval="preserveStart" />
        <YAxis />
        <Tooltip />
        {/* <CartesianGrid stroke="#ccc" /> */}
        <Line dataKey="count" stroke="#993333" />
      </LineChart>
    </div>
  )
}

export default ReactsOverTime;
