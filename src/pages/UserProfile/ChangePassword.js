import React, { useState } from 'react';
import styles from './ChangePassword.module.css';
import Button from '../../components/button/Button';

const ChangePassword = () => {
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
    const isValid = Object.values(passwordValidations).every(Boolean) && isConfirmValid;

    const togglePasswordVisibility = (field) => {
        setShowPassword((prevState) => ({
            ...prevState,
            [field]: !prevState[field]
        }));
    };

    return (
        <div className={styles.passwordForm}>
            <h3>Change Password</h3>
            <form>
                <div className={styles.inputRow}>
                    {/* Current Password */}
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

                    {/* Confirm New Password */}
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
                            Minimum 8 characters long
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
                            className={passwords.confirm !== "" && passwords.confirm === passwords.new ? styles.valid : styles.invalid}
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
    );
};

export default ChangePassword;
