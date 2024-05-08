// Importing necessary modules and components
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; // Importing routing components from react-router-dom

import Header from "./components/Header"; // Importing Header component
import Home from "./pages/shared/Home"; // Importing Home component
import Login from "./pages/shared/Login"; // Importing Login component
import Register from "./pages/shared/Register"; // Importing Register component
import Dashboard from "./pages/admin/Dashboard"; // Importing Dashboard component
import Events from "./pages/admin/Events"; // Importing Events component
import Parent from "./pages/parent/ParentDash"; // Importing Welcome component
import Child from "./pages/child/ChildDash"; // Importing Child component
import Footer from "./components/Footer"; // Importing Footer component


// Defining the App component
function App() {
  <div>
    <Router>
      <Header />
      <Routes>
        {/* components are renderd when the url matches the path */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/events" element={<Events />} />
        <Route path="/parent" element={<Parent />} />
        <Route path="/child" element={<Child />} />
      </Routes>
      <Footer />
    </Router>
  </div>;
}

// Exporting the App component
export default App;
