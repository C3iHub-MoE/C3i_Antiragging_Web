// import React, { useState, useEffect } from "react";
// import { NavLink } from "react-router-dom";
// import Table from "../../components/table/Table"; // Import your Table component
// import Pagination from "../../components/Pagination/Pagination";
// import "./sospage.css";

// const SOSPage = () => {
//     const [sosData, setSosData] = useState([]);
//     const [filteredData, setFilteredData] = useState([]);
//     const [currentPage, setCurrentPage] = useState(1);
//     const [sosPerPage] = useState(10);
//     const [filters, setFilters] = useState({
//         state: "",
//         district: "",
//         college: "",
//     });

//     const columns = ["Student Id", "Student Name", "Location Name", "State", "District", "Location"];

//     const indexOfLastSos = currentPage * sosPerPage;
//     const indexOfFirstSos = indexOfLastSos - sosPerPage;
//     const currentSos = filteredData.slice(indexOfFirstSos, indexOfLastSos);

//     // Fetch SOS alerts data from API
//     useEffect(() => {
//         const fetchSosAlerts = async () => {
//             try {
//                 const response = await fetch(`http://172.29.24.136:8000/api/live-sos-alerts/?squad_member_id=13`); // Replace with your API endpoint
//                 const alert = await response.json();
//                 const alerts = alert?.data?.live_sos_alerts;

//                 const transformedData = alerts.map((alert) => ({
//                     studentId: alert.student_id,
//                     studentName: alert.student_name,
//                     Location_Name: alert.location_name || "N/A",
//                     state: alert.state_name || "N/A",
//                     district: alert.district_name || "N/A",
//                     location: `${alert.location_latitude}, ${alert.location_longitude}`,
//                 }));
//                 setSosData(transformedData);
//                 setFilteredData(transformedData);
//             } catch (error) {
//                 console.error("Error fetching SOS alerts:", error);
//             }
//         };

//         fetchSosAlerts();
//     }, []);

//     // Update filtered data whenever filters change
//     useEffect(() => {
//         let updatedData = sosData;

//         if (filters.state) {
//             updatedData = updatedData.filter((item) => item.state === filters.state);
//         }
//         if (filters.district) {
//             updatedData = updatedData.filter((item) => item.district === filters.district);
//         }
//         if (filters.college) {
//             updatedData = updatedData.filter((item) => item.college === filters.college);
//         }

//         setFilteredData(updatedData);
//         setCurrentPage(1); // Reset to first page
//     }, [filters, sosData]);

//     // Map the data for the table
//     const formattedData = currentSos.map((sos) => ({
//         "Student Id": sos.studentId,
//         "Student Name": <NavLink to={`/student/${sos.studentId}`}>{sos.studentName}</NavLink>,
//         Location_Name: sos.location_name,
//         State: sos.state,
//         District: sos.district,
//         Location: sos.location,
//     }));

//     const paginate = (pageNumber) => setCurrentPage(pageNumber);

//     // Handle filter changes
//     const handleFilterChange = (e) => {
//         const { name, value } = e.target;
//         setFilters((prevFilters) => ({
//             ...prevFilters,
//             [name]: value,
//         }));
//     };

//     // Get unique values for dropdowns
//     const uniqueStates = [...new Set(sosData.map((item) => item.state))];
//     const uniqueDistricts = [...new Set(sosData.filter((item) => item.state === filters.state || !filters.state).map((item) => item.district))];
//     const uniqueColleges = [...new Set(sosData.filter((item) => item.district === filters.district || !filters.district).map((item) => item.college))];

//     return (
//         <div>
//             <h1>SOS Alerts</h1>

//             {/* Filters Section */}
//             <div className="filters">
//                 <select name="state" className="filterInput" value={filters.state} onChange={handleFilterChange}>
//                     <option value="">Select State</option>
//                     {uniqueStates.map((state) => (
//                         <option key={state} value={state}>
//                             {state}
//                         </option>
//                     ))}
//                 </select>

//                 <select name="district" className="filterInput" value={filters.district} onChange={handleFilterChange} disabled={!filters.state}>
//                     <option value="">Select District</option>
//                     {uniqueDistricts.map((district) => (
//                         <option key={district} value={district}>
//                             {district}
//                         </option>
//                     ))}
//                 </select>

//                 <select name="college" value={filters.college} className="filterInput" onChange={handleFilterChange} disabled={!filters.district}>
//                     <option value="">Select College</option>
//                     {uniqueColleges.map((college) => (
//                         <option key={college} value={college}>
//                             {college}
//                         </option>
//                     ))}
//                 </select>
//             </div>

//             {/* Table */}
//             <Table columns={columns} data={formattedData} />

//             {/* Pagination */}
//             <Pagination currentPage={currentPage} totalPages={Math.ceil(filteredData.length / sosPerPage)} onPageChange={paginate} />
//         </div>
//     );
// };

