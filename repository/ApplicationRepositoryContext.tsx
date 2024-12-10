import { createContext, useContext, PropsWithChildren } from 'react';
import { MovieRepository } from './interface/MovieRepository';
import { MovieRepositoryTMDB } from './MovieRepositoryTMDB';
import { TVShowRepository } from './interface/TVShowRepository';
import { TVShowRepositoryTMDB } from './TVShowRepositoryTMDB';

interface ApplicationRepository {
    movieRepository: MovieRepository;
    tvShowRepository: TVShowRepository;  
}

const ApplicationRepositoryContext = createContext<ApplicationRepository | null>(null);

export const useApplicationRepositoryContext = () => {
    const context = useContext(ApplicationRepositoryContext);
    if (!context) {
        throw new Error('useApplicationRepositoryContext must be wrapped in a provider');
    }
    return context;
};

export const ApplicationRepositoryContextProvider = ({ children }: PropsWithChildren) => {
    const movieRepository = new MovieRepositoryTMDB();
    const tvShowRepository = new TVShowRepositoryTMDB();  

    return (
        <ApplicationRepositoryContext.Provider value={{ movieRepository, tvShowRepository }}>
            {children}
        </ApplicationRepositoryContext.Provider>
    );
};
