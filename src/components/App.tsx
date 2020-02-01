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

    this.getReacts();

  }

  /**
   * Puts reacts (live and historical) into the state
   */
  getReacts = async () => {

    const historicalReacts = await getHistoricalReacts(new Date().toISOString().substr(0, 10));
    this.setState({
      reacts: historicalReacts,
    }, () => {
      this.getLiveReacts();
    })

  }

  /**
   * Starts tracking live reacts
   */
  getLiveReacts = async () => {
    // reactsRef.doc('sFBgiQ9UZx24bE4RTXxL').get().then(data => {
    //   console.log(data.data())
    // })
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
