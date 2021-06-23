import firebase from 'firebase/app'
import 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyDLgnW6804nkYDZJwldOLbPTGKX3RfD87I",
  authDomain: "femalepro-edu.firebaseapp.com",
  projectId: "femalepro-edu",
  storageBucket: "femalepro-edu.appspot.com",
  messagingSenderId: "577565168426",
  appId: "1:577565168426:web:f1223552f149050e08c453"
};

const firebaseApp = firebase.initializeApp(firebaseConfig)
export default firebaseApp.firestore()