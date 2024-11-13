// import React, { useMemo, useRef, useState } from "react";
// import styles from "./UserProfile.module.css";
// import { ICONS } from "../../utils/icons";
// import Button from "../../components/Button/Button";
// import { useUser } from "../../context/user";
// import DynamicForm from "../../components/Form/DynamicForm";
// import Utils from "../../utils";
// import { constants } from "../../utils/constants";
// import { notifyError } from "../../utils/toastUtil";

// const ProfilePage = () => {
//     const [activeTab, setActiveTab] = useState("account");
//     const { currentUser, updateUserProfilePicture } = useUser();

//     const handleTabChange = (tab) => {
//         setActiveTab(tab);
//     };

//     const [showPassword, setShowPassword] = useState({
//         current: false,
//         new: false,
//         confirm: false,
//     });

//     const [passwords, setPasswords] = useState({
//         current: "",
//         new: "",
//         confirm: "",
//     });

//     const [passwordValidations, setPasswordValidations] = useState({
//         minLength: false,
//         lowercase: false,
//         numberSymbol: false,
//     });

//     const handlePasswordChange = (e) => {
//         const { id, value } = e.target;
//         setPasswords((prevPasswords) => ({
//             ...prevPasswords,
//             [id]: value,
//         }));

//         if (id === "new") {
//             setPasswordValidations((prevValidations) => ({
//                 ...prevValidations,
//                 minLength: passwords.new.length >= 8,
//                 lowercase: /[a-z]/.test(passwords.new),
//                 numberSymbol: /[0-9\s\W]/.test(passwords.new),
//             }));
//         }
//     };
//     const isValid = Object.values(passwordValidations).every(Boolean);

//     const togglePasswordVisibility = (field) => {
//         setShowPassword((prevState) => ({
//             ...prevState,
//             [field]: !prevState[field],
//         }));
//     };

//     const buttons = [];

//     const formData = useMemo(() => {
//         const formItems = [
//             {
//                 type: "text",
//                 name: "full_name",
//                 label: "Name",
//                 required: true,
//                 disabled: true,
//                 grid: 2,
//                 defaultValue: currentUser?.full_name || "",
//             },
//             {
//                 type: "email",
//                 name: "mail",
//                 label: "Email Address",
//                 required: true,
//                 disabled: true,
//                 grid: 2,
//                 defaultValue: currentUser?.mail || "",
//             },
//             {
//                 type: "text",
//                 name: "designation",
//                 label: "Designation",
//                 required: true,
//                 disabled: true,
//                 grid: 2,
//                 defaultValue: currentUser?.designation || "",
//             },
//             {
//                 type: "select",
//                 name: "roles",
//                 label: "Roles",
//                 required: true,
//                 disabled: true,
//                 grid: 2,
//                 multiple: true,
//                 options: Object.entries(constants.ROLES || {}).map(([key, value]) => {
//                     return { label: key, value: value };
//                 }),
//                 defaultValue: currentUser?.roles || "",
//             },
//         ];
//         return formItems;
//     }, [currentUser]);

//     const handleSubmit = (forData) => {
//         console.log(forData);
//     };
//     const fileInputRef = useRef(null);

//     const handleButtonClick = () => {
//         fileInputRef.current.click();
//     };
//     const [file, setFile] = useState(null);
//     const [previewUrl, setPreviewUrl] = useState("");

//     const handleFileChange = (event) => {
//         const selectedFile = event.target.files[0];
//         if (selectedFile) {
//             const maxSize = 700 * 1024;

//             if (selectedFile.size > maxSize) {
//                 notifyError("File size exceeds the 700KB limit. Please choose a smaller file.");
//                 event.target.value = null;
//                 return;
//             }

//             setFile(selectedFile);
//             setPreviewUrl(URL.createObjectURL(selectedFile));
//         }
//     };

//     const handleRemove = () => {
//         setFile(null);
//         setPreviewUrl("");
//     };
//     const handlePasswordSubmit = (event) => {
//         event.preventDefault();
//         console.log(passwords);
//     };

//     async function uploadProfilePicture(file) {
//         const formData = new FormData();
//         formData.append("picture", file);
//         updateUserProfilePicture(formData);
//     }

//     const handleFileUpload = async () => {
//         await uploadProfilePicture(file);
//         // fetchCurrentUser();
//     };

