import React from 'react';
import styles from './Navbar.module.css'; // Import CSS module
import { NavLink } from 'react-router-dom';
import { ICONS } from "../../pages/utils/icons"

const Navbar = ({ toggleSidebar }) => {
  return (
    <div className={styles.navbar}>
      
    {/* Sidebar Toggle Button */}
    <button className={styles.toggleButton} onClick={toggleSidebar}>
       {ICONS.HAMBURGER}
      </button>
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
        <NavLink to="/work" className={styles.linkText} activeClassName={styles.activeLink}>
          
        </NavLink>
      </div>

      
    </div>
  );
};

export default Navbar;
