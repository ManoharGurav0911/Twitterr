import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDNWj6sKWq-iVRoSEq-O4yIISopUrMjV5I",
  authDomain: "tweeter-a0474.firebaseapp.com",
  projectId: "tweeter-a0474",
  storageBucket: "tweeter-a0474.appspot.com",
  messagingSenderId: "775401995935",
  appId: "1:775401995935:web:419ef048ddf17161036caa",
  measurementId: "G-34ZDERWDVC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

export default auth;