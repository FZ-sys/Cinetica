import { useQuery } from '@tanstack/react-query';
import { TVShow } from '@/entities/TVShow'; 
import { useApplicationRepositoryContext } from '@/repository/ApplicationRepositoryContext'; 

export const useFetchPopularTVShows = () => {
    const { tvShowRepository } = useApplicationRepositoryContext();

    const { data, isLoading, isError } = useQuery<TVShow[]>({
        queryKey: ['popular-tv-shows'],
        queryFn: async () => await tvShowRepository.getPopularTVShows(),
    });

    return { tvShows: data, isLoading, isError };
};
