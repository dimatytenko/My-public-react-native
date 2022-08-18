import * as firebase from "firebase";
import "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAqDmEUvby78C2no6tOaCP9b0xWci1ZxmM",
  authDomain: "publik-52440.firebaseapp.com",
  projectId: "publik-52440",
  storageBucket: "publik-52440.appspot.com",
  messagingSenderId: "849101666310",
  appId: "1:849101666310:web:3d490ee6b89ec1293a2b87",
  measurementId: "G-09PWTJ3W4T",
};
// Initialize Firebase
export default firebase.initializeApp(firebaseConfig);
