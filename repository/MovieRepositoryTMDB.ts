import { Movie } from '../entities/Movie';
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
        const response = await fetch(
            `${this.baseUrl}/movie/popular?api_key=${this.apiKey}&language=en-US&page=1`
        );
        const data = await response.json();
        return data.results as Movie[];
    }

    async getNowPlayingMovies(): Promise<Movie[]> {
        const response = await fetch(
            `${this.baseUrl}/movie/now_playing?api_key=${this.apiKey}&language=en-US&page=1`
        );
        const data = await response.json();
        return data.results as Movie[];
    }

    async getTopRatedMovies(): Promise<Movie[]> {
        const response = await fetch(
            `${this.baseUrl}/movie/top_rated?api_key=${this.apiKey}&language=en-US&page=1`
        );
        const data = await response.json();
        return data.results as Movie[];
    }

    async getDiscoverMovies(): Promise<Movie[]> {
        const response = await fetch(
            `${this.baseUrl}/movie/popular?api_key=${this.apiKey}&language=en-US&page=1` 
        );
        const data = await response.json();
        return data.results as Movie[];
    }
}
