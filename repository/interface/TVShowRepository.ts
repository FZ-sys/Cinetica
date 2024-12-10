import { TVShow } from '../../entities/TVShow';

export interface TVShowRepository {
    getPopularTVShows(): Promise<TVShow[]>;
    getOnTheAirTVShows(): Promise<TVShow[]>;
    getTopRatedTVShows(): Promise<TVShow[]>;
    getDiscoverTVShows(): Promise<TVShow[]>;  
}
