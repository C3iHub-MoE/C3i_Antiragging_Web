
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import styles from './Student.module.css';
// import Swal from 'sweetalert2'; // Import SweetAlert

// const StudentRegister = () => {
//     const [username, setUsername] = useState('');
//     const [email, setEmail] = useState('');
//     const [phoneNumber, setPhoneNumber] = useState('');
//     const [password, setPassword] = useState('');
//     const [confirmPassword, setConfirmPassword] = useState('');
//     const [age, setAge] = useState('');
//     const [gender, setGender] = useState('');
//     const [selectedState, setSelectedState] = useState(''); // Renamed for clarity
//     const [district, setDistrict] = useState('');
//     const [collegeName, setCollegeName] = useState('');
//     const [collegeIdProof, setCollegeIdProof] = useState(null);
//     const [role, setRole] = useState('student'); // New state for role

//     // Validation messages for each field
//     const [usernameError, setUsernameError] = useState('');
//     const [collegeError, setCollegeError] = useState('');
//     const [stateError, setStateError] = useState('');
//     const [districtError, setDistrictError] = useState('');
//     const [emailError, setEmailError] = useState('');
//     const [phoneError, setPhoneError] = useState('');
//     const [passwordError, setPasswordError] = useState('');
//     const [confirmPasswordError, setConfirmPasswordError] = useState('');
//     const [colleges, setColleges] = useState([]);
//     const [districts, setDistricts] = useState([]); // New state for districts
//     const [states, setStates] = useState([]); // New state for states

//     const handleFileChange = (e) => {
//         setCollegeIdProof(e.target.files[0]);
//     };

//     // Validation functions...
//     // (remains unchanged)

//     useEffect(() => {
//         axios.get('/api/states')
//             .then(response => setStates(response.data)) // Set states here
//             .catch(error => console.error('Error fetching states:', error));
//     }, []);

//     // Fetch districts when state changes
//     useEffect(() => {
//         if (selectedState) {
//             axios.get(`/api/districts?state=${selectedState}`)
//                 .then(response => setDistricts(response.data))
//                 .catch(error => console.error('Error fetching districts:', error));
//         } else {
//             setDistricts([]); // Reset districts if no state is selected
//         }
//     }, [selectedState]);

//     // Fetch colleges when district changes
//     useEffect(() => {
//         if (district) {
//             axios.get(`/api/colleges?district=${district}`)
//                 .then(response => setColleges(response.data))
//                 .catch(error => console.error('Error fetching colleges:', error));
//         } else {
//             setColleges([]); // Reset colleges if no district is selected
//         }
//     }, [district]);

//     const handleRegister = async (e) => {
//         e.preventDefault();
//         // Reset error messages...
//         // (remains unchanged)

//         // Validation logic...
//         // (remains unchanged)

//         const formData = new FormData();
//         formData.append('username', username);
//         formData.append('email', email);
//         formData.append('phone_number', phoneNumber);
//         formData.append('password', password);
//         formData.append('confirm_password', confirmPassword);
//         formData.append('age', age);
//         formData.append('gender', gender);
//         formData.append('state', selectedState); // Use selectedState instead of state
//         formData.append('district', district);
//         formData.append('college_name', collegeName);
//         formData.append('role', role); // Send role
//         if (collegeIdProof) {
//             formData.append('college_id_proof', collegeIdProof);
//         }

//         try {
//             const response = await axios.post('http://172.29.27.254:8000/api/students/register/', formData);
//             console.log('Registration successful', response.data);
//             Swal.fire('Success!', 'Registration successful!', 'success');
//         } catch (error) {
//             console.error('Registration failed', error);
//             Swal.fire('Error!', 'Registration failed. Please try again.', 'error');
//         }
//     };

//     const handleUsernameChange = (e) => {
//         const value = e.target.value;
//         setUsername(value);
//         if (!isUsernameValid(value)) {
//             setUsernameError("Username must be at least 5 characters and contain only letters and numbers.");
//         } else {
//             setUsernameError('');
//         }
//     };

