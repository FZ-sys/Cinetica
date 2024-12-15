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

  const {
    movies: discoverMovies,
    isLoading: loadingDiscoverMovies,
    isError: errorDiscoverMovies,
  } = useFetchDiscoverMovies();

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
      console.log(`Données de l'élément (${type})`, item);
      console.log(`Poster path pour ${item.title || item.title}:`, item.poster_path);

      let posterUrl = "/placeholder.jpg"; 

      if (item.poster_path) {
        const fullPosterUrl = item.poster_path.startsWith("/")
          ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
          : `https://image.tmdb.org/t/p/w500/${item.poster_path}`;

        if (fullPosterUrl.startsWith('https://image.tmdb.org/t/p/w500/')) {
          posterUrl = fullPosterUrl;
        }
      } else if (item.images && item.images.length > 0) {
        posterUrl = item.images[0];  
      }

      return {
        id: item.id,
        title: type === "movie" ? item.title : item.title,
        posterUrl,
        link: type === "movie" ? `/movie/${item.id}` : `/tv/${item.id}`,
      };
    }) || [];


  const closeDiscover = () => {
    window.location.href = '/dashboard'; 
  };
  
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
      <div className={styles.overlay}>
        <button className={styles.closeButton} onClick={closeDiscover}>
          ✖
        </button>

        <div className={styles.content}>
          <h2 id="discoverMovies" className={styles.sectionTitle}>Discover Movies</h2>
          <Carousel
            items={mapItemsToCarousel(
              filterItems(discoverMovies || [], "title"),
              "movie"
            )}
          />

          <h2 id="discoverTVShows" className={styles.sectionTitle}>Discover TV Shows</h2>
          <Carousel
            items={mapItemsToCarousel(
              filterItems(discoverTVShows || [], "title"),
              "tv"
            )}
          />
        </div>
      </div>
    </div>
  );
};

export default DiscoverPage;