//     return (
//         <>
//             <ul className={styles.navBar}>
//                 <li className={activeTab === "account" ? styles.active : ""} onClick={() => handleTabChange("account")}>
//                     <span className={styles.icon}>{ICONS.USER}</span> Account Settings
//                 </li>
//                 <li className={activeTab === "security" ? styles.active : ""} onClick={() => handleTabChange("security")}>
//                     <span className={styles.icon}>🔒</span> Change Password
//                 </li>
//             </ul>
//             <div className={styles.profilePage}>
//                 {activeTab === "account" && (
//                     <div className={styles.profileContainer}>
//                         <div className={styles.profilePhoto}>
//                             <img src={previewUrl || currentUser.profile_picture || require("./Assets/profile.webp")} alt="User Avatar" />
//                             <input accept=".jpg,.jpeg,.png" onChange={handleFileChange} type="file" ref={fileInputRef} style={{ display: "none" }} />
//                             <div className={styles.button_wrapper}>
//                                 <div className={styles.button_wrapper_two}>
//                                     {previewUrl ? (
//                                         <Button trigger={handleFileUpload} title="Submit" variant="secondary" />
//                                     ) : (
//                                         <Button trigger={handleButtonClick} title="Upload new photo" variant="secondary" />
//                                     )}
//                                     {previewUrl && <Button trigger={handleRemove} title="Reset" variant="primary" />}
//                                 </div>
//                                 <p>Allowed JPG, GIF, or PNG. Max size of 800KB.</p>
//                             </div>
//                         </div>

//                         <div className={styles.profileInfo}>
//                             <DynamicForm formData={formData} formButtons={buttons} onSubmit={handleSubmit} />
//                         </div>
//                     </div>
//                 )}

//                 {activeTab === "security" && (
//                     <div className={styles.passwordForm}>
//                         <h3>Change Password</h3>
//                         <form onSubmit={handlePasswordSubmit}>
//                             <div className={styles.inputRow}>
//                                 <div className={styles.inputGroup}>
//                                     <label htmlFor="current-password">Current Password</label>
//                                     <div className={styles.passwordField}>
//                                         <input
//                                             type={showPassword.current ? "text" : "password"}
//                                             id="current"
//                                             placeholder="Enter current password"
//                                             value={passwords.current}
//                                             onChange={handlePasswordChange}
//                                         />

//                                         <span className={styles.eyeIcon} onClick={() => togglePasswordVisibility("current")}>
//                                             {showPassword.current ? "👁️" : "🙈"}
//                                         </span>
//                                     </div>
//                                 </div>

//                                 {/* New Password */}
//                                 <div className={styles.inputGroup}>
//                                     <label htmlFor="new-password">New Password</label>
//                                     <div className={styles.passwordField}>
//                                         <input type={showPassword.new ? "text" : "password"} id="new" placeholder="Enter new password" value={passwords.new} onChange={handlePasswordChange} />
//                                         <span className={styles.eyeIcon} onClick={() => togglePasswordVisibility("new")}>
//                                             {showPassword.new ? "👁️" : "🙈"}
//                                         </span>
//                                     </div>
//                                 </div>

//                                 <div className={styles.inputGroup}>
//                                     <label htmlFor="confirm-password">Confirm New Password</label>
//                                     <div className={styles.passwordField}>
//                                         <input
//                                             type={showPassword.confirm ? "text" : "password"}
//                                             id="confirm"
//                                             placeholder="Confirm new password"
//                                             value={passwords.confirm}
//                                             onChange={handlePasswordChange}
//                                         />
//                                         <span className={styles.eyeIcon} onClick={() => togglePasswordVisibility("confirm")}>
//                                             {showPassword.confirm ? "👁️" : "🙈"}
//                                         </span>
//                                     </div>
//                                 </div>
//                             </div>

//                             <div className={styles.passwordRequirements}>
//                                 <h4>Password Requirements:</h4>
//                                 <ul>
//                                     <li className={passwordValidations.minLength ? styles.valid : styles.invalid}>Minimum 8 characters long - the more, the better</li>
//                                     <li className={passwordValidations.lowercase ? styles.valid : styles.invalid}>At least one lowercase character</li>
//                                     <li className={passwordValidations.numberSymbol ? styles.valid : styles.invalid}>At least one number, symbol, or whitespace character</li>
//                                     <li className={passwords.confirm != "" && passwords.new !== "" && passwords.confirm === passwords.new ? styles.valid : styles.invalid}>
//                                         Confirm password matches the new password
//                                     </li>
//                                 </ul>
//                             </div>

//                             <div className={styles.buttonRow}>
//                                 <Button title="Save changes" variant="secondary" disabled={!isValid} />
//                                 <Button title="Reset" variant="primary" />
//                             </div>
//                         </form>
//                     </div>
//                 )}
//             </div>
//         </>
//     );
// };

