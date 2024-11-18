import React, { useState } from 'react';
import styles from './UserProfile.module.css';
import { ICONS } from "../utils/icons";
import Button from '../../components/button/Button';
import { useAuth } from '../../context/AuthContext';

const AccountSettings = ({ user, isEditing, profileData, setProfileData, handleChange, handleSaveChanges, handleCancelEdit, setIsEditing }) => {
    return (
        <div className={styles.profilePage}>
            <ul className={styles.navBar}>
                <li
                    className={styles.active}
                    onClick={() => {}}
                >
                    <span className={styles.icon}>{ICONS.USER}</span> Account Settings
                </li>
            </ul>
            <div className={styles.profileContainer}>
                <div className={styles.profileInfo}>
                    <div className={styles.row}>
                        <div className={styles.field}>
                            <label>ID</label>
                            <input
                                type="text"
                                id="lastName"
                                value={profileData.id}
                                onChange={handleChange}
                                placeholder="Doe"
                                disabled={!isEditing}
                            />
                        </div>

                        <div className={styles.field}>
                            <label>First Name</label>
                            <input
                                type="text"
                                id="firstName"
                                value={profileData.firstName}
                                onChange={handleChange}
                                placeholder={user?.user?.firstName}
                                disabled={!isEditing}
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
                                disabled={!isEditing}
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
                                disabled={!isEditing}
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
                                disabled={!isEditing}
                            />
                        </div>
                        <div className={styles.field}>
                            <label>Zip Code</label>
                            <input
                                type="text"
                                id="zipCode"
                                value={profileData.zipCode}
                                onChange={handleChange}
                                placeholder="231465"
                                disabled={!isEditing}
                            />
                        </div>
                    </div>
                    <div className={styles.row}>
                        <div className={styles.field}>
                            <label>Country</label>
                            <select
                                id="country"
                                value={profileData.country}
                                onChange={handleChange}
                                disabled={!isEditing}
                            >
                                <option value="">Select Country</option>
                            </select>
                        </div>
                        <div className={styles.field}>
                            <label>Language</label>
                            <select
                                id="language"
                                value={profileData.language}
                                onChange={handleChange}
                                disabled={!isEditing}
                            >
                                <option value="">Select Language</option>
                            </select>
                        </div>
                    </div>
                    <div className={styles.row}>
                        <div className={styles.field}>
                            <label>Timezone</label>
                            <select
                                id="timezone"
                                value={profileData.timezone}
                                onChange={handleChange}
                                disabled={!isEditing}
                            >
                                <option value="">Select Timezone</option>
                            </select>
                        </div>
                        <div className={styles.field}>
                            <label>Currency</label>
                            <select
                                id="currency"
                                value={profileData.currency}
                                onChange={handleChange}
                                disabled={!isEditing}
                            >
                                <option value="">Select Currency</option>
                            </select>
                        </div>
                    </div>
                    <div className={styles.buttonRow}>
                        {!isEditing ? (
                            <Button
                                title="Edit Profile"
                                variant="secondary"
                                onClick={() => setIsEditing(true)}
                            />
                        ) : (
                            <>
                                <Button
                                    title="Save changes"
                                    variant="secondary"
                                    onClick={handleSaveChanges}
                                />
                                <Button
                                    title="Cancel"
                                    variant="primary"
                                    onClick={handleCancelEdit}
                                />
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AccountSettings;
