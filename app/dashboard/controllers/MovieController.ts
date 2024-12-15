import { MovieRepositoryTMDB } from '@/repository/MovieRepositoryTMDB';
import { MovieDetails } from '@/entities/movieDetails';


const movieRepository = new MovieRepositoryTMDB();

export async function getMovieDetails(id: string): Promise<MovieDetails> {
  try {
    const movieDetails = await movieRepository.getMovieById(id); 
    return movieDetails;
  } catch (error) {
    console.error('Error fetching movie details:', error);
    throw new Error('Could not fetch movie details');
  }
}
