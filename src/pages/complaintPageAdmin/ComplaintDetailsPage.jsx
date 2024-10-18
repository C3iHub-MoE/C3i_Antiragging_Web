import React from 'react';
import { useParams } from 'react-router-dom';
import styles from './ComplaintDetailsPage.module.css'; // Import CSS module

const ComplaintDetailsPage = ({ complaintsData, setComplaintsData }) => {
  const { complaintID } = useParams();
  const complaint = complaintsData.find(c => c.ComplaintID === parseInt(complaintID));

  if (!complaint) {
    return <div className={styles.error}>Complaint not found</div>;
  }

  // Function to escalate the complaint
  const escalateComplaint = () => {
    setComplaintsData(prevData =>
      prevData.map(c => c.ComplaintID === complaint.ComplaintID 
        ? { ...c, EscalationLevel: c.EscalationLevel + 1 }
        : c
      )
    );
  };

  return (
    <div className={styles.complaintDetailsContainer}>
      <h1 className={styles.title}>Complaint Details</h1>
      <div className={styles.detailRow}>
        <strong>Complaint ID:</strong> {complaint.ComplaintID}
      </div>
      <div className={styles.detailRow}>
        <strong>Description:</strong> {complaint.Description}
      </div>
      <div className={styles.detailRow}>
        <strong>Date Filed:</strong> {complaint.DateFiled}
      </div>
      <div className={styles.detailRow}>
        <strong>Status:</strong> {complaint.Status}
      </div>
      <div className={styles.detailRow}>
        <strong>Student Name:</strong> {complaint.StudentName}
      </div>
      <div className={styles.detailRow}>
        <strong>College Name:</strong> {complaint.CollegeName}
      </div>
      <div className={styles.detailRow}>
        <strong>Escalation Level:</strong> {complaint.EscalationLevel}
      </div>
      <div className={styles.detailRow}>
        <strong>Resolved Date:</strong> {complaint.ResolvedDate || 'N/A'}
      </div>

      <div className={styles.actions}>
        <button className={styles.escalateButton} onClick={escalateComplaint}>
          Escalate Complaint
        </button>
        <button className={styles.backButton} onClick={() => window.history.back()}>
          Back to Complaints
        </button>
      </div>
    </div>
  );
};

export default ComplaintDetailsPage;
