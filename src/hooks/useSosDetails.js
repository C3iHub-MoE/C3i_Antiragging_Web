import { useState, useEffect, useCallback } from "react";
import { sosDetails } from "../api/user/index"; // Assuming you have a function that fetches SOS details from your API
import { useAuth } from "../context/AuthContext";

// Custom hook for fetching SOS alert details by ID
export const useSosDetails = (id) => {
    const { user } = useAuth();
    const [sosDetail, setSosDetail] = useState(null); // State to store SOS alert details
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    // console.log("Received SOS Details:", user);
    const fetchSosDetail = useCallback(async () => {
        if (!user?.id || !id) {
            setError("User ID or SOS ID is not available.");
            return;
        }

        setLoading(true);
        setError(null);

        const controller = new AbortController();

        try {
            const data = await sosDetails(id, user.id, user.role, controller.signal); // Fetch data for the specific SOS alert
            // console.log("sosdetails", user.role);
            const response = data?.sos_details;
            console.log("Received SOS Details:", response);

            if (response?.id) {
                setSosDetail(response); // Assuming response contains the SOS detail data
            } else {
                console.error("Unexpected response format", response);
                setError("Data is not in expected format.");
            }
        } catch (err) {
            console.error(err);
            setError(err.message || "An error occurred while fetching SOS alert details");
        } finally {
            setLoading(false);
        }

        // Cleanup function to abort the request if needed
        return () => controller.abort();
    }, [user, id]);

    useEffect(() => {
        if (id) {
            fetchSosDetail();
        }
    }, [id, fetchSosDetail]); // Re-fetch when `id` changes

    return { sosDetail, loading, error };
};
