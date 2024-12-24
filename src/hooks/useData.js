import { useState, useEffect, useCallback } from "react";
import { sosAlerts, sosDetails } from "../api/user/index"; // Assuming you have a function that fetches SOS alerts from your API
import { useAuth } from "../context/AuthContext";

export const useSosAlerts = () => {
    const { user } = useAuth();
    const [sosData, setSosData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchAlerts = useCallback(async () => {
        if (!user?.id) {
            setError("User ID is not available.");
            return;
        }

        setLoading(true);
        setError(null);

        const controller = new AbortController();

        try {
            const alert = await sosAlerts(user.role, user.id, {}, controller.signal); // Fetch data
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
            setError(err.message || "An error occurred while fetching SOS alerts");
        } finally {
            setLoading(false);
        }

        // Cleanup function to abort the request if needed
        return () => controller.abort();
    }, [user]);

    return { sosData, filteredData, loading, error, fetchAlerts };
};
