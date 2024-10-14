import React from 'react';
import styles from './AntiRaggingDashboard.module.css'; // CSS module
import { useNavigate } from 'react-router-dom';

// Mock user data (this would come from your authentication state)
const currentUser = {
  role: 'institutionalCommittee', // Example: Change this to test different roles
};

// Mock Data
const mockData = {
  totalStudents: 500,
  totalMembers: 30,
  totalComplaints: 75,
  resolvedComplaints: 50,
};

const Dashboard = () => {
  const navigate = useNavigate();

  // Navigate to Students Page
  const handleStudents = () => {
    navigate('/student-approval');
  };

  // Navigate to Members Page
  const handleMembers = () => {
    navigate('/member_page');
  };

  // Navigate to Complaints Page
  const handleComplaints = () => {
    navigate('/complaints');
  };

  return (
    <div className={styles.dashboardContainer}>
      <h1 className={styles.pageTitle}>Anti-Ragging Analytics Dashboard</h1>

      {/* Grid Layout for Analytics Cards */}
      <div className={styles.gridContainer}>

        {/* Students Card */}
        <div className={styles.analyticsCard} onClick={handleStudents}>
          <div className={styles.cardIcon}>
            <i className="fas fa-user-graduate"></i> {/* FontAwesome icon */}
          </div>
          <div className={styles.cardContent}>
            <h2>Total Students</h2>
            <p>{mockData.totalStudents}</p>
          </div>
        </div>

        {/* Members Card */}
        <div className={styles.analyticsCard} onClick={handleMembers}>
          <div className={styles.cardIcon}>
            <i className="fas fa-users"></i> {/* FontAwesome icon */}
          </div>
          <div className={styles.cardContent}>
            <h2>Total Members</h2>
            <p>{mockData.totalMembers}</p>
          </div>
        </div>

        {/* Complaints Card */}
        <div className={styles.analyticsCard} onClick={handleComplaints}>
          <div className={styles.cardIcon}>
            <i className="fas fa-exclamation-triangle"></i> {/* FontAwesome icon */}
          </div>
          <div className={styles.cardContent}>
            <h2>Total Complaints</h2>
            <p>{mockData.totalComplaints}</p>
          </div>
        </div>

        {/* Resolved Complaints Card */}
        <div className={styles.analyticsCard}>
          <div className={styles.cardIcon}>
            <i className="fas fa-check-circle"></i> {/* FontAwesome icon */}
          </div>
          <div className={styles.cardContent}>
            <h2>Resolved Complaints</h2>
            <p>{mockData.resolvedComplaints}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
