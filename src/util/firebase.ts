/*
  Hello user.
  Please don't use these firebase credentials to pointlessly download excessive data and surpass my gcloud limits.
  If you do this I will find you, and I will DDOS you (I have your IP, obviously).
  #TrustTheClient #QuotaTheftIsACrime #ImKiddingDDOSingIsIllegalButStillPleaseDont
*/

import firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyBPDWN3lP_wg3zSaCRBaIIwnu_lwlVkgPQ",
  authDomain: "mattyhempstead.firebaseapp.com",
  databaseURL: "https://mattyhempstead.firebaseio.com",
  projectId: "mattyhempstead",
  storageBucket: "mattyhempstead.appspot.com",
};

firebase.initializeApp(firebaseConfig);

// Initialise firestore path to reacts
const dbRef = firebase.firestore();
const reactsRef = dbRef.collection('heart-react').doc('data').collection('reacts');

// Initialise bucket storage to historical reacts
const storage = firebase.storage();
const historyRef = storage.ref().child('heart-react').child('history');

export { reactsRef, historyRef }
