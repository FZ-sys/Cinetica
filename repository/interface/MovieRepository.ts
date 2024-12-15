import { Movie } from '@/entities/Movie';
import { MovieDetails } from '@/entities/movieDetails';

export interface MovieRepository {
  getPopularMovies(): Promise<Movie[]>;
  getNowPlayingMovies(): Promise<Movie[]>;
  getTopRatedMovies(): Promise<Movie[]>;
  getDiscoverMovies(): Promise<Movie[]>;
  getMovieById(id: string): Promise<MovieDetails>; 
}
