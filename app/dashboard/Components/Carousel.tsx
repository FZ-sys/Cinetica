import React from 'react';
import styles from '../styles/carousel.module.css';

type CarouselItem = {
  title: string;
  posterUrl: string;
};

type CarouselProps = {
  items: CarouselItem[];
};

const Carousel: React.FC<CarouselProps> = ({ items }) => {
  if (!items || items.length === 0) {
    return <div className={styles.empty}>No items to display</div>;
  }

  return (
    <div className={styles.carouselContainer}>
      {items.map((item, index) => (
        <div key={index} className={styles.carouselItem}>
          <img
            src={item.posterUrl}
            alt={item.title}
            className={styles.poster}
          />
          <h3 className={styles.title}>{item.title}</h3>
        </div>
      ))}
    </div>
  );
};

export default Carousel;
