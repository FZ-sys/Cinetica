import { TVShow } from '@/entities/TVShow';
import { TVShowDetails } from '@/entities/TVShowsDetails';
export interface TVShowRepository {
  getPopularTVShows(): Promise<TVShow[]>; 
  getAiringTodayTVShows(): Promise<TVShow[]>;
  getTopRatedTVShows(): Promise<TVShow[]>;
  getDiscoverTVShows(): Promise<TVShow[]>; 
  getTVShowById(id: string): Promise<TVShowDetails>;
}
