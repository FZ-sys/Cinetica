import { useQuery } from '@tanstack/react-query';
import { useApplicationRepositoryContext } from '@/repository/ApplicationRepositoryContext';
import { TVShow } from '@/entities/TVShow';

export const useFetchDiscoverTVShows = () => {
    const { tvShowRepository } = useApplicationRepositoryContext();

    const { data, isLoading, isError } = useQuery<TVShow[]>({
        queryKey: ['discover-tv-shows'],
        queryFn: async () => await tvShowRepository.getPopularTVShows(),  
    });

    return { tvShows: data, isLoading, isError };
};
