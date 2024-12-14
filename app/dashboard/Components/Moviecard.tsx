import React from 'react';
import styles from '../../styles/movieCard.module.css';

type MovieCardProps = {
  title: string;
  posterUrl: string;
};

const MovieCard: React.FC<MovieCardProps> = ({ title, posterUrl }) => {
  return (
    <div className={styles.card}>
      <div className={styles.imageWrapper}>
        <img
          src={posterUrl}
          alt={title}
          className={styles.poster}
          loading="lazy"
        />
      </div>
      <div className={styles.cardInfo}>
        <p className={styles.title} title={title}> 
          {title}
        </p>
      </div>
    </div>
  );
};

export default MovieCard;
