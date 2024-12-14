import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

type Movie = {
  id: number;
  title: string;
  poster_path: string;
};

const MoviesPage = async () => {
  // Fetch des films populaires directement ici
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`
  );
  const data = await res.json();

  const movies: Movie[] = data.results;

  return (
    <div>
      <h1>Popular Movies</h1>
      <div>
        {movies.map((movie) => (
          <div key={movie.id}>
            <h2>
              <Link href={`/dashboard/Movies/${movie.id}`}>
                <a>
                  <Image
                    src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                    alt={movie.title}
                    width={200}
                    height={300}
                    priority
                  />
                  <p>{movie.title}</p>
                </a>
              </Link>
            </h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MoviesPage;
