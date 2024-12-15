import { Movie } from '@/entities/Movie';
import { MovieRepository } from '@/repository/interface/MovieRepository';
export class GetAllMoviesUseCase {
  private movieRepository: MovieRepository;

  constructor(movieRepository: MovieRepository) {
    this.movieRepository = movieRepository;
  }

  async execute(): Promise<Movie[]> {
    return this.movieRepository.getPopularMovies(); 
  }
}
