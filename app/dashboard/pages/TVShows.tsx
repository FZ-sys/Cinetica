import React from "react";
import styles from "./tvshows.module.css";

const TVShows = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>TV Shows</h1>
      <p className={styles.description}>
        Discover the best TV shows and series to binge-watch!
      </p>
      <div className={styles.tvshowsGrid}>
        <div className={styles.tvshowCard}>📺 TV Show 1</div>
        <div className={styles.tvshowCard}>📺 TV Show 2</div>
        <div className={styles.tvshowCard}>📺 TV Show 3</div>
      </div>
    </div>
  );
};

export default TVShows;
