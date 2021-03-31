import firebase from 'firebase/app' 
import "firebase/auth"

//to get this configuratins you must go to firebase.google.com and create new project

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDZkLrolsxtOnY_LFz1peyin_tW9L8Liao",
    authDomain: "ecommerce-5595c.firebaseapp.com",
    projectId: "ecommerce-5595c",
    storageBucket: "ecommerce-5595c.appspot.com",
    messagingSenderId: "172033308329",
    appId: "1:172033308329:web:0f67d76ba79c8d9d5a9bb8"
  };
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

//exporting firebase functions:
export const auth = firebase.auth();

export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();