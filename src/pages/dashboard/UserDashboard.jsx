import React from 'react';
import styles from './Dashboard.module.css';
import StudentDashboard from '../studentDashboard/StudentDashboard';
import AdminDashboard from '../adminDashboard/AntiRaggingDashboard';

const UserDashboard = () => {
  // Simulating a hardcoded user role for testing
  const userRole = 'member'; // Change this to 'admin' to test the admin dashboard

 

  return (
    <div className={styles.dashboardContainer}>
     
      <div className={styles.boxContainer}>
        {userRole === 'student' && (
          <>
            <StudentDashboard />
          </>
        )}
        {userRole === 'member' && (
          <>
            <AdminDashboard />
          </>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;
