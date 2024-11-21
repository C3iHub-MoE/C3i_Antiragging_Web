// src/components/Login.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import { useFCM } from '../../../context/FCMContext';
import { getDeviceId, getPlatform } from '../../../utils/deviceUtils';
import styles from './Login.module.css'; // Assume this CSS module contains your styles
import UGCLOGO from "./ugc_logo.png"
// import 

const Login = () => {
  const [mobileNumber, setMobileNumber] = useState('');
  const [password, setPassword] = useState('');
  const [mobileError, setMobileError] = useState('');
  const { login, loading, error, user } = useAuth(); // Use the login logic from context
  const { fcmToken, isTokenLoaded} = useFCM();
  const navigate = useNavigate();
  const fcm_token = fcmToken;

  const isMobileValid = (mobileNumber) => /^[0-9]{10}$/.test(mobileNumber); // Simple mobile number validation
  const handleLogin = async (e) => {
    e.preventDefault();
    setMobileError('');

    // Validate mobile number format
    if (!isMobileValid(mobileNumber)) {
      setMobileError('Please enter a valid mobile number.');
      return;
    }

  if (!isTokenLoaded) {
    console.log('FCM token is not yet loaded.');
    return;
  }

  const platform = getPlatform();  // Get the platform (OS)
    const device_id = getDeviceId();  

    const loginPayload = {
      mobile_number : mobileNumber, 
      password,
      fcm_token, // Add FCM token here
      device_id,
      platform,
    };

 
    try {
      await login(loginPayload); // Perform login using the context

      if (user) {
        navigate('/'); // Redirect to the dashboard on successful login
      }
    } catch (err) {
      console.error('Login failed:', err); // Log error if login fails
    }
  };

  const handleForgotPassword = () => {
    navigate('/reset-password'); // Redirect to reset password page
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginBox}>
        {/* <h2 className={styles.title}>Welcome to Anti-Ragging App</h2> */}
        <div className={styles.logoPlaceholder}>
         <img src={UGCLOGO} alt="" srcset="" />
        </div>
       

        <form onSubmit={handleLogin} className={styles.form}>
          <div className={styles.inputGroup}>
            <label className={styles.label}>Mobile Number</label>
            <input
              type="text"
              value={mobileNumber}
              onChange={(e) => setMobileNumber(e.target.value)}
              className={styles.input}
              placeholder="Enter your mobile number"
              required
            />
            {mobileError && <span className={styles.error}>{mobileError}</span>}
          </div>
          <div className={styles.inputGroup}>
            <label className={styles.label}>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={styles.input}
              placeholder="Enter your password"
              required
            />
          </div>
          <button type="submit" className={styles.loginButton} disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        {error && <p className={styles.error}>{error}</p>}
        <button onClick={handleForgotPassword} className={styles.forgotButton}>
          Forgot Password?
        </button>
      </div>
    </div>
  );
};

export default Login;
