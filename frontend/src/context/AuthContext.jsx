import React, { createContext, useState, useEffect } from 'react';
import client from '../api/client';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            const storedToken = localStorage.getItem('token');
            if (storedToken) {
                try {
                    setToken(storedToken);
                    const { data } = await client.get('/users/profile');
                    setUser(data);
                } catch (error) {
                    console.error("Failed to fetch user", error);
                    logout();
                }
            }
            setLoading(false);
        };

        fetchUser();
    }, []);

    const login = async (email, password) => {
        const { data } = await client.post('/auth/login', { email, password });
        localStorage.setItem('token', data.token);
        setToken(data.token);
        setUser(data);
        return data;
    };

    const register = async (username, email, password) => {
        const { data } = await client.post('/auth/register', { username, email, password });
        // Registration doesn't return token immediately, requires OTP
        return data;
    };

    const verifyOtp = async (email, otp) => {
        const { data } = await client.post('/auth/verify-otp', { email, otp });
        localStorage.setItem('token', data.token);
        setToken(data.token);
        setUser(data); // Set user data from response
        return data;
    };

    const logout = () => {
        localStorage.removeItem('token');
        setToken(null);
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, token, login, register, verifyOtp, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};
