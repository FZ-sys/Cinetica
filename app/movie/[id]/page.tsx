import React from 'react';
import styles from './page.module.css'; // Importation du module CSS
import '../styles/base.css';
import Image from 'next/image';

interface MovieDetails {
  title: string;
  overview: string;  // Description du film
  release_date: string;  // Date de sortie
  genres: { name: string }[];
  poster_path: string | null;
}

interface CastMember {
  name: string;
  character: string;
  profile_path: string | null;
}

interface MovieImages {
  backdrops: { file_path: string }[];
  posters: { file_path: string }[];
}

export default async function MovieDetailsPage({ params }: { params: { id: string } }) {
  const { id } = params; // Pas besoin de "await" ici

  try {
    const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
    const movieRes = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`);
    const castRes = await fetch(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=${API_KEY}`);
    const imagesRes = await fetch(`https://api.themoviedb.org/3/movie/${id}/images?api_key=${API_KEY}`);

    if (!movieRes.ok || !castRes.ok || !imagesRes.ok) {
      throw new Error('Le film, le casting ou les images n\'ont pas pu être récupérés.');
    }

    const movieDetails: MovieDetails = await movieRes.json();
    const castDetails = await castRes.json();
    const movieImages: MovieImages = await imagesRes.json();

    if (!movieDetails) {
      return (
        <div className={styles.errorMessage}>
          <h1>Erreur</h1>
          <p>Le film avec l&apos;ID {id} est introuvable.</p>
        </div>
      );
    }

    return (
      <div className={styles.movieContainer}>
        <div className={styles.movieHeader}>
          <div className={styles.moviePosterContainer}>
            {movieDetails.poster_path && (
              <Image
                className={styles.moviePoster}
                src={`https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`}
                alt={movieDetails.title}
              />
            )}
          </div>

          <div className={styles.movieDetails}>
            <h1 className={styles.movieTitle}>{movieDetails.title}</h1>
            <p className={styles.releaseDate}>Sorti le : {new Date(movieDetails.release_date).toLocaleDateString()}</p>
            <p className={styles.movieDescription}>{movieDetails.overview}</p>

            <div className={styles.genreList}>
              {movieDetails.genres.map((genre, index) => (
                <span key={index} className={styles.genreItem}>{genre.name}</span>
              ))}
            </div>
          </div>
        </div>

        <div className={styles.carouselSection}>
          <h3>Cast</h3>
          <div className={styles.carousel}>
            {castDetails.cast.slice(0, 10).map((member: CastMember, index: number) => {
              const actorImage = member.profile_path
                ? `https://image.tmdb.org/t/p/w200${member.profile_path}`
                : '/images/actordefaut.png'; // Image par défaut

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
          <h3>Images du Film</h3>
          <div className={styles.carousel}>
            {movieImages.backdrops.map((image, index) => (
              <div key={index} className={styles.movieImageItem}>
                <Image
                  className={styles.movieImage}
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
    console.error('Erreur lors de la récupération des données :', error);
    return (
      <div className={styles.errorMessage}>
        <h1>Erreur de chargement</h1>
        <p>Une erreur s&apos;est produite lors de la récupération des informations du film.</p>
      </div>
    );
  }
}
