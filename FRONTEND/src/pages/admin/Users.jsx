import React, { useState, useEffect } from 'react'; // Import the 'useState' and 'useEffect' hooks from React.
import axios from 'axios'; // Import the 'axios' library for making HTTP requests.
import UserInformation from '../../UserInfo'// Import the 'UserInformation' function from the 'UserInfo' module.
import getAllUsers from '../../components/GetAllUsers'; // Import the 'getAllUsers' function from the 'GetAllUsers' module.
import toast from 'react-hot-toast';
import { format } from 'date-fns';
import "../../styles/users.css"
import "../../styles/admin.css" 


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
      <div className="text-gray-900 bg-gray-200">
        <section className=' heroAdd overlayAdd py-24 px-4 lg:px-16'>
          <div className='container mx-auto px-[12px] md:px-24 xl:px-12 max-w-[1300px]'>
            <h1 className="text-3xl md:text-5xl p-1 text-yellow-300 tracking-loose" > Welcome
            </h1>
            <h2 className="text-3xl md:text-4xl leading-relaxed md:leading-snug mb-2 text-white"> 
              {user ? user.name : 'Loading...'}
            </h2>
          </div>
        </section>

      <section>
        <div className="p-4 mt-10">
          <h1 className="text-3xl">Existing Users</h1>
        </div>
        
        <div className="px-3 py-4 overflow-x-auto">
          <table className="w-full text-sm md:text-md bg-white shadow-md rounded mb-4 responsive-table">
            <thead>
              <tr className="border-b">
                <th className="text-left p-2 md:p-3 px2 md:px-5">Name</th>
                <th className="text-left p-2 md:p-3 px2 md:px-5">Email</th>
                <th className="text-left p-2 md:p-3 px2 md:px-5">D.O.B</th>
                <th className="text-left p-2 md:p-3 px2 md:px-5">Address</th>
                <th className="text-left p-2 md:p-5 px2 md:px-5">Disclosure</th>
                <th className="text-left p-2 md:p-5 px2 md:px-5">Helper</th>
                <th className="text-left p-2 md:p-5 px2 md:px-5">Trained</th>
                <th className="text-left p-2 md:p-5 px2 md:px-5">Role</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => {
                const handleInputChange = (event) => {
                  const { name, value } = event.target;
                  let updatedUser;

                  if (name === 'dob' && value === '') {
                    updatedUser = { ...user };
                  } else {
                    updatedUser = { ...user, [name]: value };
                  }

                  if (name === 'helperRegistered') {
                    updatedUser[name] = value === 'true';
                  }

                  if (name === 'helperTrained') {
                    updatedUser[name] = value === 'true';
                  }

                  if (['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'].includes(name)) {
                    updatedUser[name] = value === 'true';
                  }

                  const updatedUsers = users.map((u) => (u._id === user._id ? updatedUser : u));
                  setUsers(updatedUsers);
                };

                const formattedDob = format(new Date(user.dob), 'yyyy-MM-dd');

                return (
                  <React.Fragment key={user._id}>
                    <tr className={`border-b hover:bg-yellow-300 ${index % 2 === 0 ? 'bg-gray-100' : ''}`}>
                      <td data-label="Name" className="p-2 md:p-3 px-2 md:px-5">
                        <input type="text" name="name" value={user.name} onChange={handleInputChange} className="bg-transparent w-full" />
                      </td>
                      <td data-label="Email" className="p-2 md:p-3 px-2 md:px-5">
                        <input type="text" name="email" value={user.email} onChange={handleInputChange} className="bg-transparent w-full" />
                      </td>
                      <td data-label="D.O.B" className="p-2 md:p-3 px-2 md:px-5">
                        <input type="date" name="dob" value={formattedDob} onChange={handleInputChange} className="w-full" />
                      </td>
                      <td data-label="Address" className="p-2 md:p-3 px-2 md:px-5">
                        <input type="text" name="address" value={user.address} onChange={handleInputChange} className="w-full" />
                      </td>
                      <td data-label="Disclosure" className="p-2 md:p-3 px-2 md:px-5">
                        <select 
                          name="disclosureScotland" 
                          value={user.disclosureScotland} 
                          onChange={handleInputChange} 
                          className="bg-transparent w-full"
                          style={{ width: '80px', height: '30px', padding: '5px 10px', cursor: 'pointer' }}
                        >
                          <option value="true">Yes</option>
                          <option value="false">No</option>
                        </select>
                      </td>
                      <td data-label="Helper" className="p-2 md:p-3 px-2 md:px-5">
                        <select 
                          name="helperRegistered" 
                          value={user.helperRegistered ? 'true' : 'false'} 
                          onChange={handleInputChange} 
                          className="bg-transparent w-full"
                          style={{ width: '80px', height: '30px', padding: '5px 10px', cursor: 'pointer' }}
                        >
                          <option value="true">Yes</option>
                          <option value="false">No</option>
                        </select>
                      </td>
                      <td data-label="Trained" className="p-2 md:p-3 px-2 md:px-5">
                        <select 
                          name="helperTrained" 
                          value={user.helperTrained ? 'true' : 'false'} 
                          onChange={handleInputChange} 
                          className="bg-transparent w-full"
                          style={{ width: '80px', height: '30px', padding: '5px 10px', cursor: 'pointer' }}
                        >
                          <option value="true">Yes</option>
                          <option value="false">No</option>
                        </select>
                      </td>

                      <td data-label="Role" className="p-2 md:p-3 px-2 md:px-5">
                        <select 
                          name="role" 
                          value={user.role} 
                          onChange={(event) => handleInputChange(event, user._id)} 
                          className="bg-transparent w-full"
                          style={{ width: '85px', height: '30px', padding: '5px 10px', cursor: 'pointer' }}
                        >
                          <option value="admin">admin</option>
                          <option value="parent">parent</option>
                          <option value="child">child</option>
                        </select>
                      </td>
                    </tr>
                    <tr className={`border-b hover:bg-yellow-300 ${index % 2 === 0 ? 'bg-gray-100':''} `}>
                      <td colSpan="7" className="p-2 md:p-3 px-2 md:px-5">
                        <div className="flex flex-wrap items-center justify-between">
                          <div className="font-bold">Helper Availability</div>
                          <div className="flex gap-1">
                            {['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'].map((day) => (
                              <div key={day} className="text-left" style={{ padding: '5px 10px' }}>
                                <label className="block font-bold">{day.charAt(0).toUpperCase() + day.slice(1)}</label>
                                <select 
                                  name={day} 
                                  value={user[day] ? 'true' : 'false'} 
                                  onChange={handleInputChange} 
                                  className="bg-transparent w-full"
                                  style={{ width: '80px', height: '30px', padding: '5px 10px', cursor: 'pointer'}}
                                >
                                  <option value="true">Yes</option>
                                  <option value="false">No</option>
                                </select>
                              </div>
                            ))}
                          </div>
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleSaveClick(user)}
                              className="middle none center mr-4 rounded-lg bg-purple-500 py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-purple-500/50 transition-all hover:shadow-lg hover:shadow-purple-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                            >
                              Save
                            </button>
                            <button
                              onClick={() => handleDelete(user._id)}
                              className="middle none center mr-4 rounded-lg bg-red-500 py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-red-500/50 transition-all hover:shadow-lg hover:shadow-red-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      </td>
                    </tr>
                  </React.Fragment>
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