import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Sidebar.module.css'; // Import your styles

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div className={`${styles.sidebar} ${collapsed ? styles.collapsed : ''}`}>
      <button className={styles.toggleButton} onClick={toggleSidebar}>
        {collapsed ? '☰' : 'Collapse'}
      </button>

      <ul className={styles.navLinks}>
        <li>
          <NavLink to="/" className={styles.linkText} activeClassName={styles.activeLink}>
            <span role="img" aria-label="Home">🏠</span>
            {!collapsed && <span className={styles.linkLabel}>Home</span>}
          </NavLink>
        </li>
        <li>
          <NavLink to="/complaints" className={styles.linkText} activeClassName={styles.activeLink}>
            <span role="img" aria-label="Complaints">📄</span>
            {!collapsed && <span className={styles.linkLabel}>Complaints</span>}
          </NavLink>
        </li>
        <li>
          <NavLink to="/about" className={styles.linkText} activeClassName={styles.activeLink}>
            <span role="img" aria-label="About">ℹ️</span>
            {!collapsed && <span className={styles.linkLabel}>About</span>}
          </NavLink>
        </li>
        <li>
          <NavLink to="/contact" className={styles.linkText} activeClassName={styles.activeLink}>
            <span role="img" aria-label="Contact">📞</span>
            {!collapsed && <span className={styles.linkLabel}>Contact</span>}
          </NavLink>
        </li>
      </ul>

      {!collapsed && (
        <div className={styles.footer}>
          © 2024 Anti-Ragging System
        </div>
      )}
    </div>
  );
};

export default Sidebar;
