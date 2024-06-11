import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserInformation from '../../UserInfo';
import "../../styles/users.css";
import "../../styles/admin.css";

const UsersAv = () => {
    const user = UserInformation();
    const [users, setUsers] = useState([]); // State to store users data
    const [loading, setLoading] = useState(true); // State to manage loading state

    // Function to fetch users with token
    const fetchUsers = async () => {
        const token = localStorage.getItem('token'); // Retrieve the token from localStorage

        try {
            const response = await axios.get('http://localhost:5000/api/helpers', {
                headers: {
                    'Authorization': `Bearer ${token}` // Include token in the request headers
                }
            });
            console.log(response.data); // Log the response data
            setUsers(response.data); // Set users data in state
            setLoading(false); // Set loading state to false
        } catch (error) {
            console.error('Error fetching users:', error);
            setLoading(false); // Set loading state to false
        }
    };

    useEffect(() => {
        fetchUsers(); // Fetch users on component mount
    }, []);

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <div className="text-gray-900 bg-gray-200">
            <section className='heroAdd overlayAdd py-24 px-4 lg:px-16'>
                <div className='container mx-auto px-[12px] md:px-24 xl:px-12 max-w-[1300px]'>
                    <h1 className="text-3xl md:text-5xl p-1 text-yellow-300 tracking-loose">Welcome</h1>
                    <h2 className="text-3xl md:text-4xl leading-relaxed md:leading-snug mb-2 text-white">
                        {user ? user.name : 'Loading...'}!
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
                                <th className="text-left p-2 md:p-3 px2 md:px-5">Disclosure Scotland</th>
                                <th className="text-left p-2 md:p-3 px2 md:px-5">Helper Registered</th>
                                <th className="text-left p-2 md:p-3 px2 md:px-5">Helper Trained</th>
                                <th className="text-left p-2 md:p-3 px2 md:px-5">Availability</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.length > 0 ? (
                                users.map((user, index) => (
                                    <tr className={`border-b hover:bg-yellow-300 ${index % 2 === 0 ? 'bg-gray-100' : ''}`} key={user._id}>
                                        <td className="p-2 md:p-3 px-2 md:px-5">{user.name}</td>
                                        <td className="p-2 md:p-3 px-2 md:px-5">{user.email}</td>
                                        <td className="p-2 md:p-3 px-2 md:px-5">{user.disclosureScotland ? 'Yes' : 'No'}</td>
                                        <td className="p-2 md:p-3 px-2 md:px-5">{user.helperRegistered ? 'Yes' : 'No'}</td>
                                        <td className="p-2 md:p-3 px-2 md:px-5">{user.helperTrained ? 'Yes' : 'No'}</td>
                                        <td className="p-2 md:p-3 px-2 md:px-5">
                                            <ul>
                                                {Object.entries(user.availability).map(([day, available]) => (
                                                    <li key={day}>{day}: {available ? 'Available' : 'Not Available'}</li>
                                                ))}
                                            </ul>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6" className="text-center">No users found</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </section>
        </div>
    );
};

export default UsersAv;