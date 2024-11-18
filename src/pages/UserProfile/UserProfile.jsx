import React, { useState } from 'react';
import styles from './UserProfile.module.css';
import { ICONS } from "../utils/icons";
import Button from '../../components/button/Button';
import { useAuth } from '../../context/AuthContext';

const ProfilePage = () => {
    const [activeTab, setActiveTab] = useState('account');
    const [isEditing, setIsEditing] = useState()
    const { user } = useAuth();
    console.log("user profile", user);  

    // Edit mode state
       const [showPassword, setShowPassword] = useState({
        current: false,
        new: false,
        confirm: false
    });

    const [passwords, setPasswords] = useState({
        current: '',
        new: '',
        confirm: ''
    });
    const [passwordValidations, setPasswordValidations] = useState({
        minLength: false,
        lowercase: false,
        numberSymbol: false
    });


    const handlePasswordChange = (e) => {
        const { id, value } = e.target;
        setPasswords((prevPasswords) => ({
            ...prevPasswords,
            [id]: value 
        }));

        if (id === 'new') {
            setPasswordValidations((prevValidations) => ({
                ...prevValidations,
                minLength: passwords.new.length >= 8,
                lowercase: /[a-z]/.test(passwords.new),
                numberSymbol: /[0-9\s\W]/.test(passwords.new)
            }));
        }
    };


    const isConfirmValid = passwords.confirm === passwords.new;
    const isValid = Object.values(passwordValidations).every(Boolean);

    const togglePasswordVisibility = (field) => {
        setShowPassword((prevState) => ({
            ...prevState,
            [field]: !prevState[field]
        }));
    };

    const [profileData, setProfileData] = useState({
        firstName: user?.user?.username || '',
        id: user?.user?.id || '',

        lastName: user?.user?.lastName || '',
        email: user?.user?.email || '',
        phoneNumber: user?.user?.mobile_number || '',
        state: user?.user?.state || '',
        zipCode: user?.user?.zipCode || '',
        country: user?.user?.country || '',
        language: user?.user?.language || '',
        timezone: user?.user?.timezone || '',
        currency: user?.user?.currency || '',
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

    const handleSaveChanges = () => {
        // Send the updated profile data to the backend (e.g., API call)
        console.log("Saving profile data:", profileData);
        // After saving, you can set the edit mode to false
        setIsEditing(false);
    };

    const handleCancelEdit = () => {
        // Revert back to original profile data (no changes)
        setProfileData({
            id: user?.user?.id || '',
            firstName: user?.user?.firstName || '',
            lastName: user?.user?.lastName || '',
            email: user?.user?.email || '',
            phoneNumber: user?.user?.phoneNumber || '',
            state: user?.user?.state || '',
            zipCode: user?.user?.zipCode || '',
            country: user?.user?.country || '',
            language: user?.user?.language || '',
            timezone: user?.user?.timezone || '',
            currency: user?.user?.currency || '',
        });
        setIsEditing(false);
    };

    return (
        <>
            <ul className={styles.navBar}>
                <li
                    className={activeTab === 'account' ? styles.active : ''}
                    onClick={() => handleTabChange('account')}
                >
                    <span className={styles.icon}>{ICONS.USER}</span> Account Settings
                </li>
                <li
                    className={activeTab === 'security' ? styles.active : ''}
                    onClick={() => handleTabChange('security')}
                >
                    <span className={styles.icon}>🔒</span> Change Password
                </li>
            </ul>
            <div className={styles.profilePage}>
                {activeTab === 'account' && (
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
                )}

                {activeTab === 'security' && (
                     <div className={styles.passwordForm}>
                                             <h3>Change Password</h3>
                                             <form>
                                                 <div className={styles.inputRow}>
                                                     <div className={styles.inputGroup}>
                                                         <label htmlFor="current-password">Current Password</label>
                                                         <div className={styles.passwordField}>
                                                             <input
                                                                 type={showPassword.current ? "text" : "password"}
                                                                 id="current"
                                                                 placeholder="Enter current password"
                                                                 value={passwords.current}
                                                                 onChange={handlePasswordChange}
                                                             />
                     
                     
                                                             <span
                                                                 className={styles.eyeIcon}
                                                                 onClick={() => togglePasswordVisibility('current')}
                                                             >
                                                                 {showPassword.current ? '👁️' : '🙈'}
                                                             </span>
                                                         </div>
                                                     </div>
                     
                                                     {/* New Password */}
                                                     <div className={styles.inputGroup}>
                                                         <label htmlFor="new-password">New Password</label>
                                                         <div className={styles.passwordField}>
                                                             <input
                                                                 type={showPassword.new ? "text" : "password"}
                                                                 id="new"
                                                                 placeholder="Enter new password"
                                                                 value={passwords.new}
                                                                 onChange={handlePasswordChange}
                                                             />
                                                             <span
                                                                 className={styles.eyeIcon}
                                                                 onClick={() => togglePasswordVisibility('new')}
                                                             >
                                                                 {showPassword.new ? '👁️' : '🙈'}
                                                             </span>
                                                         </div>
                                                     </div>
                     
                                                     <div className={styles.inputGroup}>
                                                         <label htmlFor="confirm-password">Confirm New Password</label>
                                                         <div className={styles.passwordField}>
                                                             <input
                                                                 type={showPassword.confirm ? "text" : "password"}
                                                                 id="confirm"
                                                                 placeholder="Confirm new password"
                                                                 value={passwords.confirm}
                                                                 onChange={handlePasswordChange}
                                                             />
                                                             <span
                                                                 className={styles.eyeIcon}
                                                                 onClick={() => togglePasswordVisibility('confirm')}
                                                             >
                                                                 {showPassword.confirm ? '👁️' : '🙈'}
                                                             </span>
                                                         </div>
                                                     </div>
                                                 </div>
                     
                                                 <div className={styles.passwordRequirements}>
                                                     <h4>Password Requirements:</h4>
                                                     <ul>
                                                         <li
                                                             className={
                                                                 passwordValidations.minLength ? styles.valid : styles.invalid
                                                             }
                                                         >
                                                             Minimum 8 characters long - the more, the better
                                                         </li>
                                                         <li
                                                             className={
                                                                 passwordValidations.lowercase ? styles.valid : styles.invalid
                                                             }
                                                         >
                                                             At least one lowercase character
                                                         </li>
                                                         <li
                                                             className={
                                                                 passwordValidations.numberSymbol ? styles.valid : styles.invalid
                                                             }
                                                         >
                                                             At least one number, symbol, or whitespace character
                                                         </li>
                                                         <li
                                                             className={passwords.confirm != "" && passwords.new !== "" && passwords.confirm === passwords.new ? styles.valid : styles.invalid}
                                                         >
                                                             Confirm password matches the new password
                                                         </li>
                                                     </ul>
                                                 </div>
                     
                                                 <div className={styles.buttonRow}>
                                                     <Button title="Save changes" variant='secondary' disabled={!isValid} />
                                                     <Button title="Reset" variant='primary' />
                                                 </div>
                                             </form>
                                         </div>
                )}
            </div>
        </>
    );
};

export default ProfilePage;
