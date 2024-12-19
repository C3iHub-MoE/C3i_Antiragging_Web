// import React from 'react';
// import styles from './Navbar.module.css'; // Import CSS module
// import { NavLink } from 'react-router-dom';
// import { ICONS } from "../../pages/utils/icons"

// const Navbar = ({ toggleSidebar }) => {
//   return (
//     <div className={styles.navbar}>

//     {/* Sidebar Toggle Button */}
//     <button className={styles.toggleButton} onClick={toggleSidebar}>
//        {ICONS.HAMBURGER}
//       </button>
//       <div className={styles.navLinks}>
//         <NavLink to="/" className={styles.linkText} activeClassName={styles.activeLink}>
//           Home
//         </NavLink>
//         <NavLink to="/Sos-history" className={styles.linkText} activeClassName={styles.activeLink}>
//           Sos Alerts
//         </NavLink>
//         <NavLink to="/logout" className={styles.linkText} activeClassName={styles.activeLink}>
//           Logout
//         </NavLink>
//         <NavLink to="/profile" className={styles.linkText} activeClassName={styles.activeLink}>
//           Profile
//         </NavLink>
//         <NavLink to="/work" className={styles.linkText} activeClassName={styles.activeLink}>

//         </NavLink>
//       </div>

//     </div>
//   );
// };

// export default Navbar;

import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Navbar.module.css"; // Import CSS module
import { NavLink } from "react-router-dom";
import { ICONS } from "../../pages/utils/icons";
import UGCLOGO from "./UGC-Preview (1).png";
import DarkMode from "../../components/DarkMode/DarkMode";

const Navbar = ({ toggleSidebar }) => {
    const navigate = useNavigate();

    return (
        <div className={styles.navbar}>
            <div className={styles.LogoHeader}>
                {/* Logo */}
                <div className={styles.logoContainer}>
                    <img
                        src={UGCLOGO}
                        alt="Logo"
                        className={styles.logo}
                        onClick={() => {
                            navigate("/");
                        }}
                    />
                </div>

                {/* Sidebar Toggle Button */}
                <button className={styles.toggleButton} onClick={toggleSidebar}>
                    {ICONS.HAMBURGER}
                </button>
            </div>

            <div className={styles.navLinks}>
                <NavLink to="/" className={styles.linkText} activeClassName={styles.activeLink}>
                    Home
                </NavLink>
                <NavLink to="/Sos-history" className={styles.linkText} activeClassName={styles.activeLink}>
                    Sos Alerts
                </NavLink>
                <NavLink to="/logout" className={styles.linkText} activeClassName={styles.activeLink}>
                    Logout
                </NavLink>
                <NavLink to="/profile" className={styles.linkText} activeClassName={styles.activeLink}>
                    Profile
                </NavLink>

                {/* <DarkMode /> */}
            </div>
        </div>
    );
};

export default Navbar;
