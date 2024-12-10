import { useQuery } from '@tanstack/react-query';
import { Movie } from '@/entities/Movie';
import { useApplicationRepositoryContext } from '@/repository/ApplicationRepositoryContext';

export const useFetchPopularMovies = () => {
    const { movieRepository } = useApplicationRepositoryContext();

    const { data, isLoading, isError } = useQuery<Movie[]>({
        queryKey: ['popular-movies'],
        queryFn: async () => await movieRepository.getPopularMovies(),
    });

    return { movies: data, isLoading, isError };
};
