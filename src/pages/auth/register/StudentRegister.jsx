import React, { useState } from 'react';
import axios from 'axios';
import styles from './Student.module.css';
import Swal from 'sweetalert2'; // Import SweetAlert

const StudentRegister = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [age, setAge] = useState('');
    const [gender, setGender] = useState('');
    const [state, setState] = useState('');
    const [collegeName, setCollegeName] = useState('');
    const [collegeIdProof, setCollegeIdProof] = useState(null);

    // Validation messages for each field
    const [usernameError, setUsernameError] = useState('');
    const [collegeError, setCollegeError] = useState('');
    const [stateError, setStateError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [phoneError, setPhoneError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');
    

    const handleFileChange = (e) => {
        setCollegeIdProof(e.target.files[0]);
    };

    // Validation functions
    const isUsernameValid = (username) => /^[a-zA-Z0-9]{5,}$/.test(username);
    const isEmailValid = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const phonePattern = /^(?:\+91[-\s]?)?[0-9]{10}$/;
    const isPasswordValid = (password) =>
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password);
    const isStateValid = (state) => /^[a-zA-Z0-9]{5,}$/.test(state);
    const isCollegeValid = (collegeName) => /^[a-zA-Z0-9]{5,}$/.test(collegeName);

    const handleRegister = async (e) => {
        e.preventDefault();

        // Reset error messages
        setUsernameError('');
        setEmailError('');
        setPhoneError('');
        setPasswordError('');
        setStateError('');
        setConfirmPasswordError('');
        setCollegeError('');

        // Username validation
        if (!isUsernameValid(username)) {
            setUsernameError("Username must be at least 5 characters and contain only letters and numbers.");
            return;
        }
        if (!isCollegeValid(collegeName)) {
            setCollegeError("Collage must be at least 5 characters and contain only letters and numbers.");
            return;
        }
        if (!isStateValid(state)) {
            setStateError("State must be at least 5 characters and contain only letters");
            return;
        }

        // Email validation
        if (!isEmailValid(email)) {
            setEmailError("Please enter a valid email address.");
            return;
        }

        // Phone number validation
        if (!phonePattern.test(phoneNumber)) {
            setPhoneError("Phone number must be 10 digits or in the format +91 1234567890.");
            return;
        }

        // Password validation
        if (!isPasswordValid(password)) {
            setPasswordError("Password must be at least 8 characters, include an uppercase letter, lowercase letter, number, and a special character.");
            return;
        }

        // Check if passwords match
        if (password !== confirmPassword) {
            setConfirmPasswordError("Passwords do not match.");
            return;
        }

        // FormData for sending multipart/form-data
        const formData = new FormData();
        formData.append('username', username);
        formData.append('email', email);
        formData.append('phone_number', phoneNumber);
        formData.append('password', password);
        formData.append('confirm_password', confirmPassword);
        formData.append('age', age);
        formData.append('gender', gender);
        formData.append('state', state);
        formData.append('college_name', collegeName);
        if (collegeIdProof) {
            formData.append('college_id_proof', collegeIdProof);
        }

        try {
            const response = await axios.post('http://172.29.27.254:8000/api/students/register/', formData);
            console.log('Registration successful', response.data);
            Swal.fire('Success!', 'Registration successful!', 'success'); // Use SweetAlert for success message
        } catch (error) {
            console.error('Registration failed', error);
            Swal.fire('Error!', 'Registration failed. Please try again.', 'error'); // Use SweetAlert for error message
        }
    };
const handleUsernameChange = (e) => {
    const value = e.target.value;
    setUsername(value);
    if (!isUsernameValid(value)) {
        setUsernameError("Username must be at least 5 characters and contain only letters and numbers.");
    } else {
        setUsernameError('');
    }
};

const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    if (!isEmailValid(value)) {
        setEmailError("Please enter a valid email address.");
    } else {
        setEmailError('');
    }
};

const handlePhoneChange = (e) => {
    const value = e.target.value.replace(/[^0-9]/g, ''); // Only allow digits
    setPhoneNumber(value);
    if (!phonePattern.test(value)) {
        setPhoneError("Phone number must be exactly 10 digits.");
    } else {
        setPhoneError('');
    }
};

