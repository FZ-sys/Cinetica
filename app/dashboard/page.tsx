'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';

// Define movie and TV show interface
interface Media {
  id: number;
  title?: string;
  name?: string; // For TV shows
  poster_path: string;
  release_date?: string;
  first_air_date?: string; // For TV shows
}

const DashboardPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('movies-now-playing');
  const [media, setMedia] = useState<Media[]>([]);

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
  };

  // Fetch media (movies or TV shows) when category changes
  useEffect(() => {
    const fetchMedia = async () => {
      let url = '';
      if (selectedCategory.startsWith('movies-')) {
        url = `https://api.themoviedb.org/3/movie/${selectedCategory.replace('movies-', '')}?api_key=NEXT_PUBLIC_TMDB_API_KEY`;
      } else if (selectedCategory.startsWith('tv-')) {
        url = `https://api.themoviedb.org/3/tv/${selectedCategory.replace('tv-', '')}?api_key=NEXT_PUBLIC_TMDB_API_KEY`;
      }

      const res = await fetch(url);
      const data = await res.json();
      setMedia(data.results || []);
    };

    fetchMedia();
  }, [selectedCategory]);

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      {/* Sidebar */}
      <div
        style={{
          width: '180px',
          backgroundColor: '#FF69B4',
          color: 'white',
          padding: '10px',
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <div>
          <div style={{ fontSize: '1.1rem', marginBottom: '10px', textAlign: 'center' }}>
            🎀 Cinetica 🎀
          </div>
          {/* Discover Section */}
          <div>
            <h3 onClick={() => handleCategoryClick('movies-now-playing')} style={{ cursor: 'pointer', marginBottom: '10px' }}>
              🌟 Discover
            </h3>
          </div>
          {/* Movies Section */}
          <div>
            <h3>🎥 Movies</h3>
            <ul style={{ listStyle: 'none', padding: '0' }}>
              <li onClick={() => handleCategoryClick('movies-now-playing')} style={{ cursor: 'pointer', marginBottom: '5px' }}>
                🎬 Now Playing
              </li>
              <li onClick={() => handleCategoryClick('movies-popular')} style={{ cursor: 'pointer', marginBottom: '5px' }}>
                🌟 Popular
              </li>
              <li onClick={() => handleCategoryClick('movies-top-rated')} style={{ cursor: 'pointer', marginBottom: '5px' }}>
                🏆 Top Rated
              </li>
            </ul>
          </div>
          {/* TV Shows Section */}
          <div>
            <h3>📺 TV Shows</h3>
            <ul style={{ listStyle: 'none', padding: '0' }}>
              <li onClick={() => handleCategoryClick('tv-on_the_air')} style={{ cursor: 'pointer', marginBottom: '5px' }}>
                📡 Now Airing
              </li>
              <li onClick={() => handleCategoryClick('tv-popular')} style={{ cursor: 'pointer', marginBottom: '5px' }}>
                🌟 Popular
              </li>
              <li onClick={() => handleCategoryClick('tv-top_rated')} style={{ cursor: 'pointer', marginBottom: '5px' }}>
                🏆 Top Rated
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, padding: '20px' }}>
        <h1>{selectedCategory.replace(/_/g, ' ').toUpperCase()}</h1>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '15px' }}>
          {media.length === 0 ? (
            <p>No media available for this category</p>
          ) : (
            media.map((item) => (
              <div
                key={item.id}
                style={{ background: '#FFF', borderRadius: '8px', overflow: 'hidden' }}
              >
                <Image
                  src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                  alt={item.title || item.name || 'No title available'}
                  width={500}
                  height={750}
                  style={{ width: '100%' }}
                />
                <div style={{ padding: '10px' }}>
                  <h4>{item.title || item.name}</h4>
                  <p>{item.release_date || item.first_air_date}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
