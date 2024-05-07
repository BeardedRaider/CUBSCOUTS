// Importing necessary modules and components
import React, { useState, useEffect } from 'react';
import DesktopWarning from './components/pages/shared/DesktopWarning';
import { BrowserRouter as Router, Route, Routes,} from "react-router-dom";// Importing routing components from react-router-dom

import Home from '../FRONTEND/pages/shared/Home';// Importing Home component
import Login from '../FRONTEND/pages/shared/Login';// Importing Login component
import Register from '../FRONTEND/pages/shared/Register';// Importing Register component
import Dashboard from '../FRONTEND/pages/admin/Dashboard';// Importing Dashboard component
import Events from '../FRONTEND/pages/admin/Events';// Importing Events component
import Parent from '../FRONTEND/pages/parent/ParentDash';// Importing Welcome component
import Child from '../FRONTEND/pages/child/ChildDash';// Importing Child component


// Defining the App component
function App() {
    <div>
        <Router>
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
        </Router>
    </div>
}

// Exporting the App component
export default App;
    