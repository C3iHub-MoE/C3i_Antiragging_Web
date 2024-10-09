import React from 'react';
import styles from './AntiRaggingDashboard.module.css'; // Import CSS module

const AntiRaggingDashboard = () => {
    return (
        <div className={styles.dashboardContent}>
            <h1 className={styles.dashboardTitle}>Anti-Ragging Dashboard</h1>
            
            {/* Dashboard Cards */}
            <div className={styles.dashboardStats}>
                <div className={styles.statCard}>
                    <h2>Total Complaints</h2>
                    <p>152</p>
                </div>
                <div className={styles.statCard}>
                    <h2>Registered Users</h2>
                    <p>3,487</p>
                </div>
                <div className={styles.statCard}>
                    <h2>Committee Members</h2>
                    <p>45</p>
                </div>
                <div className={styles.statCard}>
                    <h2>Resolved Cases</h2>
                    <p>120</p>
                </div>
            </div>
        </div>
    );
};

export default AntiRaggingDashboard;
