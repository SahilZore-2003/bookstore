import { initializeApp } from "firebase/app";



const firebaseConfig = {
  apiKey: "API_KEY",
  authDomain: "database-51c58.firebaseapp.com",
  projectId: "database-51c58",
  storageBucket: "database-51c58.appspot.com",
  messagingSenderId: "1024646477059",
  appId: "1:1024646477059:web:ce7d8721ffd18f4628a536",
  databaseURL:"https://database-51c58-default-rtdb.asia-southeast1.firebasedatabase.app"
};


export const app = initializeApp(firebaseConfig);
