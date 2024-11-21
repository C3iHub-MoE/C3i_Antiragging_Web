import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Table from '../../../components/table/Table';
import Pagination from '../../../components/Pagination/Pagination';
import Button from '../../../components/button/Button';
import initialMembersData from '../../jsonfile/members.json'; // Import your member data
import styles from './MembersPage.module.css'; // Import your styles

const MembersPage = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [membersPerPage] = useState(5);
    const [membersData, setMembersData] = useState(initialMembersData);
    const [totalPages, setTotalPages] = useState(Math.ceil(initialMembersData.length / membersPerPage));
    const [openMenu, setOpenMenu] = useState(null); // Track which action menu is open
    const menuRefs = useRef([]); // Reference to detect clicks outside the menus
    const navigate = useNavigate();

    const indexOfLastMember = currentPage * membersPerPage;
    const indexOfFirstMember = indexOfLastMember - membersPerPage;
    const currentMembers = membersData.slice(indexOfFirstMember, indexOfLastMember);

    useEffect(() => {
        setTotalPages(Math.ceil(membersData.length / membersPerPage));
    }, [membersData]);

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
    };

    // Toggle the action menu for a specific member
    const toggleMenu = (id) => {
        setOpenMenu(openMenu === id ? null : id);
    };

    const dataWithActions = currentMembers.map((member, index) => ({
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
        "Actions",
    ];

    return (
        <div className={styles.container}>
            <Button title="Invite New Member" trigger={() => navigate("/invite")} />

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
