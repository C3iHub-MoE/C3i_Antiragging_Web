// Button.js
import React from 'react';
import styles from './Button.module.css'; // Adjust the path based on your project structure

const Button = ({ label, type = 'primary', onClick, backgroundColor, textColor, borderColor }) => {
    // Inline styles for custom colors
    const customStyles = {
        backgroundColor: backgroundColor || 'transparent',  // Use provided color or default
        color: textColor || '#fff', // Default text color is white
        borderColor: borderColor || 'transparent' // Use provided color or no border
    };

    return (
        <button
            className={`${styles.button} ${styles[type]}`} 
            onClick={onClick} 
            style={customStyles} // Apply custom styles
        >
            {label}
        </button>
    );
};

export default Button;
