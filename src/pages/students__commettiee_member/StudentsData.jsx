import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useStudentList } from "../../hooks/useUserList";
import styles from "./StudentsData.module.css";
import Table from "../../components/table/Table";
import Pagination from "../../components/Pagination/Pagination";
import Swal from "sweetalert2";
import ActionMenu from "../complaintPageAdmin/ActionMenu";

const StudentsPage = () => {
    const { students: apiStudents, loading, error } = useStudentList();
    const [students, setStudents] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [studentsPerPage] = useState(10);

    const [stateFilter, setStateFilter] = useState("");
    const [districtFilter, setDistrictFilter] = useState("");
    const [collegeFilter, setCollegeFilter] = useState("");

    const navigate = useNavigate();

    // Update students state when API data is fetched
    useEffect(() => {
        if (apiStudents) {
            setStudents(apiStudents);
        }
    }, [apiStudents]);

    // Filtering logic
    const filteredStudents = students.filter((student) => {
        return (
            (!stateFilter || student.state.toLowerCase().includes(stateFilter.toLowerCase())) &&
            (!districtFilter || student.district.toLowerCase().includes(districtFilter.toLowerCase())) &&
            (!collegeFilter || student.college.toLowerCase().includes(collegeFilter.toLowerCase()))
        );
    });

    const indexOfLastStudent = currentPage * studentsPerPage;
    const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
    const currentStudents = filteredStudents.slice(indexOfFirstStudent, indexOfLastStudent);

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

    const columns = ["Id", "Name", "District", "Email", "Mobile", "Address"];

    const dataWithActions = currentStudents.map((student, index) => ({
        Id: student.id, // S.No
        Name: student.name, // Student Name
        District: student.district, // District
        Email: student.email, // Email
        Mobile: student.mobile_number, // Mobile Number
        Address: student.address, // Address
        // <ActionMenu key={student.id} student={student} handleDelete={handleDelete} />, // Removed edit and approve actions
    }));

    if (loading) return <p>Loading students...</p>;
    if (error) return <p>{error}</p>;

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
