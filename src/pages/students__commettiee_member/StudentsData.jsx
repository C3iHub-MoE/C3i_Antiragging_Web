import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import studentsData from "../jsonfile/students.json";
import styles from "./StudentsData.module.css";
import Table from "../../components/table/Table";
import Pagination from "../../components/Pagination/Pagination";
import Swal from "sweetalert2";
import ActionMenu from "../complaintPageAdmin/ActionMenu";

const StudentsPage = () => {
    const [students, setStudents] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [studentsPerPage] = useState(10);

    const [stateFilter, setStateFilter] = useState("");
    const [districtFilter, setDistrictFilter] = useState("");
    const [collegeFilter, setCollegeFilter] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        setStudents(studentsData);
    }, []);

    // Filtering logic
    const filteredStudents = students.filter((student) => {
        return (
            (!stateFilter || student.State.toLowerCase().includes(stateFilter.toLowerCase())) &&
            (!districtFilter || student.District.toLowerCase().includes(districtFilter.toLowerCase())) &&
            (!collegeFilter || student.College.toLowerCase().includes(collegeFilter.toLowerCase()))
        );
    });

    const indexOfLastStudent = currentPage * studentsPerPage;
    const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
    const currentStudents = filteredStudents.slice(indexOfFirstStudent, indexOfLastStudent);
    {
        console.log("currentStudents,", currentStudents);
    }
    const totalPages = Math.ceil(filteredStudents.length / studentsPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleApprove = async (id) => {
        await Swal.fire({
            title: "Approved!",
            text: `Student with ID ${id} has been approved.`,
            icon: "success",
        });

        const updatedStudents = students.map((student) => (student.id === id ? { ...student, status: "Approved" } : student));
        setStudents(updatedStudents);
    };

    const handleDeactivate = async (id) => {
        await Swal.fire({
            title: "Deactivated!",
            text: `Student with ID ${id} has been deactivated.`,
            icon: "warning",
        });

        const updatedStudents = students.map((student) => (student.id === id ? { ...student, status: "Deactivated" } : student));
        setStudents(updatedStudents);
    };

    const handleEdit = async (id) => {
        const studentToEdit = students.find((student) => student.id === id);

        const { value: formValues } = await Swal.fire({
            title: "Edit Student",
            html:
                `<input id="name" class="swal2-input" placeholder="Name" value="${studentToEdit.name}">` +
                `<input id="college" class="swal2-input" placeholder="College" value="${studentToEdit.college}">` +
                `<input id="district" class="swal2-input" placeholder="District" value="${studentToEdit.district}">` +
                `<input id="state" class="swal2-input" placeholder="State" value="${studentToEdit.state}">` +
                `<input id="status" class="swal2-input" placeholder="Status" value="${studentToEdit.status}">`,
            focusConfirm: false,
            preConfirm: () => {
                return {
                    name: document.getElementById("name").value,
                    college: document.getElementById("college").value,
                    district: document.getElementById("district").value,
                    state: document.getElementById("state").value,
                    status: document.getElementById("status").value,
                };
            },
        });

        if (formValues) {
            const updatedStudents = students.map((student) => (student.id === id ? { ...student, ...formValues } : student));
            setStudents(updatedStudents);
            Swal.fire("Updated!", `Student with ID ${id} has been updated.`, "success");
        }
    };

    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "No, cancel!",
        }).then((result) => {
            if (result.isConfirmed) {
                const updatedStudents = students.filter((student) => student.id !== id);
                setStudents(updatedStudents);
                Swal.fire("Deleted!", `Student with ID ${id} has been deleted.`, "success");
            }
        });
    };

    const columns = ["S.No", "Student Name", "State", "District", "University", "College", "Actions"];

    const dataWithActions = currentStudents.map((student, index) => [
        student.University,
        student.State,
        student.District,
        student.University,
        student.College,
        <ActionMenu key={student.id} student={student} handleEdit={handleEdit} handleDeactivate={handleDeactivate} handleDelete={handleDelete} />,
    ]);

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>All Registered Students</h2>

            <div className={styles.filters}>
                <input type="text" placeholder="Filter by State" value={stateFilter} onChange={(e) => setStateFilter(e.target.value)} className={styles.filterInput} />
                <input type="text" placeholder="Filter by District" value={districtFilter} onChange={(e) => setDistrictFilter(e.target.value)} className={styles.filterInput} />
                <input type="text" placeholder="Filter by College" value={collegeFilter} onChange={(e) => setCollegeFilter(e.target.value)} className={styles.filterInput} />
            </div>

            <Table columns={columns} data={dataWithActions} />
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
        </div>
    );
};

export default StudentsPage;
