import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const StudentProfile = () => {
    const { id } = useParams(); // Get student ID from the URL
    const [studentData, setStudentData] = useState(null);

    // Mock data for the student profiles (you can replace this with an API call)
    const mockStudentProfiles = [
        {
          studentId: 1,
          studentName: 'John Doe',
          college: 'ABC College',
          state: 'California',
          district: 'Los Angeles',
          location: '34.0522° N, 118.2437° W',
        },
        {
          studentId: 2,
          studentName: 'Jane Smith',
          college: 'XYZ University',
          state: 'Texas',
          district: 'Dallas',
          location: '32.7767° N, 96.7970° W',
        },
        {
          studentId: 3,
          studentName: 'Emily Johnson',
          college: 'DEF Institute',
          state: 'New York',
          district: 'Brooklyn',
          location: '40.6782° N, 73.9442° W',
        },
        {
          studentId: 4,
          studentName: 'Michael Brown',
          college: 'GHI University',
          state: 'Florida',
          district: 'Miami',
          location: '25.7617° N, 80.1918° W',
        },
        {
          studentId: 5,
          studentName: 'Sarah Lee',
          college: 'JKL Institute',
          state: 'Illinois',
          district: 'Chicago',
          location: '41.8781° N, 87.6298° W',
        },
        {
          studentId: 6,
          studentName: 'David Wilson',
          college: 'MNO College',
          state: 'Nevada',
          district: 'Las Vegas',
          location: '36.1699° N, 115.1398° W',
        },
        {
          studentId: 7,
          studentName: 'Sophia Garcia',
          college: 'PQR University',
          state: 'Arizona',
          district: 'Phoenix',
          location: '33.4484° N, 112.0740° W',
        },
        {
          studentId: 8,
          studentName: 'James Martinez',
          college: 'STU Institute',
          state: 'Ohio',
          district: 'Columbus',
          location: '39.9612° N, 82.9988° W',
        },
        {
          studentId: 9,
          studentName: 'Isabella Hernandez',
          college: 'VWX University',
          state: 'Georgia',
          district: 'Atlanta',
          location: '33.7490° N, 84.3880° W',
        },
        {
          studentId: 10,
          studentName: 'Liam Lopez',
          college: 'YZA College',
          state: 'Virginia',
          district: 'Richmond',
          location: '37.5407° N, 77.4360° W',
        },
        {
          studentId: 11,
          studentName: 'Olivia Clark',
          college: 'BCD Institute',
          state: 'North Carolina',
          district: 'Charlotte',
          location: '35.2271° N, 80.8431° W',
        },
        {
          studentId: 12,
          studentName: 'Lucas Rodriguez',
          college: 'EFG University',
          state: 'New Jersey',
          district: 'Newark',
          location: '40.7357° N, 74.1724° W',
        },
        {
          studentId: 13,
          studentName: 'Emma Perez',
          college: 'HIJ College',
          state: 'Pennsylvania',
          district: 'Philadelphia',
          location: '39.9526° N, 75.1652° W',
        },
        {
          studentId: 14,
          studentName: 'Noah Thompson',
          college: 'KLM Institute',
          state: 'Michigan',
          district: 'Detroit',
          location: '42.3314° N, 83.0458° W',
        },
        {
          studentId: 15,
          studentName: 'Mia Anderson',
          college: 'NOP University',
          state: 'Colorado',
          district: 'Denver',
          location: '39.7392° N, 104.9903° W',
        },
        {
          studentId: 16,
          studentName: 'William White',
          college: 'QRS College',
          state: 'Massachusetts',
          district: 'Boston',
          location: '42.3601° N, 71.0589° W',
        },
        {
          studentId: 17,
          studentName: 'Ava Harris',
          college: 'TUV Institute',
          state: 'Washington',
          district: 'Seattle',
          location: '47.6062° N, 122.3321° W',
        },
        {
          studentId: 18,
          studentName: 'Ethan Lewis',
          college: 'WXY University',
          state: 'Oregon',
          district: 'Portland',
          location: '45.5051° N, 122.6750° W',
        },
        {
          studentId: 19,
          studentName: 'Amelia Scott',
          college: 'ZAB College',
          state: 'Tennessee',
          district: 'Nashville',
          location: '36.1627° N, 86.7816° W',
        },
        {
          studentId: 20,
          studentName: 'Mason King',
          college: 'CDE Institute',
          state: 'Indiana',
          district: 'Indianapolis',
          location: '39.7684° N, 86.1581° W',
        },
      ];

    useEffect(() => {
        // Fetch the student profile by ID (replace this with an actual API call if needed)
        const fetchStudentProfile = () => {
            const student = mockStudentProfiles[id];
            if (student) {
                setStudentData(student);
            }
        };

        fetchStudentProfile();
    }, [id]);

    if (!studentData) {
        return <p>Loading student data...</p>;
    }

    return (
        <div>
            <h1>Student Profile</h1>
            <p><strong>Student Name:</strong> {studentData.studentName}</p>
            <p><strong>College:</strong> {studentData.college}</p>
            <p><strong>State:</strong> {studentData.state}</p>
            <p><strong>District:</strong> {studentData.district}</p>
            <p><strong>Location:</strong> {studentData.location}</p>
        </div>
    );
};

export default StudentProfile;