// export default ProfilePage;
// import React, { useState } from 'react';
// import styles from './UserProfile.module.css';
// import { ICONS } from "../utils/icons"
// import Button from '../../components/button/Button';
// import { useAuth } from '../../context/AuthContext';

// const ProfilePage = () => {
//     const [activeTab, setActiveTab] = useState('account');
//     const { user } = useAuth();
//     console.log("user profile",user)
//     const handleTabChange = (tab) => {
//         setActiveTab(tab);
//     };
//     const User = user?.user;
//     const [showPassword, setShowPassword] = useState({
//         current: false,
//         new: false,
//         confirm: false
//     });

//     const [passwords, setPasswords] = useState({
//         current: '',
//         new: '',
//         confirm: ''
//     });
//     const [passwordValidations, setPasswordValidations] = useState({
//         minLength: false,
//         lowercase: false,
//         numberSymbol: false
//     });


//     const handlePasswordChange = (e) => {
//         const { id, value } = e.target;
//         setPasswords((prevPasswords) => ({
//             ...prevPasswords,
//             [id]: value
//         }));

//         if (id === 'new') {
//             setPasswordValidations((prevValidations) => ({
//                 ...prevValidations,
//                 minLength: passwords.new.length >= 8,
//                 lowercase: /[a-z]/.test(passwords.new),
//                 numberSymbol: /[0-9\s\W]/.test(passwords.new)
//             }));
//         }
//     };
//     const isConfirmValid = passwords.confirm === passwords.new;
//     const isValid = Object.values(passwordValidations).every(Boolean);

//     const togglePasswordVisibility = (field) => {
//         setShowPassword((prevState) => ({
//             ...prevState,
//             [field]: !prevState[field]
//         }));
//     };

//     return (
//         <>
//             <ul className={styles.navBar}>
//                 <li
//                     className={activeTab === 'account' ? styles.active : ''}
//                     onClick={() => handleTabChange('account')}
//                 >
//                     <span className={styles.icon}>{ICONS.USER}</span> Account Settings
//                 </li>
//                 <li
//                     className={activeTab === 'security' ? styles.active : ''}
//                     onClick={() => handleTabChange('security')}
//                 >
//                     <span className={styles.icon}>🔒</span> Change Password
//                 </li>

//             </ul>
//             <div className={styles.profilePage}>


//                 {activeTab === 'account' && (
//                     <div className={styles.profileContainer}>
//                         {/* <div className={styles.profilePhoto}>
//                             <img src="avatar.png" alt="User Avatar" />
//                             <div className={styles.button_wrapper}>

//                                 <div className={styles.button_wrapper_two}>
//                                     <Button
//                                         title="Upload new photo"
//                                         variant='secondary'

//                                     />
//                                     <Button

//                                         title="Reset"
//                                         variant='primary'

//                                     />
//                                 </div>

//                                 <p>Allowed JPG, GIF, or PNG. Max size of 800KB.</p>
//                             </div>
//                         </div> */}

//                         <div className={styles.profileInfo}>
//                             <div className={styles.row}>
//                                 <div className={styles.field}>
//                                     <label>First Name</label>
//                                     <input type="text" placeholder={User?.username} />
//                                 </div>
//                                 <div className={styles.field}>
//                                     <label>Last Name</label>
//                                     <input type="text" placeholder="Doe" />
//                                 </div>
//                             </div>
//                             <div className={styles.row}>
//                                 <div className={styles.field}>
//                                     <label>Email</label>
//                                     <input type="email" placeholder="john.doe@example.com" />
//                                 </div>
//                                 <div className={styles.field}>
//                                     <label>Phone Number</label>
//                                     <input type="tel" placeholder="+1 202 555 0111" />
//                                 </div>
//                             </div>
//                             <div className={styles.row}>
//                                 <div className={styles.field}>
//                                     <label>State</label>
//                                     <input type="text" placeholder="California" />
//                                 </div>
//                                 <div className={styles.field}>
//                                     <label>Zip Code</label>
//                                     <input type="text" placeholder="231465" />
//                                 </div>
//                             </div>
//                             <div className={styles.row}>
//                                 <div className={styles.field}>
//                                     <label>Country</label>
//                                     <select>
//                                         <option value="">Select Country</option>
//                                     </select>
//                                 </div>
//                                 <div className={styles.field}>
//                                     <label>Language</label>
//                                     <select>
//                                         <option value="">Select Language</option>
//                                     </select>
//                                 </div>
//                             </div>
//                             <div className={styles.row}>
//                                 <div className={styles.field}>
//                                     <label>Timezone</label>
//                                     <select>
//                                         <option value="">Select Timezone</option>
//                                     </select>
//                                 </div>
//                                 <div className={styles.field}>
//                                     <label>Currency</label>
//                                     <select>
//                                         <option value="">Select Currency</option>
//                                     </select>
//                                 </div>
//                             </div>
//                             <div className={styles.buttonRow}>

