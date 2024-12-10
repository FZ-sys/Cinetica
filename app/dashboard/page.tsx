"use client";

import React, { useState } from 'react';
import { useFetchPopularMovies } from './hooks/useFetchPopularMovies';
import { useFetchTopRatedMovies } from './hooks/useFetchTopRatedMovies';
import { useFetchDiscoverMovies } from './hooks/useFetchDiscoverMovies';
import { useFetchNowPlayingMovies } from './hooks/useFetchNowPlayingMovies';
import { useFetchPopularTVShows } from './hooks/useFetchPopularSeries';
import { useFetchTopRatedTVShows } from './hooks/useFetchTopRatedTVShows';
import { useFetchDiscoverTVShows } from './hooks/useFetchDiscoverTVShows';
import { useFetchOnTheAirTVShows } from './hooks/useFetchOnTheAirTVShows';
import Carousel from './Components/Carousel';
import Navbar from './Components/Navbar';
import Sidebar from './Components/Sidebar';
import SearchBar from './Components/SearchBar';
import styles from './styles/dashboard.module.css';

// Fonction de normalisation des chaînes de caractères
const normalizeString = (str: string) => {
    return str
        .trim()  // Supprime les espaces avant et après
        .toLowerCase()  // Met en minuscule
        .normalize("NFD") // Décompose les caractères accentués en lettres de base et accents
        .replace(/[\u0300-\u036f]/g, ""); // Supprime les accents
};

