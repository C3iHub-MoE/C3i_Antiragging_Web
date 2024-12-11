import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; // to access the route parameters
import { useSosDetails } from "../../hooks/useSosDetails"; // Import the custom hook
import styles from "./StudentProfile.module.css";

const StudentDetailsPage = () => {
    const { id } = useParams(); // Get the student ID from the URL parameter
    const { sosDetail, loading, error } = useSosDetails(id); // Use the custom hook to fetch the details

    if (loading) return <p>Loading...</p>;
    if (error) return <p style={{ color: "red" }}>{error}</p>;

    return (
        <div className={styles.sosDetailsContainer}>
            <h1 className={styles.sosDetailsHeading}>Student SOS Details</h1>
            {sosDetail && (
                <div className={styles.sosDetailsContent}>
                    <div className={styles.sosDetailsSection}>
                        <h2 className={styles.sectionTitle}>Student Information</h2>
                        <p>
                            <strong>Name:</strong> {sosDetail?.student_info?.name}
                        </p>
                        <p>
                            <strong>Student ID:</strong> {sosDetail.student_info?.id}
                        </p>
                        <p>
                            <strong>Email:</strong> {sosDetail.student_info?.email}
                        </p>
                        <p>
                            <strong>Mobile Number:</strong> {sosDetail.student_info?.phone}
                        </p>
                    </div>
                    <div className={styles.sosDetailsSection}>
                        <h2 className={styles.sectionTitle}>Location</h2>
                        <p>
                            <strong>Location:</strong> {sosDetail?.location?.name}
                        </p>
                        <p>
                            <strong>Location Coordinates:</strong> {sosDetail?.location?.latitude}, {sosDetail?.location?.longitude}
                        </p>
                    </div>
                    <div className={styles.sosDetailsSection}>
                        <h2 className={styles.sectionTitle}>SOS Status</h2>
                        <p>
                            <strong>Timestamp:</strong> {new Date(sosDetail?.status?.timestamp).toLocaleString()}
                        </p>
                        <p>
                            <strong>Acknowledged:</strong> {sosDetail?.status?.acknowledged ? "Yes" : "No"}
                        </p>
                        <p>
                            <strong>Acknowledged By:</strong> {sosDetail.status?.acknowledged_by || "N/A"}
                        </p>
                        <p>
                            <strong>Acknowledged Time:</strong> {sosDetail.status?.acknowledgement_time || "N/A"}
                        </p>
                        <p>
                            <strong>Intervention Details:</strong> {sosDetail.status?.intervention_details || "N/A"}
                        </p>
                        <p>
                            <strong>Is Active:</strong> {sosDetail.status?.is_active ? "Yes" : "No"}
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default StudentDetailsPage;
