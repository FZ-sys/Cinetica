'use client';

import React, { useState } from "react";
import { useFetchDiscoverTVShows } from "../hooks/useFetchDiscoverTVShows";  
import styles from './styles/discover.module.css';
import { useFetchDiscoverMovies } from "../hooks/useFetchDiscoverMovies";
import Carousel from "../Components/Carousel";

const normalizeString = (str: string) => {
  return str
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
};

const DiscoverPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isDiscoverOpen, setIsDiscoverOpen] = useState(true);  // Etat pour afficher ou cacher Discover
  
  // Fonction pour fermer le Discover et rediriger vers le dashboard
  const toggleDiscover = () => {
    setIsDiscoverOpen(false); // Ferme l'overlay
    window.location.href = '/dashboard';  // Redirection vers le dashboard
  };
  
  // Fetch movies
  const {
    movies: discoverMovies,
    isLoading: loadingDiscoverMovies,
    isError: errorDiscoverMovies,
  } = useFetchDiscoverMovies();

  // Fetch TV shows
  const {
    tvShows: discoverTVShows,
    isLoading: loadingDiscoverTVShows,
    isError: errorDiscoverTVShows,
  } = useFetchDiscoverTVShows();

  const isLoading = loadingDiscoverMovies || loadingDiscoverTVShows;
  const isError = errorDiscoverMovies || errorDiscoverTVShows;

  const filterItems = (items: any[], field: string) => {
    const query = normalizeString(searchQuery);
    return items.filter((item) =>
      normalizeString(item[field] || "").includes(query)
    );
  };

  const mapItemsToCarousel = (items: any[], type: "movie" | "tv") =>
    items?.map((item) => {
      let posterUrl = "/placeholder.jpg";  // Valeur par défaut

      if (item.poster_path) {
        // Vérifie si poster_path commence par un `/` et le corrige si nécessaire
        const fullPosterUrl = item.poster_path.startsWith("/")
          ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
          : `https://image.tmdb.org/t/p/w500/${item.poster_path}`;

        if (fullPosterUrl.startsWith('https://image.tmdb.org/t/p/w500/')) {
          posterUrl = fullPosterUrl;
        }
      } else if (item.images && item.images.length > 0) {
        posterUrl = item.images[0];  // Ou une logique différente pour obtenir un poster
      }

      return {
        id: item.id,
        title: type === "movie" ? item.title : item.title,
        posterUrl,
        link: type === "movie" ? `/movie/${item.id}` : `/tv/${item.id}`,
      };
    }) || [];
  
  if (isLoading) {
    return <div className={styles.loading}>Chargement...</div>;
  }

  if (isError) {
    return (
      <div className={styles.error}>
        There was an error loading the data. Please try again later.
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {/* Si l'overlay Discover est ouvert, on l'affiche */}
      {isDiscoverOpen && (
        <div className={styles.overlay}>
          {/* Bouton pour fermer le Discover (croix en haut à droite) */}
          <button className={styles.closeButton} onClick={toggleDiscover}>
            ✖
          </button>

          <div className={styles.content}>
            {/* Carrousel des films */}
            <h2 id="discoverMovies" className={styles.sectionTitle}>Discover Movies</h2>
            <Carousel
              items={mapItemsToCarousel(
                filterItems(discoverMovies || [], "title"),
                "movie"
              )}
            />

            {/* Carrousel des séries */}
            <h2 id="discoverTVShows" className={styles.sectionTitle}>Discover TV Shows</h2>
            <Carousel
              items={mapItemsToCarousel(
                filterItems(discoverTVShows || [], "title"),
                "tv"
              )}
            />
          </div>
        </div>
      )}

      {/* Bouton pour ouvrir Discover */}
      {!isDiscoverOpen && (
        <button className={styles.openButton} onClick={() => setIsDiscoverOpen(true)}>
          Ouvrir Discover
        </button>
      )}
    </div>
  );
};

export default DiscoverPage;
