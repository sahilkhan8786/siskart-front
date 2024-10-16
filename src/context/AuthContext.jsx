import React, { createContext, useState, useEffect } from 'react';
import { protect } from '../../utils/https';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true); // Track loading state

    const navigate = useNavigate()


    const [user, setUser] = useState({
        _id: '',
        email: '',
        username: '',
    });

    useEffect(() => {
        const checkAuth = async () => {
            const token = localStorage.getItem('authToken');

            if (token) {
                console.log(token)
                try {
                    // Send a request to your protected route
                    const response = await protect(token)

                    console.log(response?.data?.data)
                    setUser({
                        _id: response?.data?.data?._id,
                        username: response?.data?.data?.username,
                        email: response?.data?.data?.email,
                        role: response?.data?.data?.role,

                    })

                    setIsAuthenticated(true);
                } catch (error) {
                    console.log(error)
                    console.error('Token validation failed:', error.response?.data?.message);
                    console.error('Token validation failed:', error);
                    setIsAuthenticated(false); // Set to false if token is invalid
                }
            } else {
                setIsAuthenticated(false); // No token found
            }
            setLoading(false); // Set loading to false after the check
        };

        checkAuth();
    }, [isAuthenticated, setIsAuthenticated]);


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
