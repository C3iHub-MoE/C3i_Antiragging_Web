import apiClient from "../config";
import { constants } from "../../utils/constant";

export const loginUser = async (payload, signal) => {
    const response = await apiClient.post(constants.API_URLS.USER_LOGIN, payload, { signal });
    return response.data?.data;
}


// Function to handle password reset (change password)
export const resendOtp = async (payload, signal) => {
    const response = await apiClient.post(constants.API_URLS.USER_RESEND_OTP, payload, { signal });
    return response.data?.data;
}

// Function to send OTP to the user
export const sendOtp = async (payload, signal) => {
    const response = await apiClient.post(constants.API_URLS.USER_SEND_OTP, payload, { signal });
    return response.data?.data;
}

// Function to verify the OTP entered by the user
export const verifyOtp = async (payload, signal) => {
    const response = await apiClient.post(constants.API_URLS.USER_VERIFY_OTP, payload, { signal });
    return response.data?.data;
}

// Function to handle password reset (change password)
export const AccountResendOtp = async (payload, signal) => {
    const response = await apiClient.post(constants.API_URLS.ACCOUNT_RESEND_OTP, payload, { signal });
    return response.data?.data;
}

// Function to send OTP to the user
export const AccountSendOtp = async (payload, signal) => {
    const response = await apiClient.post(constants.API_URLS.ACCOUNT_SEND_OTP, payload, { signal });
    return response.data?.data;
}


// Function to verify the OTP entered by the user
export const AccountVerifyOtp = async (payload, signal) => {
    const response = await apiClient.post(constants.API_URLS.ACCOUNT_VERIFY_OTP, payload, { signal });
    return response.data?.data;
}
