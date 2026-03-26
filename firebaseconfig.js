// // firebaseconfig.js
// import { initializeApp } from "firebase/app";
// import { getAuth } from "firebase/auth";
// import { getFirestore } from "firebase/firestore";  // Import Firestore
// // import { getAnalytics } from "firebase/analytics";


// const firebaseConfig = {
//   apiKey: "AIzaSyDLcOeC85cNvGWif-74A_zj3GPX73MYOao",
//   authDomain: "mlpc-d24cd.firebaseapp.com",
//   projectId: "mlpc-d24cd",
//   storageBucket: "mlpc-d24cd.firebasestorage.app",
//   messagingSenderId: "1066822821873",
//   appId: "1:1066822821873:web:182be2f3dab0be40a08650",
//   measurementId: "G-TSTX00J941"
// };

// // Initialize Firebase
// export const app = initializeApp(firebaseConfig);
// export const firebaseAuth = getAuth(app);  // Initialize Auth

// export const db = getFirestore(app);  // Initialize Firestore

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDLcOeC85cNvGWif-74A_zj3GPX73MYOao",
  authDomain: "mlpc-d24cd.firebaseapp.com",
  projectId: "mlpc-d24cd",
  storageBucket: "mlpc-d24cd.firebasestorage.app",
  messagingSenderId: "1066822821873",
  appId: "1:1066822821873:web:182be2f3dab0be40a08650",
  measurementId: "G-TSTX00J941"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Auth first, then export
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth as firebaseAuth, db };