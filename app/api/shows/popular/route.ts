import { NextResponse } from 'next/server';
import axios from 'axios';

export async function GET() {
  const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
  const url = `https://api.themoviedb.org/3/tv/popular?api_key=${API_KEY}&language=fr-FR&page=1`;

  try {
    const response = await axios.get(url);
    return NextResponse.json(response.data);
  } catch (error) {
    console.error('Error fetching popular TV shows:', error);
    return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
  }
}
