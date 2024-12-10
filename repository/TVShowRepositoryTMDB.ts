import { TVShow } from '../entities/TVShow';
import { TVShowRepository } from './interface/TVShowRepository';

export class TVShowRepositoryTMDB implements TVShowRepository {
    private apiKey: string;
    private baseUrl: string = 'https://api.themoviedb.org/3';

    constructor() {
        this.apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY || '';
        if (!this.apiKey) {
            throw new Error('API Key is not set! Please check your .env.local file');
        }
    }

    async getPopularTVShows(): Promise<TVShow[]> {
        const response = await fetch(
            `${this.baseUrl}/tv/popular?api_key=${this.apiKey}&language=en-US&page=1`
        );
        const data = await response.json();
        return data.results as TVShow[];
    }

    async getOnTheAirTVShows(): Promise<TVShow[]> {
        const response = await fetch(
            `${this.baseUrl}/tv/on_the_air?api_key=${this.apiKey}&language=en-US&page=1`
        );
        const data = await response.json();
        return data.results as TVShow[];
    }

    async getTopRatedTVShows(): Promise<TVShow[]> {
        const response = await fetch(
            `${this.baseUrl}/tv/top_rated?api_key=${this.apiKey}&language=en-US&page=1`
        );
        const data = await response.json();
        return data.results as TVShow[];
    }

    async getDiscoverTVShows(): Promise<TVShow[]> {
        const response = await fetch(
            `${this.baseUrl}/tv/popular?api_key=${this.apiKey}&language=en-US&page=1`
        );
        const data = await response.json();
        return data.results as TVShow[];
    }
}
