import React from "react";
import styles from "./Dashboard.module.css";
import StudentDashboard from "../studentDashboard/StudentDashboard";
import AdminDashboard from "../adminDashboard/AntiRaggingDashboard";
import { useUserProfile } from "../../hooks/useUserList";
import UgcDashboard from "../ugcDashboard/UgcDashboard";

const UserDashboard = () => {
  const { currentUser } = useUserProfile();
  // Simulating a hardcoded user role for testing
  const userRole = currentUser?.role; // Change this to 'admin' to test the admin dashboard

  console.log(currentUser?.role);
  return (
    <div className={styles.dashboardContainer}>
      <div className={styles.boxContainer}>
        {userRole === "student" && (
          <>
            <StudentDashboard />
          </>
        )}
        {userRole === "squad_member" && (
          <>
            <AdminDashboard />
          </>
        )}
        {userRole === "ugc_member" && (
          <>
            <UgcDashboard />
          </>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;
