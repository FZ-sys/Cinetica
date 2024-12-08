import { useQuery } from "react-query"; 
import { Movie } from "@/entities/Movie"; 
import { useApplicationRepositoryContext } from "@/repositories/ApplicationRepositoryContext";

export const useFetchNowPlayingMovies = () => {
  const { movieRepository } = useApplicationRepositoryContext();

  const { data, isLoading, isError } = useQuery<Movie[]>({
    queryKey: ["now-playing"],
    queryFn: async () => await movieRepository.getNowPlayingMovies(), 
  });

  return { movies: data, isLoading, isError };
};
