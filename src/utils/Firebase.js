import firebase from "firebase/app"

const firebaseConfig = {
  apiKey: "AIzaSyD4T_LZYusMPrrFwn07Z5TOc2WRV8fPHkU",
  authDomain: "logincomligo.firebaseapp.com",
  databaseURL: "https://logincomligo.firebaseio.com",
  projectId: "logincomligo",
  storageBucket: "logincomligo.appspot.com",
  messagingSenderId: "487176839254",
  appId: "1:487176839254:web:5d93d8c61faa0987345bf7"
};

  export default   firebase.initializeApp(firebaseConfig);