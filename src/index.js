import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import CRUD from './crud'; 

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
    <CRUD /> 
  </React.StrictMode>
);