import * as firebase from 'firebase'
import 'firebase/firestore'

firebase.initializeApp({
    apiKey: 'AIzaSyDGYs5zevRS3s_EGSDmyChtJS-qWiZNFRE',
    databaseURL: "https://mayday-5e245.firebaseio.com",
    authDomain: 'mayday-5e245.firebaseapp.com',
    projectId: 'mayday-5e245',
    storageBucket: "mayday-5e245.appspot.com",
    messagingSenderId: "728890149267",
    appId: "1:728890149267:web:d582768709d8c2f2264066",
    measurementId: "G-2R1HL36FV9"
 });

 const database = firebase.firestore()
 const googleAuthProvider = new firebase.auth.GoogleAuthProvider()
 export { database as default, firebase, googleAuthProvider }