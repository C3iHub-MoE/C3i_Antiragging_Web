import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './StudentDashboard.module.css';

const StudentDashboard = () => {
  const navigate = useNavigate();

  // Function to handle navigation
  

  return (
    <div className={styles.dashboardContainer}>
      <h2 className={styles.title}>Welcome, manage your complaints here</h2>
      
      <div className={styles.boxContainer}>
        <div className={styles.box} onClick={() => navigate('/register-complaint')}>
          <div className={styles.icon}>📝</div>
          <div className={styles.boxTitle}>Register Complaint</div>
          <p className={styles.description}>File a new complaint if you're facing any issues.</p>
        </div>
        <div className={styles.box} onClick={() => navigate('/my-complaints')}>
          <div className={styles.icon}>📄</div>
          <div className={styles.boxTitle}>My Complaints</div>
          <p className={styles.description}>View and track your previous complaints.</p>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
