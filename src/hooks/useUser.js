// src/hooks/useLogin.js
import { useState, useEffect } from 'react';
import { loginUser, sendOtp, verifyOtp } from '../api/user'; // Import your login function

export const useClient = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [user, setUser] = useState(null);

    const [otp, setOtp] = useState('');
    const [otpError, setOtpError] = useState('');
    const [otpTimer, setOtpTimer] = useState(0);  // Store the timer for OTP
    const [otpSent, setOtpSent] = useState(false); // Track OTP sent status
    const [passwordData, setPasswordData] = useState({
        oldPassword: '',
        newPassword: '',
    });

    useEffect(() => {
        const token = localStorage.getItem('authToken');
        const storedUser = localStorage.getItem('user'); // Or you can use cookies if preferred

        if (token && storedUser) {
            setUser({ token, user: JSON.parse(storedUser) });
        }
    }, []);



    useEffect(() => {
        if (otpSent && otpTimer === 0) {
            setOtpSent(false); // Disable resend after the timer reaches 0
        }

        if (otpSent && otpTimer > 0) {
            const timer = setInterval(() => {
                setOtpTimer(prev => prev - 1);
            }, 1000);
            return () => clearInterval(timer);
        }
    }, [otpSent, otpTimer]);

    const login = async ({mobile_number, password, fcm_token, device_id, platform}) => {
        setLoading(true);
        setError(null);

        const payload = { mobile_number, password, fcm_token, device_id, platform};

        const controller = new AbortController();

        try {

            const data = await loginUser(payload, controller.signal);

            // console.log("test data", data);

            // If the login is successful, store the Bearer token and user data

            // Store the token in localStorage (or sessionStorage, depending on your preference)
            if (data.token) {
                localStorage.setItem('authToken', data?.token);
                localStorage.setItem('user', JSON.stringify(data));
                setUser(data)
            } else {
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

    const resetPassword = async () => {
        setLoading(true);
        setError(null);

        try {
            const { oldPassword, newPassword } = passwordData;
            const response = await resetPassword({ oldPassword, newPassword });
            console.log("Password reset success:", response);
            setLoading(false);
        } catch (err) {
            setError(err.message || 'An error occurred while resetting the password');
            setLoading(false);
        }
    };

    const sendOtpRequest = async () => {
        setOtpError('');
        setLoading(true);
        try {
            // API call to send OTP
            const response = await sendOtp(user?.user?.mobile_number);
            if (response.success) {
                setOtpSent(true);
                setOtpTimer(120); // 2-minute timer
                console.log("OTP sent:", response);
            } else {
                setOtpError('Failed to send OTP. Please try again later.');
            }
            setLoading(false);
        } catch (err) {
            setOtpError('Error while sending OTP.');
            setLoading(false);
        }
    };

    const verifyOtpRequest = async () => {
        setLoading(true);
        setOtpError('');
        try {
            // Verify OTP
            const response = await verifyOtp({ otp, userId: user?.user?.id });
            if (response.success) {
                // Proceed with password reset
                await resetPassword();
                setOtpTimer(0);  // Reset timer after successful verification
            } else {
                setOtpError('Invalid OTP. Please try again.');
            }
            setLoading(false);
        } catch (err) {
            setOtpError('Error while verifying OTP.');
            setLoading(false);
        }
    };



    const LogOutUser = () => {
        localStorage.removeItem('authToken');
        localStorage.removeItem('user')
        localStorage.removeItem('deviceId')

        setUser(null)
    }


    return {
        login,
        LogOutUser,
        loading,
        error,
        user,
        resetPassword,
        sendOtpRequest,
        verifyOtpRequest,
        setPasswordData,
        otp,
        setOtp,
        otpError,
        otpTimer,
        otpSent,
        passwordData,

    };
};
