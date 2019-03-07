import firebase from 'firebase';
import 'firebase/firestore';

const config = {
    apiKey: "AIzaSyDDUVEYdFY_ev1N3p_rtw2UKmdreNyaKf4",
    authDomain: "chat-3c1e7.firebaseapp.com",
    databaseURL: "https://chat-3c1e7.firebaseio.com",
    projectId: "chat-3c1e7",
    storageBucket: "chat-3c1e7.appspot.com",
    messagingSenderId: "494426770738"
  };
let firebaseApp = firebase.initializeApp(config);

export const db = firebaseApp.firestore();
export const functions = firebase.functions();