//                                 <Button
//                                     title="Save changes"
//                                     variant='secondary'

//                                 />

//                                 <Button
//                                     title="Cancel"
//                                     variant='primary'

//                                 />

//                             </div>
//                         </div>
//                     </div>
//                 )}

//                 {activeTab === 'security' && (
//                     <div className={styles.passwordForm}>
//                         <h3>Change Password</h3>
//                         <form>
//                             <div className={styles.inputRow}>
//                                 <div className={styles.inputGroup}>
//                                     <label htmlFor="current-password">Current Password</label>
//                                     <div className={styles.passwordField}>
//                                         <input
//                                             type={showPassword.current ? "text" : "password"}
//                                             id="current"
//                                             placeholder="Enter current password"
//                                             value={passwords.current}
//                                             onChange={handlePasswordChange}
//                                         />


//                                         <span
//                                             className={styles.eyeIcon}
//                                             onClick={() => togglePasswordVisibility('current')}
//                                         >
//                                             {showPassword.current ? '👁️' : '🙈'}
//                                         </span>
//                                     </div>
//                                 </div>

//                                 {/* New Password */}
//                                 <div className={styles.inputGroup}>
//                                     <label htmlFor="new-password">New Password</label>
//                                     <div className={styles.passwordField}>
//                                         <input
//                                             type={showPassword.new ? "text" : "password"}
//                                             id="new"
//                                             placeholder="Enter new password"
//                                             value={passwords.new}
//                                             onChange={handlePasswordChange}
//                                         />
//                                         <span
//                                             className={styles.eyeIcon}
//                                             onClick={() => togglePasswordVisibility('new')}
//                                         >
//                                             {showPassword.new ? '👁️' : '🙈'}
//                                         </span>
//                                     </div>
//                                 </div>

//                                 <div className={styles.inputGroup}>
//                                     <label htmlFor="confirm-password">Confirm New Password</label>
//                                     <div className={styles.passwordField}>
//                                         <input
//                                             type={showPassword.confirm ? "text" : "password"}
//                                             id="confirm"
//                                             placeholder="Confirm new password"
//                                             value={passwords.confirm}
//                                             onChange={handlePasswordChange}
//                                         />
//                                         <span
//                                             className={styles.eyeIcon}
//                                             onClick={() => togglePasswordVisibility('confirm')}
//                                         >
//                                             {showPassword.confirm ? '👁️' : '🙈'}
//                                         </span>
//                                     </div>
//                                 </div>
//                             </div>

//                             <div className={styles.passwordRequirements}>
//                                 <h4>Password Requirements:</h4>
//                                 <ul>
//                                     <li
//                                         className={
//                                             passwordValidations.minLength ? styles.valid : styles.invalid
//                                         }
//                                     >
//                                         Minimum 8 characters long - the more, the better
//                                     </li>
//                                     <li
//                                         className={
//                                             passwordValidations.lowercase ? styles.valid : styles.invalid
//                                         }
//                                     >
//                                         At least one lowercase character
//                                     </li>
//                                     <li
//                                         className={
//                                             passwordValidations.numberSymbol ? styles.valid : styles.invalid
//                                         }
//                                     >
//                                         At least one number, symbol, or whitespace character
//                                     </li>
//                                     <li
//                                         className={passwords.confirm != "" && passwords.new !== "" && passwords.confirm === passwords.new ? styles.valid : styles.invalid}
//                                     >
//                                         Confirm password matches the new password
//                                     </li>
//                                 </ul>
//                             </div>

//                             <div className={styles.buttonRow}>
//                                 <Button title="Save changes" variant='secondary' disabled={!isValid} />
//                                 <Button title="Reset" variant='primary' />
//                             </div>
//                         </form>
//                     </div>
//                 )}


//             </div>
//         </>
//     );
// };

// export default ProfilePage;





import React, { useState } from 'react';
import styles from './UserProfile.module.css';
import { ICONS } from "../utils/icons";
import Button from '../../components/button/Button';
import { useAuth } from '../../context/AuthContext';

const ProfilePage = () => {
    const [activeTab, setActiveTab] = useState('account');
    const { user } = useAuth();
    console.log("user profile", user);

    // Edit mode state
    const [isEditing, setIsEditing] = useState(false);

    const [profileData, setProfileData] = useState({
        firstName: user?.user?.username || '',
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
                        {/* Password change form goes here */}
                    </div>
                )}
            </div>
        </>
    );
};

export default ProfilePage;
