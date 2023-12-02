// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAfVVEXxkW6obqQ-iaGG-rkyjUD9m4Wunk",
  authDomain: "twitter-clone-8a244.firebaseapp.com",
  projectId: "twitter-clone-8a244",
  storageBucket: "twitter-clone-8a244.appspot.com",
  messagingSenderId: "371112746093",
  appId: "1:371112746093:web:231b67437fecfc42867364",
  measurementId: "G-C3LWE43WSV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

export default auth;