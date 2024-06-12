import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));// Create a root for the app
root.render(// Render the app
  // Wrap the app in React.StrictMode
  <React.StrictMode>
    {/* // Render the App component */}
    <App />
  </React.StrictMode>// Wrap the app in React.StrictMode
);
