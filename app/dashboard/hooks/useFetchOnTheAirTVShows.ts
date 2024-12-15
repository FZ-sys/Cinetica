import { useQuery } from '@tanstack/react-query';
import { useApplicationRepositoryContext } from '@/repository/ApplicationRepositoryContext';
import { TVShow } from '@/entities/TVShow';

export const useFetchOnTheAirTVShows = () => {
    const { tvShowRepository } = useApplicationRepositoryContext();

    const { data, isLoading, isError, error } = useQuery<TVShow[]>({
        queryKey: ['on-the-air-tv-shows'],
        queryFn: async () => {
            try {
                console.log('Fetching on-the-air TV shows...');
                const result = await tvShowRepository.getAiringTodayTVShows();
                console.log('Successfully fetched on-the-air TV shows:', result);
                return result;
            } catch (err) {
                console.error('Error fetching on-the-air TV shows:', err);
                throw err; 
            }
        },
    });

    if (isLoading) console.log('On-The-Air TV Shows: Loading...');
    if (isError) console.error('On-The-Air TV Shows: Error occurred.', error);
    if (data) console.log('On-The-Air TV Shows: Data fetched successfully.', data);

    return { tvShows: data, isLoading, isError, error };
};
