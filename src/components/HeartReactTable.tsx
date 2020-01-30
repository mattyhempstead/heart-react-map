import React from 'react';
import './HeartReactTable.css';
import HeartReact from '../types/HeartReact';

type Props = {
  reacts: HeartReact[]
}

class HeartReactTable extends React.Component<Props> {
  render() {
    let heartReactRows:JSX.Element[] = [];

    this.props.reacts.forEach((react:HeartReact) => {
      heartReactRows.push(
        <tr key={react.id}>
          <td>{react.id}</td>
          <td>{react.timestamp.toISOString().substr(0,10) + ' ' + react.timestamp.toISOString().substr(11,8)}</td>
          <td>{react.uid}</td>
          <td>{react.utc_offset}</td>
          <td>{react.lon}</td>
          <td>{react.lat}</td>
          <td>{react.city}</td>
          <td>{react.region}</td>
          <td>{react.country}</td>
          <td>{react.continent}</td>
        </tr>
      );
    });

    heartReactRows = heartReactRows.reverse();

    return (
      <div className="HeartReactTable">
        <table>
          <thead>
            <tr>
              <th>id</th>
              <th>timestamp</th>
              <th>uid</th>
              <th>utc_offset</th>
              <th>lon</th>
              <th>lat</th>
              <th>city</th>
              <th>region</th>
              <th>country</th>
              <th>continent</th>
            </tr>
          </thead>
          <tbody>
            {heartReactRows}
          </tbody>
        </table>

      </div>
    );  
  }
}

export default HeartReactTable;
