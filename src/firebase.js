import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyAOqh8IfkShzlWF0UnMy-TxA9RQ5HOJ5qk",
  authDomain: "linkedin-clone-b9b96.firebaseapp.com",
  projectId: "linkedin-clone-b9b96",
  storageBucket: "linkedin-clone-b9b96.appspot.com",
  messagingSenderId: "1032601657204",
  appId: "1:1032601657204:web:cf60612621ebae69ad9621"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();

export { db, auth };
