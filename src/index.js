// Import the React library
import React from 'react';
// Import the ReactDOM library, specifically the client-side methods
import ReactDOM from 'react-dom/client';
// Import the main App component from the App.js file
import App from './App';

// Get the DOM element with the id 'root' and create a root for the React application
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the App component inside the root element. The App component is wrapped in React's StrictMode, 
// which checks for potential problems in the application during the development build
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);


