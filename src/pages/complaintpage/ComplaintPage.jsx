// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import Table from '../../components/table/Table';
// import Pagination from '../../components/Pagination/Pagination';

// import initialComplaintsData from "../jsonfile/complaints.json";
// import Button from '../../components/button/Button';

// const ComplaintsPage = () => {
//   const [currentPage, setCurrentPage] = useState(1);
//   const complaintsPerPage = 5; // Display 5 complaints per page
//   const [complaintsData, setComplaintsData] = useState(initialComplaintsData);

//   const navigate = useNavigate(); // Hook for navigation

//   const indexOfLastComplaint = currentPage * complaintsPerPage;
//   const indexOfFirstComplaint = indexOfLastComplaint - complaintsPerPage;
//   const currentComplaints = complaintsData.slice(indexOfFirstComplaint, indexOfLastComplaint);

//   const totalPages = Math.ceil(complaintsData.length / complaintsPerPage);

//   // Function to update complaint status
//   const updateStatus = (complaintID) => {
//     setComplaintsData((prevData) =>
//       prevData.map((complaint) => {
//         if (complaint.ComplaintID === complaintID) {
//           if (complaint.Status === "Pending") {
//             return { ...complaint, Status: "Resolved" };
//           } else if (complaint.Status === "Resolved") {
//             return { ...complaint, Status: "In Progress" };
//           } else {
//             return { ...complaint, Status: "Pending" };
//           }
//         }
//         return complaint;
//       })
//     );
//   };

//   // Function to navigate to the complaint details page
//   const goToComplaintDetails = (complaintID) => {
//     navigate(`/complaint/${complaintID}`);
//   };

//   // Handle pagination page change
//   const handlePageChange = (newPage) => {
//     setCurrentPage(newPage);
//   };

//   const dataWithActions = currentComplaints.map(complaint => ({
//     ...complaint,
//     Actions: (
//       <div>
//         {/* <button onClick={() => updateStatus(complaint.ComplaintID)}>
//           Update Status
//         </button> */}
//         <Button label="Update Status" type="primary" onClick={() =>updateStatus(complaint.ComplaintID)} />
        

//         <Button label="View Details" type="primary" onClick={() =>goToComplaintDetails(complaint.ComplaintID)} />
//       </div>
//     ),
//   }));

//   const columns = [
//     "ComplaintID",
//     "StudentID",
//     "Description",
//     "Status",
//     "StudentName",
//     "CollegeName",
//     "ResolvedDate",
//     "Actions",
//   ];

//   return (
//     <div className="container">
//       <h1 className="title">Student Complaints</h1>
//       <Table columns={columns} data={dataWithActions} />
//       <Pagination
//         currentPage={currentPage}
//         totalPages={totalPages}
//         onPageChange={handlePageChange}
//       />
//     </div>
//   );
// };

// export default ComplaintsPage;


// src/pages/ComplaintsPage.js

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Table from '../../components/table/Table';
import Pagination from '../../components/Pagination/Pagination';
import Button from '../../components/button/Button';
import initialComplaintsData from '../jsonfile/complaints.json';
import styles from './ComplaintPgae.module.css'; // Import the CSS module

const ComplaintsPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [complaintsPerPage] = useState(5);
  const [complaintsData, setComplaintsData] = useState(initialComplaintsData);

  // Filter state
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [selectedCollege, setSelectedCollege] = useState('');
  const [selectedUniversity, setSelectedUniversity] = useState('');

  const navigate = useNavigate();

  const indexOfLastComplaint = currentPage * complaintsPerPage;
  const indexOfFirstComplaint = indexOfLastComplaint - complaintsPerPage;

  // Filter complaints based on selected filters
  const filteredComplaints = complaintsData.filter(complaint => {
    const matchesDistrict = selectedDistrict ? complaint.District === selectedDistrict : true;
    const matchesCollege = selectedCollege ? complaint.CollegeName === selectedCollege : true;
    const matchesUniversity = selectedUniversity ? complaint.UniversityName === selectedUniversity : true;
    return matchesDistrict && matchesCollege && matchesUniversity;
  });

  const currentComplaints = filteredComplaints.slice(indexOfFirstComplaint, indexOfLastComplaint);
  const totalPages = Math.ceil(filteredComplaints.length / complaintsPerPage);

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

  const goToComplaintDetails = (complaintID) => {
    navigate(`/complaint/${complaintID}`);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const dataWithActions = currentComplaints.map(complaint => ({
    ...complaint,
    Actions: (
      <div>
        <Button label="Update Status" type="primary" onClick={() => updateStatus(complaint.ComplaintID)} />
        <Button label="View Details" type="primary" onClick={() => goToComplaintDetails(complaint.ComplaintID)} />
      </div>
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

  // Extract unique districts, colleges, and universities from complaints data
  const districts = [...new Set(complaintsData.map(complaint => complaint.District))];
  const colleges = [...new Set(complaintsData.map(complaint => complaint.CollegeName))];
  const universities = [...new Set(complaintsData.map(complaint => complaint.UniversityName))];

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Student Complaints</h1>

      {/* Filter Dropdowns */}
      <div className={styles.filterContainer}>
  <select className={styles.select} value={selectedDistrict} onChange={(e) => setSelectedDistrict(e.target.value)}>
    <option value="">Select District</option>
    {districts.map(district => (
      <option key={district} value={district}>{district}</option>
    ))}
  </select>

  <select className={styles.select} value={selectedCollege} onChange={(e) => setSelectedCollege(e.target.value)}>
    <option value="">Select College</option>
    {colleges.map(college => (
      <option key={college} value={college}>{college}</option>
    ))}
  </select>

  <select className={styles.select} value={selectedUniversity} onChange={(e) => setSelectedUniversity(e.target.value)}>
    <option value="">Select University</option>
    {universities.map(university => (
      <option key={university} value={university}>{university}</option>
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

export default ComplaintsPage;
