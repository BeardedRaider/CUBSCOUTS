import React from 'react';
import Header from './components/Header';
import {Route, Routes, BrowserRouter as Router} from 'react-router-dom';
import Login from './pages/shared/Login';
import Register from './pages/shared/Register';

const App = () => {
  return (
    <div className="flex bg-white">       
      <Router>
        <Header />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          {/* add the rest of  your routes */}
        </Routes>
       </Router>        
      </div> 
  );
};
export default App;

