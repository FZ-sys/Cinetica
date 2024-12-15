import { TVShow } from '@/entities/TVShow';
import { TVShowDetails } from '@/entities/TVShowsDetails';
export interface TVShowRepository {
  getPopularTVShows(): Promise<TVShow[]>; // Méthode pour récupérer les séries populaires
  getAiringTodayTVShows(): Promise<TVShow[]>; // Séries qui sont diffusées aujourd'hui
  getTopRatedTVShows(): Promise<TVShow[]>; // Séries les mieux notées
  getDiscoverTVShows(): Promise<TVShow[]>; // Découverte de séries
  getTVShowById(id: string): Promise<TVShowDetails>; // Récupérer les détails d'une série par son ID
}
