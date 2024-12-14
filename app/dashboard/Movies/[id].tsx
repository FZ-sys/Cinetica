import React from 'react';
import { GetServerSideProps } from 'next';
import Image from 'next/image';

type Movie = {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  release_date: string;
};

type MovieDetailPageProps = {
  movie: Movie;
};

const MovieDetailPage: React.FC<MovieDetailPageProps> = ({ movie }) => {
  return (
    <div>
      <h1>{movie.title}</h1>
      <p>{movie.overview}</p>
      <p>Release Date: {movie.release_date}</p>
      <Image
        src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
        alt={movie.title}
        width={200}
        height={300}
      />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { id } = params!;
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`
  );
  const movie = await res.json();

  return {
    props: { movie },
  };
};

export default MovieDetailPage;
