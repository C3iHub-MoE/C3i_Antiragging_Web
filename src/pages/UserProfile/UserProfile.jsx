import React, { useEffect, useState } from "react";
import styles from "./UserProfile.module.css";
import { ICONS } from "../utils/icons";
import Button from "../../components/button/Button";
import ChangePasswordPage from "./ChangePassword";
import { useUserProfile } from "../../hooks/useUserList";
// import { useAuth } from '../../context/AuthContext';

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState("account");
  const { currentUser, isLoading, error } = useUserProfile();
  // const { user } = useAuth();
  // console.log("user profile", user);
  //   const user = JSON.parse(localStorage.getItem("user"));

  const user = currentUser;

  const [profileData, setProfileData] = useState({
    firstName: "",
    id: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    state: "",
    address: "",
    dob: "",
    role: "",
    timezone: "",
    currency: "",
  });

  // Populate profileData once user is available
  useEffect(() => {
    if (user) {
      const userData = user?.user || user; // fallback if data is not nested
      setProfileData({
        firstName: user?.username || userData?.firstName || "",
        id: user?.id || userData?.id || "",
        lastName: userData?.lastName || "",
        email: userData?.email || "",
        phoneNumber: userData?.mobile_number || userData?.phoneNumber || "",
        state: userData?.state || "",
        address: userData?.address || "",
        dob: userData?.date_of_birth || "",
        role: userData?.role || "",
        timezone: userData?.timezone || "",
        currency: userData?.currency || "",
      });
    }
  }, [user]);

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

  console.log(user, profileData, "uuuuuuuuusssserr");

  const handleCancelEdit = () => {
    const userData = user?.user || user;
    setProfileData({
      firstName: user?.username || userData?.firstName || "",
      id: user?.id || userData?.id || "",
      lastName: userData?.lastName || "",
      email: userData?.email || "",
      phoneNumber: userData?.mobile_number || userData?.phoneNumber || "",
      state: userData?.state || "",
      address: userData?.address || "",
      dob: userData?.date_of_birth || "",
      role: userData?.role || "",
      timezone: userData?.timezone || "",
      currency: userData?.currency || "",
    });
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading user profile.</div>;

  return (
    <>
      <ul className={styles.navBar}>
        <li
          className={activeTab === "account" ? styles.active : ""}
          onClick={() => handleTabChange("account")}
        >
          <span className={styles.icon}>{ICONS.USER}</span> Account Settings
        </li>
        <li
          className={activeTab === "security" ? styles.active : ""}
          onClick={() => handleTabChange("security")}
        >
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
                  <input
                    type="text"
                    id="firstName"
                    value={profileData.firstName}
                    onChange={handleChange}
                    placeholder={profileData.firstName}
                  />
                </div>
                <div className={styles.field}>
                  <label>ID</label>
                  <input
                    type="text"
                    id="lastName"
                    value={profileData.id}
                    onChange={handleChange}
                    placeholder="Doe"
                  />
                </div>
              </div>
              <div className={styles.row}>
                <div className={styles.field}>
                  <label>Email</label>
                  <input
                    type="email"
                    id="email"
                    value={profileData.email}
                    onChange={handleChange}
                    placeholder="john.doe@example.com"
                  />
                </div>
                <div className={styles.field}>
                  <label>Phone Number</label>
                  <input
                    type="tel"
                    id="phoneNumber"
                    value={profileData.phoneNumber}
                    onChange={handleChange}
                    placeholder="+1 202 555 0111"
                  />
                </div>
              </div>
              <div className={styles.row}>
                <div className={styles.field}>
                  <label>State</label>
                  <input
                    type="text"
                    id="state"
                    value={profileData.state}
                    onChange={handleChange}
                    placeholder="California"
                  />
                </div>
                <div className={styles.field}>
                  <label>Address</label>
                  <input
                    type="text"
                    id="address"
                    value={profileData.address}
                    onChange={handleChange}
                    placeholder="block abc"
                  />
                </div>
              </div>
              <div className={styles.row}>
                <div className={styles.field}>
                  <label>Date of Birth</label>
                  <input
                    type="text"
                    id="dob"
                    value={profileData.dob}
                    onChange={handleChange}
                    placeholder="date of birth"
                  />
                </div>
                <div className={styles.field}>
                  <label>Role</label>
                  <input
                    type="text"
                    id="role"
                    value={profileData.role}
                    onChange={handleChange}
                    placeholder="Role"
                  />
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
