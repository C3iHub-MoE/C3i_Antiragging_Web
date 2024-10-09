import React, { useState, useEffect } from 'react';
import studentsData from '../jsonfile/students.json'; // Import the students JSON data
import styles from './CommitteeMemberPage.module.css'; // Import CSS module
import Table from '../../components/table/Table'; // Import your Table component
import Pagination from '../../components/Pagination/Pagination';

const CommitteeMemberPage = () => {
    const [students, setStudents] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [studentsPerPage] = useState(5); // Display 10 students per page

    useEffect(() => {
        // Load student data (simulating API call)
        setStudents(studentsData);
        console.log(studentsData); // Check if data is loaded correctly
    }, []);

    const handleApprove = (id) => {
        const updatedStudents = students.map((student) =>
            student.id === id ? { ...student, status: 'Approved' } : student
        );
        setStudents(updatedStudents);
        console.log(`Student with ID ${id} approved`);
    };

    const indexOfLastStudent = currentPage * studentsPerPage;
    const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
    const currentStudents = students.slice(indexOfFirstStudent, indexOfLastStudent);

    const totalPages = Math.ceil(students.length / studentsPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    // Prepare data with actions for the table
    const dataWithActions = currentStudents.map((student) => ({
        ...student,
        Action: student.status === 'Pending' ? (
            <button
                className={styles.approveButton}
                onClick={() => handleApprove(student.id)}
            >
                Approve
            </button>
        ) : (
            <span>Approved</span>
        ),
    }));

    const columns = [
        'id',
        'name',
        'college',
        'district',
        'state',
        'status',
        'Action',
    ];

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Committee Member Dashboard</h2>
            <Table columns={columns} data={dataWithActions} />
            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
            />
        </div>
    );
};

export default CommitteeMemberPage;
