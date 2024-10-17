import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Login.module.css'; // Import CSS module

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');

  const navigate = useNavigate();

  const isEmailValid = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleLogin = (e) => {
    e.preventDefault();
    setEmailError('');

    // Validate email format
    if (!isEmailValid(email)) {
      setEmailError("Please enter a valid email address.");
      return;
    }

    // Proceed with login logic (e.g., API call)
    console.log('Email:', email);
    console.log('Password:', password);

    // After successful login, you can navigate to another page if needed
    // navigate('/dashboard');
  };

  const handleForgotPassword = () => {
    navigate('/reset-password'); // Redirect to reset password page
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginBox}>
        <h2 className={styles.title}>Anti-Ragging Login</h2>
        <div className={styles.logoPlaceholder}>LOGO</div>
        <form onSubmit={handleLogin} className={styles.form}>
          <div className={styles.inputGroup}>
            <label className={styles.label}>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={styles.input}
              placeholder="Enter your email"
              required
            />
            {emailError && <span className={styles.error}>{emailError}</span>}
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
          <button type="submit" className={styles.loginButton}>
            Login
          </button>
        </form>
        <button onClick={handleForgotPassword} className={styles.forgotButton}>
          Forgot Password?
        </button>
      </div>
    </div>
  );
};

export default Login;
