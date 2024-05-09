import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/header.css";

const Header = ({ className }) => {
  // Navbar component
  const navigate = useNavigate();
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [role, setRole] = useState(localStorage.getItem("role"));

  const handleLogout = () => {
    // Logout function
    localStorage.removeItem("token"); // Remove the token from the local storage
    localStorage.removeItem("role"); // Remove the role from the local storage
    setToken(null); // Update the state
    setRole(null); // Update the state
    navigate("/"); // Redirect to the home page
  };

  // Listen for changes in the local storage
  useEffect(() => {
    const handleStorageChange = () => {
      setToken(localStorage.getItem("token"));// Update the state when local storage changes
      setRole(localStorage.getItem("role"));// Update the state when local storage changes
    };

    // Attach the event listener
    window.addEventListener("storage", handleStorageChange);

    // Detach the event listener when the component unmounts
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  // Log the token and user type when they change
  useEffect(() => {
    console.log("Token has changed:", token);
    console.log("Role has changed:", role);
  }, [token, role]);

  return (
    <div className={`navbar`}>
      <div>
        <img
          className="logo"
          src={process.env.PUBLIC_URL + "../../../public/images/logo.png"}
          alt="Cub Scouts"
        />
      </div>
      <div>
        <ul>
          {token ? (
            role === 'admin' ? (
              <>
                <li>
                  <Link to="/admin">Dashboard</Link>
                </li>
                <li>
                  <Link to="/users">Users</Link>
                </li>
                <li>
                  <Link to="/events">Events</Link>
                </li>
                <li>
                  <button className="logoutBtn" onClick={handleLogout}>
                    Logout
                  </button>
                </li>
              </>
            ) :role === "parent" ? (
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
