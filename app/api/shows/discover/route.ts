import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

interface Show {
  id: number;
  name: string;
  overview: string;
  first_air_date: string;
  popularity: number;
  poster_path: string;
}

interface DiscoverShowsResponse {
  page: number;
  results: Show[];
  total_pages: number;
  total_results: number;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const apiKey = process.env.TMDB_API_KEY || 'YOUR_API_KEY';
    const { page = 1, sort_by = 'popularity.desc', language = 'fr-FR' } = req.query;

    const response = await axios.get<DiscoverShowsResponse>('https://api.themoviedb.org/3/discover/tv', {
      params: {
        api_key: apiKey,
        language,
        sort_by,
        page,
      },
    });

    res.status(200).json(response.data);
  } catch (error) {
    console.error('Erreur lors de la récupération des séries TV :', error);
    res.status(500).json({ error: 'Erreur lors de la récupération des séries TV' });
  }
}
