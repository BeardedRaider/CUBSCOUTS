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
        const response = await axios.get('http://localhost:5000/api/users', {
          headers: { Authorization: `Bearer ${token}` }
        });
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

      const response = await axios.put('http://localhost:5000/api/users/self', userToUpdate, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      });


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
      <div className="text-gray-900 bg-gray-200">
        <section className=' hero overlay py-24 px-4 lg:px-16'>
          <div className='container mx-auto px-[12px] md:px-24 xl:px-12 max-w-[1300px] nanum2'>
            <h1 className="text-3xl md:text-5xl p-1 text-yellow-300 tracking-loose" > Welcome to your account page
            </h1>
            <h2 className="text-3xl md:text-4xl leading-relaxed md:leading-snug mb-2 text-white"> 
              {user ? user.name : 'Loading...'}!
            </h2>
          </div>
        </section>

        <section className="px-3 py-4 overflow-x-auto">
        
        <div className="account-container p-4 mt-10">
          <h1 className="account-title">Profile Settings</h1>
        
          <div className="account-form mt-4">
            <label className="block mb-2">
              Name:
              <input type="text" name="name" value={user.name || ''} onChange={handleInputChange} className="form-input mt-1 block w-full" />
            </label>
            <label className="block mb-2">
              Email:
              <input type="email" name="email" value={user.email || ''} onChange={handleInputChange} className="form-input mt-1 block w-full" />
            </label>
            <label className="block mb-2">
              Date of Birth:
              <input type="date" name="dob" value={user.dob ? format(new Date(user.dob), 'yyyy-MM-dd') : ''} onChange={handleInputChange} className="form-input mt-1 block w-full" />
            </label>
            <label className="block mb-2">
              Address:
              <input type="text" name="address" value={user.address || ''} onChange={handleInputChange} className="form-input mt-1 block w-full" />
            </label>
            <button onClick={handleSaveClick} className="save-button bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4">Save</button>
          </div>
        </div>
      </section>
      </div>
    </>
  );
};

export default Account;