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
import StatsPage from './StatsPage/StatsPage';

type State = {
  // reacts: Record<string, HeartReact>
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
    await this.getHistoricalReactsFromPastDays(55);
    this.getLiveReacts(this.state.reacts[this.state.reacts.length-1]);
  }

  /**
   * Downloads and stores all reacts from today to a given number of days back
   * @param {number} daysBack the number of days to include from today
   */
  getHistoricalReactsFromPastDays = async (daysBack:number) => {
    
    // Generate a list of promises for fetching reacts from past days
    const getReactPromiseList = [];
    let day = new Date();
    for (let i=0; i<daysBack; i++) {
      getReactPromiseList.push(getHistoricalReacts(day.toISOString().substr(0, 10)));
      day.setDate(day.getDate()-1);
    }

    // Make request to get all results at once
    const getReactResults = (await Promise.all(getReactPromiseList))
      .reduce((a,b) => a.concat(b), [])
      .sort((a,b) => a.timestamp.getTime() - b.timestamp.getTime())

    console.log(`Got ${getReactResults.length} reacts from past ${daysBack} days`);

    // Concat list of reacts together and store
    await this.storeNewReacts(
      getReactResults
    )
  }

  /**
   * Starts tracking live reacts starting from a given react
   * @param {HeartReact} startReact the starting react
   */
  getLiveReacts = (startReact:HeartReact) => {
    console.log(`Starting tracking live reacts after ${startReact.timestamp}`);
    let mostRecentStoredReactTime = startReact.timestamp;  // The most recently stored react time
    reactsRef.orderBy('timestamp').where('timestamp', '>', startReact.timestamp).onSnapshot(snap => {
      const newReacts:HeartReact[] = [];
      snap.forEach(doc => {
        // Filter based on the time so we don't add the entire list of new reacts each snapshot
        const docTimestamp = new Date(doc.data().timestamp.toMillis());
        if (docTimestamp > mostRecentStoredReactTime) {
          mostRecentStoredReactTime = docTimestamp;
          newReacts.push(this.snapshotToHeartReact(doc));
        }
      });
      this.storeNewReacts(newReacts);
    })
  }

  /**
   * Adds each HeartReact in a given array to this.state.reacts
   */
  storeNewReacts = (reacts:HeartReact[]):Promise<void> => {
    return new Promise(res => {
      this.setState({
        reacts: this.state.reacts.concat(reacts)
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
                <HeartReactMap reacts={this.state.reacts} />
                <HeartReactTable reacts={this.state.reacts} />
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
