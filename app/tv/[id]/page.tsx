import React from 'react';
import styles from './page.module.css';
import Image from 'next/image';

interface TVShowDetails {
  name: string;
  overview: string;
  first_air_date: string;
  genres: { name: string }[];
  poster_path: string | null;
}

interface CastMember {
  name: string;
  character: string;
  profile_path: string | null;
}

interface TVShowImages {
  backdrops: { file_path: string }[];
  posters: { file_path: string }[];
}

export default async function TVShowDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;  // Résolution de la promesse de params

  try {
    const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
    const tvShowRes = await fetch(`https://api.themoviedb.org/3/tv/${id}?api_key=${API_KEY}`);
    const castRes = await fetch(`https://api.themoviedb.org/3/tv/${id}/credits?api_key=${API_KEY}`);
    const imagesRes = await fetch(`https://api.themoviedb.org/3/tv/${id}/images?api_key=${API_KEY}`);

    if (!tvShowRes.ok || !castRes.ok || !imagesRes.ok) {
      throw new Error("La série, le casting ou les images n'ont pas pu être récupérés.");
    }

    const tvShowDetails: TVShowDetails = await tvShowRes.json();
    const castDetails = await castRes.json();
    const tvShowImages: TVShowImages = await imagesRes.json();

    if (!tvShowDetails) {
      return (
        <div className={styles.errorMessage}>
          <h1>Erreur</h1>
          <p>La série avec l&apos;ID {id} est introuvable.</p>
        </div>
      );
    }

    return (
      <div className={styles.tvShowContainer}>
        <div className={styles.tvShowHeader}>
          <div className={styles.tvShowPosterContainer}>
            {tvShowDetails.poster_path && (
              <Image 
                className={styles.tvShowPoster}
                src={`https://image.tmdb.org/t/p/w500${tvShowDetails.poster_path}`} 
                alt={tvShowDetails.name} 
              />
            )}
          </div>

          <div className={styles.tvShowDetails}>
            <h1 className={styles.tvShowTitle}>{tvShowDetails.name}</h1>
            <p className={styles.firstAirDate}>Diffusée depuis : {new Date(tvShowDetails.first_air_date).toLocaleDateString()}</p>
            <p className={styles.tvShowDescription}>{tvShowDetails.overview}</p>

            <div className={styles.genreList}>
              {tvShowDetails.genres.map((genre, index) => (
                <span key={index} className={styles.genreItem}>{genre.name}</span>
              ))}
            </div>
          </div>
        </div>

        <div className={styles.carouselSection}>
          <h3>Cast</h3>
          <div className={styles.carousel}>
            {castDetails.cast.slice(0, 10).map((member: CastMember, index: number) => {
              // Vérifie si l&apos;acteur a une photo, sinon utilise l&apos;image par défaut
              const actorImage = member.profile_path
                ? `https://image.tmdb.org/t/p/w200${member.profile_path}`
                : '/public/actordefaut.png'; // Image par défaut

              return (
                <div key={index} className={styles.castItem}>
                  <Image 
                    className={styles.castProfile} 
                    src={actorImage} 
                    alt={member.name} 
                  />
                  <div className={styles.castInfo}>
                    <strong>{member.name}</strong>
                    <p>{member.character}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className={styles.carouselSection}>
          <h3>Images de la Série</h3>
          <div className={styles.carousel}>
            {tvShowImages.backdrops.map((image, index) => (
              <div key={index} className={styles.tvShowImageItem}>
                <Image 
                  className={styles.tvShowImage} 
                  src={`https://image.tmdb.org/t/p/w500${image.file_path}`} 
                  alt={`Image ${index + 1}`} 
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('Erreur lors de la récupération des données', error);
    return (
      <div className={styles.errorMessage}>
        <h1>Erreur de chargement</h1>
        <p>Une erreur s&apos;est produite lors de la récupération des informations de la série.</p>
      </div>
    );
  }
}
