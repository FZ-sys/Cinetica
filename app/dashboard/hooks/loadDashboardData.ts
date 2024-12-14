import { useEffect } from 'react';
import { Movie } from '@/entities/Movie';
import { TVShow } from '@/entities/TVShow';

const useLoadDashboardData = (
  setPopularMovies: React.Dispatch<React.SetStateAction<Movie[]>>,
  setTopRatedMovies: React.Dispatch<React.SetStateAction<Movie[]>>,
  setDiscoverMovies: React.Dispatch<React.SetStateAction<Movie[]>>,
  setNowPlayingMovies: React.Dispatch<React.SetStateAction<Movie[]>>,
  setPopularTVShows: React.Dispatch<React.SetStateAction<TVShow[]>>,
  setTopRatedTVShows: React.Dispatch<React.SetStateAction<TVShow[]>>,
  setDiscoverTVShows: React.Dispatch<React.SetStateAction<TVShow[]>>,
  setOnTheAirTVShows: React.Dispatch<React.SetStateAction<TVShow[]>>
) => {
  useEffect(() => {
    let isMounted = true; 

    const fetchData = async () => {
      try {
        const [
          popularMoviesResponse,
          topRatedMoviesResponse,
          discoverMoviesResponse,
          nowPlayingMoviesResponse,
          popularTVShowsResponse,
          topRatedTVShowsResponse,
          discoverTVShowsResponse,
          onTheAirTVShowsResponse,
        ] = await Promise.all([
          fetch('/api/movies/popular'),
          fetch('/api/movies/top-rated'),
          fetch('/api/movies/discover'),
          fetch('/api/movies/now-playing'),
          fetch('/api/shows/popular'),
          fetch('/api/shows/top-rated'),
          fetch('/api/shows/discover'),
          fetch('/api/shows/on-the-air'),
        ]);

        if (!isMounted) return; 

        if (!popularMoviesResponse.ok) throw new Error('Failed to fetch popular movies');
        if (!topRatedMoviesResponse.ok) throw new Error('Failed to fetch top-rated movies');
        if (!discoverMoviesResponse.ok) throw new Error('Failed to fetch discover movies');
        if (!nowPlayingMoviesResponse.ok) throw new Error('Failed to fetch now playing movies');
        if (!popularTVShowsResponse.ok) throw new Error('Failed to fetch popular TV shows');
        if (!topRatedTVShowsResponse.ok) throw new Error('Failed to fetch top-rated TV shows');
        if (!discoverTVShowsResponse.ok) throw new Error('Failed to fetch discover TV shows');
        if (!onTheAirTVShowsResponse.ok) throw new Error('Failed to fetch on the air TV shows');

        const [
          popularMovies,
          topRatedMovies,
          discoverMovies,
          nowPlayingMovies,
          popularTVShows,
          topRatedTVShows,
          discoverTVShows,
          onTheAirTVShows,
        ] = await Promise.all([
          popularMoviesResponse.json(),
          topRatedMoviesResponse.json(),
          discoverMoviesResponse.json(),
          nowPlayingMoviesResponse.json(),
          popularTVShowsResponse.json(),
          topRatedTVShowsResponse.json(),
          discoverTVShowsResponse.json(),
          onTheAirTVShowsResponse.json(),
        ]);

        if (!isMounted) return; 

        setPopularMovies(popularMovies.results);
        setTopRatedMovies(topRatedMovies.results);
        setDiscoverMovies(discoverMovies.results);
        setNowPlayingMovies(nowPlayingMovies.results);

        setPopularTVShows(popularTVShows.results);
        setTopRatedTVShows(topRatedTVShows.results);
        setDiscoverTVShows(discoverTVShows.results);
        setOnTheAirTVShows(onTheAirTVShows.results);
      } catch (error) {
        if (isMounted) console.error('Error loading dashboard data:', error);
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [
    setPopularMovies,
    setTopRatedMovies,
    setDiscoverMovies,
    setNowPlayingMovies,
    setPopularTVShows,
    setTopRatedTVShows,
    setDiscoverTVShows,
    setOnTheAirTVShows,
  ]);
};

export default useLoadDashboardData;