// export default SOSPage;

// import React, { useState, useEffect } from "react";
// import { NavLink } from "react-router-dom";
// import Table from "../../components/table/Table"; // Import your Table component
// import Pagination from "../../components/Pagination/Pagination";
// import { useAuth } from "../../context/AuthContext";
// import "./sospage.css";

// const SOSPage = () => {
//     const [sosData, setSosData] = useState([]);
//     const [currentPage, setCurrentPage] = useState(1);
//     const [sosPerPage] = useState(10);
//     const { fetchSosAlerts } = useAuth();

//     const columns = ["Student Id", "Student Name", "Student Email", "Mobile Number", "Location Name", "Location"];

//     const indexOfLastSos = currentPage * sosPerPage;
//     const indexOfFirstSos = indexOfLastSos - sosPerPage;
//     const currentSos = sosData.slice(indexOfFirstSos, indexOfLastSos);

//     // Fetch SOS alerts data from API
//     useEffect(() => {
//         const fetchSosAlerts = async () => {
//             try {
//                 const response = await fetch(`http://172.29.24.136:8000/api/live-sos-alerts/?squad_member_id=13`); // Replace with your API endpoint
//                 const alert = await response.json();
//                 const alerts = alert?.data?.live_sos_alerts;
//                 console.log("alerts", alerts);

//                 const transformedData = alerts.map((alert) => ({
//                     studentId: alert.student_id,
//                     studentName: alert.student_name,
//                     studentEmail: alert.student_email || "N/A",
//                     locationName: alert.location_name || "N/A",
//                     mobile: alert.student_mobile_number || "N/A",
//                     location: `${alert.location_latitude}, ${alert.location_longitude}`,
//                 }));
//                 setSosData(transformedData);
//             } catch (error) {
//                 console.error("Error fetching SOS alerts:", error);
//             }
//         };

//         fetchSosAlerts();
//     }, []);

//     // Map the data for the table
//     const formattedData = currentSos.map((sos) => ({
//         "Student Id": sos.studentId,
//         "Student Name": <NavLink to={`/student/${sos.studentId}`}>{sos.studentName}</NavLink>,
//         "Location Name": sos.locationName,
//         "Student Email": sos.studentEmail,
//         "Mobile Number": sos.mobile,
//         Location: sos.location,
//     }));

//     const paginate = (pageNumber) => setCurrentPage(pageNumber);

//     return (
//         <div>
//             <h1>SOS Alerts</h1>

//             {/* Table */}
//             <Table columns={columns} data={formattedData} />

//             {/* Pagination */}
//             <Pagination currentPage={currentPage} totalPages={Math.ceil(sosData.length / sosPerPage)} onPageChange={paginate} />
//         </div>
//     );
// };

// export default SOSPage;

import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import Table from "../../components/table/Table"; // Import your Table component
import Pagination from "../../components/Pagination/Pagination";
import { useSosAlerts } from "../../hooks/useData";
import Styles from "./Sospage.module.css";
import ShimmerTable from "../../components/tableshimmer/ShimmerTable";
const SOSPage = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [sosPerPage] = useState(10);

    // Use the custom hook
    const { sosData, filteredData, loading, error, fetchAlerts } = useSosAlerts();
    // console.log("jhvcaeeeeeeeeee", sosData);

    // Fetch SOS alerts data on component mount
    useEffect(() => {
        fetchAlerts();
    }, [fetchAlerts]);

    // Determine the current page data based on pagination
    const indexOfLastSos = currentPage * sosPerPage;
    const indexOfFirstSos = indexOfLastSos - sosPerPage;
    const currentSos = sosData.slice(indexOfFirstSos, indexOfLastSos);

    // Columns for your table
    const columns = ["Student Id", "Student Name", "Student Email", "Mobile Number", "Location Name", "Location"];

    // Map the currentSOS data into a format suitable for your table
    const formattedData = currentSos.map((sos) => ({
        "Student Id": sos.student_id,
        "Student Name": (
            <NavLink to={`/student/${sos.id}`} className={Styles.studentNameLink}>
                {sos.student_name}
            </NavLink>
        ),
        "Location Name": sos.location_name,
        "Student Email": sos.student_email,
        "Mobile Number": sos.student_mobile_number,
        Location: `${sos.location_latitude}, ${sos.location_longitude}`,
    }));

    // Handle pagination
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return sosData.length === 0 ? (
        <ShimmerTable />
    ) : (
        <div>
            <h1>SOS Alerts</h1>

            {/* Loading and error state */}
            {loading && <p>Loading SOS alerts...</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}

            {/* Table rendering */}
            <Table columns={columns} data={formattedData} />

            {/* Pagination component */}
            <Pagination currentPage={currentPage} totalPages={Math.ceil(sosData.length / sosPerPage)} onPageChange={paginate} />
        </div>
    );
};

export default SOSPage;
