import { Movie } from '../../entities/Movie';

export interface MovieRepository {
    getPopularMovies(): Promise<Movie[]>;
    getNowPlayingMovies(): Promise<Movie[]>;
    getTopRatedMovies(): Promise<Movie[]>;
    getDiscoverMovies(): Promise<Movie[]>;  
}
