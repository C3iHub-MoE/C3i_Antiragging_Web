import React, { useState } from 'react';
import styles from './StudentComplaintStatus.module.css';
import Table from '../../components/table/Table'; // Assuming Table.jsx is in the same directory

// Sample complaint data
const complaintsData = [
  {
    id: 1,
    category: 'Ragging',
    status: 'Pending',
    description: 'Severe ragging in the college premises.',
    date: '2024-10-01',
  },
  {
    id: 2,
    category: 'Harassment',
    status: 'Resolved',
    description: 'Harassment by senior students.',
    date: '2024-09-20',
  },
];

const StudentComplaintStatus = () => {
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Open modal and set selected complaint details
  const openModal = (complaint) => {
    setSelectedComplaint(complaint);
    setIsModalOpen(true);
  };

  // Close the modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedComplaint(null);
  };

  // Define columns for the table
  const columns = ['ID','CATEGORY', 'STATUS', 'DATE', 'ACTION'];

  // Map the complaint data to fit the table structure
  const tableData = complaintsData.map((complaint) => ({
    ID: complaint.id,
    CATEGORY: complaint.category,
    STATUS: complaint.status,
    DATE: complaint.date,
    ACTION: (
      <button className={styles.viewButton} onClick={() => openModal(complaint)}>
        View Details
      </button>
    ),
  }));

  return (
    <div className={styles.container}>
      <h2>My Complaints</h2>

      {/* Use Table component to display the complaints */}
      <Table columns={columns} data={tableData} />

      {/* Modal for complaint details */}
      {isModalOpen && selectedComplaint && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <h3>Complaint Details</h3>
            <p><strong>Category:</strong> {selectedComplaint.category}</p>
            <p><strong>Status:</strong> {selectedComplaint.status}</p>
            <p><strong>Description:</strong> {selectedComplaint.description}</p>
            <p><strong>Date:</strong> {selectedComplaint.date}</p>
            <button className={styles.closeButton} onClick={closeModal}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentComplaintStatus;
