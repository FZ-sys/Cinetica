import axios from 'axios';
import { MovieDetails } from '@/entities/movieDetails';
import { Movie } from '@/entities/Movie';
import { MovieRepository } from './interface/MovieRepository';

export class MovieRepositoryTMDB implements MovieRepository {
  private readonly apiKey: string;
  private readonly baseUrl: string = 'https://api.themoviedb.org/3';

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

  async getMovieById(id: string): Promise<MovieDetails> {
    try {
      const [movieResponse, creditsResponse] = await Promise.all([
        axios.get(`${this.baseUrl}/movie/${id}`, { params: { api_key: this.apiKey } }),
        axios.get(`${this.baseUrl}/movie/${id}/credits`, { params: { api_key: this.apiKey } })
      ]);

      const movieDetails = this.mapMovieDetails(movieResponse.data);
      movieDetails.credits = creditsResponse.data.cast.map((cast: any) => ({
        name: cast.name,
        role: cast.character,
        image: `https://image.tmdb.org/t/p/w500${cast.profile_path}`
      }));

      return movieDetails;
    } catch (error) {
      console.error(`Error fetching movie by ID: ${id}`, error);
      throw new Error('Failed to fetch movie details');
    }
  }

  private async fetchMovies(endpoint: string): Promise<Movie[]> {
    const response = await axios.get(`${this.baseUrl}${endpoint}`, {
      params: { api_key: this.apiKey }
    });
    return response.data.results.map(this.mapMovie);
  }

  private mapMovie(data: any): Movie {
    return {
      id: data.id,
      title: data.title,
      releaseDate: data.releaseDate,
      description: data.overview,
      genres: data.genres ? data.genres.map((genre: any) => genre.name) : [],
      images: [`https://image.tmdb.org/t/p/w500${data.poster_path}`],
      credits: []
    };
  }

  private mapMovieDetails(data: any): MovieDetails {
    return {
      ...this.mapMovie(data),
      runtime: data.runtime,
      budget: data.budget,
      revenue: data.revenue
    };
  }
}
