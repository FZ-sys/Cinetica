import { MovieDetail } from '@/entities/movieDetails';
import { Movie } from '../entities/Movie';
import { Cast } from '../entities/cast';
import { Images } from '../entities/images';
import { MovieRepository } from './interface/MovieRepository';

export class MovieRepositoryTMDB implements MovieRepository {
    private apiKey: string;
    private baseUrl: string = 'https://api.themoviedb.org/3';

    constructor() {
        this.apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY || '';
        if (!this.apiKey) {
            throw new Error('API Key is not set! Please check your .env.local file');
        }
    }

    async getPopularMovies(): Promise<Movie[]> {
        return this.fetchMovies('/movie/popular');
    }

    async getNowPlayingMovies(): Promise<Movie[]> {
        return this.fetchMovies('/movie/now_playing');
    }

    async getTopRatedMovies(): Promise<Movie[]> {
        return this.fetchMovies('/movie/top_rated');
    }

    async getDiscoverMovies(): Promise<Movie[]> {
        return this.fetchMovies('/discover/movie');
    }

    private async fetchMovies(endpoint: string): Promise<Movie[]> {
        try {
            const url = `${this.baseUrl}${endpoint}?api_key=${this.apiKey}&language=en-US&page=1`;
            const response = await fetch(url);

            if (!response.ok) {
                throw new Error(`Failed to fetch movies from endpoint: ${endpoint}`);
            }

            const data = await response.json();
            return data.results as Movie[];
        } catch (error) {
            console.error('Error fetching movies:', error);
            throw error;
        }
    }

    async getMovieDetails(id: number): Promise<MovieDetail> {
        try {
            const url = `${this.baseUrl}/movie/${id}?api_key=${this.apiKey}&language=en-US`;
            const response = await fetch(url);

            if (!response.ok) {
                throw new Error(`Failed to fetch movie details for ID: ${id}`);
            }

            const data = await response.json();
            return data as MovieDetail;
        } catch (error) {
            console.error('Error fetching movie details:', error);
            throw error;
        }
    }

    async getMovieCast(id: number): Promise<Cast[]> {
        try {
            const url = `${this.baseUrl}/movie/${id}/credits?api_key=${this.apiKey}&language=en-US`;
            const response = await fetch(url);

            if (!response.ok) {
                throw new Error(`Failed to fetch cast for movie ID: ${id}`);
            }

            const data = await response.json();
            return data.cast.map((actor: any) => ({
                name: actor.name,
                character: actor.character,
                profile_path: actor.profile_path,
            })) as Cast[];
        } catch (error) {
            console.error('Error fetching movie cast:', error);
            throw error;
        }
    }

    async getMovieImages(id: number): Promise<Images[]> {
        try {
            const url = `${this.baseUrl}/movie/${id}/images?api_key=${this.apiKey}`;
            const response = await fetch(url);

            if (!response.ok) {
                throw new Error(`Failed to fetch images for movie ID: ${id}`);
            }

            const data = await response.json();
            return data.backdrops.map((image: any) => ({
                filePath: image.file_path,
            })) as Images[];
        } catch (error) {
            console.error('Error fetching movie images:', error);
            throw error;
        }
    }

    async getMovieGenres(): Promise<{ id: number; name: string }[]> {
        try {
            const url = `${this.baseUrl}/genre/movie/list?api_key=${this.apiKey}&language=en-US`;
            const response = await fetch(url);

            if (!response.ok) {
                throw new Error('Failed to fetch movie genres');
            }

            const data = await response.json();
            return data.genres as { id: number; name: string }[];
        } catch (error) {
            console.error('Error fetching movie genres:', error);
            throw error;
        }
    }
}
