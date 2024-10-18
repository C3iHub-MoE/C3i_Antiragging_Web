import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Sidebar.module.css'; // Make sure this CSS module is updated
import { ICONS } from '../../pages/utils/icons';

const Sidebar = ({ collapsed }) => {

  const role = "member";

  return (
    <div className={`${styles.sidebar} ${styles.sidemenu} ${collapsed ? styles.collapsed : ''}`}>


      <ul className={styles.navLinks}>
        <li>
          <NavLink to="/" className={styles.linkText} activeClassName={styles.activeLink}>
            <span className={styles.icon} role="img" aria-label="Dashboard"> {ICONS.HOME}</span>
            {!collapsed && <span className={styles.linkLabel}>Dashboard</span>}
          </NavLink>
        </li>
        {role === 'student' && (
          <>

            <NavLink to="/register-complaint" className={styles.linkText} activeClassName={styles.activeLink}>
              <span className={styles.icon} role="img" aria-label="Resgiter Complaint"> {ICONS.COMPLAINT}</span>
              {!collapsed && <span className={styles.linkLabel}>Register Complaint</span>}
            </NavLink>

            <NavLink to="/my-complaints" className={styles.linkText} activeClassName={styles.activeLink}>
              <span className={styles.icon} role="img" aria-label="My Complaints"> {ICONS.PROJECT}</span>
              {!collapsed && <span className={styles.linkLabel}>My Complaints</span>}
            </NavLink>
          </>
        )}

        {role === 'member' && (
          <>
            <li>
              <NavLink to="/students" className={styles.linkText} activeClassName={styles.activeLink}>
                <span className={styles.icon} role="img" aria-label="Analytics">{ICONS.USER}</span>
                {!collapsed && <span className={styles.linkLabel}>Students</span>}
              </NavLink>
            </li>
            <li>
              <NavLink to="/complaints" className={styles.linkText} activeClassName={styles.activeLink}>
                <span className={styles.icon} role="img" aria-label="Complaints">{ICONS.COMPLAINT}</span>
                {!collapsed && <span className={styles.linkLabel}>Complaints</span>}
              </NavLink>

            </li>
            <li>
              <NavLink to="/member_page" className={styles.linkText} activeClassName={styles.activeLink}>
                <span className={styles.icon} role="img" aria-label="About">{ICONS.USER}</span>
                {!collapsed && <span className={styles.linkLabel}>Members</span>}
              </NavLink>
            </li>
            <li>
              <NavLink to="/" className={styles.linkText} activeClassName={styles.activeLink}>
                <span className={styles.icon} role="img" aria-label="Contact">{ICONS.CONTACT}</span>
                {!collapsed && <span className={styles.linkLabel}>Contact</span>}
              </NavLink>
            </li>
            <li>
              <NavLink to="/analytics" className={styles.linkText} activeClassName={styles.activeLink}>
                <span className={styles.icon} role="img" aria-label="Analytics">{ICONS.ANALYTICS}</span>
                {!collapsed && <span className={styles.linkLabel}>Analytics</span>}
              </NavLink>
            </li>
          </>)}

      </ul>

      {!collapsed && (
        <div className={styles.footer}>
          © 2024 Your Company
        </div>
      )}
    </div>
  );
};

export default Sidebar;
