import React from 'react';
import Link from 'next/link';
import styles from '../styles/carousel.module.css';
import Image from 'next/image';

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

  const handleImageError = (event: React.SyntheticEvent<HTMLImageElement, Event>) => {
    // Utilise une image de remplacement si l'image est introuvable
    event.currentTarget.src = '/placeholder.jpg'; 
  };

  return (
    <div className={styles.carouselContainer}>
      {items.map((item) => (
        <div key={item.id} className={styles.carouselItem}>
          <Link href={item.link || '#'}>
          <Image
              src={item.posterUrl}
              alt={`Poster of ${item.title}`} // More descriptive alt text
              className={styles.poster}
              onError={handleImageError}
              width={300}  // Fixed width for the image
              height={450}
              />
            {/* Le titre est supprimé, donc pas de h3 */}
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Carousel;
