import { useQuery } from '@tanstack/react-query';
import { Movie } from '@/entities/Movie';
import { useApplicationRepositoryContext } from '@/repository/ApplicationRepositoryContext';

export const useFetchNowPlayingMovies = () => {
    const { movieRepository } = useApplicationRepositoryContext();

    const { data, isLoading, isError, error } = useQuery<Movie[]>({
        queryKey: ['now-playing-movies'], // Nom explicite pour cette requête
        queryFn: async () => {
            try {
                console.log('Fetching now playing movies...');
                const result = await movieRepository.getNowPlayingMovies();
                console.log('Successfully fetched now playing movies:', result);
                return result;
            } catch (err) {
                console.error('Error fetching now playing movies:', err);
                throw err; // Nécessaire pour que react-query traite l'erreur
            }
        },
    });

    // Logs supplémentaires selon l'état
    if (isLoading) console.log('Now Playing Movies: Loading...');
    if (isError) console.error('Now Playing Movies: Error occurred.', error);
    if (data) console.log('Now Playing Movies: Data fetched successfully.', data);

    return { movies: data, isLoading, isError, error };
};