//     const handleEmailChange = (e) => {
//         const value = e.target.value;
//         setEmail(value);
//         if (!isEmailValid(value)) {
//             setEmailError("Please enter a valid email address.");
//         } else {
//             setEmailError('');
//         }
//     };

//     const handlePhoneChange = (e) => {
//         const value = e.target.value.replace(/[^0-9]/g, ''); // Only allow digits
//         setPhoneNumber(value);
//         if (!phonePattern.test(value)) {
//             setPhoneError("Phone number must be exactly 10 digits.");
//         } else {
//             setPhoneError('');
//         }
//     };

//     const handlePasswordChange = (e) => {
//         const value = e.target.value;
//         setPassword(value);
//         if (!isPasswordValid(value)) {
//             setPasswordError("Password must be at least 8 characters, include an uppercase letter, lowercase letter, number, and a special character.");
//         } else {
//             setPasswordError('');
//         }
//     };

//     const handleStateChange = (e) => {
//         setSelectedState(e.target.value); // Set the selected state
//         setDistrict(''); // Reset district when state changes
//     };

//     const handleRoleChange = (e) => {
//         setRole(e.target.value); // Set role when radio button is selected
//     };

//     const handleConfirmPasswordChange = (e) => {
//         const value = e.target.value;
//         setConfirmPassword(value);
//         if (value !== password) {
//             setConfirmPasswordError("Passwords do not match.");
//         } else {
//             setConfirmPasswordError('');
//         }
//     };

//     return (
//         <div className={styles.registerContainer}>
//             <div className={styles.registerBox}>
//                 <h2 className={styles.title}>Student Registration</h2>
//                 <form onSubmit={handleRegister} className={styles.form}>
//                     <div className={styles.inputGroup}>
//                         <div className={styles.inputGroup}>
//                             <label className={styles.label}>Role</label>
//                             <div>
//                                 <input
//                                     type="radio"
//                                     value="student"
//                                     checked={role === 'student'}
//                                     onChange={handleRoleChange}
//                                 /> Student
//                                 <input
//                                     type="radio"
//                                     value="member"
//                                     checked={role === 'member'}
//                                     onChange={handleRoleChange}
//                                     style={{ marginLeft: '20px' }}
//                                 /> Member
//                             </div>
//                         </div>

//                         <label className={styles.label}>Username</label>
//                         <input
//                             type="text"
//                             value={username}
//                             onChange={handleUsernameChange}
//                             placeholder="Enter your username"
//                             required
//                             className={styles.input}
//                         />
//                         {usernameError && <span className={styles.error}>{usernameError}</span>}
//                     </div>

//                     <div className={styles.inputGroup}>
//                         <label className={styles.label}>Email</label>
//                         <input
//                             type="email"
//                             value={email}
//                             onChange={handleEmailChange}
//                             className={styles.input}
//                             placeholder="Enter your email"
//                             required
//                         />
//                         {emailError && <span className={styles.error}>{emailError}</span>}
//                     </div>

//                     <div className={styles.inputGroup}>
//                         <label className={styles.label}>Phone Number</label>
//                         <input
//                             type="text"
//                             value={phoneNumber}
//                             onChange={handlePhoneChange}
//                             className={styles.input}
//                             placeholder="Enter your phone number"
//                             required
//                         />
//                         {phoneError && <span className={styles.error}>{phoneError}</span>}
//                     </div>

//                     <div className={styles.inputGroup}>
//                         <label className={styles.label}>Password</label>
//                         <input
//                             type="password"
//                             value={password}
//                             onChange={handlePasswordChange}
//                             className={styles.input}
//                             placeholder="Enter your password"
//                             required
//                         />
//                         {passwordError && <span className={styles.error}>{passwordError}</span>}
//                     </div>

