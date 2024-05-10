import React, { createContext, useState } from 'react'

export const AuthContext = createContext();// Create a context object

export const AuthProvider = ({ children }) => {// Create a provider component
    const [auth, setAuth] = useState({
        token: localStorage.getItem('token'), // Get the token from the local storage
        role: localStorage.getItem('role'), // Get the role from the local storage
    });

    return (// Return the provider component
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    );
};

