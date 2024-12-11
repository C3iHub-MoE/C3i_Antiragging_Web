import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AccountSendOtp, AccountVerifyOtp, AccountResendOtp } from "../../../api/user";
import styles from "./VerifyAccount.module.css";
import { useAuth } from "../../../context/AuthContext";

const VerifyAccount = () => {
    const [otpSms, setOtpSms] = useState("");
    const [otpEmail, setOtpEmail] = useState("");
    const [timer, setTimer] = useState(120);
    const [error, setError] = useState("");
    const location = useLocation();
    const navigate = useNavigate();
    const { user } = useAuth();
    const [currentUser, setCurrentUser] = useState(null);
    const [trxId, setTrxId] = useState(null);
    const [otpSent, setOtpSent] = useState(false);

    useEffect(() => {
        console.log("======abcede", user);
        if (user) {
            setCurrentUser(user);
        }
    }, [user]);

    useEffect(() => {
        if (timer > 0 && otpSent) {
            const countdown = setInterval(() => setTimer((prev) => prev - 1), 1000);
            return () => clearInterval(countdown);
        }
    }, [timer, otpSent]);

    const handleSendOtp = async () => {
        try {
            const payload = {
                username: user?.username,
                device_id: user?.device_id,
                purpose: "OTP for account confirmation",
                mobile_number: user?.mobile_number,
                email: user?.email,
            };
            const response = await AccountSendOtp(payload);
            console.log("response", response);
            setTrxId(response?.transaction_id);
            setTimer(120);
            setOtpSent(true);
            setError("");
        } catch (err) {
            setError("Failed to send OTP. Please try again.");
        }
    };

    const handleVerifyOtp = async (e) => {
        e.preventDefault();
        try {
            const payload = {
                trx_id: trxId,
                otp_sms: otpSms,
                otp_email: otpEmail,
                email: currentUser?.email,
                mobile_number: currentUser?.mobile_number,
            };
            await AccountVerifyOtp(payload);
            navigate("/"); // Navigate to dashboard on success
        } catch (err) {
            setError("Invalid OTP. Please try again.");
        }
    };

    const handleResendOtp = async () => {
        try {
            const payload = { trx_id: trxId };
            await AccountResendOtp(payload);
            setTimer(120);
            setError("");
        } catch (err) {
            setError("Failed to resend OTP. Please try again.");
        }
    };

    const handleOtpInputChange = (value, setOtp) => {
        if (value === "" || /^\d{0,6}$/.test(value)) {
            setOtp(value);
        }
    };

    return (
        <div className={styles.otpContainer}>
            <h2 className={styles.title}>Verify OTP</h2>

            {!otpSent && (
                <button onClick={handleSendOtp} className={styles.sendOtpButton}>
                    Sent Otp
                </button>
            )}
            {otpSent && (
                <form onSubmit={handleVerifyOtp} className={styles.form}>
                    <div className={styles.inputGroup}>
                        <label className={styles.label}>OTP (SMS)</label>
                        <input type="text" value={otpSms} onChange={(e) => handleOtpInputChange(e.target.value, setOtpSms)} className={styles.input} placeholder="Enter SMS OTP" required />
                    </div>
                    <div className={styles.inputGroup}>
                        <label className={styles.label}>OTP (Email)</label>
                        <input type="text" value={otpEmail} onChange={(e) => handleOtpInputChange(e.target.value, setOtpEmail)} className={styles.input} placeholder="Enter Email OTP" required />
                    </div>
                    <button type="submit" className={styles.verifyButton}>
                        Verify OTP
                    </button>
                    <p className={styles.timer}>Resend OTP in: {timer}s</p>
                    {timer === 0 && (
                        <button type="button" onClick={handleResendOtp} className={styles.resendButton}>
                            Resend OTP
                        </button>
                    )}
                    {error && <p className={styles.error}>{error}</p>}
                </form>
            )}
        </div>
    );
};

export default VerifyAccount;
