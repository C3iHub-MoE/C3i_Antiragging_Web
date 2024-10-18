import React, { useState, useRef } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Table from '../../components/table/Table';
import Pagination from '../../components/Pagination/Pagination';
import initialComplaintsData from '../jsonfile/complaints.json';
import styles from './StudentComplaintPage.module.css'; // Import the CSS module
import Swal from 'sweetalert2'; // Import SweetAlert

const StudentComplaintsPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [complaintsPerPage] = useState(5);
  const [complaintsData, setComplaintsData] = useState(initialComplaintsData);

  // Filter state
  const [selectedState, setSelectedState] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [selectedUniversity, setSelectedUniversity] = useState('');
  const [selectedCollege, setSelectedCollege] = useState('');

  const navigate = useNavigate();

  const indexOfLastComplaint = currentPage * complaintsPerPage;
  const indexOfFirstComplaint = indexOfLastComplaint - complaintsPerPage;

  // Filter complaints based on selected filters
  const filteredComplaints = complaintsData.filter(complaint => {
    const matchesState = selectedState ? complaint.State === selectedState : true;
    const matchesDistrict = selectedDistrict ? complaint.District === selectedDistrict : true;
    const matchesCollege = selectedCollege ? complaint.CollegeName === selectedCollege : true;
    const matchesUniversity = selectedUniversity ? complaint.UniversityName === selectedUniversity : true;
    return matchesState && matchesDistrict && matchesCollege && matchesUniversity;
  });

  const currentComplaints = filteredComplaints.slice(indexOfFirstComplaint, indexOfLastComplaint);
  const totalPages = Math.ceil(filteredComplaints.length / complaintsPerPage);

  const updateStatus = (complaintID, newStatus) => {
    setComplaintsData((prevData) =>
      prevData.map((complaint) =>
        complaint.ComplaintID === complaintID ? { ...complaint, Status: newStatus } : complaint
      )
    );
  };

  const goToComplaintDetails = (complaintID) => {
    navigate(`/complaint/${complaintID}`);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const dataWithActions = currentComplaints.map(complaint => ({
    ...complaint,
    Actions: (
      <ActionMenu
        complaint={complaint}
        updateStatus={updateStatus}
        goToComplaintDetails={goToComplaintDetails}
      />
    ),
  }));

  const columns = [
    "ComplaintID",
    "StudentID",
    "Description",
    "Status",
    "StudentName",
    "CollegeName",
    "ResolvedDate",
    "Actions",
  ];

  // Extract unique states, districts, universities, and colleges from complaints data
  const states = [...new Set(complaintsData.map(complaint => complaint.State))];
  const filteredDistricts = selectedState
    ? [...new Set(complaintsData.filter(complaint => complaint.State === selectedState).map(complaint => complaint.District))]
    : [];
  const filteredUniversities = selectedDistrict
    ? [...new Set(complaintsData.filter(complaint => complaint.District === selectedDistrict).map(complaint => complaint.UniversityName))]
    : [];
  const filteredColleges = selectedUniversity
    ? [...new Set(complaintsData.filter(complaint => complaint.UniversityName === selectedUniversity).map(complaint => complaint.CollegeName))]
    : [];

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Student Complaints</h1>

      {/* Filter Dropdowns */}
      <div className={styles.filterContainer}>
        <select className={styles.select} value={selectedState} onChange={(e) => setSelectedState(e.target.value)}>
          <option value="">Select State</option>
          {states.map(state => (
            <option key={state} value={state}>{state}</option>
          ))}
        </select>

        <select className={styles.select} value={selectedDistrict} onChange={(e) => setSelectedDistrict(e.target.value)} disabled={!selectedState}>
          <option value="">Select District</option>
          {filteredDistricts.map(district => (
            <option key={district} value={district}>{district}</option>
          ))}
        </select>

        <select className={styles.select} value={selectedUniversity} onChange={(e) => setSelectedUniversity(e.target.value)} disabled={!selectedDistrict}>
          <option value="">Select University</option>
          {filteredUniversities.map(university => (
            <option key={university} value={university}>{university}</option>
          ))}
        </select>

        <select className={styles.select} value={selectedCollege} onChange={(e) => setSelectedCollege(e.target.value)} disabled={!selectedUniversity}>
          <option value="">Select College</option>
          {filteredColleges.map(college => (
            <option key={college} value={college}>{college}</option>
          ))}
        </select>
      </div>

      <Table columns={columns} data={dataWithActions} />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};



const ActionMenu = ({ complaint, updateStatus, goToComplaintDetails }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  // Handle Deactivate action
  const handleDeactivate = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, deactivate it!',
    }).then((result) => {
      if (result.isConfirmed) {
        // Logic to deactivate the complaint
        
        Swal.fire('Deactivated!', 'The complaint has been deactivated.', 'success');
      }
    });
  };

  // Handle Edit action
  const handleEdit = () => {
    Swal.fire({
      title: 'Edit Complaint',
      html: `<input id="swal-input1" class="swal2-input" placeholder="Student Name" value="${complaint.StudentName}" />
              <input id="swal-input2" class="swal2-input" placeholder="Description" value="${complaint.Description}" />`,
      focusConfirm: false,
      preConfirm: () => {
        const studentName = document.getElementById('swal-input1').value;
        const description = document.getElementById('swal-input2').value;

        // Logic to update complaint details
        // You might want to update state here or make an API call
        Swal.fire(`Edited!`, `Student Name: ${studentName}, Description: ${description}`, 'success');
      },
      showCancelButton: true,
    });
  };

  // Handle Status Update action
  const handleStatusUpdate = () => {
    Swal.fire({
      title: 'Update Status',
      input: 'select',
      inputOptions: {
        Pending: 'Pending',
        Resolved: 'Resolved',
        'In Progress': 'In Progress',
      },
      inputPlaceholder: 'Select a status',
      showCancelButton: true,
      preConfirm: (status) => {
        if (!status) {
          Swal.showValidationMessage('You must select a status');
        }
        return status;
      },
    }).then((result) => {
      if (result.isConfirmed && result.value) {
        updateStatus(complaint.ComplaintID, result.value); // Call updateStatus with selected value
        Swal.fire(`Status Updated!`, `New Status: ${result.value}`, 'success');
      }
    });
  };

  // Close the menu if clicking outside
  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setMenuOpen(false); // Close menu
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className={styles.actionMenu} ref={menuRef}>
      {/* Three dots icon */}
      <div className={styles.threeDots} onClick={toggleMenu}>
        &#x22EE; {/* Three dots character */}
      </div>

      {/* Dropdown menu with buttons */}
      {menuOpen && (
        <div className={styles.menu}>
          <button
            className={styles.menuButton}
            onClick={handleStatusUpdate} // Open Swal for status update
          >
            Update Status
          </button>
          <button
            className={styles.menuButton}
            onClick={handleEdit} // Open edit dialog
          >
            Edit
          </button>
          <button
            className={styles.menuButton}
            onClick={handleDeactivate} // Confirm deactivate action
          >
            Deactivate
          </button>
          <button
            className={styles.menuButton}
            onClick={() => goToComplaintDetails(complaint.ComplaintID)} // Go to complaint details
          >
            View Details
          </button>
        </div>
      )}
    </div>
  );
};


export default StudentComplaintsPage;
