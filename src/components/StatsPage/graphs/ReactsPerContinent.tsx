import React from 'react';
import HeartReact from '../../../types/HeartReact';
import { CartesianGrid, XAxis, YAxis, BarChart, Tooltip, Bar } from 'recharts';


type Props = {
  reacts: HeartReact[];
}

const ReactsOverTime = (props: Props) => {

  const data = Object.entries(
    props.reacts.reduce((data, react) => {
      if (react.continent in data) {
        data[react.continent]++;
      } else {
        data[react.continent] = 1;
      }
      return data;
    }, {} as Record<string, number>)
  )
    .map(entry => ({
      name: entry[0],
      count: entry[1],
    }))
    .sort((a,b) => (b.count > a.count) ? 1 : -1);


  return (
    <div className="graphReactsPerContinent">
      Reacts per continent

      <BarChart width={1200} height={300} data={data}>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
        <Bar dataKey="count" fill="#993333" barSize={100} />
      </BarChart>
    </div>
  )
}

export default ReactsOverTime;
