// Button.js
import React from 'react';
import styles from './Button.module.css'; // Adjust the path based on your project structure

const Button = ({ label, type = 'primary', onClick }) => {
    return (
        <button className={`${styles.button} ${styles[type]}`} onClick={onClick}>
            {label}
        </button>
    );
};

export default Button;
