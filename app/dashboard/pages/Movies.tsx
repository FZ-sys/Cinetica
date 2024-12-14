import React from "react";
import styles from "./movies.module.css";

const Movies = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Movies</h1>
      <p className={styles.description}>
        Explore all the latest and most popular movies here!
      </p>
      <div className={styles.moviesGrid}>
        <div className={styles.movieCard}>🎥 Movie 1</div>
        <div className={styles.movieCard}>🎥 Movie 2</div>
        <div className={styles.movieCard}>🎥 Movie 3</div>
      </div>
    </div>
  );
};

export default Movies;
