import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Error.module.css'; // Import the CSS module

const Error = () => {
  return (
    <div>
      <section className={styles.errorPage}>
        <div className={styles.content}>
          <h2 className={styles.header}>404</h2>
          <h4 className={styles.h4}>Sorry! Page not found</h4>
          <p>
            Oops! It seems like the page you are trying to access does not exist.
            If you believe there is an issue, feel free to report it, and we will look into it.
          </p>

          <div className={styles.btns}>
            <NavLink to="/">Return Home</NavLink>
            <NavLink to="/contact">Contact Us</NavLink>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Error;
