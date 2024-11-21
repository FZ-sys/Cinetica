'use client'; // Assurez-vous que ce code est exécuté côté client

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'; // Utiliser le hook useRouter

const DashboardPage = () => {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState('movies-now-playing');
  const [movies, setMovies] = useState<any[]>([]); // Initialiser 'movies' avec un tableau vide

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
  };

  const handleDiscoverClick = () => {
    setSelectedCategory('discover'); // Catégorie spécifique pour "Discover"
  };

  // Fetch movies when category changes
  useEffect(() => {
    const fetchMovies = async () => {
      const res = await fetch(`https://api.themoviedb.org/3/movie/${selectedCategory}?api_key=YOUR_API_KEY`);
      const data = await res.json();
      setMovies(data.results || []); // Assurez-vous que "data.results" est toujours un tableau
    };

    fetchMovies();
  }, [selectedCategory]);

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      {/* Sidebar */}
      <div style={{
        width: '180px',  // Réduit la largeur de la sidebar
        backgroundColor: '#FF69B4', // Sidebar rose
        color: 'white',
        padding: '10px',  // Réduit les marges internes
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}>
        <div>
          <div style={{ fontSize: '1.1rem', marginBottom: '10px', textAlign: 'center' }}>
            🎀 Cinetica 🎀 {/* Titre plus petit */}
          </div>

          {/* Discover Section */}
          <div style={{ marginBottom: '15px' }}>
            <h3 style={sectionTitleStyle}>🌟 
              <span
                onClick={handleDiscoverClick}
                style={clickableItemStyle}
              >
                Discover
              </span>
            </h3>
          </div>

          {/* Movies Section */}
          <div style={{ marginBottom: '15px' }}>
            <h3 style={sectionTitleStyle}>🎥 Movies</h3>
            <ul style={{ listStyleType: 'none', padding: '0' }}>
              <li onClick={() => handleCategoryClick('now_playing')} style={clickableItemStyle}>
                🎬 Now Playing
              </li>
              <li onClick={() => handleCategoryClick('popular')} style={clickableItemStyle}>
                🌟 Popular
              </li>
              <li onClick={() => handleCategoryClick('top_rated')} style={clickableItemStyle}>
                🏆 Top Rated
              </li>
            </ul>
          </div>

          {/* TV Shows Section */}
          <div>
            <h3 style={sectionTitleStyle}>📺 TV Shows</h3>
            <ul style={{ listStyleType: 'none', padding: '0' }}>
              <li onClick={() => handleCategoryClick('on_the_air')} style={clickableItemStyle}>
                📡 On the Air
              </li>
              <li onClick={() => handleCategoryClick('tv_popular')} style={clickableItemStyle}>
                🌟 Popular
              </li>
              <li onClick={() => handleCategoryClick('tv_top_rated')} style={clickableItemStyle}>
                🏆 Top Rated
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, padding: '20px' }}>
        <h1>{selectedCategory.replace(/_/g, ' ').toUpperCase()}</h1>
        {/* Contenu dynamique basé sur la catégorie sélectionnée */}
        <div>
          <h3>Films</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '15px' }}>
            {movies.length === 0 ? (
              <p>Aucun film disponible pour cette catégorie</p>
            ) : (
              movies.map((movie: any) => (
                <div key={movie.id} style={{ background: '#FFF', borderRadius: '8px', overflow: 'hidden' }}>
                  <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} style={{ width: '100%' }} />
                  <div style={{ padding: '10px' }}>
                    <h4>{movie.title}</h4>
                    <p>{movie.release_date}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Style pour chaque élément cliquable avec juste l'effet de zoom
const clickableItemStyle = {
  padding: '6px 10px',
  marginBottom: '5px',
  cursor: 'pointer',
  borderRadius: '5px',
  fontSize: '0.85rem',
  transition: 'transform 0.2s ease',  // Transition de zoom
  // Sur hover, applique un effet de zoom
  ':hover': {
    transform: 'scale(1.05)',  // Zoom léger sur hover
  },
  ':active': {
    transform: 'scale(1)',  // Reviens à la taille normale lors du clic
  },
};

// Style pour les titres des sections
const sectionTitleStyle = {
  marginBottom: '5px',
  fontSize: '0.9rem',
  fontWeight: 'bold',
};

export default DashboardPage;
