import { getAuth } from 'firebase/auth';
import { initializeApp } from 'firebase/app';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyA9mOYddAk8KgOUPYuDUCRmbH-JNIVAZMA',
  authDomain: 'digital-signage-11f49.firebaseapp.com',
  projectId: 'digital-signage-11f49',
  storageBucket: 'digital-signage-11f49.appspot.com',
  messagingSenderId: '461858532593',
  appId: '1:461858532593:web:1f091781c983871ffc8d50',
  measurementId: 'G-R4GGM7ZJDF',
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export default auth;
