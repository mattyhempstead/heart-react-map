import React from 'react';
import HeartReact from '../../../types/HeartReact';
import { CartesianGrid, XAxis, YAxis, BarChart, Tooltip, Bar } from 'recharts';


type Props = {
  reacts: HeartReact[];
}

const ReactsPerHour= (props: Props) => {

  const data = Object.entries(
    props.reacts.reduce((data, react) => {      
      let hour = react.timestamp.getUTCHours();
      hour += Math.round(react.utc_offset);
      hour = (hour + 24) % 24;

      if (hour in data) {
        data[hour]++;
      } else {
        data[hour] = 1;
      }
      return data;

    }, {} as Record<string, number>)
  )
    .map(entry => ({
      name: ((parseInt(entry[0]) + 11) % 12 + 1) + (parseInt(entry[0]) < 12 ? 'AM' : 'PM'),
      count: entry[1],
      hour: parseInt(entry[0])
    }))
    .sort((a,b) => (b.hour < a.hour) ? 1 : -1);


  return (
    <div className="graphReactsPerHour">
      Reacts per hour of the day
      
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

export default ReactsPerHour;
