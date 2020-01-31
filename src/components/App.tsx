import React from 'react';

import './App.css';
import './HeartReactTable'

import getHistoricalReacts from '../util/getHistoricalReacts';
import HeartReactTable from './HeartReactTable';
import HeartReactMap from './HeartReactMap';
import HeartReact from '../types/HeartReact';

type State = {
  reacts: HeartReact[]
}

class App extends React.Component<{}, State> {
  constructor(props: {}) {
    super(props);

    this.state = {
      reacts: [],
    }

    // reactsRef.doc('sFBgiQ9UZx24bE4RTXxL').get().then(data => {
    //   console.log(data.data())
    // })

    getHistoricalReacts(new Date().toISOString().substr(0, 10)).then(reacts => {
      this.setState({
        reacts: reacts,
      })
    })

  }
  render() {
    return (
      <div className="App">
        <HeartReactMap />
        <HeartReactTable reacts={this.state.reacts} />
      </div>
    );  
  }
}

export default App;
