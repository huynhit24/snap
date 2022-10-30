import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

const provider = new firebase.auth.GoogleAuthProvider();
const providerFacebook = new firebase.auth.FacebookAuthProvider();
//const providerPhone = new firebase.auth.PhoneAuthProvider();
//const providerGithub = new firebase.auth.GithubAuthProvider();
//const providerTwitter = new firebase.auth.TwitterAuthProvider();
//const providerEmail = new firebase.auth.EmailAuthProvider();

const firebaseConfig = {
    apiKey: "AIzaSyC7YPcMc0DKN_unr9Qm8fmakVPcQzYUvLA",
    authDomain: "snap-school.firebaseapp.com",
    projectId: "snap-school",
    storageBucket: "snap-school.appspot.com",
    messagingSenderId: "616097844395",
    appId: "1:616097844395:web:b5f8994aa4c51d6a453bee",
    measurementId: "G-6XKRY59JK6"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
const db = firebaseApp.firestore();
//console.log('database: ',db, ' struct: ', db.auth)
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, provider, storage, providerFacebook };
