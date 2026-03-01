
import React from 'react'
import { createContext, useState, useEffect } from "react";
import Cookies from 'js-cookie';
import axios from 'axios';

export const AuthContext = createContext();


export default function AuthProvider({ children }) {

    //to authenticate the user
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);

    // checks if jwt is stored 
    useEffect(() => {
        const accesstoken = Cookies.get('authToken');
        if (token) {
            setToken(accesstoken);
            setIsAuthenticated(true);
            setUser({ token });
        }
    }, []);

    //authorize karta hai aur  login karwata hai 
    const login = (userData) => {
        setToken(null);
        setIsAuthenticated(true);
        setUser(userData);
    };

    // const refresh = () => {
    //     axios.post('https://auth-backend-138t.onrender.com/api/v1/users/refresh-token', {
    //         "refreshToken": `${token}`
    //     })
    // }

    //seting the states after logout
    const logout = () => {
        setIsAuthenticated(false);
        setUser(null);
        Cookies.remove('authToken');
    };


    return (
        <AuthContext.Provider value={{ isAuthenticated, user, login, logout }} >
            {children}
        </AuthContext.Provider>
    )
}


