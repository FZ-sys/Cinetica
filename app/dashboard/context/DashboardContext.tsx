"use client";

import React, { createContext, useState, useContext, ReactNode } from 'react';
import { Movie } from '@/entities/Movie';
import { TVShow } from '@/entities/TVShow';
import loadDashboardData from '../hooks/loadDashboardData';

interface DashboardContextType {
    popularMovies: Movie[];
    topRatedMovies: Movie[];
    discoverMovies: Movie[];
    nowPlayingMovies: Movie[];
    popularTVShows: TVShow[];
    topRatedTVShows: TVShow[];
    discoverTVShows: TVShow[];
    onTheAirTVShows: TVShow[]; 
    setPopularMovies: React.Dispatch<React.SetStateAction<Movie[]>>;
    setTopRatedMovies: React.Dispatch<React.SetStateAction<Movie[]>>;
    setDiscoverMovies: React.Dispatch<React.SetStateAction<Movie[]>>;
    setNowPlayingMovies: React.Dispatch<React.SetStateAction<Movie[]>>;
    setPopularTVShows: React.Dispatch<React.SetStateAction<TVShow[]>>;
    setTopRatedTVShows: React.Dispatch<React.SetStateAction<TVShow[]>>;
    setDiscoverTVShows: React.Dispatch<React.SetStateAction<TVShow[]>>;
    setOnTheAirTVShows: React.Dispatch<React.SetStateAction<TVShow[]>>; 
}

const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

export const DashboardProvider = ({ children }: { children: ReactNode }) => {
    const [popularMovies, setPopularMovies] = useState<Movie[]>([]);
    const [topRatedMovies, setTopRatedMovies] = useState<Movie[]>([]);
    const [discoverMovies, setDiscoverMovies] = useState<Movie[]>([]);
    const [nowPlayingMovies, setNowPlayingMovies] = useState<Movie[]>([]);
    const [popularTVShows, setPopularTVShows] = useState<TVShow[]>([]);
    const [topRatedTVShows, setTopRatedTVShows] = useState<TVShow[]>([]);
    const [discoverTVShows, setDiscoverTVShows] = useState<TVShow[]>([]);
    const [onTheAirTVShows, setOnTheAirTVShows] = useState<TVShow[]>([]);

    loadDashboardData(
        setPopularMovies,
        setTopRatedMovies,
        setDiscoverMovies,
        setNowPlayingMovies,
        setPopularTVShows,
        setTopRatedTVShows,
        setDiscoverTVShows,
        setOnTheAirTVShows 
    );

    return (
        <DashboardContext.Provider
            value={{
                popularMovies,
                setPopularMovies,
                topRatedMovies,
                setTopRatedMovies,
                discoverMovies,
                setDiscoverMovies,
                nowPlayingMovies,
                setNowPlayingMovies,
                popularTVShows,
                setPopularTVShows,
                topRatedTVShows,
                setTopRatedTVShows,
                discoverTVShows,
                setDiscoverTVShows,
                onTheAirTVShows, 
                setOnTheAirTVShows, 
            }}
        >
            {children}
        </DashboardContext.Provider>
    );
};

export const useDashboardContext = (): DashboardContextType => {
    const context = useContext(DashboardContext);
    if (!context) {
        throw new Error('useDashboardContext must be used within a DashboardProvider');
    }
    return context;
};
