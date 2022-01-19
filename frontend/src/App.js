import { BrowserRouter } from 'react-router-dom'
// import { useState, useEffect } from 'react'
import Router from './router/Router'
import Header from './components/Header'
import Footer from './components/Footer'

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAXujuCqfo86isbAKwuOLWYi8F_no3A1m4",
  authDomain: "tmdb-ce0eb.firebaseapp.com",
  projectId: "tmdb-ce0eb",
  storageBucket: "tmdb-ce0eb.appspot.com",
  messagingSenderId: "619019601117",
  appId: "1:619019601117:web:9191d096d409a981b48734"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
function App() {
  return (

    <BrowserRouter>
      <Header />
      <Router />
      <Footer />
      <marquee direction="left" scrollamount="3">
        Please reload the page if the image fails to load and when logged out.
    </marquee>
    </BrowserRouter>
  );
}

export default App;
