export const constants = {
    API_BASE_URL: process.env.REACT_APP_BACKEND_API_BASE_URL,

    API_URLS: {
        USER_LOGIN: `/login/`,
        USER_RESEND_OTP: `/resetPassword/resendOtp/`,
        USER_SEND_OTP: `/resetPassword/sendOtp/`,
        USER_VERIFY_OTP: `/resetPassword/verifyOtp/`
    }
}

