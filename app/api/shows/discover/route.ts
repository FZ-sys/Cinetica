import { NextResponse } from 'next/server';
import axios from 'axios';

interface Movie {
  id: number;
  title: string;
  overview: string;
  release_date: string;
  popularity: number;
  poster_path: string;
}

interface DiscoverMoviesResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

// La fonction GET pour gérer les requêtes GET sur cette route
export async function GET(req: Request) {
  try {
    const apiKey = process.env.TMDB_API_KEY || 'YOUR_API_KEY';
    const { searchParams } = new URL(req.url);
    const page = searchParams.get('page') || '1';
    const sort_by = searchParams.get('sort_by') || 'popularity.desc';
    const language = searchParams.get('language') || 'fr-FR';

    const response = await axios.get<DiscoverMoviesResponse>('https://api.themoviedb.org/3/discover/tv', {
      params: {
        api_key: apiKey,
        language,
        sort_by,
        page,
      },
    });

    return NextResponse.json(response.data);
  } catch (error) {
    console.error('Erreur lors de la récupération des films :', error);
    return NextResponse.json({ error: 'Erreur lors de la récupération des films' }, { status: 500 });
  }
}
