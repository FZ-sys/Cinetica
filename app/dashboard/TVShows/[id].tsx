// app/dashboard/TVShows/[id].tsx
import React from 'react';
import Image from 'next/image';

type TVShowDetailProps = {
  tvShow: {
    id: number;
    name: string;
    overview: string;
    poster_path: string;
    first_air_date: string;
  };
};

const TVShowDetailPage: React.FC<TVShowDetailProps> = ({ tvShow }) => {
  return (
    <div>
      <h1>{tvShow.name}</h1>
      <p>{tvShow.overview}</p>
      <p>First Air Date: {tvShow.first_air_date}</p>
      <Image
        src={`https://image.tmdb.org/t/p/w500/${tvShow.poster_path}`}
        alt={tvShow.name}
        width={200}
        height={300}
      />
    </div>
  );
};

export async function getServerSideProps({ params }: { params: { id: string } }) {
  const { id } = params;
  const res = await fetch(
    `https://api.themoviedb.org/3/tv/${id}?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`
  );
  const tvShow = await res.json();

  return {
    props: {
      tvShow,
    },
  };
}

export default TVShowDetailPage;
