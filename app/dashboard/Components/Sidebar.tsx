import React from 'react';
import styles from '../styles/sidebar.module.css';

const Sidebar: React.FC<{ isOpen: boolean; toggleSidebar: () => void }> = ({ isOpen, toggleSidebar }) => {
  return (
    <div className={styles.sidebar} style={{ transform: isOpen ? 'translateX(0)' : 'translateX(-100%)' }}>
      <ul className={styles.navLinks}>
        <li>
          <a href="/" className={styles.navLink}>Home</a>
        </li>
        <li>
          <a href="/movies" className={styles.navLink}>Movies</a>
        </li>
        <li>
          <a href="/tv" className={styles.navLink}>TV Shows</a>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
