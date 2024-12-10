import React from 'react';
import styles from '../../styles/movieCard.module.css';

type MovieCardProps = {
  title: string;
  posterUrl: string;
};

const MovieCard: React.FC<MovieCardProps> = ({ title, posterUrl }) => {
  return (
    <div className={styles.card}>
      <img src={posterUrl} alt={title} className={styles.poster} />
      <p className={styles.title}>{title}</p>
    </div>
  );
};

export default MovieCard;
