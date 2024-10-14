import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/auth/login/Login';
import ResetPassword from './pages/auth/reset-password/ResetPassword';
import ComplaintsPage from './pages/complaintpage/ComplaintPage';
import Layout from './layout/Layout';
import ComplaintDetailsPage from './pages/complaintpage/ComplaintDetailsPage';
import { useState } from 'react';
import AntiRaggingDashboard from './pages/dashboard/AntiRaggingDashboard';
import CommitteeMemberRegister from './pages/auth/register/CommitteeMemberRegister';
import StudentRegister from './pages/auth/register/StudentRegister';
import CommitteeMemberPage from './pages/member/CommitteeMemberPage';
import Error from './pages/error/Error';
import MemberForm from './pages/main_admin/memberform/MembersForm';
import MembersPage from './pages/main_admin/memberpage/MembersPage';


const initialComplaintsData = [
  { ComplaintID: 1, Description: "Bullying in the classroom.", DateFiled: "2024-09-20", Status: "Pending", StudentID: "S12345", CollegeID: "C001", EscalationLevel: 1, StudentName: "John Doe", CollegeName: "ABC College", ResolvedDate: null },
  { ComplaintID: 2, Description: "Harassment from seniors.", DateFiled: "2024-09-22", Status: "Resolved", StudentID: "S67890", CollegeID: "C001", EscalationLevel: 2, StudentName: "Jane Smith", CollegeName: "ABC College", ResolvedDate: "2024-09-29" },
  { ComplaintID: 3, Description: "Inappropriate remarks by a faculty member.", DateFiled: "2024-09-25", Status: "In Progress", StudentID: "S13579", CollegeID: "C002", EscalationLevel: 1, StudentName: "Alice Brown", CollegeName: "XYZ University", ResolvedDate: null },
  { ComplaintID: 4, Description: "Discrimination based on gender.", DateFiled: "2024-09-26", Status: "Pending", StudentID: "S24680", CollegeID: "C001", EscalationLevel: 1, StudentName: "Chris Green", CollegeName: "ABC College", ResolvedDate: null },
  { ComplaintID: 5, Description: "Cheating allegations.", DateFiled: "2024-09-27", Status: "Pending", StudentID: "S11223", CollegeID: "C003", EscalationLevel: 2, StudentName: "Emily White", CollegeName: "LMN Institute", ResolvedDate: null },
  { ComplaintID: 6, Description: "Unsafe lab conditions.", DateFiled: "2024-09-28", Status: "Resolved", StudentID: "S33445", CollegeID: "C002", EscalationLevel: 2, StudentName: "Daniel Black", CollegeName: "XYZ University", ResolvedDate: "2024-10-01" },
  { ComplaintID: 7, Description: "Unfair grading practices.", DateFiled: "2024-09-29", Status: "In Progress", StudentID: "S55667", CollegeID: "C003", EscalationLevel: 3, StudentName: "Laura Grey", CollegeName: "LMN Institute", ResolvedDate: null },
  { ComplaintID: 8, Description: "Harassment by a peer.", DateFiled: "2024-09-30", Status: "Pending", StudentID: "S77889", CollegeID: "C001", EscalationLevel: 1, StudentName: "James Orange", CollegeName: "ABC College", ResolvedDate: null },
  { ComplaintID: 9, Description: "Inadequate faculty response.", DateFiled: "2024-10-01", Status: "Pending", StudentID: "S99001", CollegeID: "C002", EscalationLevel: 2, StudentName: "Olivia Pink", CollegeName: "XYZ University", ResolvedDate: null },
  { ComplaintID: 10, Description: "Violence in the dorms.", DateFiled: "2024-10-02", Status: "In Progress", StudentID: "S12345", CollegeID: "C001", EscalationLevel: 3, StudentName: "Liam Yellow", CollegeName: "ABC College", ResolvedDate: null },
  { ComplaintID: 11, Description: "Stalking incident reported.", DateFiled: "2024-10-03", Status: "Pending", StudentID: "S23456", CollegeID: "C002", EscalationLevel: 1, StudentName: "Noah Purple", CollegeName: "XYZ University", ResolvedDate: null },
  { ComplaintID: 12, Description: "Threats made by a student.", DateFiled: "2024-10-04", Status: "Resolved", StudentID: "S34567", CollegeID: "C003", EscalationLevel: 2, StudentName: "Emma Red", CollegeName: "LMN Institute", ResolvedDate: "2024-10-05" },
  { ComplaintID: 13, Description: "Rude behavior by staff.", DateFiled: "2024-10-05", Status: "In Progress", StudentID: "S45678", CollegeID: "C001", EscalationLevel: 3, StudentName: "Ava Blue", CollegeName: "ABC College", ResolvedDate: null },
  { ComplaintID: 14, Description: "Privacy violations.", DateFiled: "2024-10-06", Status: "Pending", StudentID: "S56789", CollegeID: "C002", EscalationLevel: 1, StudentName: "Isabella Grey", CollegeName: "XYZ University", ResolvedDate: null },
  { ComplaintID: 15, Description: "Physical altercation between students.", DateFiled: "2024-10-07", Status: "Resolved", StudentID: "S67890", CollegeID: "C001", EscalationLevel: 2, StudentName: "Sophia Black", CollegeName: "ABC College", ResolvedDate: "2024-10-08" },
  { ComplaintID: 16, Description: "Cyberbullying reported.", DateFiled: "2024-10-08", Status: "In Progress", StudentID: "S78901", CollegeID: "C003", EscalationLevel: 3, StudentName: "Mia White", CollegeName: "LMN Institute", ResolvedDate: null },
  { ComplaintID: 17, Description: "Drug use on campus.", DateFiled: "2024-10-09", Status: "Pending", StudentID: "S89012", CollegeID: "C002", EscalationLevel: 1, StudentName: "Lucas Brown", CollegeName: "XYZ University", ResolvedDate: null },
  { ComplaintID: 18, Description: "Unfair competition among students.", DateFiled: "2024-10-10", Status: "Resolved", StudentID: "S90123", CollegeID: "C003", EscalationLevel: 2, StudentName: "Ethan Green", CollegeName: "LMN Institute", ResolvedDate: "2024-10-11" },
  { ComplaintID: 19, Description: "Violation of exam integrity.", DateFiled: "2024-10-11", Status: "In Progress", StudentID: "S01234", CollegeID: "C001", EscalationLevel: 3, StudentName: "Charlotte Yellow", CollegeName: "ABC College", ResolvedDate: null },
  { ComplaintID: 20, Description: "Excessive workload from faculty.", DateFiled: "2024-10-12", Status: "Pending", StudentID: "S12345", CollegeID: "C002", EscalationLevel: 1, StudentName: "Amelia Pink", CollegeName: "XYZ University", ResolvedDate: null },
];

function App() {
  const [complaintsData, setComplaintsData] = useState(initialComplaintsData);
  
  return (
    <Layout>
      <Routes>

        <Route path="*" element={<Error />} />
        <Route path="/login" element={<Login />} />
        {/* <Route path="/register" element={<Register />} /> */}
        <Route path="/member-registration" element={<CommitteeMemberRegister />} />

        <Route path="/student-registration" element={<StudentRegister />} />

        <Route path="/" element={<AntiRaggingDashboard />} />

        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/complaints" element={<ComplaintsPage />} />
        <Route path="/student-approval" element={<CommitteeMemberPage />} />
        <Route
          path="/complaint/:complaintID"
          element={<ComplaintDetailsPage complaintsData={complaintsData} setComplaintsData={setComplaintsData} />}
        />
        <Route path='/member_page' element={<MembersPage />} />
        <Route path='/member-form' element={<MemberForm/>}/>
        


        {/* <Route path="/admin-dashboard" element={<AdminDashboard />} /> */}
        {/* <Route path="/committee-dashboard" element={<CommitteeDashboard />} /> 
      {/* Redirect to login if no role is matched */}
        {/* <Route path="*" element={<Navigate to="/login" />} /> */}

      </Routes>
    </Layout>
  );
}

export default App;
