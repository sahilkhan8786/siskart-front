import { createContext, useEffect } from "react";

export const UserContext = createContext();

export const UserContextProvier = ({ children }) => {

    const token = localStorage.getItem('authToken');
    console.log(token);

    useEffect(() => {

    }, [token])
    return (
        <UserContext.Provider value={{}}>
            {children}
        </UserContext.Provider>
    )
}