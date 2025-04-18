// import React, { useState, useEffect, useRef } from 'react';
// import { useNavigate } from 'react-router-dom';
// import Table from '../../../components/table/Table';
// import Pagination from '../../../components/Pagination/Pagination';
// import Button from '../../../components/button/Button';
// import initialMembersData from '../../jsonfile/members.json'; // Import your member data
// import styles from './MembersPage.module.css'; // Import your styles

// const MembersPage = () => {
//     const [currentPage, setCurrentPage] = useState(1);
//     const [membersPerPage] = useState(10);
//     const [membersData, setMembersData] = useState(initialMembersData);
//     const [totalPages, setTotalPages] = useState(Math.ceil(initialMembersData.length / membersPerPage));
//     const [openMenu, setOpenMenu] = useState(null); // Track which action menu is open
//     const menuRefs = useRef([]); // Reference to detect clicks outside the menus
//     const navigate = useNavigate();

//     const indexOfLastMember = currentPage * membersPerPage;
//     const indexOfFirstMember = indexOfLastMember - membersPerPage;
//     const currentMembers = membersData.slice(indexOfFirstMember, indexOfLastMember);

//     useEffect(() => {
//         setTotalPages(Math.ceil(membersData.length / membersPerPage));
//     }, [membersData]);

//     // Handle click outside of menu to close it
//     useEffect(() => {
//         const handleClickOutside = (event) => {
//             if (openMenu !== null && menuRefs.current[openMenu] && !menuRefs.current[openMenu].contains(event.target)) {
//                 setOpenMenu(null);
//             }
//         };

//         document.addEventListener('mousedown', handleClickOutside);
//         return () => {
//             document.removeEventListener('mousedown', handleClickOutside);
//         };
//     }, [openMenu]);

//     const handlePageChange = (newPage) => {
//         setCurrentPage(newPage);
//     };

//     const deleteMember = (id) => {
//         const updatedMembers = membersData.filter(member => member.id !== id);
//         setMembersData(updatedMembers);
//     };

//     // Toggle the action menu for a specific member
//     const toggleMenu = (id) => {
//         setOpenMenu(openMenu === id ? null : id);
//     };

//     const dataWithActions = currentMembers.map((member, index) => ({
//         ...member,
//         Actions: (
//             <div className={styles.actionContainer}>
//                 <button className={styles.dotsButton} onClick={() => toggleMenu(member.id)}>
//                     &#x22EE;
//                 </button>
//                 {openMenu === member.id && (
//                     <div
//                         ref={(el) => (menuRefs.current[member.id] = el)}
//                         className={styles.actionMenu}
//                     >
//                         <Button title="Delete" trigger={() => deleteMember(member.id)} />
//                         <Button title="Update" trigger={() => console.log(`Update member ${member.id}`)} />
//                     </div>
//                 )}
//             </div>
//         ),
//     }));

//     const columns = [
//         "id",
//         "name",
//         "email",
//         "phone",
//         "memberType",
//         "state",
//         "district",
//         "university",
//         "college",
//         "Actions",
//     ];

//     return (
//         <div className={styles.container}>
//             <Button title="Invite New Member" trigger={() => navigate("/invite")} />

//             <Table columns={columns} data={dataWithActions} />
//             <Pagination
//                 currentPage={currentPage}
//                 totalPages={totalPages}
//                 onPageChange={handlePageChange}
//             />
//         </div>
//     );
// };

// export default MembersPage;

// import React, { useState, useEffect, useRef } from "react";
// import { useNavigate } from "react-router-dom";
// import Table from "../../../components/table/Table";
// import Pagination from "../../../components/Pagination/Pagination";
// import Button from "../../../components/button/Button";
// import { useMemberList } from "../../../hooks/useUserList";
// import styles from "./MembersPage.module.css"; // Import your styles

// const MembersPage = () => {
//     const [currentPage, setCurrentPage] = useState(1);
//     const [membersPerPage] = useState(10);
//     const [membersData, setMembersData] = useState(initialMembersData);
//     const [filteredMembers, setFilteredMembers] = useState(initialMembersData);
//     const [totalPages, setTotalPages] = useState(Math.ceil(initialMembersData.length / membersPerPage));
//     const [openMenu, setOpenMenu] = useState(null); // Track which action menu is open
//     const [filters, setFilters] = useState({ state: "", district: "", university: "", college: "" });
//     const menuRefs = useRef([]);
//     const navigate = useNavigate();

