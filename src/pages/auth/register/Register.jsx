import React, { useState } from 'react';
import styles from './Register.module.css'; // Import CSS module

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

const Register = () => {
    const [isMember, setIsMember] = useState(true); // State to toggle between member and student registration
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
            ...(isMember && { position, ...(position === 'College Level Committee Member' && { state, district, college }), ...(position === 'State Level Admin' && { state }) }),
        };

        console.log('Form Data:', formData);
        // Send this `formData` object to your API here.
    };

    return (
        <div className={styles.registerContainer}>
            <div className={styles.registerBox}>
                <div className={styles.logoPlaceholder}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="200"
                        height="200"
                        viewBox="0 0 200 200"
                    >
                        <g fill="none" stroke="black" stroke-width="2">
                            <path d="M100,10 L150,40 L150,110 L100,180 L50,110 L50,40 Z" fill="#7367F0" />
                            <path d="M100,10 L150,40 L150,110 L100,180 L50,110 L50,40 Z" fill="none" />
                            

                            <circle cx="50" cy="140" r="10" fill="#f52f36" />
                            <circle cx="100" cy="140" r="10" fill="#f52f36" />
                            <circle cx="150" cy="140" r="10" fill="#f52f36" />
                            <line x1="50" y1="150" x2="50" y2="160" stroke="#f52f36" stroke-width="2" />
                            <line x1="100" y1="150" x2="100" y2="160" stroke="#f52f36" stroke-width="2" />
                            <line x1="150" y1="150" x2="150" y2="160" stroke="#f52f36" stroke-width="2" />

                            <path d="M45,145 Q50,130 55,145" stroke="#f52f36" stroke-width="2" fill="none" />
                            <path d="M95,145 Q100,130 105,145" stroke="#f52f36" stroke-width="2" fill="none" />
                            <path d="M145,145 Q150,130 155,145" stroke="#f52f36" stroke-width="2" fill="none" />
                        </g>
                    </svg>

                </div>
                <h2 className={styles.title}>Registration</h2>
                <div className={styles.toggleButtons}>
                    <button
                        onClick={() => setIsMember(true)}
                        className={`${styles.toggleButton} ${isMember ? styles.active : ''}`}
                    >
                        Member Registration
                    </button>
                    <button
                        onClick={() => setIsMember(false)}
                        className={`${styles.toggleButton} ${!isMember ? styles.active : ''}`}
                    >
                        Student Registration
                    </button>
                </div>
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

                    {isMember && (
                        <>
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

                            {(position === 'College Level Committee Member' || position === 'State Level Admin') && (
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

                            {position === 'College Level Committee Member' && state && (
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
                        </>
                    )}

                    {!isMember && (
                        <div className={styles.inputGroup}>
                            <label className={styles.label}>Additional Information (if any)</label>
                            <textarea
                                className={styles.input}
                                placeholder="Enter any additional information"
                                rows="3"
                            />
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

export default Register;
