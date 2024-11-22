import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { sendOtp, verifyOtp, resendOtp } from '../../../api/user';
import styles from './VerifyAccount.module.css';

const VerifyAccount = () => {
  const [otp, setOtp] = useState('');
  const [timer, setTimer] = useState(120);
  const [error, setError] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  const { mobileNumber } = location.state;

  const handleSendOtp = async () => {
    try {
      await sendOtp({ mobile_number: mobileNumber });
      setTimer(120);
      setError('');
    } catch (err) {
      setError('Failed to send OTP. Please try again.');
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    try {
      await verifyOtp({ mobile_number: mobileNumber, otp });
      navigate('/'); // Navigate to dashboard on success
    } catch (err) {
      setError('Invalid OTP. Please try again.');
    }
  };

  const handleResendOtp = async () => {
    try {
      await resendOtp({ mobile_number: mobileNumber });
      setTimer(120);
      setError('');
    } catch (err) {
      setError('Failed to resend OTP. Please try again.');
    }
  };

  return (
    <div className={styles.otpContainer}>
      <h2 className={styles.title}>Verify OTP</h2>
      <form onSubmit={handleVerifyOtp} className={styles.form}>
        <div className={styles.inputGroup}>
          <label className={styles.label}>OTP</label>
          <input
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className={styles.input}
            placeholder="Enter OTP"
            required
          />
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
    </div>
  );
};

export default VerifyAccount;
