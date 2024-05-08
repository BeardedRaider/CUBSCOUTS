import React, { useState } from 'react';
import axios from 'axios';
import { event } from 'jquery';

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [dob, setDob] = useState('');
    const [address, setAddress] = useState('');
    const [role, setRole] = useState('');

    const handleRegister = async () => {
        event.preventDefault();
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
            setRole('parent');//default role

            console.log('Registration successful');
        } catch (error) {
            console.error(error);
            alert('Registration failed', error.response.data.error);
        }
    };

    return (
        <div>
            <div>
                <h1>Register</h1>

            <form onSubmit={handleRegister}>
                <div>
                <label for="email">
                    Email
                </label>
                    <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    autocomplete="off"
                    />
                </div>
                <div>
                <label for="password">
                    Password
                </label>
                    <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    autocomplete="off"
                    />
                </div>
                <div>
                <label for="name">
                    Name
                </label>
                    <input
                    type="name"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Name"
                    autocomplete="off"
                    />
                </div>
                <div>
                    <label for="dob">
                    Date of Birth
                    </label>
                    <input
                    type="date"
                    id="dob"
                    value={dob}
                    onChange={(e) => setDob(e.target.value)}
                    autocomplete="off"
                    />
                </div>
                <div>
                    <label for="address">
                    Address
                    </label>
                    <input
                    type="date"
                    id="address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Address"
                    autocomplete="off"
                    />
                </div>
                    
                    <div>
                        <label for="role">Role</label>
                        <select id="role" name='role'>
                            <option value="admin">Admin</option>
                            <option value="parent">User</option>
                            <option value="child">child</option>
                        </select>
                    </div>

                    
            </form>
            <button 
                type="submit"
                onClick={handleRegister}>
                Register
            </button>
        </div>
    </div>
    );
};

export default Register;