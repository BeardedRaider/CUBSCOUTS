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
// admin pages
import Dashboard from './pages/admin/Dashboard';
import Users from './pages/admin/Users';
import Events from './pages/admin/Events';
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
      <Toaster />
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
            <Route path="/events" element={<Events />} />
            <Route path="/gallery" element={<Gallery />} />
          </Routes>
          <Footer />
        </Router>        
      </div>
    </AuthProvider>
  );
};
export default App;

