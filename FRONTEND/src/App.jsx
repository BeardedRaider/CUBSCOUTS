// Desc: Main App component that contains the routing for the entire application.
// imports the necessary components and pages to be rendered.
import React, {useState} from 'react';// Import the useState hook
import {Route, Routes, BrowserRouter as Router} from 'react-router-dom';
import {AuthProvider} from './components/AuthContext';
import Header from './components/Header';
import Footer from './components/Footer';
// shared pages
import Home from './pages/shared/Home';
import Login from './pages/shared/Login';
import Register from './pages/shared/Register';
import Gallery from './pages/shared/Gallery';
import Uevents from './pages/shared/Events';
import Account from './pages/shared/Account';
import Badges from './pages/shared/Badges';
// admin pages
import Dashboard from './pages/admin/Dashboard';
import Users from './pages/admin/Users';
import Events from './pages/admin/Aevents';
import Agallery from './pages/admin/Agallery';
// parent pages
import Parent from './pages/parent/Parent';
import UserAv from './pages/parent/UserAv';
// child pages
import Child from './pages/child/Child';
import Games from './pages/child/Games';
//notification
import { Toaster } from 'react-hot-toast';
// css
import './App.css';
import ScrollToTop from './components/ScrollToTop';

// Main App component
const App = () => {// Main App component
  const [auth, setAuth] = useState({// State to store authentication details
    token: localStorage.getItem('token'),// Retrieve token from localStorage
    role: localStorage.getItem('role'),// Retrieve role from localStorage
  });

  return (// Return the JSX for the App component
    <AuthProvider value={{auth, setAuth}}>
      <Toaster // Notification component
      position="bottom-right"// Position of the notification
      reverseOrder={false}/>
      <div className="App">       
        <Router>
          <ScrollToTop /> {/* This component ensures that the page is scrolled to the top when the URL path changes*/}
          <Header />
          <Routes>
            {/* // Routes for the  pages */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/parent" element={<Parent />} />
            <Route path="/userav" element={<UserAv />} />
            <Route path="/child" element={<Child />} />
            <Route path="/games" element={<Games />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/users" element={<Users />} />
            <Route path="/Aevents" element={<Events />} />
            <Route path="/Agallery" element={<Agallery />} />
            <Route path="/events" element={<Uevents />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/account" element={<Account />} />
            <Route path="/badges" element={<Badges />} />
          </Routes>
          <Footer />
        </Router>        
      </div>
    </AuthProvider>
  );
};
export default App;

