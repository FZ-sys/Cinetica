"use client";

import React, { useState } from "react";
import { useFetchDiscoverTVShows } from "./hooks/useFetchDiscoverTVShows";
import { useFetchPopularTVShows } from "./hooks/useFetchPopularTVShows";
import { useFetchOnTheAirTVShows } from "./hooks/useFetchOnTheAirTVShows";
import { useFetchTopRatedTVShows } from "./hooks/useFetchTopRatedTVShows";
import { useFetchDiscoverMovies } from "./hooks/useFetchDiscoverMovies";
import { useFetchTopRatedMovies } from "./hooks/useFetchTopRatedMovies";
import { useFetchPopularMovies } from "./hooks/useFetchPopularMovies";
import { useFetchNowPlayingMovies } from "./hooks/useFetchNowPlayingMovies";
import Carousel from "./Components/Carousel";
import Sidebar from "./Components/Sidebar";
import SearchBar from "./Components/SearchBar";
import styles from './styles/dashboard.module.css';

// Fonction de normalisation des chaînes de caractères
const normalizeString = (str: string) => {
  return str
    .trim() // Supprime les espaces avant et après
    .toLowerCase() // Met en minuscule
    .normalize("NFD") // Décompose les caractères accentués en lettres de base et accents
    .replace(/[\u0300-\u036f]/g, ""); // Supprime les accents
};

const Dashboard = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(true);  // Sidebar ouverte par défaut

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  // Fetch movies
  const {
    movies: popularMovies,
    isLoading: loadingMovies,
    isError: errorMovies,
  } = useFetchPopularMovies();
  const {
    movies: topRatedMovies,
    isLoading: loadingTopRatedMovies,
    isError: errorTopRatedMovies,
  } = useFetchTopRatedMovies();
  const {
    movies: discoverMovies,
    isLoading: loadingDiscoverMovies,
    isError: errorDiscoverMovies,
  } = useFetchDiscoverMovies();
  const {
    movies: nowPlayingMovies,
    isLoading: loadingNowPlayingMovies,
    isError: errorNowPlayingMovies,
  } = useFetchNowPlayingMovies();

  // Fetch TV shows
  const {
    tvShows: popularTVShows,
    isLoading: loadingTVShows,
    isError: errorTVShows,
  } = useFetchPopularTVShows();
  const {
    tvShows: topRatedTVShows,
    isLoading: loadingTopRatedTVShows,
    isError: errorTopRatedTVShows,
  } = useFetchTopRatedTVShows();
  const {
    tvShows: discoverTVShows,
    isLoading: loadingDiscoverTVShows,
    isError: errorDiscoverTVShows,
  } = useFetchDiscoverTVShows();
  const {
    tvShows: onTheAirTVShows,
    isLoading: loadingOnTheAirTVShows,
    isError: errorOnTheAirTVShows,
  } = useFetchOnTheAirTVShows();

  const isLoading =
    loadingMovies ||
    loadingTopRatedMovies ||
    loadingDiscoverMovies ||
    loadingNowPlayingMovies ||
    loadingTVShows ||
    loadingTopRatedTVShows ||
    loadingDiscoverTVShows ||
    loadingOnTheAirTVShows;

  const isError =
    errorMovies ||
    errorTopRatedMovies ||
    errorDiscoverMovies ||
    errorNowPlayingMovies ||
    errorTVShows ||
    errorTopRatedTVShows ||
    errorDiscoverTVShows ||
    errorOnTheAirTVShows;

  // Helper function to filter items based on searchQuery
  const filterItems = (items: any[], field: string) => {
    const query = normalizeString(searchQuery);
    return items.filter((item) =>
      normalizeString(item[field] || "").includes(query)
    );
  };

  const mapItemsToCarousel = (items: any[], type: "movie" | "tv") =>
    items?.map((item) => {
      console.log(`Poster path for ${item.title || item.name}:`, item.poster_path);  // Vérifie la valeur de poster_path
  
      let posterUrl = "/placeholder.jpg";  // Valeur par défaut
  
      if (item.poster_path) {
        // Vérifie si poster_path commence par un `/` et le corrige si nécessaire
        const fullPosterUrl = item.poster_path.startsWith("/")
          ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
          : `https://image.tmdb.org/t/p/w500/${item.poster_path}`;
        
        // Assure-toi que l'URL est valide
        if (fullPosterUrl.startsWith('https://image.tmdb.org/t/p/w500/')) {
          posterUrl = fullPosterUrl;
        }
      }
  
      return {
        id: item.id,
        title: type === "movie" ? item.title : item.name,
        posterUrl,
        link: item.id ? `/${type}/${item.id}` : undefined,
      };
    }) || [];

  if (isLoading) {
    return <div className={styles.loading}>Loading...</div>;
  }

  if (isError) {
    return (
      <div className={styles.error}>
        There was an error loading the data. Please try again later.
      </div>
    );
  }

  return (
    <div className={styles.dashboard}>
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

      <div
        className={`${styles.content} ${sidebarOpen ? styles.sidebarOpen : ''}`}
      >
        {/* Bouton hamburger */}
        <button
          className={`${styles.sidebarToggle} ${sidebarOpen ? styles.hidden : ''}`}
          onClick={toggleSidebar}
        >
          ☰
        </button>
 
        {/* Search Bar */}
        <SearchBar
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        {/* Movies Sections */}
        <h2 id="popularMovies" className={styles.sectionTitle}>Popular Movies</h2>
        <Carousel
          items={mapItemsToCarousel(
            filterItems(popularMovies || [], "title"),
            "movie"
          )}
        />

        <h2 id="topRatedMovies" className={styles.sectionTitle}>Top Rated Movies</h2>
        <Carousel
          items={mapItemsToCarousel(
            filterItems(topRatedMovies || [], "title"),
            "movie"
          )}
        />

        <h2 id="discoverMovies" className={styles.sectionTitle}>Discover Movies</h2>
        <Carousel
          items={mapItemsToCarousel(
            filterItems(discoverMovies || [], "title"),
            "movie"
          )}
        />

        <h2 id="nowPlayingMovies" className={styles.sectionTitle}>Now Playing Movies</h2>
        <Carousel
          items={mapItemsToCarousel(
            filterItems(nowPlayingMovies || [], "title"),
            "movie"
          )}
        />

        {/* TV Shows Sections */}
        <h2 id="popularTVShows" className={styles.sectionTitle}>Popular TV Shows</h2>
        <Carousel
          items={mapItemsToCarousel(
            filterItems(popularTVShows || [], "name"),
            "tv"
          )}
        />

        <h2 id="topRatedTVShows" className={styles.sectionTitle}>Top Rated TV Shows</h2>
        <Carousel
          items={mapItemsToCarousel(
            filterItems(topRatedTVShows || [], "name"),
            "tv"
          )}
        />

        <h2 id="discoverTVShows" className={styles.sectionTitle}>Discover TV Shows</h2>
        <Carousel
          items={mapItemsToCarousel(
            filterItems(discoverTVShows || [], "name"),
            "tv"
          )}
        />

        <h2 id="onTheAirTVShows" className={styles.sectionTitle}>On The Air TV Shows</h2>
        <Carousel
          items={mapItemsToCarousel(
            filterItems(onTheAirTVShows || [], "name"),
            "tv"
          )}
        />
      </div>
    </div>
  );
};

export default Dashboard;