//     const indexOfLastMember = currentPage * membersPerPage;
//     const indexOfFirstMember = indexOfLastMember - membersPerPage;
//     const currentMembers = filteredMembers.slice(indexOfFirstMember, indexOfLastMember);

//     useEffect(() => {
//         setTotalPages(Math.ceil(filteredMembers.length / membersPerPage));
//     }, [filteredMembers]);

//     // Handle click outside of menu to close it
//     useEffect(() => {
//         const handleClickOutside = (event) => {
//             if (openMenu !== null && menuRefs.current[openMenu] && !menuRefs.current[openMenu].contains(event.target)) {
//                 setOpenMenu(null);
//             }
//         };

//         document.addEventListener("mousedown", handleClickOutside);
//         return () => {
//             document.removeEventListener("mousedown", handleClickOutside);
//         };
//     }, [openMenu]);

//     const handlePageChange = (newPage) => {
//         setCurrentPage(newPage);
//     };

//     const deleteMember = (id) => {
//         const updatedMembers = membersData.filter((member) => member.id !== id);
//         setMembersData(updatedMembers);
//         setFilteredMembers(updatedMembers);
//     };

//     const toggleMenu = (id) => {
//         setOpenMenu(openMenu === id ? null : id);
//     };

//     // Update filters and apply them
//     const handleFilterChange = (e) => {
//         const { name, value } = e.target;
//         setFilters((prev) => ({ ...prev, [name]: value }));
//     };

//     useEffect(() => {
//         // Apply filters to membersData
//         const filtered = membersData.filter((member) => {
//             return (
//                 (filters.state === "" || (member.state && member.state.toLowerCase().includes(filters.state.toLowerCase()))) &&
//                 (filters.district === "" || (member.district && member.district.toLowerCase().includes(filters.district.toLowerCase()))) &&
//                 (filters.university === "" || (member.university && member.university.toLowerCase().includes(filters.university.toLowerCase()))) &&
//                 (filters.college === "" || (member.college && member.college.toLowerCase().includes(filters.college.toLowerCase())))
//             );
//         });

//         setFilteredMembers(filtered);
//         setCurrentPage(1); // Reset to first page after filtering
//     }, [filters, membersData]);

//     const dataWithActions = currentMembers.map((member) => ({
//         ...member,
//         Actions: (
//             <div className={styles.actionContainer}>
//                 <button className={styles.dotsButton} onClick={() => toggleMenu(member.id)}>
//                     &#x22EE;
//                 </button>
//                 {openMenu === member.id && (
//                     <div ref={(el) => (menuRefs.current[member.id] = el)} className={styles.actionMenu}>
//                         <Button title="Delete" trigger={() => deleteMember(member.id)} />
//                         <Button title="Update" trigger={() => console.log(`Update member ${member.id}`)} />
//                     </div>
//                 )}
//             </div>
//         ),
//     }));

//     const columns = [
//         "id",
//         "name",
//         "email",
//         "phone",
//         "memberType",
//         "state",
//         "district",
//         "university",
//         // "Actions",
//     ];

//     return (
//         <div className={styles.container}>
//             <div className={styles.filters}>
//                 <Button title="Invite New Member" trigger={() => navigate("/invite")} />

//                 <input type="text" name="state" placeholder="Filter by State" value={filters.state} onChange={handleFilterChange} className={styles.filterInput} />
//                 <input type="text" name="district" placeholder="Filter by District" value={filters.district} onChange={handleFilterChange} className={styles.filterInput} />
//                 <input type="text" name="university" placeholder="Filter by University" value={filters.university} onChange={handleFilterChange} className={styles.filterInput} />
//                 <input type="text" name="college" placeholder="Filter by College" value={filters.college} onChange={handleFilterChange} className={styles.filterInput} />
//             </div>
//             <Table columns={columns} data={dataWithActions} />
//             <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
//         </div>
//     );
// };

// export default MembersPage;

