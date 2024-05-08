import React from 'react';
import {Route, Routes, BrowserRouter as Router} from 'react-router-dom';
import Header from './components/Header';
// shared pages
import Home from './pages/shared/Home';
import Login from './pages/shared/Login';
import Register from './pages/shared/Register';
// admin pages
import Dashboard from './pages/admin/Dashboard';
import Users from './pages/admin/Users';
import Events from './pages/admin/Events';
// parent pages
import Parent from './pages/parent/Parent';
// child pages
import Child from './pages/child/Child';
// css
import './App.css';

const App = () => {
  return (
    <div className="App">       
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/parent" element={<Parent />} />
          <Route path="/child" element={<Child />} />
          <Route path="/admin" element={<Dashboard />} />
          <Route path="/users" element={<Users />} />
          <Route path="/events" element={<Events />} />

          {/* add the rest of  your routes */}
        </Routes>
       </Router>        
      </div> 
  );
};
export default App;

