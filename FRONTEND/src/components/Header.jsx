import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <>
    <div>Header</div>
    <Link to="login">Login</Link>
    <Link to="register">register</Link>
    </>
  )
}

export default Header