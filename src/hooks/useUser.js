// src/hooks/useLogin.js
import { useState } from 'react';
import { loginUser } from '../api/user'; // Import your login function

export const useClient = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [user, setUser] = useState(null);

    const login = async (mobile_number, password) => {
        setLoading(true);
        setError(null);

        const payload = { mobile_number, password };

        const controller = new AbortController();

        try {

            const data = await loginUser(payload, controller.signal);

            console.log(data);

            // If the login is successful, store the Bearer token and user data
            const { token, user: loggedInUser } = data;

            // Store the token in localStorage (or sessionStorage, depending on your preference)
            localStorage.setItem('authToken', token);

            const userData = {
                token: token,
                user: loggedInUser
            }
            setUser(userData)


            // Store user data (if needed)
            //   setUser({ token, user:loggedInUser});
            //   console.log("user",loggedInUser)





            setLoading(false);
            //   return { token, user: loggedInUser };
        } catch (err) {
            setError(err.message || 'An error occurred during login');
            setLoading(false);
            throw new Error(err.message || 'An error occurred during login');
        }
    };

    //   const User = () => {

    //   }
    const LogOutUser = () => {
        localStorage.removeItem("authToken");
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
