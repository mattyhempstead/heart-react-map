import React from 'react';
import './HeartReactTable.css';
import HeartReact from '../types/HeartReact';

type Props = {
  reacts: HeartReact[]
}

class HeartReactTable extends React.Component<Props> {
  render() {
    let heartReactRows:JSX.Element[] = [];

    this.props.reacts
      .filter(react => new Date().getTime() - react.timestamp.getTime() < 1000 * 60 * 60 * 24)
      .forEach((react:HeartReact) => {
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
        <div className = "tableContainer">
          <table>
            <thead>
              <tr>
                <th style={{width:'11%'}}>id</th>
                <th style={{width:'11%'}}>timestamp</th>
                <th style={{width:'6%'}}>uid</th>
                <th style={{width:'6%'}}>utc_offset</th>
                <th style={{width:'6%'}}>lon</th>
                <th style={{width:'6%'}}>lat</th>
                <th style={{width:'16%'}}>city</th>
                <th style={{width:'16%'}}>region</th>
                <th style={{width:'13%'}}>country</th>
                <th style={{width:'9%'}}>continent</th>
              </tr>
            </thead>
            <tbody>
              {heartReactRows}
            </tbody>
          </table>
        </div>
      </div>
    );  
  }
}

export default HeartReactTable;
