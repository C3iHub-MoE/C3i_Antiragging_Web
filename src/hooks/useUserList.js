import { useState, useEffect, useCallback } from "react";
import { studentList, memberList } from "../api/user/index";
import { useAuth } from "../context/AuthContext";

// Custom hook for fetching student list by college
export const useStudentList = () => {
    const { user } = useAuth();
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchStudents = useCallback(async () => {
        if (!user?.college) {
            setError("User's college information is not available.");
            return;
        }

        setLoading(true);
        setError(null);
        const controller = new AbortController();

        try {
            const studentData = await studentList(user.college, controller.signal);
            // console.log("jkdbjsbjsbjs", studentData);
            setStudents(studentData || []);
        } catch (err) {
            console.error("Error fetching students:", err);
            setError(err.message || "An error occurred while fetching students");
        } finally {
            setLoading(false);
        }

        return () => controller.abort();
    }, [user]);

    useEffect(() => {
        fetchStudents();
    }, [fetchStudents]);

    return { students, loading, error };
};

// Custom hook for fetching member list by college
export const useMemberList = () => {
    const { user } = useAuth();
    const [members, setMembers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchMembers = useCallback(async () => {
        if (!user?.college) {
            setError("User's college information is not available.");
            return;
        }

        setLoading(true);
        setError(null);
        const controller = new AbortController();

        try {
            const memberData = await memberList(user.college, controller.signal);
            setMembers(memberData || []);
        } catch (err) {
            console.error("Error fetching members:", err);
            setError(err.message || "An error occurred while fetching members");
        } finally {
            setLoading(false);
        }

        return () => controller.abort();
    }, [user]);

    useEffect(() => {
        fetchMembers();
    }, [fetchMembers]);

    return { members, loading, error };
};
