import { initializeApp } from "firebase/app";
import {  getFirestore } from "firebase/firestore";
import {getAuth } from "firebase/auth";


const firebaseConfig = {
    apiKey: "AIzaSyA9IB_ETAV_djLH10IFLhLPNi7YaXeH-6w",
    authDomain: "memorize-studio.firebaseapp.com",
    databaseURL: "https://memorize-studio-default-rtdb.firebaseio.com",
    projectId: "memorize-studio",
    storageBucket: "memorize-studio.appspot.com",
    messagingSenderId: "146572929428",
    appId: "1:146572929428:web:918580ab4b5068513d0781",
    measurementId: "G-9008EBEE1R"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const provider = new GoogleAuthProvider();
const auth = getAuth(app);

export default (db, app, provider, auth);



