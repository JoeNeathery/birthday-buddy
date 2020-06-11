import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
var env = process.env.NODE_ENV;
console.log(env);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);