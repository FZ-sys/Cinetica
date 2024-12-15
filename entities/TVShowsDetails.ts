import { TVShow } from "./TVShow";

export interface TVShowDetails extends TVShow {
    credits: {
      name: string;
      role: string;
      image: string;
    }[];
    seasons: number;
    episodes: number;
  }
