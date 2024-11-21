import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from './ComplaintDetailsPage.module.css'; // Import CSS module

const ComplaintDetailsPage = ({ complaintsData, setComplaintsData }) => {
  
  const { complaintID } = useParams();
  console.log(complaintID)
  const complaint = complaintsData.find(c => c.ComplaintID === parseInt(complaintID));


  const [isModalOpen, setIsModalOpen] = useState(false);
  const [escalationLevel, setEscalationLevel] = useState('');
  const [remarks, setRemarks] = useState('');

  if (!complaint) {
    return <div className={styles.error}>Complaint not found</div>;
  }

  // Function to escalate the complaint with selected options
  const handleEscalation = () => {
    setComplaintsData(prevData =>
      prevData.map(c => 
        c.ComplaintID === complaint.ComplaintID 
        ? { ...c, EscalationLevel: escalationLevel, Remarks: remarks }
        : c
      )
    );
    setIsModalOpen(false); // Close modal after submission
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
        <button className={styles.escalateButton} onClick={() => setIsModalOpen(true)}>
          Escalate Complaint
        </button>
        <button className={styles.backButton} onClick={() => window.history.back()}>
          Back to Complaints
        </button>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <h2>Escalate Complaint</h2>

            <div className={styles.modalRow}>
              <label>Select Escalation Level:</label>
              <select 
                value={escalationLevel}
                onChange={e => setEscalationLevel(e.target.value)}
              >
                <option value="">-- Select --</option>
                <option value="University">University</option>
                <option value="District">District</option>
                <option value="State">State</option>
                <option value="UGC">UGC Member</option>
              </select>
            </div>

            <div className={styles.modalRow}>
              <label>Remarks:</label>
              <textarea 
                value={remarks}
                onChange={e => setRemarks(e.target.value)}
                placeholder="Enter remarks here..."
              />
            </div>

            <div className={styles.modalActions}>
              <button className={styles.submitButton} onClick={handleEscalation}>
                Submit
              </button>
              <button className={styles.cancelButton} onClick={() => setIsModalOpen(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ComplaintDetailsPage;
