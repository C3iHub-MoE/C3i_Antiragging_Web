import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for routing
import studentsData from '../jsonfile/students.json'; // Import the students JSON data
import styles from './StudentsData.module.css'; // Import CSS module
import Table from '../../components/table/Table'; // Import your Table component
import Pagination from '../../components/Pagination/Pagination';
import Button from '../../components/button/Button'; // Import your Button component

const CommitteeMemberPage = () => {
    const [students, setStudents] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [studentsPerPage] = useState(5); // Display 5 students per page

    const navigate = useNavigate(); // Initialize useNavigate for routing

    useEffect(() => {
        // Load student data (simulating API call)
        setStudents(studentsData);
    }, []);

    const handleApprove = (id) => {
        const updatedStudents = students.map((student) =>
            student.id === id ? { ...student, status: 'Approved' } : student
        );
        setStudents(updatedStudents);
        console.log(`Student with ID ${id} approved`);
    };

    const handleDeactivate = (id) => {
        const updatedStudents = students.map((student) =>
            student.id === id ? { ...student, status: 'Deactivated' } : student
        );
        setStudents(updatedStudents);
        console.log(`Student with ID ${id} deactivated`);
    };

    // Move handleEdit here, before dataWithActions
    const handleEdit = (id) => {
        console.log(`Editing student with ID ${id}`);
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
            <ActionMenu
                student={student}
                handleApprove={handleApprove}
                handleDeactivate={handleDeactivate}
                handleEdit={handleEdit} // Now it's defined before being passed here
            />
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
            <div className={styles.buttonContainer}>
                <Button label="View Pending Students"
                
                type="secondary"
                backgroundColor="#007bff"  // Custom blue background
                textColor="#fff" 
                onClick={() => navigate('/pending-students')} />
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

const ActionMenu = ({ student, handleApprove, handleDeactivate, handleEdit }) => {
    const [menuOpen, setMenuOpen] = useState(false);
    const menuRef = useRef(null);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

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
                        onClick={() => {
                            handleEdit(student.id);
                            toggleMenu(); // Close menu after action
                        }}
                    >
                        Edit
                    </button>
                    <button
                        className={styles.menuButton}
                        onClick={() => {
                            handleDeactivate(student.id);
                            toggleMenu(); // Close menu after action
                        }}
                    >
                        Deactivate
                    </button>
                    <button
                        className={styles.menuButton}
                        onClick={() => {
                            handleApprove(student.id);
                            toggleMenu(); // Close menu after action
                        }}
                    >
                        Approve
                    </button>
                </div>
            )}
        </div>
    );
};

export default CommitteeMemberPage;
