import { useQuery } from '@tanstack/react-query';
import { Movie } from '@/entities/Movie';
import { useApplicationRepositoryContext } from '@/repository/ApplicationRepositoryContext';

export const useFetchPopularMovies = () => {
    const { movieRepository } = useApplicationRepositoryContext();

    const { data, isLoading, isError, error } = useQuery<Movie[]>({
        queryKey: ['popular-movies'],
        queryFn: async () => {
            try {
                return await movieRepository.getPopularMovies();
            } catch (error) {
                console.error("Erreur dans la récupération des films populaires:", error);
                throw error; 
            }
        },
    });
    
    if (isError) {
        console.error('Error loading popular movies:', error);
    }
    return { movies: data, isLoading, isError };
};
