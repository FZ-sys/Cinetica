import { useQuery } from '@tanstack/react-query';
import { Movie } from '@/entities/Movie';
import { useApplicationRepositoryContext } from '@/repository/ApplicationRepositoryContext';

export const useFetchTopRatedMovies = () => {
    const { movieRepository } = useApplicationRepositoryContext();

    const { data, isLoading, isError } = useQuery<Movie[]>({
        queryKey: ['top-rated-movies'],
        queryFn: async () => await movieRepository.getTopRatedMovies(),
    });

    return { movies: data, isLoading, isError };
};
