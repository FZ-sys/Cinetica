import React from 'react';
import styles from '../../styles/movieCard.module.css';
import Image from 'next/image';

type MovieCardProps = {
  title: string;
  posterUrl: string;
};

const MovieCard: React.FC<MovieCardProps> = ({ title, posterUrl }) => {
  return (
    <div className={styles.card}>
      <div className={styles.imageWrapper}>
      <Image
        src={posterUrl}
        alt={title}
        className={styles.poster}
        loading="lazy"
        width={300}  
        height={450} 
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