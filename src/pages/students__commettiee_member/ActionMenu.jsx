// src/components/ActionMenu/ActionMenu.jsx
import React, { useState, useRef, useEffect } from "react";
import styles from "./StudentsData.module.css";

const ActionMenu = ({ student, handleEdit, handleDeactivate, handleDelete }) => {
    const [open, setOpen] = useState(false);
    const menuRef = useRef();

    const toggleMenu = () => {
        setOpen(!open);
    };

    const closeMenu = (e) => {
        if (menuRef.current && !menuRef.current.contains(e.target)) {
            setOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", closeMenu);
        return () => {
            document.removeEventListener("mousedown", closeMenu);
        };
    }, []);

    return (
        <div className={styles.actionMenu} ref={menuRef}>
            <button onClick={toggleMenu} className={styles.menuButton}>
                ⋮
            </button>
            {open && (
                <div className={styles.menuDropdown}>
                    <button onClick={() => handleEdit(student.id)}>Edit</button>
                    <button onClick={() => handleDeactivate(student.id)}>Deactivate</button>
                    <button onClick={() => handleDelete(student.id)}>Delete</button>
                </div>
            )}
        </div>
    );
};

export default ActionMenu;
