export const Constants = {
    API_BASE_URL: process.env.REACT_APP_BACKEND_API_BASE_URL,

    API_URLS: {
        USER_LOGIN: `/login/`,
        USER_RESEND_OTP: `/resetPassword/resendOtp/`,
        USER_SEND_OTP: `/resetPassword/sendOtp/`,
        USER_VERIFY_OTP: `/resetPassword/verifyOtp/`,
        ACCOUNT_RESEND_OTP: `/verify/resendOtp/`,
        ACCOUNT_SEND_OTP: `/verify/sendOtp/`,
        ACCOUNT_VERIFY_OTP: `/verify/verifyOtp/`,
        SOS_ALERTS: `/live-sos-alerts/`,
        SOS_DETAILS: `/sos-details/`,
        STUDENTS_LIST: `/colleges/`,
        MEMBER_LIST: `/colleges/`,
        Change_Password: `/`,
    },
};
