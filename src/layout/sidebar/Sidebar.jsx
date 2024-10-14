import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Sidebar.module.css'; // Make sure this CSS module is updated
import { ICONS } from '../../pages/utils/icons';

const Sidebar = ({ collapsed }) => {


  return (
    <div className={`${styles.sidebar} ${collapsed ? styles.collapsed : ''}`}>


      <ul className={styles.navLinks}>
        <li>
          <NavLink to="/" className={styles.linkText} activeClassName={styles.activeLink}>
            <span className={styles.icon} role="img" aria-label="Dashboard"> {ICONS.HOME}</span>
            {!collapsed && <span className={styles.linkLabel}>Dashboard</span>}
          </NavLink>
        </li>
        <li>
          <NavLink to="/complaints" className={styles.linkText} activeClassName={styles.activeLink}>
              <span className={styles.icon} role="img" aria-label="Complaints">{ICONS.COMPLAINT}</span>
              {!collapsed && <span className={styles.linkLabel}>Complaints</span>}
            </NavLink>
          
        </li>
        <li>
          <NavLink to="/about" className={styles.linkText} activeClassName={styles.activeLink}>
            <span className={styles.icon} role="img" aria-label="About">{ICONS.ABOUT}</span>
            {!collapsed && <span className={styles.linkLabel}>About</span>}
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


// import React from 'react';
// import { NavLink } from 'react-router-dom';
// import styles from './Sidebar.module.css'; // Import your styles

// const Sidebar = ({ collapsed }) => {
//   return (
//     <div className={`${styles.sidebar} ${collapsed ? styles.collapsed : ''}`}>
//       <div className={styles.logoPlaceholder}>
        
//       </div>
//       <ul className={styles.navLinks}>
//         <li>
//           <NavLink to="/" className={styles.linkText} activeClassName={styles.activeLink}>
//             <span role="img" aria-label="Home">🏠</span>
//             {!collapsed && <span className={styles.linkLabel}>Dashboard</span>}
//           </NavLink>
//         </li>
//         <li>
//           <NavLink to="/products" className={styles.linkText} activeClassName={styles.activeLink}>
//             <span role="img" aria-label="Products">📦</span>
//             {!collapsed && <span className={styles.linkLabel}>Products</span>}
//           </NavLink>
//         </li>
//         <li>
//           <NavLink to="/customers" className={styles.linkText} activeClassName={styles.activeLink}>
//             <span role="img" aria-label="Customers">👥</span>
//             {!collapsed && <span className={styles.linkLabel}>Customers</span>}
//           </NavLink>
//         </li>
//       </ul>
//     </div>
//   );
// };

// export default Sidebar;
