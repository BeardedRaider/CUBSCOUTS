import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/header.css';

const Header = () => {
  return (
    <div className='navbar'>
      <Link to="/">Home</Link>
      <Link to="login">Login</Link>
      <Link to="register">register</Link>
    </div>
  )
}

export default Header