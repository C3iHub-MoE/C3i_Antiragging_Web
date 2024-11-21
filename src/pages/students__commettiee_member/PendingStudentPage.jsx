import React, { useState, useEffect } from 'react';
import studentsData from '../jsonfile/students.json'; // Import the students JSON data
import styles from './PendingStudentsPage.module.css'; // Import CSS module
import Table from '../../components/table/Table'; // Import your Table component
import Pagination from '../../components/Pagination/Pagination';
import Button from '../../components/button/Button'; // Import your Button component
import Swal from 'sweetalert2'; // Import SweetAlert2

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

    const handleApprove = async (id) => {
        // Show confirmation dialog
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: "You are about to approve this student!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, approve it!',
            cancelButtonText: 'No, cancel!',
        });

        if (result.isConfirmed) {
            // Call your API to approve the student here
            // Example: await api.approveStudent(id);

            // Simulating API approval success
            const updatedStudents = students.map((student) =>
                student.id === id ? { ...student, status: 'Approved' } : student
            );
            setStudents(updatedStudents);

            Swal.fire(
                'Approved!',
                `Student with ID ${id} has been approved.`,
                'success'
            );
        }
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
            <Button 
                title="Approve" 
                type="secondary"
               
                onClick={() => handleApprove(student.id)} 
            />
        ),
    }));

    const columns = [
        'id',
        'name',
        'college',
        'university',
        'district',
        'state',
        'status',
        'Action',
    ];

    return (
        <div className={styles.container}>
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
