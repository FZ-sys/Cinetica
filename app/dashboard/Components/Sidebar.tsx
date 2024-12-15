import React from 'react';
import styles from '../styles/sidebar.module.css'; 

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar }) => {
  const handleClick = (sectionId: string) => {
    if (sectionId === 'discoverMovies' || sectionId === 'discoverTVShows') {
      window.location.href = '/dashboard/discover'; 
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    toggleSidebar(); 
  };

  return (
    <div className={`${styles.sidebar} ${isOpen ? styles.open : ""}`}>
      <nav>
        <div className={styles.sectionTitle}>Movies</div>
        <ul>
          <li>
            <button onClick={() => handleClick('discoverMovies')} className={styles.navItem}>
              Discover
            </button>
          </li>
          <li>
            <button onClick={() => handleClick('popularMovies')} className={styles.navItem}>
              Popular
            </button>
          </li>
          <li>
            <button onClick={() => handleClick('topRatedMovies')} className={styles.navItem}>
              Top Rated
            </button>
          </li>
          <li>
            <button onClick={() => handleClick('nowPlayingMovies')} className={styles.navItem}>
              Now Playing
            </button>
          </li>
        </ul>

        {/* Section TV Shows */}
        <div className={styles.sectionTitle}>TV Shows</div>
        <ul>
          <li>
            <button onClick={() => handleClick('discoverTVShows')} className={styles.navItem}>
              Discover
            </button>
          </li>
          <li>
            <button onClick={() => handleClick('popularTVShows')} className={styles.navItem}>
              Popular
            </button>
          </li>
          <li>
            <button onClick={() => handleClick('topRatedTVShows')} className={styles.navItem}>
              Top Rated
            </button>
          </li>
          <li>
            <button onClick={() => handleClick('onTheAirTVShows')} className={styles.navItem}>
              On The Air
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;