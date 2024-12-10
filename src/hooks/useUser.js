// src/hooks/useLogin.js
import { useState, useEffect } from "react";
import { loginUser, sendOtp, verifyOtp, sosAlerts } from "../api/user"; // Import your login function

export const useClient = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [user, setUser] = useState(null);
    const [sosData, setSosData] = useState([]); //ata
    const [filteredData, setFilteredData] = useState(null);

    const [otp, setOtp] = useState("");
    const [otpError, setOtpError] = useState("");
    const [otpTimer, setOtpTimer] = useState(0); // Store the timer for OTP
    const [otpSent, setOtpSent] = useState(false); // Track OTP sent status
    const [passwordData, setPasswordData] = useState({
        oldPassword: "",
        newPassword: "",
    });

    useEffect(() => {
        const token = localStorage.getItem("authToken");
        const storedUser = localStorage.getItem("user"); // Or you can use cookies if preferred
        if (token && storedUser) {
            setUser({
                token,
                ...(JSON.parse(storedUser) || {}),
            });
        }
    }, []);

    useEffect(() => {
        if (otpSent && otpTimer === 0) {
            setOtpSent(false); // Disable resend after the timer reaches 0
        }

        if (otpSent && otpTimer > 0) {
            const timer = setInterval(() => {
                setOtpTimer((prev) => prev - 1);
            }, 1000);
            return () => clearInterval(timer);
        }
    }, [otpSent, otpTimer]);

    const login = async (payload) => {
        setLoading(true);
        setError(null);

        const controller = new AbortController();

        try {
            const data = await loginUser(payload, controller.signal);

            // console.log("test data", data);

            // If the login is successful, store the Bearer token and user data

            // Store the token in localStorage (or sessionStorage, depending on your preference)
            if (data.token) {
                localStorage.setItem("authToken", data?.token);
                localStorage.setItem("user", JSON.stringify(data));
                // localStorage.setItem("isVerified", JSON.stringify(data?.isVerified));
                setUser(data);
            } else {
                console.log("data not found");
            }

            setLoading(false);
            return () => controller.abort();
            //   return { token, user: loggedInUser };
        } catch (err) {
            setError(err.message || "An error occurred during login");
            setLoading(false);
            throw new Error(err.message || "An error occurred during login");
        }
    };

    // const fetchAlerts = async () => {
    //     setLoading(true);
    //     setError(null);

    //     const controller = new AbortController(); // For request cancellation if needed

    //     try {
    //         const alerts = await sosAlerts(controller.signal); // Fetch data
    //         setSosData(alerts); // Update sosData state
    //         setFilteredData(alerts); // Ensure filtered data is updated
    //         console.log("found", alerts);
    //     } catch (err) {
    //         console.error(err); // Log error to console for debugging
    //         setError(err.message || "An error occurred while fetching SOS alerts");
    //     } finally {
    //         setLoading(false); // Always reset loading
    //     }
    // };
    const resetPassword = async () => {
        setLoading(true);
        setError(null);

        try {
            const { oldPassword, newPassword } = passwordData;
            const response = await resetPassword({ oldPassword, newPassword });
            console.log("Password reset success:", response);
            setLoading(false);
        } catch (err) {
            setError(err.message || "An error occurred while resetting the password");
            setLoading(false);
        }
    };

    const sendOtpRequest = async () => {
        setOtpError("");
        setLoading(true);
        try {
            // API call to send OTP
            const response = await sendOtp(user?.user?.mobile_number);
            if (response.success) {
                setOtpSent(true);
                setOtpTimer(120); // 2-minute timer
                console.log("OTP sent:", response);
            } else {
                setOtpError("Failed to send OTP. Please try again later.");
            }
            setLoading(false);
        } catch (err) {
            setOtpError("Error while sending OTP.");
            setLoading(false);
        }
    };

    const verifyOtpRequest = async () => {
        setLoading(true);
        setOtpError("");
        try {
            // Verify OTP
            const response = await verifyOtp({ otp, userId: user?.user?.id });
            if (response.success) {
                // Proceed with password reset
                await resetPassword();
                setOtpTimer(0); // Reset timer after successful verification
            } else {
                setOtpError("Invalid OTP. Please try again.");
            }
            setLoading(false);
        } catch (err) {
            setOtpError("Error while verifying OTP.");
            setLoading(false);
        }
    };

    const LogOutUser = () => {
        localStorage.removeItem("authToken");
        localStorage.removeItem("user");
        localStorage.removeItem("deviceId");

        setUser(null);
    };

    return {
        login,
        LogOutUser,
        setUser,
        loading,
        error,
        user,
        // fetchAlerts,
        // sosAlerts,
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
