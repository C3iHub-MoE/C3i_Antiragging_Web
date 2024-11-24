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


import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Table from '../../../components/table/Table';
import Pagination from '../../../components/Pagination/Pagination';
import Button from '../../../components/button/Button';
import initialMembersData from '../../jsonfile/members.json'; // Import your member data
import styles from './MembersPage.module.css'; // Import your styles

const MembersPage = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [membersPerPage] = useState(10);
    const [membersData, setMembersData] = useState(initialMembersData);
    const [filteredMembers, setFilteredMembers] = useState(initialMembersData);
    const [totalPages, setTotalPages] = useState(Math.ceil(initialMembersData.length / membersPerPage));
    const [openMenu, setOpenMenu] = useState(null); // Track which action menu is open
    const [filters, setFilters] = useState({ state: "", district: "", university: "", college: "" });
    const menuRefs = useRef([]);
    const navigate = useNavigate();

    const indexOfLastMember = currentPage * membersPerPage;
    const indexOfFirstMember = indexOfLastMember - membersPerPage;
    const currentMembers = filteredMembers.slice(indexOfFirstMember, indexOfLastMember);

    useEffect(() => {
        setTotalPages(Math.ceil(filteredMembers.length / membersPerPage));
    }, [filteredMembers]);

    // Handle click outside of menu to close it
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (openMenu !== null && menuRefs.current[openMenu] && !menuRefs.current[openMenu].contains(event.target)) {
                setOpenMenu(null);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [openMenu]);

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    const deleteMember = (id) => {
        const updatedMembers = membersData.filter(member => member.id !== id);
        setMembersData(updatedMembers);
        setFilteredMembers(updatedMembers);
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
        // Apply filters to membersData
        const filtered = membersData.filter((member) => {
            return (
                (filters.state === "" || (member.state && member.state.toLowerCase().includes(filters.state.toLowerCase()))) &&
                (filters.district === "" || (member.district && member.district.toLowerCase().includes(filters.district.toLowerCase()))) &&
                (filters.university === "" || (member.university && member.university.toLowerCase().includes(filters.university.toLowerCase()))) &&
                (filters.college === "" || (member.college && member.college.toLowerCase().includes(filters.college.toLowerCase())))
            );
        });

        setFilteredMembers(filtered);
        setCurrentPage(1); // Reset to first page after filtering
    }, [filters, membersData]);

    const dataWithActions = currentMembers.map((member) => ({
        ...member,
        Actions: (
            <div className={styles.actionContainer}>
                <button className={styles.dotsButton} onClick={() => toggleMenu(member.id)}>
                    &#x22EE;
                </button>
                {openMenu === member.id && (
                    <div
                        ref={(el) => (menuRefs.current[member.id] = el)}
                        className={styles.actionMenu}
                    >
                        <Button title="Delete" trigger={() => deleteMember(member.id)} />
                        <Button title="Update" trigger={() => console.log(`Update member ${member.id}`)} />
                    </div>
                )}
            </div>
        ),
    }));

    const columns = [
        "id",
        "name",
        "email",
        "phone",
        "memberType",
        "state",
        "district",
        "university",
        "Actions",
    ];

    return (
        <div className={styles.container}>
            <div className={styles.filters}>
                <Button title="Invite New Member" trigger={() => navigate("/invite")} />

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
                    name="university"
                    placeholder="Filter by University"
                    value={filters.university}
                    onChange={handleFilterChange}
                    className={styles.filterInput}
                />
                <input
                    type="text"
                    name="college"
                    placeholder="Filter by College"
                    value={filters.college}
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
