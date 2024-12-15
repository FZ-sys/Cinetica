import { useQuery } from '@tanstack/react-query';
import { Movie } from '@/entities/Movie';
import { useApplicationRepositoryContext } from '@/repository/ApplicationRepositoryContext';

export const useFetchDiscoverMovies = () => {
    const { movieRepository } = useApplicationRepositoryContext();

    const { data, isLoading, isError, error } = useQuery<Movie[]>({
        queryKey: ['discover-movies'],
        queryFn: async () => {
            try {
                console.log('Fetching discover movies...');
                const result = await movieRepository.getDiscoverMovies();
                console.log('Fetch successful:', result);
                return result;
            } catch (err) {
                console.error('Error in queryFn:', err);
                throw err; 
            }
        },
    });

    if (isLoading) console.log('Discover movies: Loading...');
    if (isError) console.error('Discover movies: Error occurred.', error);
    if (data) console.log('Discover movies: Data fetched successfully.', data);

    return { movies: data, isLoading, isError, error };
};
