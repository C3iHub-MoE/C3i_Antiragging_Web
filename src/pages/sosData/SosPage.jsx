// import React, { useState, useEffect } from 'react';
// import { NavLink } from 'react-router-dom';
// import Table from '../../components/table/Table'; // Import your Table component
// import Pagination from '../../components/Pagination/Pagination';
// const SOSPage = () => {
//     const [sosData, setSosData] = useState([]);
//     const [currentPage, setCurrentPage] = useState(1);
//     const [sosPerPage] = useState(10);
//     const columns = ['Student Id', 'Student Name', 'College', 'State', 'District', 'Location'];

//     // Static JSON data for SOS alerts (replace this with your API later)
//     const mockSosData = [
//         {
//           studentId: 1,
//           studentName: 'John Doe',
//           college: 'ABC College',
//           state: 'California',
//           district: 'Los Angeles',
//           location: '34.0522° N, 118.2437° W',
//         },
//         {
//           studentId: 2,
//           studentName: 'Jane Smith',
//           college: 'XYZ University',
//           state: 'Texas',
//           district: 'Dallas',
//           location: '32.7767° N, 96.7970° W',
//         },
//         {
//           studentId: 3,
//           studentName: 'Emily Johnson',
//           college: 'DEF Institute',
//           state: 'New York',
//           district: 'Brooklyn',
//           location: '40.6782° N, 73.9442° W',
//         },
//         {
//           studentId: 4,
//           studentName: 'Michael Brown',
//           college: 'GHI University',
//           state: 'Florida',
//           district: 'Miami',
//           location: '25.7617° N, 80.1918° W',
//         },
//         {
//           studentId: 5,
//           studentName: 'Sarah Lee',
//           college: 'JKL Institute',
//           state: 'Illinois',
//           district: 'Chicago',
//           location: '41.8781° N, 87.6298° W',
//         },
//         {
//           studentId: 6,
//           studentName: 'David Wilson',
//           college: 'MNO College',
//           state: 'Nevada',
//           district: 'Las Vegas',
//           location: '36.1699° N, 115.1398° W',
//         },
//         {
//           studentId: 7,
//           studentName: 'Sophia Garcia',
//           college: 'PQR University',
//           state: 'Arizona',
//           district: 'Phoenix',
//           location: '33.4484° N, 112.0740° W',
//         },
//         {
//           studentId: 8,
//           studentName: 'James Martinez',
//           college: 'STU Institute',
//           state: 'Ohio',
//           district: 'Columbus',
//           location: '39.9612° N, 82.9988° W',
//         },
//         {
//           studentId: 9,
//           studentName: 'Isabella Hernandez',
//           college: 'VWX University',
//           state: 'Georgia',
//           district: 'Atlanta',
//           location: '33.7490° N, 84.3880° W',
//         },
//         {
//           studentId: 10,
//           studentName: 'Liam Lopez',
//           college: 'YZA College',
//           state: 'Virginia',
//           district: 'Richmond',
//           location: '37.5407° N, 77.4360° W',
//         },
//         {
//           studentId: 11,
//           studentName: 'Olivia Clark',
//           college: 'BCD Institute',
//           state: 'North Carolina',
//           district: 'Charlotte',
//           location: '35.2271° N, 80.8431° W',
//         },
//         {
//           studentId: 12,
//           studentName: 'Lucas Rodriguez',
//           college: 'EFG University',
//           state: 'New Jersey',
//           district: 'Newark',
//           location: '40.7357° N, 74.1724° W',
//         },
//         {
//           studentId: 13,
//           studentName: 'Emma Perez',
//           college: 'HIJ College',
//           state: 'Pennsylvania',
//           district: 'Philadelphia',
//           location: '39.9526° N, 75.1652° W',
//         },
//         {
//           studentId: 14,
//           studentName: 'Noah Thompson',
//           college: 'KLM Institute',
//           state: 'Michigan',
//           district: 'Detroit',
//           location: '42.3314° N, 83.0458° W',
//         },
//         {
//           studentId: 15,
//           studentName: 'Mia Anderson',
//           college: 'NOP University',
//           state: 'Colorado',
//           district: 'Denver',
//           location: '39.7392° N, 104.9903° W',
//         },
//         {
//           studentId: 16,
//           studentName: 'William White',
//           college: 'QRS College',
//           state: 'Massachusetts',
//           district: 'Boston',
//           location: '42.3601° N, 71.0589° W',
//         },
//         {
//           studentId: 17,
//           studentName: 'Ava Harris',
//           college: 'TUV Institute',
//           state: 'Washington',
//           district: 'Seattle',
//           location: '47.6062° N, 122.3321° W',
//         },
//         {
//           studentId: 18,
//           studentName: 'Ethan Lewis',
//           college: 'WXY University',
//           state: 'Oregon',
//           district: 'Portland',
//           location: '45.5051° N, 122.6750° W',
//         },
//         {
//           studentId: 19,
//           studentName: 'Amelia Scott',
//           college: 'ZAB College',
//           state: 'Tennessee',
//           district: 'Nashville',
//           location: '36.1627° N, 86.7816° W',
//         },
//         {
//           studentId: 20,
//           studentName: 'Mason King',
//           college: 'CDE Institute',
//           state: 'Indiana',
//           district: 'Indianapolis',
//           location: '39.7684° N, 86.1581° W',
//         },
//       ];

