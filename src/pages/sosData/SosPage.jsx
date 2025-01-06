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
import Table from "../../components/table/Table";
import Pagination from "../../components/Pagination/Pagination";
import { useSosAlerts } from "../../hooks/useData";
import Styles from "./Sospage.module.css";
import Loader from "../../components/tableshimmer/Loader";

const SOSPage = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [sosPerPage] = useState(10);
    const { sosData, loading, error, fetchAlerts } = useSosAlerts();
    const [filteredData, setFilteredData] = useState([]);
    const [filters, setFilters] = useState({
        state: "",
        district: "",
        college: "",
        date: "",
    });

    const [dropDownData, setDropDownData] = useState({
        states: [],
        districts: [],
        colleges: [],
    });

    useEffect(() => {
        fetchAlerts();
    }, [fetchAlerts]);

    useEffect(() => {
        if (sosData.length > 0) {
            const uniqueStates = [...new Set(sosData.map((item) => item?.student_info?.state_name))];
            setDropDownData((prev) => ({ ...prev, states: uniqueStates }));
        }
    }, [sosData]);

    useEffect(() => {
        let data = sosData;

        if (filters.state) {
            data = data.filter((item) => item?.student_info?.state_name === filters.state);
        }

        if (filters.district) {
            data = data.filter((item) => item?.student_info?.district_name === filters.district);
        }

        if (filters.college) {
            data = data.filter((item) => item?.student_info?.college_name === filters.college);
        }

        if (filters.date) {
            data = data.filter((item) => {
                const itemDate = new Date(item?.timestamps?.triggered_at).toISOString().split("T")[0];
                return itemDate === filters.date;
            });
        }

        setFilteredData(data);

        const uniqueDistricts = [...new Set(data.map((item) => item?.student_info?.district_name))];
        const uniqueColleges = [...new Set(data.map((item) => item?.student_info?.college_name))];

        setDropDownData((prev) => ({
            ...prev,
            districts: uniqueDistricts,
            colleges: uniqueColleges,
        }));
    }, [filters, sosData]);

    const indexOfLastSos = currentPage * sosPerPage;
    const indexOfFirstSos = indexOfLastSos - sosPerPage;
    const currentSos = filteredData.slice(indexOfFirstSos, indexOfLastSos);

    const columns = ["SOS Id", "Student Name", "Student Email", "Mobile Number", "State", "District", "College", "Location Name", "Location"];

    const formattedData = currentSos.map((sos) => ({
        "SOS Id": sos?.id,
        "Student Name": (
            <NavLink to={`/student/${sos.id}`} className={Styles.studentNameLink}>
                {sos?.student_info?.name}
            </NavLink>
        ),
        "Location Name": sos?.location?.name,
        "Student Email": sos?.student_info?.email,
        "Mobile Number": sos?.student_info?.mobile_number,
        Location: `${sos?.location?.latitude}, ${sos?.location?.longitude}`,
        State: sos?.student_info?.state_name,
        District: sos?.student_info?.district_name,
        College: sos?.student_info?.college_name,
    }));

    const handleFilterChange = (filterName, value) => {
        setFilters((prev) => ({
            ...prev,
            [filterName]: value,
        }));
        setCurrentPage(1);
    };

    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    return sosData.length === 0 ? (
        <Loader />
    ) : (
        <div>
            <h1>SOS Alerts</h1>

            <div className={Styles.filters}>
                <select value={filters.state} onChange={(e) => handleFilterChange("state", e.target.value)}>
                    <option value="">Select State</option>
                    {dropDownData.states.map((state, index) => (
                        <option key={`state-${index}`} value={state}>
                            {state}
                        </option>
                    ))}
                </select>

                <select value={filters.district} onChange={(e) => handleFilterChange("district", e.target.value)}>
                    <option value="">Select District</option>
                    {dropDownData.districts.map((district, index) => (
                        <option key={`district-${index}`} value={district}>
                            {district}
                        </option>
                    ))}
                </select>

                <select value={filters.college} onChange={(e) => handleFilterChange("college", e.target.value)}>
                    <option value="">Select College</option>
                    {dropDownData.colleges.map((college, index) => (
                        <option key={`college-${index}`} value={college}>
                            {college}
                        </option>
                    ))}
                </select>

                <input type="date" value={filters.date} onChange={(e) => handleFilterChange("date", e.target.value)} />
            </div>

            {loading && <p>Loading SOS alerts...</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}

            {filteredData.length === 0 && !loading ? <p>No SOS alerts found.</p> : <Table columns={columns} data={formattedData} />}

            {filteredData.length > 0 && <Pagination currentPage={currentPage} totalPages={Math.ceil(filteredData.length / sosPerPage)} onPageChange={paginate} />}
        </div>
    );
};

export default SOSPage;
