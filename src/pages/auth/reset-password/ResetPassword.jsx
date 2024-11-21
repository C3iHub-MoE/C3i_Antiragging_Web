import React, { useState, useEffect } from 'react';
import styles from './ResetPassword.module.css';
import { getDeviceId } from '../../../utils/deviceUtils';
import { sendOtp, verifyOtp, resendOtp } from '../../../api/user'; // Assuming you have these APIs

const ResetPassword = () => {
  const [mobile_number, setMobileNumber] = useState('');
  const [trxId, setTrxId] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const [timer, setTimer] = useState(120);
  const [error, setError] = useState('');
  const device_id = getDeviceId();
  useEffect(() => {
    let interval;
    if (isOtpSent && timer > 0) {
      interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
    } else if (timer === 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [timer, isOtpSent]);

  const handleSendOtp = async (e) => {
    e.preventDefault();
    try {
      const response = await sendOtp({
        mobile_number,
        device_id,
      });
      setIsOtpSent(true);
      setTimer(120);
      setTrxId(response.trxId); // Assuming the API returns a transaction ID
    } catch (err) {
      setError('Failed to send OTP. Please try again.');
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    try {
      await verifyOtp({
        mobile_number,
        otp,
        trxId,
        device_id,
        newPassword,
      });
      setIsOtpVerified(true);
      setError('');
    } catch (err) {
      setError('Invalid OTP. Please try again.');
    }
  };

  const handleResendOtp = async () => {
    try {
      setError('');
      setTimer(120);
      await resendOtp({
        mobile_number,
        device_id,
        trxId,
      });
    } catch (err) {
      setError('Failed to resend OTP. Please try again.');
    }
  };

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    try {
      await verifyOtp({
        mobile_number,
        otp,
        trxId,
        device_id,
        newPassword,
      });
      setError('Password reset successfully!');
    } catch (err) {
      setError('Failed to reset password. Please try again.');
    }
  };

  return (
    <div className={styles.resetContainer}>
      <div className={styles.logo}> {/* Placeholder for Logo */}
        <img src="/path/to/logo.png" alt="Logo" className={styles.logoImage} />
      </div>
      <div className={styles.resetBox}>
        <h2 className={styles.title}>Reset Password</h2>

        {!isOtpSent ? (
          <form onSubmit={handleSendOtp} className={styles.form}>
            <div className={styles.inputGroup}>
              <label className={styles.label}>Mobile Number</label>
              <input
                type="text"
                value={mobile_number}
                onChange={(e) => setMobileNumber(e.target.value)}
                className={styles.input}
                placeholder="Enter your mobile number"
                required
              />
            </div>
            <button type="submit" className={styles.resetButton}>
              Send OTP
            </button>
            {error && <p className={styles.error}>{error}</p>}
          </form>
        ) : !isOtpVerified ? (
          <form onSubmit={handleVerifyOtp} className={styles.form}>
            <div className={styles.inputGroup}>
              <label className={styles.label}>Enter OTP</label>
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className={styles.input}
                placeholder="Enter OTP"
                required
              />
            </div>
            <button type="submit" className={styles.resetButton}>
              Verify OTP
            </button>
            <p className={styles.timer}>
              Resend OTP in: {timer}s
            </p>
            {timer === 0 && (
              <button
                type="button"
                onClick={handleResendOtp}
                className={styles.resendButton}
              >
                Resend OTP
              </button>
            )}
            {error && <p className={styles.error}>{error}</p>}
          </form>
        ) : (
          <form onSubmit={handlePasswordReset} className={styles.form}>
            <div className={styles.inputGroup}>
              <label className={styles.label}>New Password</label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className={styles.input}
                placeholder="Enter new password"
                required
              />
            </div>
            <div className={styles.inputGroup}>
              <label className={styles.label}>Confirm Password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className={styles.input}
                placeholder="Confirm new password"
                required
              />
            </div>
            <button type="submit" className={styles.resetButton}>
              Reset Password
            </button>
            {error && <p className={styles.error}>{error}</p>}
          </form>
        )}
      </div>
    </div>
  );
};

export default ResetPassword;
