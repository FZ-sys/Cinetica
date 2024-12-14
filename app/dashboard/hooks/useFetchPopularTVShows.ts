import { useQuery } from '@tanstack/react-query';
import { TVShow } from '@/entities/TVShow'; 
import { useApplicationRepositoryContext } from '@/repository/ApplicationRepositoryContext'; 

export const useFetchPopularTVShows = () => {
    const { tvShowRepository } = useApplicationRepositoryContext();

    const { data, isLoading, isError } = useQuery<TVShow[]>({
        queryKey: ['popular-tv-shows'],
        queryFn: async () => {
            const response = await tvShowRepository.getPopularTVShows();
            console.log("Réponse API - TV Shows:", response); // Logue la réponse de l'API
            return response;
        },
    });

    return { tvShows: data, isLoading, isError };
};
