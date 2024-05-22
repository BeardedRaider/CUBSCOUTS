import React, { useState, useEffect } from 'react'
import axios from 'axios'
import UserInformation from '../../UserInfo';
import getUser from '../../components/GetUser'; // Import the 'getAllUsers' function from the 'GetAllUsers' module.
import toast, { Toaster } from 'react-hot-toast';
import { format } from 'date-fns';
import "../../styles/users.css"

const Account = () => {
  const [userId, setUser] = useState({}); // Create a state variable 'user' and a setter function 'setUser' with an initial value of an empty object.

  useEffect(() => { // Use the 'useEffect' hook to run a side effect after the component mounts.
    getUser() // Call the 'getUser' function.
      .then((data) => setUser(data)) // Set the 'user' state with the data returned.
      .catch((error) => console.error('Error fetching user:', error)); // Log an error message if an error occurs during the request.
  }, []); // The empty array passed as the second argument to 'useEffect' ensures that the side effect runs only once after the initial render.

  // UPDATE USER-------------------------------------
  const handleSaveClick = async (user) => {
    console.log(user); // Log the user object
    const { dob, ...userWithoutDob } = user;
    const formattedDob = dob ? format(new Date(dob), 'yyyy-MM-dd') : null;
    const userToUpdate = { ...userWithoutDob, dob: formattedDob };

    console.log(userToUpdate); // Log the userToUpdate object

  
    const response = await fetch(`http://localhost:5000/api/users/${user._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userToUpdate),
    });

    console.log(await response.json()); // Log the server response

  
    if (response.ok) {
      // Handle successful update
      toast.success('Details updated successfully');
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } else {
      // Handle error
      console.error('Error saving user');
    }
  };

  const user = UserInformation();// Call the 'UserInformation' function to get the user data.


  return (
    <>
    <div className='text-gray-900 bg-gray-200'>
      <section className='bg-gray-300 py-24 px-4 lg:px-16'>
        <div className='container mx-auto px-[12px] md:px-24 xl:px-12 max-w-[1300px] nanum2'>
          <h1 className="text-3xl md:text-5xl p-1 text-yellow-300 tracking-loose">Welcome
          </h1>
          <h2 className="text-3xl md:text-4xl leading-relaxed md:leading-snug mb-2 text-white"> 
          {user ? user.name : 'Loading...'}!
          </h2>
        </div>
      </section>

      <section>
        <Toaster />
        {/* Display the user details in a form for editing */}
        <div className='p-4 mt-10'>
          <h1 className='text-3xl'>Your  account iformation</h1>

        </div>
      </section>
    </div>
    </>
  )
}

export default Account