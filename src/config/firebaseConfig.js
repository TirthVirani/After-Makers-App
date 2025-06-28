import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCurpn1uqd6E8IBtYwaACL0ikeRslkGiVk",
    authDomain: "postmaker-54f2c.firebaseapp.com",
    databaseURL: "https://postmaker-54f2c-default-rtdb.firebaseio.com",
    projectId: "postmaker-54f2c",
    storageBucket: "postmaker-54f2c.firebasestorage.app",
    messagingSenderId: "185310612473",
    appId: "1:185310612473:web:b1a5f34af12936ba828b28"
};

// if (!firebase.apps.length) {
//     firebase.initializeApp(firebaseConfig);
// }

const app = initializeApp(firebaseConfig);

export { app };