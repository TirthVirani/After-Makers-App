// auth.js
// import { getAuth } from 'firebase/auth';
// import { app } from './firebaseConfig';

// const auth = getAuth(app);
// export { auth };

import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { app } from "./firebaseConfig";

const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export { auth };
