import React, { createContext, useState, useEffect } from 'react';
import { protect } from '../../utils/https'; // Make sure this sends a request to validate token
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState({
        _id: '',
        email: '',
        username: '',
    });

    const navigate = useNavigate();

    useEffect(() => {
        const checkAuth = async () => {
            const token = localStorage.getItem('authToken');
            if (token) {
                try {

                    const response = await protect(token);

                    setUser({
                        _id: response?.data?.data?._id,
                        username: response?.data?.data?.username,
                        email: response?.data?.data?.email,
                        role: response?.data?.data?.role,
                    });

                    setIsAuthenticated(true);
                } catch (error) {
                    console.error("Token validation failed:", error);
                    setIsAuthenticated(false); // Token is invalid, force logout
                    localStorage.removeItem('authToken');
                }
            } else {
                setIsAuthenticated(false); // No token found
            }
            setLoading(false); // Set loading to false after checking authentication
        };

        checkAuth();
    }, [setIsAuthenticated, isAuthenticated]);

    const logOut = () => {
        localStorage.removeItem('authToken');
        setIsAuthenticated(false);
        setUser({ _id: '', email: '', username: '' });
        navigate('/login');
    };

    return (
        <AuthContext.Provider value={{
            isAuthenticated,
            setIsAuthenticated,
            loading,
            user,
            logOut
        }}>
            {children}
        </AuthContext.Provider>
    );
};
