import React from 'react';
import styles from '../styles/navbar.module.css';

const Navbar: React.FC = () => {
  return (
    <nav className={styles.navbar}>
      <h1 className={styles.logo}>My Girly Netflix</h1>
      <ul className={styles.navLinks}>
        <li><a href="#movies">Movies</a></li>
        <li><a href="#tvshows">TV Shows</a></li>
        <li><a href="#favorites">Favorites</a></li>
      </ul>
    </nav>
  );
};

export default Navbar;