const Dashboard = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

    // Fetch movies
    const { movies: popularMovies, isLoading: loadingMovies, isError: errorMovies } = useFetchPopularMovies();
    const { movies: topRatedMovies, isLoading: loadingTopRatedMovies, isError: errorTopRatedMovies } = useFetchTopRatedMovies();
    const { movies: discoverMovies, isLoading: loadingDiscoverMovies, isError: errorDiscoverMovies } = useFetchDiscoverMovies();
    const { movies: nowPlayingMovies, isLoading: loadingNowPlayingMovies, isError: errorNowPlayingMovies } = useFetchNowPlayingMovies();

    // Fetch TV shows
    const { tvShows: popularTVShows, isLoading: loadingTVShows, isError: errorTVShows } = useFetchPopularTVShows();
    const { tvShows: topRatedTVShows, isLoading: loadingTopRatedTVShows, isError: errorTopRatedTVShows } = useFetchTopRatedTVShows();
    const { tvShows: discoverTVShows, isLoading: loadingDiscoverTVShows, isError: errorDiscoverTVShows } = useFetchDiscoverTVShows();
    const { tvShows: onTheAirTVShows, isLoading: loadingOnTheAirTVShows, isError: errorOnTheAirTVShows } = useFetchOnTheAirTVShows();

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

    // Helper function to filter movies based on searchQuery
    const filteredMovies = (movies: any[]) => {
        console.log('Search Query (Movies):', searchQuery); // Vérifie la chaîne de recherche
        console.log('Movies before filtering:', movies); // Vérifie les films avant le filtrage
        
        const query = normalizeString(searchQuery);  // Normalisation de la chaîne de recherche
        const filtered = movies.filter((movie) =>
            normalizeString(movie.title || '').includes(query)  // Filtrage insensible à la casse et aux accents
        );
        
        console.log('Movies after filtering:', filtered); // Vérifie les films après le filtrage
        return filtered;
    };

    // Helper function to filter TV shows based on searchQuery
    const filteredTVShows = (tvShows: any[]) => {
        console.log('Search Query (TV Shows):', searchQuery); // Vérifie la chaîne de recherche
        console.log('TV Shows before filtering:', tvShows); // Vérifie les séries avant le filtrage
        
        const query = normalizeString(searchQuery);  // Normalisation de la chaîne de recherche
        const filtered = tvShows.filter((tvShow) =>
            normalizeString(tvShow.title || '').includes(query)  // Filtrage insensible à la casse et aux accents
        );
        
        console.log('TV Shows after filtering:', filtered); // Vérifie les séries après le filtrage
        return filtered;
    };

    if (isLoading) {
        return <div className={styles.loading}>Loading...</div>;
    }

    if (isError) {
        return <div className={styles.error}>There was an error loading the data. Please try again later.</div>;
    }

    return (
        <div className={styles.dashboard}>
            <Navbar />
            <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
            <div className={styles.content}>
                <SearchBar value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />

                {/* Movies Sections */}
                <h2 className={styles.sectionTitle}>Popular Movies</h2>
                <Carousel
                    items={popularMovies?.length ? filteredMovies(
                        popularMovies?.map((movie) => ({
                            title: movie.title,
                            posterUrl: movie.poster_path
                                ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
                                : '/placeholder.jpg',
                        }))
                    ) : []}
                />

                <h2 className={styles.sectionTitle}>Top Rated Movies</h2>
                <Carousel
                    items={topRatedMovies?.length ? filteredMovies(
                        topRatedMovies?.map((movie) => ({
                            title: movie.title,
                            posterUrl: movie.poster_path
                                ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
                                : '/placeholder.jpg',
                        }))
                    ) : []}
                />

                <h2 className={styles.sectionTitle}>Discover Movies</h2>
                <Carousel
                    items={discoverMovies?.length ? filteredMovies(
                        discoverMovies?.map((movie) => ({
                            title: movie.title,
                            posterUrl: movie.poster_path
                                ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
                                : '/placeholder.jpg',
                        }))
                    ) : []}
                />

                <h2 className={styles.sectionTitle}>Now Playing Movies</h2>
                <Carousel
                    items={nowPlayingMovies?.length ? filteredMovies(
                        nowPlayingMovies?.map((movie) => ({
                            title: movie.title,
                            posterUrl: movie.poster_path
                                ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
                                : '/placeholder.jpg',
                        }))
                    ) : []}
                />

                {/* TV Shows Sections */}
                <h2 className={styles.sectionTitle}>Popular TV Shows</h2>
                <Carousel
                    items={popularTVShows?.length ? filteredTVShows(
                        popularTVShows?.map((tvShow) => ({
                            title: tvShow.name,
                            posterUrl: tvShow.poster_path
                                ? `https://image.tmdb.org/t/p/w500/${tvShow.poster_path}`
                                : '/placeholder.jpg',
                        }))
                    ) : []}
                />

                <h2 className={styles.sectionTitle}>Top Rated TV Shows</h2>
                <Carousel
                    items={topRatedTVShows?.length ? filteredTVShows(
                        topRatedTVShows?.map((tvShow) => ({
                            title: tvShow.name,
                            posterUrl: tvShow.poster_path
                                ? `https://image.tmdb.org/t/p/w500/${tvShow.poster_path}`
                                : '/placeholder.jpg',
                        }))
                    ) : []}
                />

                <h2 className={styles.sectionTitle}>Discover TV Shows</h2>
                <Carousel
                    items={discoverTVShows?.length ? filteredTVShows(
                        discoverTVShows?.map((tvShow) => ({
                            title: tvShow.name,
                            posterUrl: tvShow.poster_path
                                ? `https://image.tmdb.org/t/p/w500/${tvShow.poster_path}`
                                : '/placeholder.jpg',
                        }))
                    ) : []}
                />

                <h2 className={styles.sectionTitle}>On The Air TV Shows</h2>
                <Carousel
                    items={onTheAirTVShows?.length ? filteredTVShows(
                        onTheAirTVShows?.map((tvShow) => ({
                            title: tvShow.name,
                            posterUrl: tvShow.poster_path
                                ? `https://image.tmdb.org/t/p/w500/${tvShow.poster_path}`
                                : '/placeholder.jpg',
                        }))
                    ) : []}
                />
            </div>
        </div>
    );
};

export default Dashboard;
