import { useQuery } from '@tanstack/react-query';
import { Movie } from '@/entities/Movie';
import { useApplicationRepositoryContext } from '@/repository/ApplicationRepositoryContext';

export const useFetchNowPlayingMovies = () => {
    const { movieRepository } = useApplicationRepositoryContext();

    const { data, isLoading, isError } = useQuery<Movie[]>({
        queryKey: ['now-playing-movies'],
        queryFn: async () => await movieRepository.getNowPlayingMovies(),
    });

    return { movies: data, isLoading, isError };
};
