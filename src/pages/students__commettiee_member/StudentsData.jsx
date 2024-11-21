import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import studentsData from '../jsonfile/students.json';
import styles from './StudentsData.module.css';
import Table from '../../components/table/Table';
import Pagination from '../../components/Pagination/Pagination';
import Button from '../../components/button/Button';
import Swal from 'sweetalert2';

const StudentsPage = () => {
    const [students, setStudents] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [studentsPerPage] = useState(5);

    const navigate = useNavigate();

    useEffect(() => {
        setStudents(studentsData);
    }, []);

    const handleApprove = async (id) => {
        await Swal.fire({
            title: 'Approved!',
            text: `Student with ID ${id} has been approved.`,
            icon: 'success',
        });

        const updatedStudents = students.map((student) =>
            student.id === id ? { ...student, status: 'Approved' } : student
        );
        setStudents(updatedStudents);
    };

    const handleDeactivate = async (id) => {
        await Swal.fire({
            title: 'Deactivated!',
            text: `Student with ID ${id} has been deactivated.`,
            icon: 'warning',
        });

        const updatedStudents = students.map((student) =>
            student.id === id ? { ...student, status: 'Deactivated' } : student
        );
        setStudents(updatedStudents);
    };

    const handleEdit = async (id) => {
        const studentToEdit = students.find((student) => student.id === id);

        // Open a modal or prompt to edit multiple fields
        const { value: formValues } = await Swal.fire({
            title: 'Edit Student',
            html:
                `<input id="name" class="swal2-input" placeholder="Name" value="${studentToEdit.name}">` +
                `<input id="college" class="swal2-input" placeholder="College" value="${studentToEdit.college}">` +
                `<input id="district" class="swal2-input" placeholder="District" value="${studentToEdit.district}">` +
                `<input id="state" class="swal2-input" placeholder="State" value="${studentToEdit.state}">` +
                `<input id="status" class="swal2-input" placeholder="Status" value="${studentToEdit.status}">`,
            focusConfirm: false,
            preConfirm: () => {
                return {
                    name: document.getElementById('name').value,
                    college: document.getElementById('college').value,
                    district: document.getElementById('district').value,
                    state: document.getElementById('state').value,
                    status: document.getElementById('status').value,
                };
            },
        });

        if (formValues) {
            const updatedStudents = students.map((student) =>
                student.id === id ? { ...student, ...formValues } : student
            );
            setStudents(updatedStudents);
            Swal.fire('Updated!', `Student with ID ${id} has been updated.`, 'success');
        }
    };

    const handleDelete = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, cancel!',
        }).then((result) => {
            if (result.isConfirmed) {
                const updatedStudents = students.filter((student) => student.id !== id);
                setStudents(updatedStudents);
                Swal.fire('Deleted!', `Student with ID ${id} has been deleted.`, 'success');
            }
        });
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
                handleDeactivate={handleDeactivate}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
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
            <h2 className={styles.title}>All Registered student</h2>

            <Table columns={columns} data={dataWithActions} />
            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
            />
        </div>
    );
};

const ActionMenu = ({ student, handleDeactivate, handleEdit, handleDelete }) => {
    const [menuOpen, setMenuOpen] = useState(false);
    const menuRef = useRef(null);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const handleClickOutside = (event) => {
        if (menuRef.current && !menuRef.current.contains(event.target)) {
            setMenuOpen(false);
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
            <div className={styles.threeDots} onClick={toggleMenu}>
                &#x22EE; {/* Three dots character */}
            </div>

            {menuOpen && (
                <div className={styles.menu}>
                    <button
                        className={styles.menuButton}
                        onClick={() => {
                            handleEdit(student.id);
                            toggleMenu();
                        }}
                    >
                        Edit
                    </button>
                    <button
                        className={styles.menuButton}
                        onClick={() => {
                            handleDeactivate(student.id);
                            toggleMenu();
                        }}
                    >
                        Deactivate
                    </button>
                    <button
                        className={styles.menuButton}
                        onClick={() => {
                            handleDelete(student.id);
                            toggleMenu();
                        }}
                    >
                        Delete
                    </button>
                </div>
            )}
        </div>
    );
};

export default StudentsPage;
