import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2'; // Import SweetAlert
import styles from './Student.module.css'; // Import CSS module

// Example data for states, districts, and colleges
const statesData = {
    'State 1': {
        districts: {
            'District 1-1': ['College 1-1-1', 'College 1-1-2'],
            'District 1-2': ['College 1-2-1', 'College 1-2-2'],
        },
    },
    'State 2': {
        districts: {
            'District 2-1': ['College 2-1-1', 'College 2-1-2'],
            'District 2-2': ['College 2-2-1', 'College 2-2-2'],
        },
    },
};

const CommitteeMemberRegister = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [position, setPosition] = useState('');
    const [state, setState] = useState('');
    const [district, setDistrict] = useState('');
    const [college, setCollege] = useState('');

    // Filtered options based on selected state and district
    const availableDistricts = state ? Object.keys(statesData[state].districts) : [];
    const availableColleges = district ? statesData[state].districts[district] : [];

    const handleRegister = (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert("Passwords don't match");
            return;
        }

        const formData = {
            name,
            email,
            password,
            position,
            ...(position === 'College Level Committee Member' && { state, district, college }),
            ...(position === 'District Level Admin' && { state, district }),
            ...(position === 'State Level Admin' && { state }),
        };

        console.log('Form Data:', formData);
        // Send this `formData` object to your API here.
    };

    return (
        <div className={styles.registerContainer}>
            <div className={styles.registerBox}>
                <h2 className={styles.title}>Committee Member Registration</h2>
                <form onSubmit={handleRegister} className={styles.form}>
                    <div className={styles.inputGroup}>
                        <label className={styles.label}>Name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className={styles.input}
                            placeholder="Enter your name"
                            required
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
                        <label className={styles.label}>Position</label>
                        <select
                            value={position}
                            onChange={(e) => {
                                setPosition(e.target.value);
                                setState('');
                                setDistrict('');
                                setCollege('');
                            }}
                            className={styles.input}
                            required
                        >
                            <option value="">Select Position</option>
                            <option value="College Level Committee Member">College Level Committee Member</option>
                            <option value="District Level Admin">District Level Admin</option>
                            <option value="State Level Admin">State Level Admin</option>
                        </select>
                    </div>

                    {/* Show State dropdown for both District and State level */}
                    {(position === 'State Level Admin' || position === 'District Level Admin' || position === 'College Level Committee Member') && (
                        <div className={styles.inputGroup}>
                            <label className={styles.label}>State</label>
                            <select
                                value={state}
                                onChange={(e) => {
                                    setState(e.target.value);
                                    setDistrict('');
                                    setCollege('');
                                }}
                                className={styles.input}
                                required
                            >
                                <option value="">Select State</option>
                                {Object.keys(statesData).map((stateName) => (
                                    <option key={stateName} value={stateName}>
                                        {stateName}
                                    </option>
                                ))}
                            </select>
                        </div>
                    )}

                    {/* Show District dropdown for District Level and College Level */}
                    {(position === 'District Level Admin' || position === 'College Level Committee Member') && state && (
                        <div className={styles.inputGroup}>
                            <label className={styles.label}>District</label>
                            <select
                                value={district}
                                onChange={(e) => {
                                    setDistrict(e.target.value);
                                    setCollege('');
                                }}
                                className={styles.input}
                                required
                            >
                                <option value="">Select District</option>
                                {availableDistricts.map((districtName) => (
                                    <option key={districtName} value={districtName}>
                                        {districtName}
                                    </option>
                                ))}
                            </select>
                        </div>
                    )}

                    {/* Show College dropdown for College Level only */}
                    {position === 'College Level Committee Member' && district && (
                        <div className={styles.inputGroup}>
                            <label className={styles.label}>College</label>
                            <select
                                value={college}
                                onChange={(e) => setCollege(e.target.value)}
                                className={styles.input}
                                required
                            >
                                <option value="">Select College</option>
                                {availableColleges.map((collegeName) => (
                                    <option key={collegeName} value={collegeName}>
                                        {collegeName}
                                    </option>
                                ))}
                            </select>
                        </div>
                    )}

                    <button type="submit" className={styles.registerButton}>
                        Register
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CommitteeMemberRegister;
