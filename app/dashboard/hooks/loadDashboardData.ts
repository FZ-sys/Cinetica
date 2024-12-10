import { Movie } from '@/entities/Movie';
import { TVShow } from '@/entities/TVShow';

const loadDashboardData = async (
    setPopularMovies: React.Dispatch<React.SetStateAction<Movie[]>>,
    setTopRatedMovies: React.Dispatch<React.SetStateAction<Movie[]>>,
    setDiscoverMovies: React.Dispatch<React.SetStateAction<Movie[]>>,
    setNowPlayingMovies: React.Dispatch<React.SetStateAction<Movie[]>>,
    setPopularTVShows: React.Dispatch<React.SetStateAction<TVShow[]>>,
    setTopRatedTVShows: React.Dispatch<React.SetStateAction<TVShow[]>>,
    setDiscoverTVShows: React.Dispatch<React.SetStateAction<TVShow[]>>,
    setOnTheAirTVShows: React.Dispatch<React.SetStateAction<TVShow[]>>
) => {
    try {
        const popularMoviesResponse = await fetch('/api/movies/popular');
        const topRatedMoviesResponse = await fetch('/api/movies/top-rated');
        const discoverMoviesResponse = await fetch('/api/movies/discover');
        const nowPlayingMoviesResponse = await fetch('/api/movies/now-playing');

        const popularTVShowsResponse = await fetch('/api/shows/popular');
        const topRatedTVShowsResponse = await fetch('/api/shows/top-rated');
        const discoverTVShowsResponse = await fetch('/api/shows/discover');
        const onTheAirTVShowsResponse = await fetch('/api/shows/on-the-air');

        if (!popularMoviesResponse.ok) throw new Error('Failed to fetch popular movies');
        if (!topRatedMoviesResponse.ok) throw new Error('Failed to fetch top-rated movies');
        if (!discoverMoviesResponse.ok) throw new Error('Failed to fetch discover movies');
        if (!nowPlayingMoviesResponse.ok) throw new Error('Failed to fetch now playing movies');
        
        if (!popularTVShowsResponse.ok) throw new Error('Failed to fetch popular TV shows');
        if (!topRatedTVShowsResponse.ok) throw new Error('Failed to fetch top-rated TV shows');
        if (!discoverTVShowsResponse.ok) throw new Error('Failed to fetch discover TV shows');
        if (!onTheAirTVShowsResponse.ok) throw new Error('Failed to fetch on the air TV shows');

        const popularMovies = await popularMoviesResponse.json();
        const topRatedMovies = await topRatedMoviesResponse.json();
        const discoverMovies = await discoverMoviesResponse.json();
        const nowPlayingMovies = await nowPlayingMoviesResponse.json();

        const popularTVShows = await popularTVShowsResponse.json();
        const topRatedTVShows = await topRatedTVShowsResponse.json();
        const discoverTVShows = await discoverTVShowsResponse.json();
        const onTheAirTVShows = await onTheAirTVShowsResponse.json();

        setPopularMovies(popularMovies.results);
        setTopRatedMovies(topRatedMovies.results);
        setDiscoverMovies(discoverMovies.results);
        setNowPlayingMovies(nowPlayingMovies.results);

        setPopularTVShows(popularTVShows.results);
        setTopRatedTVShows(topRatedTVShows.results);
        setDiscoverTVShows(discoverTVShows.results);
        setOnTheAirTVShows(onTheAirTVShows.results);

    } catch (error) {
        console.error('Error loading dashboard data:', error);
    }
};
export default loadDashboardData;
