import { useQuery } from '@tanstack/react-query';
import { useApplicationRepositoryContext } from '@/repository/ApplicationRepositoryContext';
import { TVShow } from '@/entities/TVShow';

export const useFetchOnTheAirTVShows = () => {
    const { tvShowRepository } = useApplicationRepositoryContext();

    const { data, isLoading, isError } = useQuery<TVShow[]>({
        queryKey: ['on-the-air-tv-shows'],
        queryFn: async () => await tvShowRepository.getOnTheAirTVShows(),
    });

    return { tvShows: data, isLoading, isError };
};
