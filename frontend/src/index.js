import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';
import './scss/index.scss'
import { UserProvider } from './context/auth'
// import { MovieListProvider } from './context/movieList'


ReactDOM.render(

  <React.StrictMode>
    <UserProvider>
      {/* <MovieListProvider> */}
      <App />
      {/* </MovieListProvider> */}
    </UserProvider>
  </React.StrictMode>,

  document.getElementById('root')
);

