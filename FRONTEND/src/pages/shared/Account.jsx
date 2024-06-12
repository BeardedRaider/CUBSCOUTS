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

  useEffect(() => {// Fetch user data on component mount
    const fetchUserData = async () => {// Function to fetch user data
      try {// Try to fetch user data
        const token = localStorage.getItem('token');// Retrieve the token from localStorage
        const response = await axios.get('http://localhost:5000/api/users', {// Send a GET request to the server
          headers: { Authorization: `Bearer ${token}` }// Include the token in the request headers
        });
        setUser(response.data);// Set the user data in state
        setLoading(false);// Set loading state to false
      } catch (error) {// If there is an error
        console.error('Error fetching user data:', error.response ? error.response.data : error.message);// Log the error message
        setError('Error fetching user data');
        setLoading(false);// Set loading state to false
      }
    };

    fetchUserData();
  }, []);

  const handleInputChange = (event) => {// Function to handle input change
    const { name, value } = event.target;
    setUser((prevUser) => ({ ...prevUser, [name]: value }));
  };
// ----------disclosureScotland----------
  const handleDisclosureClick = () => {// Function to handle Disclosure Scotland registration
    setUser((prevUser) => ({ ...prevUser, disclosureScotland: !prevUser.disclosureScotland }));
  };
  // ----------helperRegistered----------
  const handleHelperRegistration = () => {// Function to handle helper registration
    setUser((prevUser) => ({ ...prevUser, helperRegistered: !prevUser.helperRegistered }));
  };
  // ----------helperTrained----------
  const handleHelperTrained = () => {// Function to handle helper training
    setUser((prevUser) => ({ ...prevUser, helperTrained: !prevUser.helperTrained }));
  };

  // ----------------Day availability handlers
  const handleMondayAvailability = () => {
    console.trace("handleMondayAvailability called"); // Add this line
    setUser((prevUser) => {
      const updatedUser = { ...prevUser, monday: !prevUser.monday };
      console.log(updatedUser); // Log the updated user state
      return updatedUser; // Return the updated user state
    });
  };
  const handleTuesdayAvailability = () => {
    console.trace("handleTuesdayAvailability called"); // Add this line
    setUser((prevUser) => {
      const updatedUser = { ...prevUser, tuesday: !prevUser.tuesday };
      console.log(updatedUser); // Log the updated user state
      return updatedUser; // Return the updated user state
    });
  };
  const handleWednesdayAvailability = () => {
    console.trace("handleWednesdayAvailability called"); // Add this line
    setUser((prevUser) => {
      const updatedUser = { ...prevUser, wednesday: !prevUser.wednesday };
      console.log(updatedUser); // Log the updated user state
      return updatedUser; // Return the updated user state
    });
  };
  const handleThursdayAvailability = () => {
    console.trace("handleThursdayAvailability called"); // Add this line
    setUser((prevUser) => {
      const updatedUser = { ...prevUser, thursday: !prevUser.thursday };
      console.log(updatedUser); // Log the updated user state
      return updatedUser; // Return the updated user state
    });
  };
  const handleFridayAvailability = () => {
    console.trace("handleFridayAvailability called"); // Add this line
    setUser((prevUser) => {
      const updatedUser = { ...prevUser, friday: !prevUser.friday };
      console.log(updatedUser); // Log the updated user state
      return updatedUser; // Return the updated user state
    });
  };
  const handleSaturdayAvailability = () => {
    console.trace("handleSaturdayAvailability called"); // Add this line
    setUser((prevUser) => {
      const updatedUser = { ...prevUser, saturday: !prevUser.saturday };
      console.log(updatedUser); // Log the updated user state
      return updatedUser; // Return the updated user state
    });
  };
  const handleSundayAvailability = () => {
    console.trace("handleSundayAvailability called"); // Add this line
    setUser((prevUser) => {
      const updatedUser = { ...prevUser, sunday: !prevUser.sunday };
      console.log(updatedUser); // Log the updated user state
      return updatedUser; // Return the updated user state
    });
  };

  const handleSaveClick = async () => {
    try {
      const token = localStorage.getItem('token');
      const { dob, disclosureScotland, ...userWithoutDob } = user;
      const formattedDob = dob ? format(new Date(dob), 'yyyy-MM-dd') : null;
      const userToUpdate = { ...userWithoutDob, dob: formattedDob };

      // this includes the object to be updated
      userToUpdate.disclosureScotland = user.disclosureScotland;


      // Remove the role from userToUpdate object
      delete userToUpdate.role;

      console.log('Updated user data to be sent to the server:', userToUpdate); // Add this console log

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
        {/* // The following code snippet is responsible for rendering the form that allows the user to update their profile settings. It includes input fields for the user's name, email, date of birth, address, and availability for each day of the week. The user can also register for Disclosure Scotland, register as a helper, and indicate whether they have completed helper training. The form includes buttons to save the changes made by the user. */}
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
            {/* ----------disclosureScotland---------- */}
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
              {/* ----------helperRegistered---------- */}
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
              {/* ----------helperTrained---------- */}
              <label htmlFor="helperTrained" className="block mb-2">
                {user.helperTrained ? 'Trained Helper' : 'Train as Helper:'}
                <br />
                <button
                    id="helperTrained"
                    onClick={handleHelperTrained}
                    name="helperTrained"
                    className={`middle none center mr-4 rounded-lg ${user.helperTrained ? 'bg-green-500 hover:bg-green-600' : 'bg-purple-500 hover:bg-purple-600'} py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md ${user.helperTrained ? 'shadow-green-500/50' : 'shadow-purple-500/50'} transition-all hover:shadow-lg ${user.helperTrained ? 'hover:shadow-green-500/40' : 'hover:shadow-purple-500/40'} focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none`}
                >
                    {user.helperTrained ? 'Trained Helper' : 'Train as Helper'}
                    {user.helperTrained && <FaCheck className="ml-1" />}
                </button>
              </label>
              {/* ----------------Day availability handlers */}
              <div>
                <h3 className="mb-4 font-bold">Your Availability To Help:</h3>
                <div className="flex flex-wrap justify-start">
                  {/* MONDAY */}
                  <div className="mb-4 mr-4">
                    <label htmlFor="monday" className="block text-center font-semibold">
                      Monday
                    </label>
                    <button
                      id="monday"
                      onClick={handleMondayAvailability}
                      name="monday"
                      className={`middle none center rounded-lg ${user.monday ? 'bg-green-500 hover:bg-green-600' : 'bg-purple-500 hover:bg-purple-600'} py-2 px-4 font-sans text-xs font-bold uppercase text-white shadow-md ${user.monday ? 'shadow-green-500/50' : 'shadow-purple-500/50'} transition-all hover:shadow-lg ${user.monday ? 'hover:shadow-green-500/40' : 'hover:shadow-purple-500/40'} focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none`}
                    >
                      {user.monday ? 'Available' : 'Not Available'}
                      {user.monday && <FaCheck className="ml-1" />}
                    </button>
                  </div>
                  {/* TUESDAY */}
                  <div className="mb-4 mr-4">
                    <label htmlFor="tuesday" className="block text-center font-semibold">
                      Tuesday
                    </label>
                    <button
                      id="tuesday"
                      onClick={handleTuesdayAvailability}
                      name="tuesday"
                      className={`middle none center rounded-lg ${user.tuesday ? 'bg-green-500 hover:bg-green-600' : 'bg-purple-500 hover:bg-purple-600'} py-2 px-4 font-sans text-xs font-bold uppercase text-white shadow-md ${user.tuesday ? 'shadow-green-500/50' : 'shadow-purple-500/50'} transition-all hover:shadow-lg ${user.tuesday ? 'hover:shadow-green-500/40' : 'hover:shadow-purple-500/40'} focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none`}
                    >
                      {user.tuesday ? 'Available' : 'Not Available'}
                      {user.tuesday && <FaCheck className="ml-1" />}
                    </button>
                  </div>
                  {/* WEDNESDAY */}
                  <div className="mb-4 mr-4">
                    <label htmlFor="wednesday" className="block text-center font-semibold">
                      Wednesday
                    </label>
                    <button
                      id="wednesday"
                      onClick={handleWednesdayAvailability}
                      name="wednesday"
                      className={`middle none center rounded-lg ${user.wednesday ? 'bg-green-500 hover:bg-green-600' : 'bg-purple-500 hover:bg-purple-600'} py-2 px-4 font-sans text-xs font-bold uppercase text-white shadow-md ${user.wednesday ? 'shadow-green-500/50' : 'shadow-purple-500/50'} transition-all hover:shadow-lg ${user.wednesday ? 'hover:shadow-green-500/40' : 'hover:shadow-purple-500/40'} focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none`}
                    >
                      {user.wednesday ? 'Available' : 'Not Available'}
                      {user.wednesday && <FaCheck className="ml-1" />}
                    </button>
                  </div>
                  {/* THURSDAY */}
                  <div className="mb-4 mr-4">
                    <label htmlFor="thursday" className="block text-center font-semibold">
                      Thursday
                    </label>
                    <button
                      id="thursday"
                      onClick={handleThursdayAvailability}
                      name="thursday"
                      className={`middle none center rounded-lg ${user.thursday ? 'bg-green-500 hover:bg-green-600' : 'bg-purple-500 hover:bg-purple-600'} py-2 px-4 font-sans text-xs font-bold uppercase text-white shadow-md ${user.thursday ? 'shadow-green-500/50' : 'shadow-purple-500/50'} transition-all hover:shadow-lg ${user.thursday ? 'hover:shadow-green-500/40' : 'hover:shadow-purple-500/40'} focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none`}
                    >
                      {user.thursday ? 'Available' : 'Not Available'}
                      {user.thursday && <FaCheck className="ml-1" />}
                    </button>
                  </div>
                  {/* FRIDAY */}
                  <div className="mb-4 mr-4">
                    <label htmlFor="friday" className="block text-center font-semibold">
                      Friday
                    </label>
                    <button
                      id="friday"
                      onClick={handleFridayAvailability}
                      name="friday"
                      className={`middle none center rounded-lg ${user.friday ? 'bg-green-500 hover:bg-green-600' : 'bg-purple-500 hover:bg-purple-600'} py-2 px-4 font-sans text-xs font-bold uppercase text-white shadow-md ${user.friday ? 'shadow-green-500/50' : 'shadow-purple-500/50'} transition-all hover:shadow-lg ${user.friday ? 'hover:shadow-green-500/40' : 'hover:shadow-purple-500/40'} focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none`}
                    >
                      {user.friday ? 'Available' : 'Not Available'}
                      {user.friday && <FaCheck className="ml-1" />}
                    </button>
                  </div>
                  {/* SATURDAY */}
                  <div className="mb-4 mr-4">
                    <label htmlFor="saturday" className="block text-center font-semibold">
                      Saturday
                    </label>
                    <button
                      id="saturday"
                      onClick={handleSaturdayAvailability}
                      name="saturday"
                      className={`middle none center rounded-lg ${user.saturday ? 'bg-green-500 hover:bg-green-600' : 'bg-purple-500 hover:bg-purple-600'} py-2 px-4 font-sans text-xs font-bold uppercase text-white shadow-md ${user.saturday ? 'shadow-green-500/50' : 'shadow-purple-500/50'} transition-all hover:shadow-lg ${user.saturday ? 'hover:shadow-green-500/40' : 'hover:shadow-purple-500/40'} focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none`}
                    >
                      {user.saturday ? 'Available' : 'Not Available'}
                      {user.saturday && <FaCheck className="ml-1" />}
                    </button>
                  </div>
                  {/* SUNDAY */}
                  <div className="mb-4 mr-4">
                    <label htmlFor="sunday" className="block text-center font-semibold">
                      Sunday
                    </label>
                    <button
                      id="sunday"
                      onClick={handleSundayAvailability}
                      name="sunday"
                      className={`middle none center rounded-lg ${user.sunday ? 'bg-green-500 hover:bg-green-600' : 'bg-purple-500 hover:bg-purple-600'} py-2 px-4 font-sans text-xs font-bold uppercase text-white shadow-md ${user.sunday ? 'shadow-green-500/50' : 'shadow-purple-500/50'} transition-all hover:shadow-lg ${user.sunday ? 'hover:shadow-green-500/40' : 'hover:shadow-purple-500/40'} focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none`}
                    >
                      {user.sunday ? 'Available' : 'Not Available'}
                      {user.sunday && <FaCheck className="ml-1" />}
                    </button>
                  </div>
                </div>
              </div>
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