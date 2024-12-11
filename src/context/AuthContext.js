import React, { createContext, useContext } from "react";
import { useClient } from "../hooks/useUser";

// Create an AuthContext
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const { login, LogOutUser, setUser, loading, error, user, resetPassword, sendOtpRequest, verifyOtpRequest, setPasswordData, otp, setOtp, otpError, otpTimer, otpSent, passwordData } = useClient();

    console.log("AuthProvider user:", user);

    return (
        <AuthContext.Provider
            value={{
                login,
                LogOutUser,
                loading,
                error,
                setUser,
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
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook to use the AuthContext
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    // console.log("useAuth context:", context);/
    return context;
};
