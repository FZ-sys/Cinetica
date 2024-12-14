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

    private async fetchData(url: string): Promise<any> {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Failed to fetch data from TMDB API. Status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    }

    async getPopularTVShows(): Promise<TVShow[]> {
        const url = `${this.baseUrl}/tv/popular?api_key=${this.apiKey}&language=en-US&page=1`;
        const data = await this.fetchData(url);
        return data.results as TVShow[];
    }

    async getOnTheAirTVShows(): Promise<TVShow[]> {
        const url = `${this.baseUrl}/tv/on_the_air?api_key=${this.apiKey}&language=en-US&page=1`;
        const data = await this.fetchData(url);
        return data.results as TVShow[];
    }

    async getTopRatedTVShows(): Promise<TVShow[]> {
        const url = `${this.baseUrl}/tv/top_rated?api_key=${this.apiKey}&language=en-US&page=1`;
        const data = await this.fetchData(url);
        return data.results as TVShow[];
    }

    async getDiscoverTVShows(): Promise<TVShow[]> {
        const url = `${this.baseUrl}/discover/tv?api_key=${this.apiKey}&language=en-US&page=1`;
        const data = await this.fetchData(url);
        return data.results as TVShow[];
    }
}
