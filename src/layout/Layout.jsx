import React from 'react';
import Sidebar from './sidebar/Sidebar';
import Navbar from './navbar/Navbar';
import styles from './Layout.module.css'; // Import CSS module for layout styling
import { ColorModeContext, useMode } from '../theme';

const Layout = ({ children }) => {
  return (
    <div className={styles.layout}>
      <Navbar />
      <div className={styles.mainContainer}>
        <Sidebar />
        <div className={styles.content}>{children}</div>
      </div>
    </div>
  );
};

export default Layout;
