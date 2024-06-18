// src/UserContext.js
import React, { createContext, useContext, useEffect, useState } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    
    const [user, setUser] = useState(() => {
        
        const savedUser = localStorage.getItem('user');
        return savedUser? JSON.parse(savedUser) : null;
    });

    const [loginUser, setLoginUser] = useState(() => {
        
        const savedUser = localStorage.getItem('loginUser');
        return savedUser? JSON.parse(savedUser) : null;
    });
    const [signUpUser, setSignUpUser] = useState(() => {
        
        const savedUser = localStorage.getItem('sigUpUser');
        return savedUser? JSON.parse(savedUser) : null;
    });

   



    

    useEffect(() => {
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('loginUser', JSON.stringify(loginUser));
        localStorage.setItem('signUpUser', JSON.stringify(signUpUser));
    }, [user, loginUser, signUpUser]);

    return (
        <UserContext.Provider value={{ user, setUser, loginUser, setLoginUser, signUpUser, setSignUpUser }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);