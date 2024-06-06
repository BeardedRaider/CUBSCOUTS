import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { format } from 'date-fns';
import { FaCheck } from 'react-icons/fa';

import "../../styles/users.css";

const Account = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
        setError('Error fetching user data');
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  const handleDisclosureClick = () => {
    setUser((prevUser) => ({ ...prevUser, disclosureScotland: !prevUser.disclosureScotland }));
  };
  const handleHelperRegistration = () => {
    setUser((prevUser) => ({ ...prevUser, helperRegistered: !prevUser.helperRegistered }));
  };

  const handleSaveClick = async () => {
    try {
      const token = localStorage.getItem('token');
      const { dob, disclosureScotland, ...userWithoutDob } = user;
      const formattedDob = dob ? format(new Date(dob), 'yyyy-MM-dd') : null;
      const userToUpdate = { ...userWithoutDob, dob: formattedDob };

      // Include disclosureScotland in the userToUpdate object
      userToUpdate.disclosureScotland = user.disclosureScotland;

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

  if (error) {
    return <div>Error: {error}</div>;
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

            <label htmlFor="disclosureScotland" className="block mb-2">
                {user.disclosureScotland ? 'Registered for Disclosure Scotland' : 'Register for Disclosure Scotland:'}
                  <br />
                <button
                  id="disclosureScotland"
                  onClick={handleDisclosureClick}
                  name="disclosureScotland"
                  className={`middle none center mr-4 rounded-lg ${user.disclosureScotland ? 'bg-green-500 hover:bg-green-600' : 'bg-purple-500 hover:bg-purple-600'} py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md ${user.disclosureScotland ? 'shadow-green-500/50' : 'shadow-purple-500/50'} transition-all hover:shadow-lg ${user.disclosureScotland ? 'hover:shadow-green-500/40' : 'hover:shadow-purple-500/40'} focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none`}
                >
                  {user.disclosureScotland ? 'Registered for Disclosure Scotland' : 'Register for Disclosure Scotland'}
                  {user.disclosureScotland && <FaCheck className="ml-1" />}
                </button>  
              </label>

              <label htmlFor="helperRegistered" className="block mb-2">
    {user.helperRegistered ? 'Registered as Helper' : 'Register as Helper:'}
    <br />
    <button
        id="helperRegistered"
        onClick={handleHelperRegistration}
        name="helperRegistered"
        className={`middle none center mr-4 rounded-lg ${user.helperRegistered ? 'bg-green-500 hover:bg-green-600' : 'bg-purple-500 hover:bg-purple-600'} py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md ${user.helperRegistered ? 'shadow-green-500/50' : 'shadow-purple-500/50'} transition-all hover:shadow-lg ${user.helperRegistered ? 'hover:shadow-green-500/40' : 'hover:shadow-purple-500/40'} focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none`}
    >
        {user.helperRegistered ? 'Registered as Helper' : 'Register as Helper'}
        {user.helperRegistered && <FaCheck className="ml-1" />}
    </button>
</label>
            

            <button onClick={handleSaveClick} 
            className="middle none center mr-4 rounded-lg bg-purple-500 py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-purple-500/50 transition-all hover:shadow-lg hover:shadow-purple-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            >Save</button>
          </div>
        </div>
      </section>
      </div>
    </>
  );
};

export default Account;