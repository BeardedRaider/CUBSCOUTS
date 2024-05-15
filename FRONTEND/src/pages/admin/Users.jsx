import React, { useState, useEffect } from 'react'; // Import the 'useState' and 'useEffect' hooks from React.
import axios from 'axios'; // Import the 'axios' library for making HTTP requests.
import getAllUsers from '../../components/GetAllUsers'; // Import the 'getAllUsers' function from the 'GetAllUsers' module.
import toast, { Toaster } from 'react-hot-toast';

const Users = () => {
  const [users, setUsers] = useState([]); // Create a state variable 'users' and a setter function 'setUsers' with an initial value of an empty array.

  useEffect(() => { // Use the 'useEffect' hook to run a side effect after the component mounts.
    getAllUsers()
      .then((data) => setUsers(data)) // Call the 'getAllUsers' function and set the 'users' state with the data returned.
      .catch((error) => console.error('Error fetching users:', error)); // Log an error message if an error occurs during the request.
  }, []); // The empty array passed as the second argument to 'useEffect' ensures that the side effect runs only once after the initial render.

  // UPDATE USER-------------------------------------
  const updateUser = async (user) => { // Define an 'updateUser' function that takes a 'user' object as an argument.
    try {
      const response = await axios.put(`http://localhost:5000/api/users/${user._id}`, user); // Send a PUT request to update the user data.
      return response.data; // Return the response data.
    } catch (error) {
      console.error('Error updating user:', error); // Log an error message if an error occurs during the request.
    }
  };

    // Define a 'handleSave' function that takes a 'user' object as an argument.
  const handleSave = (user) => {
    updateUser(user)
      .then(() => {
        toast.success('User updated successfully');// Display a success message using the 'toast' library.
        setTimeout(() => {
          window.location.reload();
        }, 2000);// Reload the page after 2 seconds
      })
      .then(() => getAllUsers())// Call the 'getAllUsers' function to fetch the updated user data.
      .then((data) => setUsers(data))
      .catch((error) => console.error('Error saving user:', error));
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



  return (
    <div className="text-gray-900 bg-gray-200">
      <Toaster />
      <div className="p-4 flex">
        <h1 className="text-3xl">Users</h1>
      </div>
      <div className="px-3 py-4 flex justify-center">
        <table className="w-full text-md bg-white shadow-md rounded mb-4">

          {/* // Render the table body with the user data. */}
          <tbody>
            <tr className="border-b">
              <th className="text-left p-3 px-5">Name</th>
              <th className="text-left p-3 px-5">Email</th>
              <th className="text-left p-3 px-5">Role</th>
              <th></th>
            </tr>
            {users.map((user, index) => {
              const handleInputChange = (event) => {
                const { name, value } = event.target;
                const updatedUser = { ...user, [name]: value };
                const updatedUsers = users.map((u) => (u._id === user._id ? updatedUser : u));
                setUsers(updatedUsers);
              };

              return (
                <tr key={index} className={`border-b hover:bg-orange-100 ${index % 2 === 0 ? 'bg-gray-100' : ''}`}>
                  <td className="p-3 px-5">
                    <input type="text" name="name" value={user.name} onChange={handleInputChange} className="bg-transparent" />
                  </td>
                  <td className="p-3 px-5">
                    <input type="text" name="email" value={user.email} onChange={handleInputChange} className="bg-transparent" />
                  </td>
                  <td className="p-3 px-5">
                    <select name="role" value={user.role} onChange={handleInputChange} className="bg-transparent">
                      <option value="user">user</option>
                      <option value="admin">admin</option>
                    </select>
                  </td>
                  <td className="p-3 px-5 flex justify-end">
                    <button onClick={() => handleSave(user)} type="button" className="mr-3 text-sm bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline">Save</button>
                    <button onClick={() => handleDelete(user._id)} type="button" className="text-sm bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline">Delete</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;
