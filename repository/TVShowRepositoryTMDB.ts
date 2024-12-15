import axios from 'axios';
import { TVShowDetails } from '@/entities/TVShowsDetails';
import { TVShowRepository } from './interface/TVShowRepository';
import { TVShow } from '@/entities/TVShow';  // Ensure that the TVShow interface exists.

export class TVShowRepositoryTMDB implements TVShowRepository {
  private readonly apiKey: string;
  private readonly baseUrl: string = 'https://api.themoviedb.org/3';

  constructor() {
    this.apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY || '';
    if (!this.apiKey) {
      throw new Error('API Key is not set! Please check your .env.local file');
    }
  }

  // Implementation of method to get popular TV shows
  async getPopularTVShows(): Promise<TVShow[]> {
    return this.fetchTVShows('/tv/popular'); // Correct endpoint
  }

  // Implementation of method to get TV shows airing today
  async getAiringTodayTVShows(): Promise<TVShow[]> {
    return this.fetchTVShows('/tv/on_the_air'); // Correct endpoint
  }

  // Implementation of method to get top-rated TV shows
  async getTopRatedTVShows(): Promise<TVShow[]> {
    return this.fetchTVShows('/tv/top_rated'); // Correct endpoint
  }

  // Implementation of method to discover TV shows
  async getDiscoverTVShows(): Promise<TVShow[]> {
    return this.fetchTVShows('/discover/tv'); // Correct endpoint
  }

  // Implementation of method to get TV show details by ID
  async getTVShowById(id: string): Promise<TVShowDetails> {
    const response = await axios.get(`${this.baseUrl}/tv/${id}`, {
      params: { api_key: this.apiKey }
    });

    const creditsResponse = await axios.get(`${this.baseUrl}/tv/${id}/credits`, {
      params: { api_key: this.apiKey }
    });

    const tvShowDetails = this.mapTVShowDetails(response.data);
    tvShowDetails.credits = creditsResponse.data.cast.map((cast: any) => ({
      name: cast.name,
      role: cast.character,
      image: cast.profile_path ? `https://image.tmdb.org/t/p/w500${cast.profile_path}` : '',
    }));

    return tvShowDetails;
  }

  private async fetchTVShows(endpoint: string): Promise<TVShow[]> {
    const response = await axios.get(`${this.baseUrl}${endpoint}`, {
      params: { api_key: this.apiKey }
    });
  
    console.log(response.data);  // Vérifie ici la structure de la réponse
    return response.data.results.map(this.mapTVShow);
  }
  

  private mapTVShow(data: any): TVShow {
    return {
      id: data.id,
      title: data.name,
      releaseDate: data.first_air_date, // assure-toi que ce champ existe
      description: data.overview, // assure-toi que ce champ existe
      genres: data.genres ? data.genres.map((genre: any) => genre.name) : [],  // Vérifie que genres est bien un tableau
      images: data.poster_path ? [`https://image.tmdb.org/t/p/w500${data.poster_path}`] : [],
    };
  }
  

  // Private method to map details to TVShowDetails interface
  private mapTVShowDetails(data: any): TVShowDetails {
    return {
      id: data.id,
      title: data.name,
      releaseDate: data.first_air_date,
      description: data.overview,
      genres: data.genres ? data.genres.map((genre: any) => genre.name) : [],
      images: data.poster_path ? [`https://image.tmdb.org/t/p/w500${data.poster_path}`] : [],
      credits: [],
      seasons: data.number_of_seasons,
      episodes: data.number_of_episodes,
    };
  }
}