//     const indexOfLastSos = currentPage * sosPerPage;
//     const indexOfFirstSos = indexOfLastSos - sosPerPage;
//     const currentSos = sosData.slice(indexOfFirstSos, indexOfLastSos);



//     useEffect(() => {
//         // Use static JSON data instead of API
//         setSosData(mockSosData);
//     }, []);

//     // Map the data for the table
//     const formattedData = currentSos.map((sos) => ({
//         'Student Id': sos.studentId,
//         'Student Name': (
//             <NavLink to={`/student/${sos.studentId}`}>
//                 {sos.studentName}
//             </NavLink>
//         ),
//         'College': sos.college,
//         'State': sos.state,
//         'District': sos.district,
//         'Location': sos.location,
//     }));

//     const paginate = (pageNumber) => setCurrentPage(pageNumber);
//     return (
//         <div>
//             <h1>SOS Alerts</h1>
//             <Table columns={columns} data={formattedData} />

//               {/* Pagination */}
//               <Pagination
//                 currentPage={currentPage}
//                 totalPages={Math.ceil(sosData.length / sosPerPage)}
//                 onPageChange={paginate}
//             />
//         </div>
//     );
// };

// export default SOSPage;


import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import Table from '../../components/table/Table'; // Import your Table component
import Pagination from '../../components/Pagination/Pagination';
import "./sospage.css"


