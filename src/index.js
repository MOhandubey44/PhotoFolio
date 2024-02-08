import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import Mixpanel from 'mixpanel-browser';
import ReactGA from 'react-ga';
ReactGA.initialize('G-VVQTY9582V');
// Initialize Mixpanel with your project token
Mixpanel.init('5413b0aa3437d534b244ab237b708470');
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
