import { useState, useEffect, useCallback } from "react";
import { studentList, memberList, currentUserList } from "../api/user/index";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

// Custom hook for fetching student list by college
export const useStudentList = () => {
  const { user } = useAuth();
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const fetchStudents = useCallback(async () => {
    if (!user?.college) {
      setError("User's college information is not available.");
      return;
    }

    setLoading(true);
    setError(null);
    const controller = new AbortController();

    try {
      const headers = {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`, // Add the Bearer token here
        "Content-Type": "application/json",
      };
      const studentData = await studentList(
        user.college,
        { headers },
        controller.signal
      );
      // console.log("jkdbjsbjsbjs", studentData);
      setStudents(studentData || []);
    } catch (err) {
      console.error("Error fetching students:", err);
      if (
        error?.response?.data?.error === "Invalid JWT token" ||
        error?.response?.status === 401
      )
        navigate("/login");
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

  const navigate = useNavigate();

  const fetchMembers = useCallback(async () => {
    // if (!user?.college) {
    //   setError("User's college information is not available.");
    //   return;
    // }

    setLoading(true);
    setError(null);
    const controller = new AbortController();

    try {
      const headers = {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`, // Add the Bearer token here
        "Content-Type": "application/json",
      };
      const memberData = await memberList(
        user.college,
        { headers },
        controller.signal
      );
      setMembers(memberData || []);
    } catch (err) {
      console.error("Error fetching members:", err);
      setError(err.message || "An error occurred while fetching members");
      if (
        error?.response?.data?.error === "Invalid JWT token" ||
        error?.response?.status === 401
      )
        navigate("/login");
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

// Custom hook for fetching profile
export const useUserProfile = () => {
  const { user } = useAuth();
  const [currentUser, setCurrentUser] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const fetchCurrentUser = useCallback(async () => {
    setLoading(true);
    setError(null);
    const controller = new AbortController();

    try {
      const headers = {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`, // Add the Bearer token here
        "Content-Type": "application/json",
      };
      const currentUserData = await currentUserList(
        { headers },
        controller.signal
      );

      setCurrentUser(currentUserData || []);
    } catch (err) {
      console.error("Error fetching currentUser:", err);
      if (
        error?.response?.data?.error === "Invalid JWT token" ||
        error?.response?.status === 401
      )
        navigate("/login");
      setError(err.message || "An error occurred while fetching students");
    } finally {
      setLoading(false);
    }

    return () => controller.abort();
  }, [user]);

  useEffect(() => {
    fetchCurrentUser();
  }, [fetchCurrentUser]);

  return { currentUser, loading, error };
};
