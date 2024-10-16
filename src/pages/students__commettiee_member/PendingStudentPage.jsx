import React, { useState, useEffect } from 'react';
import studentsData from '../jsonfile/students.json'; // Import the students JSON data
import styles from './PendingStudentsPage.module.css'; // Import CSS module
import Table from '../../components/table/Table'; // Import your Table component
import Pagination from '../../components/Pagination/Pagination';
import Button from '../../components/button/Button'; // Import your Button component

const PendingStudentsPage = () => {
    const [students, setStudents] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [studentsPerPage] = useState(5); // Display 5 students per page

    useEffect(() => {
        // Load student data (simulating API call)
        const pendingStudents = studentsData.filter(student => student.status === 'Pending');
        setStudents(pendingStudents);
        console.log(pendingStudents); // Check if data is loaded correctly
    }, []);

    const handleApprove = (id) => {
        // Logic to approve the student
        console.log(`Student with ID ${id} approved`);
    };

    const indexOfLastStudent = currentPage * studentsPerPage;
    const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
    const currentStudents = students.slice(indexOfFirstStudent, indexOfLastStudent);

    const totalPages = Math.ceil(students.length / studentsPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const dataWithActions = currentStudents.map((student) => ({
        ...student,
        Action: (
            <Button label="Approve" 
            type="secondary"
            backgroundColor="#007bff"
            textColor="#fff"
            onClick={() => handleApprove(student.id)} />
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
            <h2 className={styles.title}>Pending Students</h2>
            <Table columns={columns} data={dataWithActions} />
            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
            />
        </div>
    );
};

export default PendingStudentsPage;
