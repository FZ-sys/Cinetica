"use client";

import { useFetchNowPlayingMovies } from "../../home/Movies/nowPlaying/useCases/useFetchNowPlayingMovies";

export default function NowPlayingMovies() {
  const { movies, isError, isLoading } = useFetchNowPlayingMovies();

  if (isLoading) {
    return <p>Loading now playing movies...</p>;
  }

  if (isError) {
    return <p>Error loading now playing movies.</p>;
  }

  return (
    <div>
      {movies?.map((movie) => (
        <p key={movie.id}>{movie.title}</p>
      ))}
    </div>
  );
}
