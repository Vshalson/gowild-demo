import React from 'react';
import ReactDOM from 'react-dom/client';
// 1. We import the main component (renamed to App)
import App from './App.jsx';

// 2. We use ReactDOM.createRoot to render the App component into the #root div.
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);