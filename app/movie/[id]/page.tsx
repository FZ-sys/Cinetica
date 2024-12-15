import React from 'react';
import styles from './page.module.css'; 
import '../styles/base.css';
import Image from 'next/image';

interface MovieDetails {
  title: string;
  overview: string; 
  release_date: string; 
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

const MovieDetailsPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params; 

  const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;

  const fetchData = async (url: string) => {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch data from ${url}`);
    }
    return response.json();
  };

  try {
    const movieDetails: MovieDetails = await fetchData(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`);
    const castDetails = await fetchData(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=${API_KEY}`);
    const movieImages: MovieImages = await fetchData(`https://api.themoviedb.org/3/movie/${id}/images?api_key=${API_KEY}`);

    return (
      <div className={styles.movieContainer}>
        <div className={styles.movieHeader}>
          <div className={styles.moviePosterContainer}>
            {movieDetails.poster_path ? (
              <Image
                className={styles.moviePoster}
                src={`https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`}
                alt={movieDetails.title}
                width={500}
                height={750}
                loading="lazy"
                layout="intrinsic" 
              />
            ) : (
              <div className={styles.posterFallback}>Image indisponible</div>
            )}
          </div>

          <div className={styles.movieDetails}>
            <h1 className={styles.movieTitle}>{movieDetails.title}</h1>
            <p className={styles.releaseDate}>
              Sorti le : {new Date(movieDetails.release_date).toLocaleDateString()}
            </p>
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
                : '/actordefaut.png';

              return (
                <div key={index} className={styles.castItem}>
                  <Image
                    className={styles.castProfile}
                    src={actorImage}
                    alt={member.name}
                    width={200}
                    height={300}
                    loading="lazy"
                    layout="intrinsic" 
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
                  width={500}
                  height={300}
                  loading="lazy"
                  layout="intrinsic"
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
};

export default MovieDetailsPage;
