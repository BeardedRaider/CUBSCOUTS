import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { format } from 'date-fns';
import "../../styles/users.css";

const Account = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        console.log("Token:", token); // Add this line

        const response = await axios.get('http://localhost:5000/api/users', {
          headers: { Authorization: `Bearer ${token}` }
        });

        console.log("User data:", response.data); // Add this line
        setUser(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching user data:', error.response ? error.response.data : error.message);
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  const handleSaveClick = async () => {
    try {
      const token = localStorage.getItem('token');
      const { dob, ...userWithoutDob } = user;
      const formattedDob = dob ? format(new Date(dob), 'yyyy-MM-dd') : null;
      const userToUpdate = { ...userWithoutDob, dob: formattedDob };

      // Remove the role from userToUpdate object
      delete userToUpdate.role;

      console.log("Updating user:", userToUpdate); // Add this line

      const response = await axios.put('http://localhost:5000/api/users/self', userToUpdate, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      });

      console.log("Update response:", response.status); // Add this line

      if (response.status === 200) {
        toast.success('User updated successfully');
      } else {
        toast.error('Error saving user');
      }
    } catch (error) {
      console.error('Error saving user:', error.response ? error.response.data : error.message);
      toast.error('Error saving user');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <div>Error: User data not available.</div>;
  }

  return (
    <>
      <Toaster />
      <div className="account-container">
        <h1 className="account-title">Account Settings</h1>
        <div className="account-form">
          <label>
            Name:
            <input type="text" name="name" value={user.name || ''} onChange={handleInputChange} />
          </label>
          <label>
            Email:
            <input type="email" name="email" value={user.email || ''} onChange={handleInputChange} />
          </label>
          <label>
            Date of Birth:
            <input type="date" name="dob" value={user.dob ? format(new Date(user.dob), 'yyyy-MM-dd') : ''} onChange={handleInputChange} />
          </label>
          <label>
            Address:
            <input type="text" name="address" value={user.address || ''} onChange={handleInputChange} />
          </label>
          <button onClick={handleSaveClick} className="save-button">Save</button>
        </div>
      </div>
    </>
  );
};

export default Account;