import { useQuery } from '@tanstack/react-query';
import { Movie } from '@/entities/Movie';
import { useApplicationRepositoryContext } from '@/repository/ApplicationRepositoryContext';

export const useFetchDiscoverMovies = () => {
    const { movieRepository } = useApplicationRepositoryContext();

    const { data, isLoading, isError } = useQuery<Movie[]>({
        queryKey: ['discover-movies'],
        queryFn: async () => await movieRepository.getDiscoverMovies(),
    });

    return { movies: data, isLoading, isError };
};
