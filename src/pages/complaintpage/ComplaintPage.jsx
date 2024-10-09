import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Table from '../../components/table/Table';
import Pagination from '../../components/Pagination/Pagination';

import initialComplaintsData from "../jsonfile/complaints.json";
import Button from '../../components/button/Button';

const ComplaintsPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const complaintsPerPage = 5; // Display 5 complaints per page
  const [complaintsData, setComplaintsData] = useState(initialComplaintsData);

  const navigate = useNavigate(); // Hook for navigation

  const indexOfLastComplaint = currentPage * complaintsPerPage;
  const indexOfFirstComplaint = indexOfLastComplaint - complaintsPerPage;
  const currentComplaints = complaintsData.slice(indexOfFirstComplaint, indexOfLastComplaint);

  const totalPages = Math.ceil(complaintsData.length / complaintsPerPage);

  // Function to update complaint status
  const updateStatus = (complaintID) => {
    setComplaintsData((prevData) =>
      prevData.map((complaint) => {
        if (complaint.ComplaintID === complaintID) {
          if (complaint.Status === "Pending") {
            return { ...complaint, Status: "Resolved" };
          } else if (complaint.Status === "Resolved") {
            return { ...complaint, Status: "In Progress" };
          } else {
            return { ...complaint, Status: "Pending" };
          }
        }
        return complaint;
      })
    );
  };

  // Function to navigate to the complaint details page
  const goToComplaintDetails = (complaintID) => {
    navigate(`/complaint/${complaintID}`);
  };

  // Handle pagination page change
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const dataWithActions = currentComplaints.map(complaint => ({
    ...complaint,
    Actions: (
      <div>
        {/* <button onClick={() => updateStatus(complaint.ComplaintID)}>
          Update Status
        </button> */}
        <Button label="Update Status" type="primary" onClick={() =>updateStatus(complaint.ComplaintID)} />
        

        <Button label="View Details" type="primary" onClick={() =>goToComplaintDetails(complaint.ComplaintID)} />
      </div>
    ),
  }));

  const columns = [
    "ComplaintID",
    "Description",
    "DateFiled",
    "Status",
    "StudentName",
    "CollegeName",
    "EscalationLevel",
    "ResolvedDate",
    "Actions",
  ];

  return (
    <div className="container">
      <h1 className="title">Student Complaints</h1>
      <Table columns={columns} data={dataWithActions} />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default ComplaintsPage;
