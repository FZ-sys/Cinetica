import { TVShowRepositoryTMDB } from '@/repository/TVShowRepositoryTMDB';
import { TVShowDetails } from '@/entities/TVShowsDetails';
const tvShowRepository = new TVShowRepositoryTMDB();

export async function getTVShowDetails(id: string): Promise<TVShowDetails> {
  try {
    const tvShowDetails = await tvShowRepository.getTVShowById(id);  // Appelle la méthode pour récupérer les détails de l'émission
    return tvShowDetails;
  } catch (error) {
    console.error('Error fetching TV show details:', error);
    throw new Error('Could not fetch TV show details');
  }
}
