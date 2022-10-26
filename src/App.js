import { useState, useEffect, Component } from 'react';
import './App.css';
import axios from 'axios';
import Button1 from 'react-bootstrap/Button';
import Form1 from 'react-bootstrap/Form';

import Login from './component/Login';
import Header from './component/Header';
import Item from './component/Item';
import Err404 from './component/Err404';
import Footer from './component/Footer';
import New from './component/New';

import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Router, Route, Link, Routes } from 'react-router-dom';
import { browserHistory } from 'react-router';

import bg from './images/bg01.jpg';

let mainURL = 'http://localhost:7000';
let loginURL = 'http://localhost:7000/loginresult';

function App() {

  function bgcolor() {
    const token = localStorage.getItem('token');
    if (!token){
      return ({ backgroundImage: "url('./images/bg01.jpg')", height: '100vh' });
    } else {
      return 
    }
  }


  return (
    <div style ={ bgcolor() }>
      <Header />
      <Routes>
          <Route path="/" element={<Login/>} />

          <Route path="/item" element={<Item data='testtest' keyx='12345'/>} />

          <Route path="/new" element={<New data='testtest' keyx='12345'/>} />

          <Route path="*" element={<Err404/>} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
