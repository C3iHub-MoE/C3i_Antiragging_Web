import React from 'react';
import { useState } from 'react';
import Sidebar from './sidebar/Sidebar';
import { Outlet } from 'react-router-dom';
import Navbar from './navbar/Navbar';
import styles from './Layout.module.css'; // Import CSS module for layout styling

const Layout = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  // console.log("uesesadf", children)


  return (
    <div className={styles.layout}>
      <Navbar toggleSidebar={toggleSidebar} />
      <div className={styles.mainContainer}>
        <Sidebar collapsed={collapsed} />
        <div className={styles.content}>{children}</div>
      </div>
    </div>
  );
};

export default Layout;
