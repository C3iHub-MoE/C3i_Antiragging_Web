// src/hooks/useLogin.js
import { useState, useEffect } from 'react';
import { loginUser } from '../api/user'; // Import your login function

export const useClient = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('authToken');
        const storedUser = localStorage.getItem('user'); // Or you can use cookies if preferred

        if (token && storedUser) {
            setUser({ token, user: JSON.parse(storedUser) });
        }
    }, []);

    const login = async (mobile_number, password) => {
        setLoading(true);
        setError(null);

        const payload = { mobile_number, password };

        const controller = new AbortController();

        try {

            const data = await loginUser(payload, controller.signal);

            console.log("test data",data);

            // If the login is successful, store the Bearer token and user data

            // Store the token in localStorage (or sessionStorage, depending on your preference)
            if(data.token){
                localStorage.setItem('authToken', data?.token);
                localStorage.setItem('user',JSON.stringify(data));
                setUser(data)
            }else{
                console.log("data not found")
            }





            setLoading(false);
            //   return { token, user: loggedInUser };
        } catch (err) {
            setError(err.message || 'An error occurred during login');
            setLoading(false);
            throw new Error(err.message || 'An error occurred during login');
        }
    };

   
    const LogOutUser = () => {
        localStorage.removeItem('authToken');
        localStorage.removeItem('user')
        setUser(null)
    }

    return {
        login,
        LogOutUser,
        loading,
        error,
        user,

    };
};
