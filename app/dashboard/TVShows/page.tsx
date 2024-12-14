// app/dashboard/TVShows/page.tsx
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

type TVShow = {
  id: number;
  name: string;
  poster_path: string;
};

type TVShowsPageProps = {
  tvShows: TVShow[];
};

const TVShowsPage: React.FC<TVShowsPageProps> = ({ tvShows }) => {
  return (
    <div>
      <h1>Popular TV Shows</h1>
      <div>
        {tvShows.map((tvShow) => (
          <div key={tvShow.id}>
            <h2>
              <Link href={`/dashboard/TVShows/${tvShow.id}`}>
                <Image
                  src={`https://image.tmdb.org/t/p/w500/${tvShow.poster_path}`}
                  alt={tvShow.name}
                  width={200}
                  height={300}
                  priority
                />
                <p>{tvShow.name}</p>
              </Link>
            </h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export async function getServerSideProps() {
  const res = await fetch(
    'https://api.themoviedb.org/3/tv/popular?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}'
  );
  const data = await res.json();

  return {
    props: {
      tvShows: data.results,
    },
  };
}

export default TVShowsPage;
