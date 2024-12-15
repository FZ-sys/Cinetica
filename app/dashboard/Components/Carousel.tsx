import React from 'react';
import Link from 'next/link';
import styles from '../styles/carousel.module.css';
import Image from 'next/image';

type CarouselItem = {
  id: number;
  title: string;
  posterUrl: string;
  link?: string;
};

type CarouselProps = {
  items: CarouselItem[]; 
};

const Carousel: React.FC<CarouselProps> = ({ items }) => {
  if (!items || items.length === 0) {
    return <div className={styles.empty}>No items to display</div>;
  }

  const handleImageError = (event: React.SyntheticEvent<HTMLImageElement, Event>) => {
    event.currentTarget.src = '/placeholder.jpg'; 
  };

  return (
    <div className={styles.carouselContainer}>
      {items.map((item) => (
        <div key={item.id} className={styles.carouselItem}>
          <Link href={item.link || '#'}>
          <Image
              src={item.posterUrl}
              alt={`Poster of ${item.title}`} 
              className={styles.poster}
              onError={handleImageError}
              width={300} 
              height={450}
              />
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Carousel;