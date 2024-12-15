import { MovieRepository } from '@/repository/interface/MovieRepository';
import { MovieDetails } from '@/entities/movieDetails';

export class GetMovieUseCase {
  private movieRepository: MovieRepository;

  constructor(movieRepository: MovieRepository) {
    this.movieRepository = movieRepository;
  }

  async execute(id: string): Promise<MovieDetails> {
    const movieDetails = await this.movieRepository.getMovieById(id);
    return movieDetails;
  }
}
