import React, { useState, useEffect } from 'react'; // Import the 'useState' and 'useEffect' hooks from React.
import axios from 'axios'; // Import the 'axios' library for making HTTP requests.
import UserInformation from '../../UserInfo'// Import the 'UserInformation' function from the 'UserInfo' module.
import getAllUsers from '../../components/GetAllUsers'; // Import the 'getAllUsers' function from the 'GetAllUsers' module.
import toast from 'react-hot-toast';
import { format } from 'date-fns';
import "../../styles/users.css" 


const Users = () => {
  const [users, setUsers] = useState([]); // Create a state variable 'users' and a setter function 'setUsers' with an initial value of an empty array.

  useEffect(() => { // Use the 'useEffect' hook to run a side effect after the component mounts.
    getAllUsers()
      .then((data) => setUsers(data)) // Call the 'getAllUsers' function and set the 'users' state with the data returned.
      .catch((error) => console.error('Error fetching users:', error)); // Log an error message if an error occurs during the request.
  }, []); // The empty array passed as the second argument to 'useEffect' ensures that the side effect runs only once after the initial render.

  // UPDATE USER-------------------------------------
  const handleSaveClick = async (user) => {
    console.log(user); // Log the user object
    const { dob, isHelperRegistered, ...userWithoutDob } = user;
    const formattedDob = dob ? format(new Date(dob), 'yyyy-MM-dd') : null;
    const userToUpdate = {
        ...userWithoutDob,
        dob: formattedDob,
        isHelperRegistered: Boolean(isHelperRegistered) // Convert to boolean
    };
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
      toast.success('User updated successfully');
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } else {
      // Handle error
      console.error('Error saving user');
    }
  };


  // DELETE USER-------------------------------------
  // Define a 'deleteUser' function that takes a user 'id' as an argument.
  const deleteUser = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:5000/api/users/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      deleteUser(id)
        .then(() => {
          getAllUsers()
            .then((data) => setUsers(data));
          toast.success('User deleted');
        })
        .catch((error) => {
          console.error('Error deleting user:', error);
          toast.error('Error deleting user');
        });
    }
  };

  const user = UserInformation(); // Call the 'UserInformation' function to fetch the user data.

  return (
    <>
      {/* // Render the table of users with the ability to edit and delete users. */}
      <div className="text-gray-900 bg-gray-200">
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
        {/* <Toaster /> this does not need to be here as we are calling the toast in the app, leaving ut here creates 2 notifications */}
        {/* Table of users */}
        <div className="p-4 mt-10">
          <h1 className="text-3xl">Existing Users</h1>
        </div>
        
          <div className="px-3 py-4 overflow-x-auto">
            <table className="w-full text-sm md:text-md bg-white shadow-md rounded mb-4 responsive-table">
              {/* // Render the table body with the user data. */}
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2 md:p-3 px2 md:px-5">Name</th>
                  <th className="text-left p-2 md:p-3 px2 md:px-5">Email</th>
                  <th className="text-left p-2 md:p-3 px2 md:px-5">D.O.B</th>
                  <th className="text-left p-2 md:p-3 px2 md:px-5">Address</th>
                  <th className="text-left p-2 md:p-5 px2 md:px-5">Disclosure</th>
                  <th className="text-left p-2 md:p-5 px2 md:px-5">Helper</th>
                  <th className="text-left p-2 md:p-5 px2 md:px-5">Role</th>
                  <th></th>
                </tr>
              </thead>
              
              <tbody>
                {users.map((user, index) => {
                  // ----------HANDLE INPUT CHANGE----------
                  const handleInputChange = (event) => {
                    const { name, value } = event.target;
                    let updatedUser;

                    // If the 'dob' field is empty, set the 'updatedUser' object to the current user object.
                    if (name === 'dob' && value === '') {
                        updatedUser = { ...user };
                    } else {
                        updatedUser = { ...user, [name]: value };
                    }

                    // Convert the value of helperRegistered to boolean
                    if (name === 'helperRegistered') {
                        updatedUser[name] = value === 'true'; // Convert string 'true' or 'false' to boolean
                    }
                    // Convert the value of monday to boolean
                    if (name === 'monday') {
                        updatedUser[name] = value === 'true'; // Convert string 'true' or 'false' to boolean
                    }

                    const updatedUsers = users.map((u) => (u._id === user._id ? updatedUser : u));
                    setUsers(updatedUsers);
                  };
                  // Format the date of birth using the 'format' function from the 'date-fns' library.
                  const formattedDob = format(new Date(user.dob), 'yyyy-MM-dd');

                  return (
                    <tr key={index} className={`border-b hover:bg-yellow-300 ${index % 2 === 0 ? 'bg-gray-100' : ''}`}>
                      {/* ^^ Add the 'hover:bg-yellow-300' class to highlight the row on hover. ^^ */}

                      <td data-label="Name" className="p-2 md:p-3 px-2 md:px-5">
                        <input type="text" name="name" value={user.name} onChange={handleInputChange} className="bg-transparent w-full" />
                      </td>
                      <td data-label="Email" className="p-2 md:p-3 px-2 md:px-5">
                        <input type="text" name="email" value={user.email} onChange={handleInputChange} className="bg-transparent  w-full" />
                      </td>
                      <td data-label="D.O.B" className="p-2 md:p-3 px-2 md:px-5">
                      <input type="date" name="dob" value={formattedDob} onChange={handleInputChange} className="w-full"/>
                      </td>
                      <td data-label="Address" className="p-2 md:p-3 px-2 md:px-5">
                      <input type="text" name="address" value={user.address} onChange={handleInputChange}className="w-full" />
                      </td>
                      {/* ----------REGISTERED DISCLOSURE---------- */}
                      <td data-label="Disclosure" className="p-2 md:p-3 px-2 md:px-5">
                        <select 
                            name="disclosureScotland" 
                            value={user.disclosureScotland} 
                            onChange={handleInputChange} 
                            className="bg-transparent w-full"
                            style={{ width: '90px', height: '40px', padding: '0 0 0 10px'}}
                        >
                            <option value="true">Yes</option>
                            <option value="false">No</option>
                        </select>
                    </td>
                    {/* ----------REGISTERED HELPER---------- */}
                    <td data-label="Helper" className="p-2 md:p-3 px-2 md:px-5">
                    <select 
                        name="helperRegistered" 
                        value={user.helperRegistered ? 'true' : 'false'} // Set value based on the state of helperRegistered
                        onChange={handleInputChange} 
                        className="bg-transparent w-full"
                        style={{ width: '90px', height: '40px', padding: '0 0 0 10px'}}
                    >
                        <option value="true">Yes</option>
                        <option value="false">No</option>
                    </select>
                    </td>
                    {/*----------Monday Register----------*/}
                    <td data-label="Monday" className="p-2 md:p-3 px-2 md:px-5">
                    <select 
                        name="monday" 
                        value={user.monday ? 'true' : 'false'} // Set value based on the state of monday
                        onChange={handleInputChange} 
                        className="bg-transparent w-full"
                        style={{ width: '90px', height: '40px', padding: '0 0 0 10px'}}
                    >
                        <option value="true">Yes</option>
                        <option value="false">No</option>
                    </select>
                    </td>
                    {/* Role select */}
                      <td data-label="Role" className="p-2 md:p-3 px-2 md:px-5">
                      <select 
                      name="role" 
                      value={user.role} 
                      onChange={(event) => handleInputChange(event, user._id)} 
                      className="bg-transparent w-full"
                      style={{ width: '90px', height: '40px', padding: '0 0 0 10px'}}
                      >
                        <option value="admin">admin</option>
                        <option value="parent">parent</option>
                        <option value="child">child</option>
                      </select>
                      </td>
                      {/* Save and Delete buttons */}
                      <td data-label="" className="p-2 md:p-3 px-2 md:px-5 flex justify-end">
                        <button onClick={() => handleSaveClick(user)} type="button" className="mr-3 text-xs md:text-sm bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline">Save</button>
                        <button onClick={() => handleDelete(user._id)} type="button"  className="text-xs md:text-sm bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline">Delete</button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </>
  );
};

export default Users;
