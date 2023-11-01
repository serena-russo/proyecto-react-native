import app from "firebase/app";
import firebase from 'firebase';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyChj5g2iFZ4mzapk0igj6zk6xJjwqMr240",
  authDomain: "proyecto-react-native-1c0b5.firebaseapp.com",
  projectId: "proyecto-react-native-1c0b5",
  storageBucket: "proyecto-react-native-1c0b5.appspot.com",
  messagingSenderId: "874398709706",
  appId: "1:874398709706:web:8c5532464e9e8e2a6fc133"
};

// Initialize Firebase
app.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const storage = app.storage();
export const db = app.firestore();