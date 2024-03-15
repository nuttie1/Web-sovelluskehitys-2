import React from 'react';
import './styles/index.css';
import App from './App';

import ReactDOM from 'react-dom';


const root = document.getElementById('root');

/**
 * This is the root of the React app
 * Renders the app to the root element
 * @param root: The root element
 * @returns The app
 */
if (root !== null) {
  ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    root
  );
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

