/*
  Hello user.
  Please don't use these firebase credentials to pointlessly download excessive data and surpass my gcloud limits.
  If you do this I will find you, and I will DDOS you (I have your IP, obviously).
  #TrustTheClient #QuotaTheftIsACrime #ImKiddingDDOSingIsIllegalButStillPleaseDont
*/

const firebaseConfig = {
  apiKey: "AIzaSyBPDWN3lP_wg3zSaCRBaIIwnu_lwlVkgPQ",
  authDomain: "mattyhempstead.firebaseapp.com",
  databaseURL: "https://mattyhempstead.firebaseio.com",
  projectId: "mattyhempstead",
  storageBucket: "mattyhempstead.appspot.com",
};

firebase.initializeApp(firebaseConfig);

// Initialise firestore path to reacts
const db = firebase.firestore();
const dbReacts = db.collection('heart-react').doc('data').collection('reacts');

// Initialise bucket storage to historical reacts
const storage = firebase.storage();
const storageRef = storage.ref();
const historyRef = storageRef.child('heart-react').child('history');
