import React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';

import './App.css';
import getHistoricalReacts from '../util/getHistoricalReacts';
import HeartReactTable from './HeartReactTable';
import HeartReactMap from './HeartReactMap/HeartReactMap';
import HeartReact from '../types/HeartReact';
import { reactsRef } from '../util/firebase';
import Sidebar from './Sidebar';
import InfoPage from './InfoPage/InfoPage';

type State = {
  reacts: Record<string, HeartReact>
}

class App extends React.Component<{}, State> {
  constructor(props: {}) {
    super(props);

    this.state = {
      reacts: {},
    }

    this.getReacts();

  }

  /**
   * Puts reacts (live and historical) into the state
   */
  getReacts = async () => {
    const historicalReacts = await getHistoricalReacts(new Date().toISOString().substr(0, 10));
    await this.storeNewReacts(historicalReacts);

    // await this.storeNewReacts(await getHistoricalReacts(new Date(new Date().setDate(new Date().getDate()-1)).toISOString().substr(0, 10)));
    // await this.storeNewReacts(await getHistoricalReacts(new Date(new Date().setDate(new Date().getDate()-2)).toISOString().substr(0, 10)));
    // await this.storeNewReacts(await getHistoricalReacts(new Date(new Date().setDate(new Date().getDate()-3)).toISOString().substr(0, 10)));

    this.getLiveReacts(historicalReacts[historicalReacts.length-1]);
  }

  /**
   * Starts tracking live reacts starting from a given react
   */
  getLiveReacts = async (startReact:HeartReact) => {
    let mostRecentStoredReactTime = startReact.timestamp;  // The most recently stored react time
    reactsRef.orderBy('timestamp').where('timestamp', '>', startReact.timestamp).onSnapshot(snap => {
      snap.forEach(doc => {
        // Check the time so we don't bother processing the entire list of new reacts each snapshot
        const docTimestamp = new Date(doc.data().timestamp.toMillis());
        if (docTimestamp > mostRecentStoredReactTime) {
          mostRecentStoredReactTime = docTimestamp;
          this.storeNewReacts([this.snapshotToHeartReact(doc)]);
        }
      })
    })
  }

  /**
   * Adds each HeartReact in a given array to this.state.reacts
   */
  storeNewReacts = (reacts:HeartReact[]):Promise<void> => {
    return new Promise(res => {
      this.setState({
        reacts: {
          ...this.state.reacts,
          ...reacts.reduce((obj, react) => ({ ...obj, [react.id]:react }), {})
        }
      }, () => {
        res();
      })
    })
  }

  /**
   * Converts a document snapshot of a heart react into the HeartReact object type
   */
  snapshotToHeartReact = (snap:firebase.firestore.QueryDocumentSnapshot<firebase.firestore.DocumentData>):HeartReact => {
    let data = snap.data();
    return {
      id: snap.id,
      timestamp: new Date(data.timestamp.toMillis()),
      uid: data.uid,
      utc_offset: data.utc_offset,
      lon: parseFloat(data.lon),
      lat: parseFloat(data.lat),
      city: data.loc.split(', ')[0],
      region: data.loc.split(', ')[1],
      country: data.loc.split(', ')[2],
      continent: data.continent
    }
  }

  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Sidebar />
          <div style={{ marginLeft: '3vw', padding: '0.5vw' }}>
            <Switch>
              <Route exact path="/heart-react">
                <InfoPage />
              </Route>
              <Route exact path="/heart-react/map">
                <HeartReactMap reacts={Object.values(this.state.reacts).sort((a,b) => a.timestamp.getTime() - b.timestamp.getTime())} />
                <HeartReactTable reacts={Object.values(this.state.reacts).sort((a,b) => a.timestamp.getTime() - b.timestamp.getTime())} />
              </Route>
              <Route exact path="/heart-react/stats">
                STATS
              </Route>
            </Switch>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
