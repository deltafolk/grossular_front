import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import Login from './component/Login';
import Header from './component/Header';
import Item from './component/Item';
import Err404 from './component/Err404';
import Footer from './component/Footer';
import App from './App'

import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Router, Route, Link, Routes } from 'react-router-dom';
import { browserHistory } from 'react-router';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>

      <App />

    </BrowserRouter>
  </React.StrictMode>
);


reportWebVitals();
