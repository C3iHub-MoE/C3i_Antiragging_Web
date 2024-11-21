import React, { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import styles from '../auth/register/Student.module.css';

import Swal from 'sweetalert2'; // Import SweetAlert

const NewStudentRegister = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [age, setAge] = useState('');
    const [gender, setGender] = useState('');
    const [district, setDistrict] = useState('');
    const [states, setStates] = useState([]); // New state for states
    const [colleges, setColleges] = useState([]);


    const [selectedState, setSelectedState] = useState(''); // Renamed for clarity
    const [districts, setDistricts] = useState([]); // New state for districts


    const [collegeName, setCollegeName] = useState('');
    const [collegeIdProof, setCollegeIdProof] = useState(null);

    // Validation messages for each field
    const [usernameError, setUsernameError] = useState('');
    const [collegeError, setCollegeError] = useState('');
    const [stateError, setStateError] = useState('');
    const [districtError, setDistrictError] = useState('');

    const [emailError, setEmailError] = useState('');
    const [phoneError, setPhoneError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');


    const handleFileChange = (e) => {
        setCollegeIdProof(e.target.files[0]);
    };
    useEffect(() => {
        axios.get('/api/states')
            .then(response => setStates(response.data)) // Set states here
            .catch(error => console.error('Error fetching states:', error));
    }, []);

    // Fetch districts when state changes
    useEffect(() => {
        if (selectedState) {
            axios.get(`/api/districts?state=${selectedState}`)
                .then(response => setDistricts(response.data))
                .catch(error => console.error('Error fetching districts:', error));
        } else {
            setDistricts([]); // Reset districts if no state is selected
        }
    }, [selectedState]);

    // Fetch colleges when district changes
    useEffect(() => {
        if (district) {
            axios.get(`/api/colleges?district=${district}`)
                .then(response => setColleges(response.data))
                .catch(error => console.error('Error fetching colleges:', error));
        } else {
            setColleges([]); // Reset colleges if no district is selected
        }
    }, [district]);

    // Validation functions
    const isUsernameValid = (username) => {
        // Remove extra spaces between words and trim leading/trailing spaces
        const trimmedUsername = username.trim().replace(/\s+/g, ' ');

        // Count letters (non-space characters) and total length
        const letterCount = trimmedUsername.replace(/\s/g, '').length;
        const totalLength = trimmedUsername.length;

        // Check if there are at most 3 spaces and minimum 5 letters
        return letterCount >= 5 && (totalLength - letterCount) <= 3;
    };
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
        if (!isStateValid(selectedState)) {
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
        formData.append('state', selectedState);
        formData.append('district', district);
        formData.append('college_name', collegeName);

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
        setSelectedState(e.target.value); // Set the selected state
        setDistrict(''); // Reset district when state changes
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
                        <select
                            value={selectedState}
                            onChange={handleStateChange}
                            className={styles.input}
                            required
                        >
                            <option value="" disabled>Select your state</option>
                            {states.map(state => (
                                <option key={state.id} value={state.name}>{state.name}</option>
                            ))}
                        </select>
                        {stateError && <span className={styles.error}>{stateError}</span>}
                    </div>

                    <div className={styles.inputGroup}>
                        <label className={styles.label}>District</label>
                        <select
                            value={district}
                            onChange={(e) => setDistrict(e.target.value)}
                            className={styles.input}
                            required
                            disabled={!selectedState}
                        >
                            <option value="" disabled>Select your district</option>
                            {districts.map(district => (
                                <option key={district.id} value={district.name}>{district.name}</option>
                            ))}
                        </select>
                        {districtError && <span className={styles.error}>{districtError}</span>}
                    </div>


                    <div className={styles.inputGroup}>
                        <label className={styles.label}>College Name</label>
                        <select
                            value={collegeName}
                            onChange={(e) => setCollegeName(e.target.value)}
                            className={styles.input}
                            required
                        >
                            <option value="" disabled>Select your college</option>
                            {colleges.map(college => (
                                <option key={college.id} value={college.name}>{college.name}</option>
                            ))}
                        </select>
                        {collegeError && <span className={styles.error}>{collegeError}</span>}
                    </div>

                    <div className={styles.inputGroup}>
                        <label className={styles.label}>ID Proof</label>
                        <input
                            type="file"
                            onChange={handleFileChange}
                            className={styles.input}
                            accept=".pdf,.jpg,.jpeg,.png"
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

export default NewStudentRegister;