const SOSPage = () => {
  const [sosData, setSosData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sosPerPage] = useState(10);
  const [filters, setFilters] = useState({
    state: '',
    district: '',
    college: ''
  });

  const columns = ['Student Id', 'Student Name', 'College', 'State', 'District', 'Location'];

    const mockSosData = [
      {
        studentId: 1,
        studentName: "Manoj Kishore",
        college: "BHARATESH COLLEGE OF COMMERCE, BELGAUM",
        state: "Karnataka",
        district: "Belagavi",
        location: "34.0522° N, 118.2437° W",
      },
      {
        studentId: 2,
        studentName: "Anjali Sharma",
        college: "SHRI KALIDAS ARTS COLLEGE, KERUR",
        state: "Karnataka",
        district: "Bagalkote",
        location: "37.7749° N, 122.4194° W",
      },
      {
        studentId: 3,
        studentName: "Rajesh Kumar",
        college: "Chandigarh College of Technology, Landran",
        state: "Punjab",
        district: "S.A.S Nagar",
        location: "34.0522° N, 118.2437° W",
      },
      {
        studentId: 4,
        studentName: "Priya Mehta",
        college: "University UG College",
        state: "Haryana",
        district: "Kurukshetra",
        location: "32.7767° N, 96.7970° W",
      },
      {
        studentId: 5,
        studentName: "Karthik Reddy",
        college: "Saraswati College of Education",
        state: "Haryana",
        district: "Jind",
        location: "29.7604° N, 95.3698° W",
      },
      {
        studentId: 6,
        studentName: "Sneha Das",
        college: "Centre for Studies on Rural Management, Randheja",
        state: "Gujarat",
        district: "Gandhinagar",
        location: "40.6782° N, 73.9442° W",
      },
      {
        studentId: 7,
        studentName: "Rohit Verma",
        college: "S S PATEL COLLEGE OF EDUCATION",
        state: "Gujarat",
        district: "Gandhinagar",
        location: "40.7831° N, 73.9712° W",      },
      {
        studentId: 8,
        studentName: "Neha Singh",
        college: "Manav Institute of Education",
        state: "Haryana",
        district: "Hisar",
        location: "25.7617° N, 80.1918° W",
      },
      {
        studentId: 9,
        studentName: "Amit Choudhary",
        college: "Laxmi Narayan Degree College, Pipilia",
        state: "Odisha",
        district: "Kendujhar",
        location: "28.5383° N, 81.3792° W",
      },
      {
        studentId: 10,
        studentName: "Sanjana Gupta",
        college: "St. Anns College of Education",
        state: "Karnataka",
        district: "Dharwad",
        location: "25.7617° N, 80.1918° W",      },
      {
        studentId: 11,
        studentName: "Arjun Malhotra",
        college: "Sunrise Degree College",
        state: "Rajasthan",
        district: "Jaipur",
        location: "41.8781° N, 87.6298° W",
      },
      {
        studentId: 12,
        studentName: "Megha Jain",
        college: "Global Institute of Management",
        state: "Punjab",
        district: "Amritsar",
        location: "41.8781° N, 87.6298° W",
      },
      {
        studentId: 13,
        studentName: "Amit Singh",
        college: "XYZ University",
        state: "Uttar Pradesh",
        district: "Varanasi",
        location: "40.7357° N, 74.1724° W",
      },
      {
        studentId: 14,
        studentName: "Sita Yadav",
        college: "Techno Institute",
        state: "Maharashtra",
        district: "Pune",
        location: "40.7282° N, 74.0776° W",
      },
      {
        studentId: 15,
        studentName: "Vishal Patil",
        college: "Pune Institute of Technology",
        state: "Maharashtra",
        district: "Pune",
        location: "40.7357° N, 74.1724° W",
      },
      {
        studentId: 16,
        studentName: "Neha Bhardwaj",
        college: "Green Valley College",
        state: "Haryana",
        district: "Ambala",
        location: "42.3601° N, 71.0589° W",
      },
      {
        studentId: 17,
        studentName: "Rohit Kumar",
        college: "Jind Institute of Technology",
        state: "Haryana",
        district: "Jind",
        location: "42.3601° N, 71.0589° W",
      },
      {
        studentId: 18,
        studentName: "Rahul Mehta",
        college: "Techno University",
        state: "Gujarat",
        district: "Ahmedabad",
        location: "35.2271° N, 80.8431° W",
      },
      {
        studentId: 19,
        studentName: "Sonali Agarwal",
        college: "Saraswati College",
        state: "Madhya Pradesh",
        district: "Bhopal",
        location: "35.7796° N, 78.6382° W",
      },
      {
        studentId: 20,
        studentName: "Pooja Thakur",
        college: "Sunrise Engineering College",
        state: "Rajasthan",
        district: "Udaipur",
        location: "35.2271° N, 80.8431° W",
      }
    ];


  const indexOfLastSos = currentPage * sosPerPage;
  const indexOfFirstSos = indexOfLastSos - sosPerPage;
  const currentSos = filteredData.slice(indexOfFirstSos, indexOfLastSos);

  useEffect(() => {
    setSosData(mockSosData);
    setFilteredData(mockSosData); // Initialize filtered data with full dataset
  }, []);

  // Update filtered data whenever filters change
  useEffect(() => {
    let updatedData = sosData;

    if (filters.state) {
      updatedData = updatedData.filter(item => item.state === filters.state);
    }
    if (filters.district) {
      updatedData = updatedData.filter(item => item.district === filters.district);
    }
    if (filters.college) {
      updatedData = updatedData.filter(item => item.college === filters.college);
    }

    setFilteredData(updatedData);
    setCurrentPage(1); // Reset to first page
  }, [filters, sosData]);

  // Map the data for the table
  const formattedData = currentSos.map((sos) => ({
    'Student Id': sos.studentId,
    'Student Name': (
      <NavLink to={`/student/${sos.studentId}`}>
        {sos.studentName}
      </NavLink>
    ),
    'College': sos.college,
    'State': sos.state,
    'District': sos.district,
    'Location': sos.location,
  }));

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Handle filter changes
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value
    }));
  };

  // Get unique values for dropdowns
  const uniqueStates = [...new Set(sosData.map(item => item.state))];
  const uniqueDistricts = [...new Set(sosData.filter(item => item.state === filters.state || !filters.state).map(item => item.district))];
  const uniqueColleges = [...new Set(sosData.filter(item => item.district === filters.district || !filters.district).map(item => item.college))];

  return (
    <div>
      <h1>SOS Alerts</h1>

      {/* Filters Section */}
      <div className="filters">
        <select name="state" className='filterInput' value={filters.state} onChange={handleFilterChange}>
          <option value="">Select State</option>
          {uniqueStates.map(state => (
            <option key={state} value={state}>{state}</option>
          ))}
        </select>

        <select name="district" className='filterInput' value={filters.district} onChange={handleFilterChange} disabled={!filters.state}>
          <option value="">Select District</option>
          {uniqueDistricts.map(district => (
            <option key={district} value={district}>{district}</option>
          ))}
        </select>

        <select name="college" value={filters.college} className='filterInput' onChange={handleFilterChange} disabled={!filters.district}>
          <option value="">Select College</option>
          {uniqueColleges.map(college => (
            <option key={college} value={college}>{college}</option>
          ))}
        </select>
      </div>

      {/* Table */}
      <Table columns={columns} data={formattedData} />

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={Math.ceil(filteredData.length / sosPerPage)}
        onPageChange={paginate}
      />
    </div>
  );
};

export default SOSPage;
