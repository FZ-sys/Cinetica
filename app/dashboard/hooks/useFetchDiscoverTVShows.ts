import { useQuery } from '@tanstack/react-query';
import { useApplicationRepositoryContext } from '@/repository/ApplicationRepositoryContext';
import { TVShow } from '@/entities/TVShow';

export const useFetchDiscoverTVShows = () => {
    const { tvShowRepository } = useApplicationRepositoryContext();

    const { data, isLoading, isError, error } = useQuery<TVShow[]>({
        queryKey: ['discover-tv-shows'], 
        queryFn: async () => {
            try {
                console.log('Fetching discover TV shows...');
                const result = await tvShowRepository.getDiscoverTVShows(); 
                console.log('Fetch successful:', result);
                return result;
            } catch (err) {
                console.error('Error fetching discover TV shows:', err);
                throw err;
            }
        },
    });

    if (isLoading) console.log('Discover TV shows: Loading...');
    if (isError) console.error('Discover TV shows: Error occurred.', error);
    if (data) console.log('Discover TV shows: Data fetched successfully.', data);

    return { tvShows: data, isLoading, isError, error };
};
