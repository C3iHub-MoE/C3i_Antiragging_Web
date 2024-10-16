import React, { useState, useEffect } from 'react';
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
    const navigate = useNavigate();
    const indexOfLastMember = currentPage * membersPerPage;
    const indexOfFirstMember = indexOfLastMember - membersPerPage;

    const currentMembers = membersData.slice(indexOfFirstMember, indexOfLastMember);

    useEffect(() => {
        setTotalPages(Math.ceil(membersData.length / membersPerPage));
    }, [membersData]);

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    const deleteMember = (id) => {
        const updatedMembers = membersData.filter(member => member.id !== id);
        setMembersData(updatedMembers);
    };

    const dataWithActions = currentMembers.map(member => ({
        ...member,
        Actions: (
            <div>
                <Button label="Delete" type="primary" backgroundColor="#28a745" textColor="#ffffff"
                    borderColor="#28a745" onClick={() => deleteMember(member.id)} />
                <Button label="Update"
                    type="secondary"
                    backgroundColor="#007bff"
                    textColor="#fff" onClick={() => console.log(`Update member ${member.id}`)} />
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
            <h1 className={styles.title}>Members List</h1>
            <Button label="Create New Member" type="primary" onClick={() => navigate("/member-form")} />

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
