// import firebase from "@firebase/app";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyBiRZQd5nDPaD1fBDvD_ZJy7-izs_16PmE",
  authDomain: "crypto-72337.firebaseapp.com",
  projectId: "crypto-72337",
  storageBucket: "crypto-72337.appspot.com",
  messagingSenderId: "816424184543",
  appId: "1:816424184543:web:da9b9912fd57e7ec2e176a",
};

// firebase.initializeApp(firebaseConfig);
const app = initializeApp(firebaseConfig);

export const authentication = getAuth(app);
