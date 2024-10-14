// import React from 'react';
// import styles from './Navbar.module.css'; // Import CSS module
// import { NavLink } from 'react-router-dom';
// const Navbar = () => {
//   return (
//     <div className={styles.navbar}>
//       <div className={styles.logoPlaceholder}>
//                     <svg
//                         xmlns="http://www.w3.org/2000/svg"
//                         width="200"
//                         height="200"
//                         viewBox="0 0 200 200"
//                     >
//                         <g fill="none" stroke="black" stroke-width="2">
//                             <path d="M100,10 L150,40 L150,110 L100,180 L50,110 L50,40 Z" fill="#7367F0" />
//                             <path d="M100,10 L150,40 L150,110 L100,180 L50,110 L50,40 Z" fill="none" />
                            

//                             <circle cx="50" cy="140" r="10" fill="#f52f36" />
//                             <circle cx="100" cy="140" r="10" fill="#f52f36" />
//                             <circle cx="150" cy="140" r="10" fill="#f52f36" />
//                             <line x1="50" y1="150" x2="50" y2="160" stroke="#f52f36" stroke-width="2" />
//                             <line x1="100" y1="150" x2="100" y2="160" stroke="#f52f36" stroke-width="2" />
//                             <line x1="150" y1="150" x2="150" y2="160" stroke="#f52f36" stroke-width="2" />

//                             <path d="M45,145 Q50,130 55,145" stroke="#f52f36" stroke-width="2" fill="none" />
//                             <path d="M95,145 Q100,130 105,145" stroke="#f52f36" stroke-width="2" fill="none" />
//                             <path d="M145,145 Q150,130 155,145" stroke="#f52f36" stroke-width="2" fill="none" />
//                         </g>
//                     </svg>

//                 </div>
//       <div className={styles.navLinks}>


//         <NavLink to="/" className={styles.linkText} activeClassName={styles.activeLink}>
//           <span>🏠</span> <span className={styles.linkText}>Home</span>
//         </NavLink>

//         <NavLink to="/about" className={styles.linkText} activeClassName={styles.activeLink}>
//           <span>ℹ️</span> <span className={styles.linkText}>About</span>
//         </NavLink>

//         <NavLink to="/contact" className={styles.linkText} activeClassName={styles.activeLink}>
//           <span>✉️</span> <span className={styles.linkText}>Contact</span>
//         </NavLink>


//       </div>
//     </div>
//   );
// };

// export default Navbar;


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
        <NavLink to="/about" className={styles.linkText} activeClassName={styles.activeLink}>
          Features
        </NavLink>
        <NavLink to="/services" className={styles.linkText} activeClassName={styles.activeLink}>
          Services
        </NavLink>
        <NavLink to="/work" className={styles.linkText} activeClassName={styles.activeLink}>
          Our Work
        </NavLink>
      </div>

      
    </div>
  );
};

export default Navbar;