//                     <div className={styles.inputGroup}>
//                         <label className={styles.label}>Confirm Password</label>
//                         <input
//                             type="password"
//                             value={confirmPassword}
//                             onChange={handleConfirmPasswordChange}
//                             className={styles.input}
//                             placeholder="Confirm your password"
//                             required
//                         />
//                         {confirmPasswordError && <span className={styles.error}>{confirmPasswordError}</span>}
//                     </div>

//                     <div className={styles.inputGroup}>
//                         <label className={styles.label}>Age</label>
//                         <input
//                             type="number"
//                             value={age}
//                             onChange={(e) => setAge(e.target.value)}
//                             className={styles.input}
//                             placeholder="Enter your age"
//                             required
//                         />
//                     </div>

//                     <div className={styles.inputGroup}>
//                         <label className={styles.label}>Gender</label>
//                         <select
//                             value={gender}
//                             onChange={(e) => setGender(e.target.value)}
//                             className={styles.input}
//                             required
//                         >
//                             <option value="" disabled>Select your gender</option>
//                             <option value="male">Male</option>
//                             <option value="female">Female</option>
//                             <option value="other">Other</option>
//                         </select>
//                     </div>

//                     <div className={styles.inputGroup}>
//                         <label className={styles.label}>State</label>
//                         <select
//                             value={selectedState}
//                             onChange={handleStateChange}
//                             className={styles.input}
//                             required
//                         >
//                             <option value="" disabled>Select your state</option>
//                             {states.map(state => (
//                                 <option key={state.id} value={state.name}>{state.name}</option>
//                             ))}
//                         </select>
//                         {stateError && <span className={styles.error}>{stateError}</span>}
//                     </div>

//                     <div className={styles.inputGroup}>
//                         <label className={styles.label}>District</label>
//                         <select
//                             value={district}
//                             onChange={(e) => setDistrict(e.target.value)}
//                             className={styles.input}
//                             required
//                             disabled={!selectedState}
//                         >
//                             <option value="" disabled>Select your district</option>
//                             {districts.map(district => (
//                                 <option key={district.id} value={district.name}>{district.name}</option>
//                             ))}
//                         </select>
//                         {districtError && <span className={styles.error}>{districtError}</span>}
//                     </div>

//                     <div className={styles.inputGroup}>
//                         <label className={styles.label}>College Name</label>
//                         <select
//                             value={collegeName}
//                             onChange={(e) => setCollegeName(e.target.value)}
//                             className={styles.input}
//                             required
//                             disabled={!district}
//                         >
//                             <option value="" disabled>Select your college</option>
//                             {colleges.map(college => (
//                                 <option key={college.id} value={college.name}>{college.name}</option>
//                             ))}
//                         </select>
//                         {collegeError && <span className={styles.error}>{collegeError}</span>}
//                     </div>

//                     <div className={styles.inputGroup}>
//                         <label className={styles.label}>College ID Proof</label>
//                         <input
//                             type="file"
//                             onChange={handleFileChange}
//                             className={styles.input}
//                             accept=".pdf,.jpg,.jpeg,.png"
//                         />
//                     </div>

//                     <button type="submit" className={styles.button}>Register</button>
//                 </form>
//             </div>
//         </div>
//     );
// };

// export default StudentRegister;



