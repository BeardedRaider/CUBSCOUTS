// UserInformation.js
import { useState, useEffect } from "react";
import axios from "axios";

// This is the 'UserInformation' component. It's a functional component that uses the 'useState' and 'useEffect' hooks from React and the 'axios' library for making HTTP requests.

const UserInformation = () => {
  // The 'useState' hook is used to create a state variable 'user' and a setter function 'setUser'. The initial state is set to null.

  const [user, setUser] = useState(null);
  // The 'useEffect' hook is used to run a side effect after the component mounts. In this case, it fetches the user data from the server. The empty array passed as the second argument to 'useEffect' ensures that the side effect runs only once after the initial render.

  useEffect(() => {
    // The 'fetchUserData' function is defined inside 'useEffect'. It first retrieves the token from local storage. If no token is found, it logs an error message and returns. If a token is found, it sends a GET request to the server with the token included in the Authorization header.

    //If the server responds with data, the 'user' state is updated with this data. If the server's response is invalid, an error message is logged. If an error occurs during the request, an error message is logged.

    // The 'UserInformation' component returns the 'user' state, which will be null before the server responds and the user data afterwards.

    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("No token found");
          return;
        }
        const response = await axios.get("http://localhost:5000/api/users", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response && response.data) {
          setUser(response.data);
        } else {
          console.error("Invalid response from the server:", response);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  return user;
};
// The 'UserInformation' component is exported for use in other parts of the application.
export default UserInformation;
