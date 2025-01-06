import React, { useState } from "react";
import styles from "./UserProfile.module.css";
import { ICONS } from "../utils/icons";
import Button from "../../components/button/Button";
import ChangePasswordPage from "./ChangePassword";
// import { useAuth } from '../../context/AuthContext';

const ProfilePage = () => {
    const [activeTab, setActiveTab] = useState("account");
    // const { user } = useAuth();
    // console.log("user profile", user);
    const user = JSON.parse(localStorage.getItem("user"));
    console.log(user);

    const [profileData, setProfileData] = useState({
        firstName: user?.username || "",
        id: user?.id || "",

        lastName: user?.lastName || "",
        email: user?.email || "",
        phoneNumber: user?.mobile_number || "",
        state: user?.state || "",
        address: user?.address || "",

        dob: user?.date_of_birth || "",
        role: user?.role || "",
        timezone: user?.user?.timezone || "",
        currency: user?.user?.currency || "",
    });

    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };

    const handleChange = (e) => {
        const { id, value } = e.target;
        setProfileData((prevData) => ({
            ...prevData,
            [id]: value,
        }));
    };

    const handleCancelEdit = () => {
        // Revert back to original profile data (no changes)
        setProfileData({
            id: user?.user?.id || "",
            firstName: user?.user?.firstName || "",
            lastName: user?.user?.lastName || "",
            email: user?.user?.email || "",
            phoneNumber: user?.user?.phoneNumber || "",
            state: user?.user?.state || "",
            address: user?.user?.address || "",
            country: user?.user?.country || "",
            language: user?.user?.language || "",
            timezone: user?.user?.timezone || "",
            currency: user?.user?.currency || "",
        });
    };

    return (
        <>
            <ul className={styles.navBar}>
                <li className={activeTab === "account" ? styles.active : ""} onClick={() => handleTabChange("account")}>
                    <span className={styles.icon}>{ICONS.USER}</span> Account Settings
                </li>
                <li className={activeTab === "security" ? styles.active : ""} onClick={() => handleTabChange("security")}>
                    <span className={styles.icon}>🔒</span> Change Password
                </li>
            </ul>
            <div className={styles.profilePage}>
                {activeTab === "account" && (
                    <div className={styles.profileContainer}>
                        <div className={styles.profileInfo}>
                            <div className={styles.row}>
                                <div className={styles.field}>
                                    <label>First Name</label>
                                    <input type="text" id="firstName" value={profileData.firstName} onChange={handleChange} placeholder={user?.user?.firstName} />
                                </div>
                                <div className={styles.field}>
                                    <label>ID</label>
                                    <input type="text" id="lastName" value={profileData.id} onChange={handleChange} placeholder="Doe" />
                                </div>
                            </div>
                            <div className={styles.row}>
                                <div className={styles.field}>
                                    <label>Email</label>
                                    <input type="email" id="email" value={profileData.email} onChange={handleChange} placeholder="john.doe@example.com" />
                                </div>
                                <div className={styles.field}>
                                    <label>Phone Number</label>
                                    <input type="tel" id="phoneNumber" value={profileData.phoneNumber} onChange={handleChange} placeholder="+1 202 555 0111" />
                                </div>
                            </div>
                            <div className={styles.row}>
                                <div className={styles.field}>
                                    <label>State</label>
                                    <input type="text" id="state" value={profileData.state} onChange={handleChange} placeholder="California" />
                                </div>
                                <div className={styles.field}>
                                    <label>Address</label>
                                    <input type="text" id="address" value={profileData.address} onChange={handleChange} placeholder="block abc" />
                                </div>
                            </div>
                            <div className={styles.row}>
                                <div className={styles.field}>
                                    <label>Date of Birth</label>
                                    <input type="text" id="dob" value={profileData.dob} onChange={handleChange} placeholder="date of birth" />
                                </div>
                                <div className={styles.field}>
                                    <label>Role</label>
                                    <input type="text" id="role" value={profileData.role} onChange={handleChange} placeholder="Role" />
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === "security" && <ChangePasswordPage />}
            </div>
        </>
    );
};

export default ProfilePage;
