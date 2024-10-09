import React, { useState } from 'react';
import styles from './ResetPassword.module.css'; // Import CSS module

const ResetPassword = () => {
  const [email, setEmail] = useState('');

  const handleReset = (e) => {
    e.preventDefault();
    console.log('Email for password reset:', email);
  };

  return (
    <div className={styles.resetContainer}>
      <div className={styles.resetBox}>
        <h2 className={styles.title}>Reset Password</h2>
        <form onSubmit={handleReset} className={styles.form}>
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
          </div>
          <button type="submit" className={styles.resetButton}>
            Send Reset Link
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
