import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

type TVShow = {
  id: number;
  name: string;
  poster_path: string;
};

const TVShowsPage = async () => {
  // Fetch des émissions populaires
  const res = await fetch(
    `https://api.themoviedb.org/3/tv/popular?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`
  );
  const data = await res.json();
  const tvShows: TVShow[] = data.results;

  return (
    <div>
      <h1>Popular TV Shows</h1>
      <div>
        {tvShows.map((tvShow) => (
          <div key={tvShow.id}>
            <h2>
              <Link href={`/dashboard/TVShows/${tvShow.id}`}>
                <a>
                  <Image
                    src={`https://image.tmdb.org/t/p/w500/${tvShow.poster_path}`}
                    alt={tvShow.name}
                    width={200}
                    height={300}
                    priority
                  />
                  <p>{tvShow.name}</p>
                </a>
              </Link>
            </h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TVShowsPage;
