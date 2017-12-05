import * as firebase from "firebase";

var config = {
    apiKey: "AIzaSyBCxG7k2LR3Sk4vagkb6cqM46h1j1tO9Fk",
    authDomain: "reactajaxrouterdemo.firebaseapp.com",
    databaseURL: "https://reactajaxrouterdemo.firebaseio.com",
    projectId: "reactajaxrouterdemo",
    storageBucket: "reactajaxrouterdemo.appspot.com",
    messagingSenderId: "1004340546151"
  };
var firebaseApp = firebase.initializeApp(config);
export const provider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();
export default  firebaseApp;