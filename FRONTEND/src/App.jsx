import React, {useState} from 'react';
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
// admin pages
import Dashboard from './pages/admin/Dashboard';
import Users from './pages/admin/Users';
import Events from './pages/admin/Aevents';
// parent pages
import Parent from './pages/parent/Parent';
// child pages
import Child from './pages/child/Child';
//notification
import { Toaster } from 'react-hot-toast';
// css
import './App.css';

const App = () => {
  const [auth, setAuth] = useState({
    token: localStorage.getItem('token'),
    role: localStorage.getItem('role'),
  });

  return (
    <AuthProvider value={{auth, setAuth}}>
      <Toaster 
      position="bottom-right"
      reverseOrder={false}/>
      <div className="App">       
        <Router>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/parent" element={<Parent />} />
            <Route path="/child" element={<Child />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/users" element={<Users />} />
            <Route path="/Aevents" element={<Events />} />
            <Route path="/events" element={<Uevents />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/account" element={<Account />} />
          </Routes>
          <Footer />
        </Router>        
      </div>
    </AuthProvider>
  );
};
export default App;

