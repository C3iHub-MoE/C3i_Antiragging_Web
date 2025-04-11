import { useState, useEffect, useCallback } from "react";
import { sosAlerts, sosDetails, sosHistory } from "../api/user/index"; // Assuming you have a function that fetches SOS alerts from your API
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export const useSosAlerts = () => {
  const { user } = useAuth();
  const [sosData, setSosData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const fetchAlerts = useCallback(async () => {
    if (!user?.id) {
      setError("User ID is not available.");
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
      const alert = await sosAlerts(
        user.role,
        user.id,
        { headers },
        controller.signal
      ); // Fetch data
      const alerts = alert?.live_sos_alerts;
      console.log("Received SOS Alerts:", alerts);

      if (Array.isArray(alerts)) {
        setSosData(alerts);
      } else {
        console.error("Unexpected response format", alerts);
        setError("Data is not in expected format (array).");
      }
    } catch (err) {
      console.error(err);
      if (
        error?.response?.data?.error === "Invalid JWT token" ||
        error?.response?.status === 401
      )
        navigate("/login");

      setError(err.message || "An error occurred while fetching SOS alerts");
    } finally {
      setLoading(false);
    }

    // Cleanup function to abort the request if needed
    return () => controller.abort();
  }, [user]);

  return { sosData, filteredData, loading, error, fetchAlerts };
};

export const useSosHistory = () => {
  const { user } = useAuth();
  const [sosHistoryData, setSosHistoryData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const fetchSosHistory = useCallback(async () => {
    if (!user?.id) {
      setError("User ID is not available.");
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
      const alert = await sosHistory(
        user.role,
        user.id,
        { headers },
        controller.signal
      ); // Fetch data
      const alerts = alert?.sos_history;
      console.log("Received SOS History:", alerts);

      if (Array.isArray(alerts)) {
        setSosHistoryData(alerts);
      } else {
        console.error("Unexpected response format", alerts);
        setError("Data is not in expected format (array).");
      }
    } catch (err) {
      console.error(err);
      if (
        error?.response?.data?.error === "Invalid JWT token" ||
        error?.response?.status === 401
      )
        navigate("/login");

      setError(err.message || "An error occurred while fetching SOS alerts");
    } finally {
      setLoading(false);
    }

    // Cleanup function to abort the request if needed
    return () => controller.abort();
  }, [user]);

  return { sosHistoryData, loading, error, fetchSosHistory };
};
