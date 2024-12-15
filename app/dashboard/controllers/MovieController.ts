// src/app/dashboard/controllers/MovieController.ts
import { MovieRepositoryTMDB } from '@/repository/MovieRepositoryTMDB';
import { MovieDetails } from '@/entities/movieDetails';

const movieRepository = new MovieRepositoryTMDB();

export class MovieController {
  static async getMovieDetails(id: string): Promise<MovieDetails> {
    try {
      // Récupère les détails d'un film depuis l'API
      const movieDetails = await movieRepository.getMovieById(id);
      return movieDetails;
    } catch (error) {
      console.error("Error fetching movie details:", error);
      throw new Error('Unable to fetch movie details');
    }
  }
}
