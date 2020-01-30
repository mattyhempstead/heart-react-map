import React from 'react';
import './App.css';
import { reactsRef } from '../util/firebase';
import getHistoricalReacts from '../util/getHistoricalReacts';

class App extends React.Component {
  componentDidMount() {

    reactsRef.doc('sFBgiQ9UZx24bE4RTXxL').get().then(data => {
      console.log(data.data())
    })

    getHistoricalReacts('2020-01-01').then(data => console.log(data))

  }
  render() {
    return (
      <div className="App">
        Test
      </div>
    );  
  }
}

export default App;
