import React from 'react';
import Link from 'next/link';
import styles from '../styles/carousel.module.css';

type CarouselItem = {
  id: number; // Identifiant unique pour chaque item
  title: string;
  posterUrl: string;
  link?: string; // Lien optionnel, certains éléments peuvent ne pas en avoir
};

type CarouselProps = {
  items: CarouselItem[]; // Tableau d'items à afficher
};

const Carousel: React.FC<CarouselProps> = ({ items }) => {
  if (!items || items.length === 0) {
    return <div className={styles.empty}>No items to display</div>;
  }

  return (
    <div className={styles.carouselContainer}>
      {items.map((item) => (
        <div key={item.id} className={styles.carouselItem}>
          <Link href={item.link || '#'}>
              <img
                src={item.posterUrl}
                alt={item.title}
                className={styles.poster}
              />
              <h3 className={styles.title}>{item.title}</h3>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Carousel;
