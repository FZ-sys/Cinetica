import { useQuery } from '@tanstack/react-query';
import { useApplicationRepositoryContext } from '@/repository/ApplicationRepositoryContext';
import { TVShow } from '@/entities/TVShow';

export const useFetchTopRatedTVShows = () => {
    const { tvShowRepository } = useApplicationRepositoryContext();

    const { data, isLoading, isError } = useQuery<TVShow[]>({
        queryKey: ['top-rated-tv-shows'],
        queryFn: async () => await tvShowRepository.getTopRatedTVShows(),
    });

    return { tvShows: data, isLoading, isError };
};