import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Table from "../../../components/table/Table";
import Pagination from "../../../components/Pagination/Pagination";
import Button from "../../../components/button/Button";
import { useMemberList, useUserProfile } from "../../../hooks/useUserList"; // Ensure this hook fetches member list
import styles from "./MembersPage.module.css"; // Import your styles
import { toast } from "react-toastify";
import axios from "axios";

const MembersPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [membersPerPage] = useState(10);
  const [membersData, setMembersData] = useState([]);
  const [filteredMembers, setFilteredMembers] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [openMenu, setOpenMenu] = useState(null); // Track which action menu is open
  const [filters, setFilters] = useState({
    state: "",
    district: "",
    institution: "",
    nameOrUsername: "",
  });
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null); // Ref for hidden file input
  const menuRefs = useRef([]);
  const navigate = useNavigate();

  // Fetch members data from the custom hook
  const { members: apiMembers, isLoading, error } = useMemberList();
  const { currentUser } = useUserProfile();
  const role = currentUser?.role;

  useEffect(() => {
    if (Array.isArray(apiMembers)) {
      setMembersData(apiMembers);
      setFilteredMembers(apiMembers); // No need for `|| []` if you've already checked it's an array
    } else {
      console.warn("apiMembers is not an array:", apiMembers);
    }
  }, [apiMembers]);

  const indexOfLastMember = currentPage * membersPerPage;
  const indexOfFirstMember = indexOfLastMember - membersPerPage;
  const currentMembers = Array.isArray(filteredMembers)
    ? filteredMembers.slice(indexOfFirstMember, indexOfLastMember)
    : [];
  console.log("jsgdggsdfog", apiMembers);

  useEffect(() => {
    setTotalPages(Math.ceil(filteredMembers?.length / membersPerPage)); // Update total pages when filtered members change
  }, [filteredMembers]);

  // Handle click outside of menu to close it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        openMenu !== null &&
        menuRefs.current[openMenu] &&
        !menuRefs.current[openMenu].contains(event.target)
      ) {
        setOpenMenu(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openMenu]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  // const deleteMember = (id) => {
  //   const updatedMembers = membersData.filter((member) => member.id !== id);
  //   setMembersData(updatedMembers);
  //   setFilteredMembers(updatedMembers);
  // };
  const handleExcelUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // Check if the file is a valid Excel file
    const validTypes = [
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", // .xlsx
      "application/vnd.ms-excel", // .xls
    ];

    const fileExtension = file.name.split(".").pop().toLowerCase();
    const validExtensions = ["xlsx", "xls"];

    if (
      !validTypes.includes(file.type) ||
      !validExtensions.includes(fileExtension)
    ) {
      toast.error("Please upload a valid Excel (.xlsx or .xls) file.");
      event.target.value = ""; // Clear the file input
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      setUploading(true);
      const token = localStorage.getItem("authToken"); // Use token from localStorage

      // Axios post request to upload the file
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_API_BASE_URL}squad/upload-csv/`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Send the Bearer token for authorization
            "Content-Type": "multipart/form-data", // Ensure this is set for file uploads (Axios will set this automatically)
          },
        }
      );

      if (response?.data?.success) {
        toast.success("File uploaded successfully!");
        // Optionally: refresh the member list or handle the response
      } else {
        throw new Error(response?.data?.error || "Upload failed");
      }
    } catch (err) {
      if (
        err.response?.status === 400 &&
        err.response?.data?.error === "Invalid JWT token"
      ) {
        toast.error("Session expired. Please login again.");
        navigate("/login");
      } else if (err.response?.data?.error === "File is not a zip file") {
        toast.error(
          "The file is not a valid Excel file. Please upload a valid .xlsx or .xls file."
        );
      } else {
        console.error("Upload error:", err);
        toast.error("Upload failed. Please try again.");
        toast.error(err?.response?.data?.error || "Unknown error occurred");
      }
    } finally {
      setUploading(false); // Stop loading state when done
    }
  };
  const deleteMember = async (mobileNumber) => {
    try {
      const token = localStorage.getItem("authToken");

      const response = await axios.delete(
        `${process.env.REACT_APP_BACKEND_API_BASE_URL}squad/delete-by-mobile-number/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            mobile_number: mobileNumber, // Axios handles query params like this
          },
        }
      );

      // ✅ Update state if deletion successful
      const updatedMembers = membersData.filter(
        (member) => member.mobile_number !== mobileNumber
      );
      setMembersData(updatedMembers);
      setFilteredMembers(updatedMembers);
      // alert("Member deleted successfully!");
      console.log(response);
    } catch (err) {
      const errorResponse = err.response?.data;

      if (
        err.response?.status === 400 &&
        errorResponse?.error === "Invalid JWT token"
      ) {
        toast.error("Session expired. Please login again.");
        navigate("/login");
        return;
      }

      console.error("Error deleting member:", err);
      toast.error("Failed to delete member. Please try again.");
    }
  };

  const toggleMenu = (id) => {
    setOpenMenu(openMenu === id ? null : id);
  };

  // Update filters and apply them
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    const filtered = membersData.filter((member) => {
      const matchesState =
        filters.state === "" ||
        (member.state &&
          member.state.toLowerCase().includes(filters.state.toLowerCase()));

      const matchesDistrict =
        filters.district === "" ||
        (member.district &&
          member.district
            .toLowerCase()
            .includes(filters.district.toLowerCase()));

      const matchesInstitution =
        filters.institution === "" ||
        [member.college, member.university, member.institute]
          .filter(Boolean)
          .some((val) =>
            val.toLowerCase().includes(filters.institution.toLowerCase())
          );

      const matchesNameOrUsername =
        filters.nameOrUsername === "" ||
        (member.name &&
          member.name
            .toLowerCase()
            .includes(filters.nameOrUsername.toLowerCase())) ||
        (member.username &&
          member.username
            .toLowerCase()
            .includes(filters.nameOrUsername.toLowerCase()));

      return (
        matchesState &&
        matchesDistrict &&
        matchesInstitution &&
        matchesNameOrUsername
      );
    });

    setFilteredMembers(filtered);
    setCurrentPage(1);
  }, [filters, membersData]);

  const dataWithActions = currentMembers.map((member, index) => ({
    Id: index + 1, // S.No
    Name: member.name, // member Name
    UserName: member.username, // member userName
    District: member.district, // District
    District: member.district, // District
    Email: member.email, // Email
    Phone: member.mobile_number, // Mobile Number
    Role: member.role, // Mobile Number
    College: member.college, // Address
    ...(role === "ugc_member" && {
      Action: (
        <button
          onClick={() => deleteMember(member.mobile_number)}
          style={{
            backgroundColor: "#ff4d4f",
            color: "#fff",
            border: "none",
            padding: "6px 12px",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Delete
        </button>
      ),
    }),
  }));

  const columns =
    role === "ugc_member"
      ? ["Id", "Name", "UserName", "Email", "Phone", "Action"]
      : ["Id", "Name", "UserName", "Email", "Phone"];

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading members data</div>;

  console.log("err", error);

  return (
    <div className={styles.container}>
      <div className={styles.filters}>
        {role === "ugc_member" ? (
          <div style={{ display: "flex", gap: "0.6rem" }}>
            <Button
              title="Add New Member"
              trigger={() => navigate("/add-member")}
            />
            <Button
              title={uploading ? "Uploading..." : "Add Member by Excel"}
              trigger={() => fileInputRef.current.click()} // Trigger file input when the button is clicked
              disabled={uploading}
            />
            <input
              type="file"
              accept=".xlsx, .xls"
              style={{ display: "none" }}
              ref={fileInputRef}
              onChange={handleExcelUpload} // Trigger the handleExcelUpload function when the file is selected
            />
          </div>
        ) : (
          <Button
            title="Invite New Member"
            trigger={() => navigate("/invite")}
          />
        )}

        <input
          type="text"
          name="state"
          placeholder="Filter by State"
          value={filters.state}
          onChange={handleFilterChange}
          className={styles.filterInput}
        />
        <input
          type="text"
          name="district"
          placeholder="Filter by District"
          value={filters.district}
          onChange={handleFilterChange}
          className={styles.filterInput}
        />
        <input
          type="text"
          name="institution"
          placeholder="Filter by College/University/Institute"
          value={filters.institution}
          onChange={handleFilterChange}
          className={styles.filterInput}
        />
        <input
          type="text"
          name="nameOrUsername"
          placeholder="Search by Name or Username"
          value={filters.nameOrUsername}
          onChange={handleFilterChange}
          className={styles.filterInput}
        />
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

export default MembersPage;
