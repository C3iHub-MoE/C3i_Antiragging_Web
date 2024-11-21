import React, { useState, useEffect } from 'react';
import styles from './ResetPassword.module.css'; // Import CSS module
import { resetPassword, verifyOtp } from '../../../api/user'; // Assuming you've created API constants

const ResetPassword = () => {
  const [mobile_number, setMobileNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const [timer, setTimer] = useState(120); // 2 minutes timer
  const [error, setError] = useState('');

  useEffect(() => {
    let interval;
    if (timer > 0 && isOtpSent) {
      interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
    } else if (timer === 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [timer, isOtpSent]);

  const handleMobileSubmit = async (e) => {
    e.preventDefault();
    try {
      await resetPassword(mobile_number); // API call to send OTP
      setIsOtpSent(true);
      setTimer(120); // Reset the timer for 2 minutes
    } catch (error) {
      setError('Failed to send OTP. Please try again.');
    }
  };

  const handleOtpVerification = async (e) => {
    e.preventDefault();
    try {
      await verifyOtp(mobile_number, otp); // API call to verify OTP
      setIsOtpVerified(true);
    } catch (error) {
      setError('Invalid OTP. Please try again.');
    }
  };

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      await resetPassword(mobile_number, newPassword); // API call to reset password
      setError('Password reset successfully!');
    } catch (error) {
      setError('Failed to reset password. Please try again.');
    }
  };

  const handleResendOtp = () => {
    setOtp(''); // Clear previous OTP input
    setTimer(120); // Reset timer
    setError(''); // Reset error message
    handleMobileSubmit(); // Resend OTP
  };

  return (
    <div className={styles.resetContainer}>
      <div className={styles.resetBox}>
        <h2 className={styles.title}>Reset Password</h2>

        {/* Mobile Number Input Section */}
        {!isOtpSent ? (
          <form onSubmit={handleMobileSubmit} className={styles.form}>
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
            <button type="submit" className={styles.resetButton}>Send OTP</button>
            {error && <p className={styles.error}>{error}</p>}
          </form>
        ) : !isOtpVerified ? (
          <form onSubmit={handleOtpVerification} className={styles.form}>
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
            <button type="submit" className={styles.resetButton}>Verify OTP</button>
            <p className={styles.timer}>Resend OTP in: {timer}s</p>

            {/* Resend OTP Button */}
            {timer === 0 && !isOtpVerified && (
              <button type="button" onClick={handleResendOtp} className={styles.resendButton}>
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
            <button type="submit" className={styles.resetButton}>Reset Password</button>
            {error && <p className={styles.error}>{error}</p>}
          </form>
        )}
      </div>
    </div>
  );
};

export default ResetPassword;
