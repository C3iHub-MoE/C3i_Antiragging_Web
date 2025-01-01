import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/auth/login/Login";
import ResetPassword from "./pages/auth/reset-password/ResetPassword";
import InvitationForm from "./pages/invitationForm/InvitationForm";
import Layout from "./layout/Layout";
import ComplaintDetailsPage from "./pages/complaintPageAdmin/ComplaintDetailsPage";
import StudentComplaintsPage from "./pages/complaintPageAdmin/StudentsComplaintPage";
import UserDashboard from "./pages/dashboard/UserDashboard";
import UserRegister from "./pages/auth/register/Registration";
import Error from "./pages/error/Error";
import MembersPage from "./pages/main_admin/memberpage/MembersPage";
import PendingStudentsPage from "./pages/students__commettiee_member/PendingStudentPage";
import StudentsPage from "./pages/students__commettiee_member/StudentsData";
import NewStudentRegister from "./pages/students__commettiee_member/NewStudentPage";

import SOSPage from "./pages/sosData/SosPage";
import StudentProfile from "./pages/sos_student_page/StudentProfile";
import ProfilePage from "./pages/UserProfile/UserProfile";
import ProtectedRoute from "./components/protectedRoute/protectedRoute";
import PublicRoute from "./components/publicRoute/publicRoute";
import Logout from "./pages/auth/logout/Logout";
import ContactUs from "./pages/contactus/ContactUS";
import VerifyAccount from "./pages/auth/login/VerifyAccount";
import ChangePasswordPage from "./pages/UserProfile/ChangePassword";
import SosBarChart from "./pages/adminDashboard/SosBarChart";

function App() {
    const user = "member";
    return (
        <Routes>
            {/* Public Routes */}
            <Route
                path="/login"
                element={
                    <PublicRoute>
                        <Login />
                    </PublicRoute>
                }
            />
            <Route
                path="/verifyAccount"
                element={
                    // <PublicRoute>
                    <VerifyAccount />
                    // </PublicRoute>
                }
            />

            <Route
                path="/logout"
                element={
                    <ProtectedRoute>
                        <Logout />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/reset-password"
                element={
                    <PublicRoute>
                        <ResetPassword />
                    </PublicRoute>
                }
            />
            <Route
                path="*"
                element={
                    <ProtectedRoute>
                        <Layout>
                            <Routes>
                                <Route index element={<UserDashboard />} />
                                <Route path="/profile" element={<ProfilePage />} />
                                <Route path="/invitation-mail" element={<InvitationForm />} />
                                <Route path="/member-registration" element={<UserRegister />} />
                                <Route path="/sos-history" element={<SOSPage />} />
                                <Route path="/student/:id" element={<StudentProfile />} />
                                <Route path="/pending-students" element={<PendingStudentsPage />} />
                                <Route path="/complaints" element={<StudentComplaintsPage />} />
                                <Route path="/students" element={<StudentsPage />} />
                                <Route path="/create-student" element={<NewStudentRegister />} />
                                <Route path="/member_page" element={<MembersPage />} />
                                <Route path="/contact" element={<ContactUs />} />
                                <Route path="/invite" element={<InvitationForm />} />
                                <Route path="/changePassword" element={<ChangePasswordPage />} />
                                <Route path="/bar" element={<SosBarChart />} />

                                <Route path="*" element={<Error />} />
                            </Routes>
                        </Layout>
                    </ProtectedRoute>
                }
            >
                {/* Routes under Layout */}
            </Route>
        </Routes>
    );
}

export default App;
