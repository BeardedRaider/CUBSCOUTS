import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import "../../styles/register.css";

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [dob, setDob] = useState('');
    const [address, setAddress] = useState('');
    const [role, setRole] = useState('');

    const navigate = useNavigate();

    const handleRegister = async (event) => {
        event.preventDefault();

        // Check if all fields are filled
        if (!email || !password || !name || !dob || !address || !role) {
            toast.error('All fields are required');
            return;
        }

        try {
            await axios.post('http://localhost:5000/api/register', {
                email,
                password,
                name,
                dob,
                address,
                role,
            });

            setEmail('');
            setPassword('');
            setName('');
            setDob('');
            setAddress('');
            setRole('child');//default role

            toast.success('Registration successful');

            setTimeout(() => {
                navigate('/login');
            }, 2000);// Redirect to login page after 2 seconds

        } catch (error) {
            console.error(error);
            if (error.response && error.response.data.error) {
                toast.error(error.response.data.error);
            } else {
            toast.error('Registration failed');
            }
        }
    };
// ---------------Register form/card
    return (
    <>
        <div className="flex items-center justify-center h-screen bg-gray-200">
            <div class="bg-white p-8 rounded shadow-lg w-96">
                <h1 class="text-2xl font-semibold mb-6 text-center">Register</h1>

            <form onSubmit={handleRegister} className='space-y-4'>
                <div className='flex flex-col items-center'>
                    <div>
                    <label for="email" className='block text-white'>
                        Email
                    </label>
                        <input
                        class="border border-gray-300 rounded-md py-2 px-3 w-full focus:outline-none focus:border-blue-500"
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                        autocomplete="off"
                        />
                    </div>
                    
                    <div>
                    <label for="password" className='block text-white'>
                        Password
                    </label>
                        <input
                        class="border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        autocomplete="off"
                        />
                    </div>

                    <div>
                    <label for="name" className='block text-white'>
                        Name
                    </label>
                        <input
                        class="border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                        type="name"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Name"
                        autocomplete="off"
                        />
                    </div>

                    <div>
                        <label for="dob" className='block text-white'>
                        Date of Birth
                        </label>
                        <input
                        class="border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                        type="date"
                        id="dob"
                        value={dob}
                        onChange={(e) => setDob(e.target.value)}
                        autocomplete="off"
                        />
                    </div>

                    <div className='w-full'>
                        <label for="address" className='block text-white'>
                        Address
                        </label>
                        <input
                        className="border border-gray-300 rounded-md py-2 px-3 w-full focus:outline-none focus:border-blue-500"
                        type="text"
                        id="address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder="Address"
                        autocomplete="off"
                        />
                    </div>
                    
                    <div>
                        <label for="role" className='block text-white'>Role</label>
                        <select 
                        id="role" 
                        name='role'
                        class="border border-gray-300 rounded-md py-2 px-8 focus:outline-none focus:border-blue-500"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        >
                            {/* <option value="admin">Admin</option> */}
                            <option value="parent">User</option>
                            <option value="child">child</option>
                        </select>
                    </div>

                </div>
                    <div className='flex justify-center'>
                    <button type="submit"  className="registerBtn w-full">
                    Register
                    </button>
                    </div>    
            </form>
            
            </div>
        </div>
    </>
    );
};

export default Register;