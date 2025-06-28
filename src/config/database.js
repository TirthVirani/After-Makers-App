// database.js
import { getDatabase, ref, onValue } from 'firebase/database';
import { app } from './firebaseConfig';

const database = getDatabase(app);
export { database, ref, onValue };
