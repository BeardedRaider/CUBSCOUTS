import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/header.css';


const Header = ({ className }) => {
    // Navbar component
    const navigate = useNavigate();
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [parent, setParent] = useState(localStorage.getItem('parent') === 'true');
  
    const handleLogout = () => {// Logout function
      localStorage.removeItem('token');// Remove the token from the local storage
      setToken(null); // Update the state
      navigate('/');// Redirect to the home page
    };
  
    
    // Listen for changes in the local storage
    useEffect(() => {
      const handleStorageChange = () => {
        setToken(localStorage.getItem('token'));
        setParent(localStorage.getItem('parent') === 'true');
      };
  
      // Attach the event listener
      window.addEventListener('storage', handleStorageChange);
  
      // Detach the event listener when the component unmounts
      return () => {
        window.removeEventListener('storage', handleStorageChange);
        };
      }, []);
  
      // Log the changes in token and parent state
    useEffect(() => {
      console.log('Token has changed:', token);
      console.log('Parents click here:', parent);
    }, [token, parent]);

  return (
    <div className={`navbar`}>
      <div>
      <img  className="logo" src={process.env.PUBLIC_URL + '../../../public/images/logo.png'} alt='Cub Scouts' />
      </div>
      <div>
        <ul>
          <>
            <li><Link to="https://www.scouts.org.uk/scouts" target="_blank">Scouts</Link></li>
          </>
          <li><Link to="/">Home</Link></li>
          <li><Link to="login">Login</Link></li>
          <li><Link to="register">register</Link></li>
        </ul>
      </div>
    </div>
  )
}

export default Header