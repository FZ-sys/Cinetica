"use client";

import React, { useState } from "react";
import { useFetchDiscoverTVShows } from "./hooks/useFetchDiscoverTVShows";
import { useFetchPopularTVShows } from "./hooks/useFetchPopularTVShows";
import { useFetchTopRatedTVShows } from "./hooks/useFetchTopRatedTVShows";
import { useFetchNowPlayingMovies } from "./hooks/useFetchNowPlayingMovies";


import { useFetchTopRatedMovies } from "./hooks/useFetchTopRatedMovies";
import { useFetchDiscoverMovies } from "./hooks/useFetchDiscoverMovies";
import { useFetchOnTheAirTVShows } from "./hooks/useFetchOnTheAirTVShows";
import { useFetchPopularMovies } from "./hooks/useFetchPopularMovies";

import Carousel from "./Components/Carousel";
import Sidebar from "./Components/Sidebar";
import SearchBar from "./Components/SearchBar";
import styles from './styles/dashboard.module.css';

const normalizeString = (str: string) => {
  return str
    .trim() 
    .toLowerCase() 
    .normalize("NFD") 
    .replace(/[\u0300-\u036f]/g, "");
};

const Dashboard = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(true); 

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

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
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

      <div
        className={`${styles.content} ${sidebarOpen ? styles.sidebarOpen : ''}`}
      >
        <button
          className={`${styles.sidebarToggle} ${sidebarOpen ? styles.hidden : ''}`}
          onClick={toggleSidebar}
        >
          ☰
        </button>

        <SearchBar
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

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

        <h2 id="nowPlayingMovies" className={styles.sectionTitle}>Now Playing Movies</h2>
        <Carousel
          items={mapItemsToCarousel(
            filterItems(nowPlayingMovies || [], "title"),
            "movie"
          )}
        />

        <h2 id="popularTVShows" className={styles.sectionTitle}>Popular TV Shows</h2>
        <Carousel
          items={mapItemsToCarousel(
            filterItems(popularTVShows || [], "title"),
            "tv"
          )}
        />

        <h2 id="topRatedTVShows" className={styles.sectionTitle}>Top Rated TV Shows</h2>
        <Carousel
          items={mapItemsToCarousel(
            filterItems(topRatedTVShows || [], "title"),
            "tv"
          )}
        />

        <h2 id="onTheAirTVShows" className={styles.sectionTitle}>On The Air TV Shows</h2>
        <Carousel
          items={mapItemsToCarousel(
            filterItems(onTheAirTVShows || [], "title"),
            "tv"
          )}
        />
      </div>
    </div>
  );
};

export default Dashboard;