import React, { useState, useEffect } from 'react';
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
    const [district, setDistrict] = useState('');
    const [states, setStates] = useState([]); // New state for states
    const [colleges, setColleges] = useState([]);
    const [role, setRole] = useState('student'); // New state for role
    const [selectedState, setSelectedState] = useState(''); // Renamed for clarity
    const [districts, setDistricts] = useState([]); // New state for districts
    const [collegeName, setCollegeName] = useState('');
    const [collegeIdProof, setCollegeIdProof] = useState(null);

    // Static JSON data
    const statesData = [
        { id: 1, name: 'State 1' },
        { id: 2, name: 'State 2' },
        { id: 3, name: 'State 3' }
    ];

    const districtsData = {
        'State 1': [
            { id: 1, name: 'District 1-1' },
            { id: 2, name: 'District 1-2' }
        ],
        'State 2': [
            { id: 3, name: 'District 2-1' },
            { id: 4, name: 'District 2-2' }
        ],
        'State 3': [
            { id: 5, name: 'District 3-1' },
            { id: 6, name: 'District 3-2' }
        ]
    };

    const collegesData = {
        'District 1-1': [
            { id: 1, name: 'College 1-1-1' },
            { id: 2, name: 'College 1-1-2' }
        ],
        'District 2-1': [
            { id: 3, name: 'College 2-1-1' },
            { id: 4, name: 'College 2-1-2' }
        ],
        'District 3-1': [
            { id: 5, name: 'College 3-1-1' },
            { id: 6, name: 'College 3-1-2' }
        ]
    };

    useEffect(() => {
        // Set static states data
        setStates(statesData);
    }, []);

    // Fetch districts when state changes
    useEffect(() => {
        if (selectedState) {
            setDistricts(districtsData[selectedState] || []);
        } else {
            setDistricts([]); // Reset districts if no state is selected
        }
    }, [selectedState]);

    // Fetch colleges when district changes
    useEffect(() => {
        if (district) {
            setColleges(collegesData[district] || []);
        } else {
            setColleges([]); // Reset colleges if no district is selected
        }
    }, [district]);

    // Validation and form submission logic
    const handleRegister = async (e) => {
        e.preventDefault();

        // Simple validation
        if (password !== confirmPassword) {
            Swal.fire('Error', 'Passwords do not match', 'error');
            return;
        }

        // Mock registration success
        Swal.fire('Success!', 'Registration successful!', 'success');
    };

    return (
        <div className={styles.registerContainer}>
            <div className={styles.registerBox}>
                <h2 className={styles.title}>User Registration</h2>
                <form onSubmit={handleRegister} className={styles.form}>
                    <div className={styles.inputGroup}>
                        <label className={styles.label}>Username</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Enter your username"
                            required
                            className={styles.input}
                        />
                    </div>

                    <div className={styles.inputGroup}>
                        <label className={styles.label}>Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className={styles.input}
                            placeholder="Enter your email"
                            required
                        />
                    </div>

                    <div className={styles.inputGroup}>
                        <label className={styles.label}>Phone Number</label>
                        <input
                            type="text"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            className={styles.input}
                            placeholder="Enter your phone number"
                            required
                        />
                    </div>

                    <div className={styles.inputGroup}>
                        <label className={styles.label}>Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className={styles.input}
                            placeholder="Enter your password"
                            required
                        />
                    </div>

                    <div className={styles.inputGroup}>
                        <label className={styles.label}>Confirm Password</label>
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className={styles.input}
                            placeholder="Confirm your password"
                            required
                        />
                    </div>

                    <div className={styles.inputGroup}>
                        <label className={styles.label}>State</label>
                        <select
                            value={selectedState}
                            onChange={(e) => setSelectedState(e.target.value)}
                            className={styles.input}
                            required
                        >
                            <option value="" disabled>Select your state</option>
                            {states.map((state) => (
                                <option key={state.id} value={state.name}>
                                    {state.name}
                                </option>
                            ))}
                        </select>
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
                            {districts.map((district) => (
                                <option key={district.id} value={district.name}>
                                    {district.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    {role === 'student' && (
                        <>
                            <div className={styles.inputGroup}>
                                <label className={styles.label}>College Name</label>
                                <select
                                    value={collegeName}
                                    onChange={(e) => setCollegeName(e.target.value)}
                                    className={styles.input}
                                    required
                                >
                                    <option value="" disabled>Select your college</option>
                                    {colleges.map((college) => (
                                        <option key={college.id} value={college.name}>
                                            {college.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </>
                    )}

                    <button type="submit" className={styles.submitButton}>Register</button>
                </form>
            </div>
        </div>
    );
};

export default StudentRegister;
