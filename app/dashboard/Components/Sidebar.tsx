import React from 'react';
import styles from '../styles/sidebar.module.css'; // Assume que tu as un fichier CSS pour la Sidebar

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar }) => {
  // Fonction pour gérer la redirection vers /dashboard/discover
  const handleClick = (sectionId: string) => {
    if (sectionId === 'discoverMovies' || sectionId === 'discoverTVShows') {
      // Redirection vers /dashboard/discover
      window.location.href = '/dashboard/discover'; // Utilise cette méthode pour rediriger
    } else {
      // Sinon, tu peux garder le comportement de scroll
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    toggleSidebar(); // Fermer la sidebar après le clic
  };

  return (
    <div className={`${styles.sidebar} ${isOpen ? styles.open : ""}`}>
      <nav>
        {/* Section principale de navigation */}
        
        {/* Section Movies */}
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