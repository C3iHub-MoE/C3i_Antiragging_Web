import React from "react";
import Style from "./Button.module.css";

const Button = ({ type = 'button', title, trigger, active = false, icon = null, variant = "primary", size = "medium", disabled = false, loading = false }) => {
    return (
        <div className={Style.buttonContainer}>
            <button
                type={type}
                className={`${Style.button} ${Style[variant]} ${Style[size]} ${active ? Style.activeTab : ""} ${disabled ? Style.disabled : ""} ${loading ? Style.loading : ""}`}
                onClick={trigger}
                disabled={disabled || loading}
            >
                {loading ? (
                    <div className={Style.loader}></div>
                ) : (
                    <>
                        {icon && <span className={Style.icon}>{icon}</span>}
                        <span>{title}</span>
                    </>
                )}
            </button>
        </div>
    );
};

export default Button;
