import React, { useState } from "react";
import styles from "./ChangePassword.module.css";
import { ChangePassword } from "../../api/user";

const ChangePasswordPage = () => {
    const [passwords, setPasswords] = useState({
        current: "",
        new: "",
        confirm: "",
    });

    const [showPassword, setShowPassword] = useState({
        current: false,
        new: false,
        confirm: false,
    });

    const [passwordValidations, setPasswordValidations] = useState({
        minLength: false,
        lowercase: false,
        numberSymbol: false,
        match: false,
    });

    const validatePassword = (password, confirmPassword) => {
        const minLength = password.length >= 8;
        const lowercase = /[a-z]/.test(password);
        const numberSymbol = /[\d\s!@#$%^&*(),.?":{}|<>]/.test(password); // Numbers or symbols
        const match = password === confirmPassword;

        setPasswordValidations({ minLength, lowercase, numberSymbol, match });
    };

    const handlePasswordChange = (e) => {
        const { id, value } = e.target;
        setPasswords((prevPasswords) => ({
            ...prevPasswords,
            [id]: value,
        }));

        if (id === "new" || id === "confirm") {
            const newPassword = id === "new" ? value : passwords.new;
            const confirmPassword = id === "confirm" ? value : passwords.confirm;
            validatePassword(newPassword, confirmPassword);
        }
    };

    const togglePasswordVisibility = (field) => {
        setShowPassword((prevState) => ({
            ...prevState,
            [field]: !prevState[field],
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!passwordValidations.minLength || !passwordValidations.lowercase || !passwordValidations.numberSymbol || !passwordValidations.match) {
            console.error("Password does not meet requirements");
            return;
        }
        console.log("Password updated successfully:", passwords.new);
    };

    return (
        <div className={styles.changePasswordPage}>
            <h1>Change Password</h1>
            <form onSubmit={handleSubmit}>
                <div className={styles.inputGroup}>
                    <label>Current Password</label>
                    <input type={showPassword.current ? "text" : "password"} id="current" value={passwords.current} onChange={handlePasswordChange} required />
                    <span onClick={() => togglePasswordVisibility("current")}>{showPassword.current ? "👁️" : "🙈"}</span>
                </div>
                <div className={styles.inputGroup}>
                    <label>New Password</label>
                    <input type={showPassword.new ? "text" : "password"} id="new" value={passwords.new} onChange={handlePasswordChange} required />
                    <span onClick={() => togglePasswordVisibility("new")}>{showPassword.new ? "👁️" : "🙈"}</span>
                </div>
                <div className={styles.inputGroup}>
                    <label>Confirm Password</label>
                    <input type={showPassword.confirm ? "text" : "password"} id="confirm" value={passwords.confirm} onChange={handlePasswordChange} required />
                    <span onClick={() => togglePasswordVisibility("confirm")}>{showPassword.confirm ? "👁️" : "🙈"}</span>
                </div>
                <div className={styles.passwordRequirements}>
                    <h4>Password Requirements:</h4>
                    <ul>
                        <li className={passwordValidations.minLength ? styles.valid : styles.invalid}>Minimum 8 characters long</li>
                        <li className={passwordValidations.lowercase ? styles.valid : styles.invalid}>At least one lowercase character</li>
                        <li className={passwordValidations.numberSymbol ? styles.valid : styles.invalid}>At least one number, symbol, or whitespace character</li>
                        <li className={passwordValidations.match ? styles.valid : styles.invalid}>Confirm password matches the new password</li>
                    </ul>
                </div>
                <button type="submit">Update Password</button>
            </form>
        </div>
    );
};

export default ChangePasswordPage;