const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    if (!isPasswordValid(value)) {
        setPasswordError("Password must be at least 8 characters, include an uppercase letter, lowercase letter, number, and a special character.");
    } else {
        setPasswordError('');
    }
};
const handleStateChange = (e) => {
    const value = e.target.value;
    setState(value);
    if (!isStateValid(value)) {
        setStateError("state must be at least 5 characters and contain only letters and numbers.");
    } else {
        setStateError('');
    }
};
const handleCollageChange = (e) => {
    const value = e.target.value;
    setCollegeName(value);
    if (!isCollegeValid(value)) {
        setCollegeError("Collage must be at least 5 characters and contain only letters and numbers.");
    } else {
        setCollegeError('');
    }
};
const handleConfirmPasswordChange = (e) => {
    const value = e.target.value;
    setConfirmPassword(value);
    if (value !== password) {
        setConfirmPasswordError("Passwords do not match.");
    } else {
        setConfirmPasswordError('');
    }
};

    return (
        <div className={styles.registerContainer}>
            <div className={styles.registerBox}>
                <h2 className={styles.title}>Student Registration</h2>
                <form onSubmit={handleRegister} className={styles.form}>
                    <div className={styles.inputGroup}>
                        <label className={styles.label}>Username</label>
                        <input
                            type="text"
                            value={username}
                            onChange={handleUsernameChange}
                            placeholder="Enter your username"
                            required
                            className={styles.input}
                        />
                        {usernameError && <span className={styles.error}>{usernameError}</span>}
                    </div>

                    <div className={styles.inputGroup}>
                        <label className={styles.label}>Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={handleEmailChange}
                            className={styles.input}
                            placeholder="Enter your email"
                            required
                        />
                        {emailError && <span className={styles.error}>{emailError}</span>}
                    </div>

                    <div className={styles.inputGroup}>
                        <label className={styles.label}>Phone Number</label>
                        <input
                            type="text"
                            value={phoneNumber}
                            onChange={handlePhoneChange}
                            className={styles.input}
                            placeholder="Enter your phone number"
                            required
                        />
                        {phoneError && <span className={styles.error}>{phoneError}</span>}
                    </div>

                    <div className={styles.inputGroup}>
                        <label className={styles.label}>Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={handlePasswordChange}
                            className={styles.input}
                            placeholder="Enter your password"
                            required
                        />
                        {passwordError && <span className={styles.error}>{passwordError}</span>}
                    </div>

                    <div className={styles.inputGroup}>
                        <label className={styles.label}>Confirm Password</label>
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={handleConfirmPasswordChange}
                            className={styles.input}
                            placeholder="Confirm your password"
                            required
                        />
                        {confirmPasswordError && <span className={styles.error}>{confirmPasswordError}</span>}
                    </div>

                    <div className={styles.inputGroup}>
                        <label className={styles.label}>Age</label>
                        <input
                            type="number"
                            value={age}
                            onChange={(e) => setAge(e.target.value)}
                            className={styles.input}
                            placeholder="Enter your age"
                            required
                        />
                    </div>

                    <div className={styles.inputGroup}>
                        <label className={styles.label}>Gender</label>
                        <select
                            value={gender}
                            onChange={(e) => setGender(e.target.value)}
                            className={styles.input}
                            required
                        >
                            <option value="">Select Gender</option>
                            <option value="M">Male</option>
                            <option value="F">Female</option>
                            <option value="O">Other</option>
                        </select>
                    </div>

                    <div className={styles.inputGroup}>
                        <label className={styles.label}>State</label>
                        <input
                            type="text"
                            value={state}
                            onChange={handleStateChange}
                            className={styles.input}
                            placeholder="Enter your state"
                            required
                        />
                        {stateError && <span className={styles.error}>{stateError}</span>}
                    </div>

                    <div className={styles.inputGroup}>
                        <label className={styles.label}>College Name</label>
                        <input
                            type="text"
                            value={collegeName}
                            onChange={handleCollageChange}
                            className={styles.input}
                            placeholder="Enter your college name"
                            required
                        />
                        {collegeError && <span className={styles.error}>{collegeError}</span>}

                    </div>

                    <div className={styles.inputGroup}>
                        <label className={styles.label}>College ID Proof</label>
                        <input
                            type="file"
                            onChange={handleFileChange}
                            className={styles.input}
                            required
                        />
                    </div>
                    <button type="submit" className={styles.registerButton}>
                        Register
                    </button>
                </form>
            </div>
        </div>
    );
};

export default StudentRegister;
