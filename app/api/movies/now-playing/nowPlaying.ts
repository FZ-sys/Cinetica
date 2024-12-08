import { getSession } from "next-auth/react";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req });

  if (!session) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY; // Clé API depuis les variables d'environnement

  const response = await fetch(
    `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1`
  );

  if (!response.ok) {
    return res.status(response.status).json({ error: "Failed to fetch data from TMDB" });
  }

  const data = await response.json();
  return res.status(200).json(data);
}
