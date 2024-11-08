import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Table from '../../components/table/Table';
import Pagination from '../../components/Pagination/Pagination';
import initialComplaintsData from '../jsonfile/complaints.json';
import { Select } from 'antd'; // Import Ant Design's Select component
import styles from './StudentComplaintPage.module.css'; // Import the CSS module
import Swal from 'sweetalert2'; // Import SweetAlert
import ActionMenu from './ActionMenu'; // Import the ActionMenu component

const { Option } = Select;

const StudentComplaintsPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [complaintsPerPage] = useState(5);
  const [complaintsData, setComplaintsData] = useState(initialComplaintsData);
  const [selectedCollege, setSelectedCollege] = useState('');

  const navigate = useNavigate();

  const indexOfLastComplaint = currentPage * complaintsPerPage;
  const indexOfFirstComplaint = indexOfLastComplaint - complaintsPerPage;

  // Get a unique list of all colleges from the complaints data for the dropdown
  const collegeOptions = [...new Set(initialComplaintsData.map(complaint => complaint.CollegeName))];

  // Filter complaints based on the selected college
  const filteredComplaints = complaintsData.filter(complaint => {
    return selectedCollege ? complaint.CollegeName === selectedCollege : true;
  });

  const currentComplaints = filteredComplaints.slice(indexOfFirstComplaint, indexOfLastComplaint);
  const totalPages = Math.ceil(filteredComplaints.length / complaintsPerPage);

  const updateStatus = (complaintID, newStatus) => {
    setComplaintsData(prevData =>
      prevData.map(complaint =>
        complaint.ComplaintID === complaintID ? { ...complaint, Status: newStatus } : complaint
      )
    );
    Swal.fire('Status Updated', `Complaint status updated to ${newStatus}`, 'success');
  };

  const goToComplaintDetails = (complaintID) => {
    console.log('Navigating to complaint ID:', complaintID);
    navigate(`/complaints/${complaintID}`);
  };

  const dataWithActions = currentComplaints.map(complaint => ({
    ...complaint,
    Actions: (
      <ActionMenu
        complaint={complaint}
        updateStatus={updateStatus}
        goToComplaintDetails={goToComplaintDetails}
      />
    )
  }));

  return (
    <div className={styles.container}>
      <h2>Student Complaints</h2>

      {/* College filter dropdown */}
      <Select
        showSearch
        placeholder="Select a college"
        optionFilterProp="children"
        style={{ width: 300, marginBottom: '20px' }}
        onChange={setSelectedCollege}
        allowClear
      >
        {collegeOptions.map((college, index) => (
          <Option key={index} value={college}>{college}</Option>
        ))}
      </Select>

      {/* Complaints table */}
      <Table data={dataWithActions} columns={['ComplaintID', 'StudentName', 'CollegeName', 'Status', 'Actions']} />

      {/* Pagination component */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default StudentComplaintsPage;
