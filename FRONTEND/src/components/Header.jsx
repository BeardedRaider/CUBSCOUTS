import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/header.css';


const Header = () => {

  return (
    <div className={`navbar`}>
      <div>
      <img className="logo" src={process.env.PUBLIC_URL + '/images/logo.png'} alt='logo' />
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