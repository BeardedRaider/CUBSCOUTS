import React, { useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../components/AuthContext";
import "../styles/header.css";
import logo from "../images/symbol.png";
import userLogo from "../images/default-user.png";

const Header = ({ className }) => {
  console.log('Header is rendering...');
  // Navbar component
  
  const navigate = useNavigate();
  const { auth, setAuth } = useContext(AuthContext);

  const handleLogout = () => {
    // Logout function
    localStorage.removeItem("token"); // Remove the token from the local storage
    localStorage.removeItem("role"); // Remove the role from the local storage
    setAuth({ token: null, role: null }); // Update the state
    navigate("/"); // Redirect to the home page
  };

  // Listen for changes in the local storage
  useEffect(() => {
    const handleStorageChange = () => {
      setAuth({
        token: localStorage.getItem("token"), // Update the state when local storage changes
        role: localStorage.getItem("role"), // Update the state when local storage changes
      });
    };

    // Attach the event listener
    window.addEventListener("storage", handleStorageChange);

    // Detach the event listener when the component unmounts
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [setAuth]);// Update the state when local storage changes

  // Log the token and user type when they change
  useEffect(() => {
    console.log("Token has changed:", auth.token);
    console.log("Role has changed:", auth.role);
  }, [auth]);

  return (
    <div className={`navbar ${className}`}>
      <div>
        <img
          className="logo"
          src={logo}
          alt="Cub Scouts Logo"
        />
      </div>
      <div>
        <ul>
          {auth.token ? (
            auth.role === 'admin' ? (
              <>
                <li>
                  <Link to="/dashboard">Dashboard</Link>
                </li>
                <li>
                  <Link to="/users">Users</Link>
                </li>
                <li>
                  <Link to="/Aevents">Events</Link>
                </li>

                <li>
                {auth.token && (
                  <Link to="/account">
                    <img className="rounded-icon" src={userLogo} alt="My Account"  />
                  </Link>
                )}
                </li>

                <li>
                  <button className="logoutBtn" onClick={handleLogout}>
                    Logout
                  </button>
                </li>
              </>
            ) : auth.role === "parent" ? (
              <>
                <li>
                  <Link to="/parent">Home</Link>
                </li>
                <li>
                  <Link to="/events">Events</Link>
                </li>
                <li>
                  <Link to="/gallery">Gallery</Link>
                </li>
                
                <li>
                {auth.token && (
                  <Link to="/account">
                    <img className="rounded-icon" src={userLogo} alt="My Account"  />
                  </Link>
                )}
                </li>

                <li>
                  <Link to="https://www.scouts.org.uk/scouts" target="_blank">
                    Scouts
                  </Link>
                </li>
                <li>
                  <button className="logoutBtn" onClick={handleLogout}>
                    Logout
                  </button>
                </li>
              </>
            ) : ( // If the user is a child
              <>
                <li>
                  <Link to="/child">Home</Link>
                </li>
                <li>
                  <Link to="/events">Events</Link>
                </li>
                <li>
                  <Link to="/gallery">Gallery</Link>
                </li>
                
                <li>
                {auth.token && (
                  <Link to="/account">
                    <img className="rounded-icon" src={userLogo} alt="My Account"  />
                  </Link>
                )}
                </li>
                
                <li>
                  <Link to="https://www.scouts.org.uk/scouts" target="_blank">
                    Scouts
                  </Link>
                </li>
                <li>
                  <button className="logoutBtn" onClick={handleLogout}>
                    Logout
                  </button>
                </li>
              </>
            )
          ) : ( // If the user is not logged in
            <>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/register">Register</Link>
              </li>
              <li>
                <Link to="https://www.scouts.org.uk/scouts" target="_blank">
                  Scouts
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Header;
