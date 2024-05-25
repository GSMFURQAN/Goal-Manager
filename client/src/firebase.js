// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBAtykT2_nFqweJiDpprQz8CIBA90KU4BE",
  authDomain: "travel-b0639.firebaseapp.com",
  databaseURL: "https://travel-b0639.firebaseio.com",
  projectId: "travel-b0639",
  storageBucket: "travel-b0639.appspot.com",
  messagingSenderId: "651853955562",
  appId: "1:651853955562:web:05c6dc8a91357ad49d3293",
  measurementId: "G-ECVCG3PRZG"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);