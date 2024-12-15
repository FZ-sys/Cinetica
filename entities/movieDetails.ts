import { Movie } from './Movie';

export interface MovieDetails extends Movie {
  runtime: number;
  budget: number;
  revenue: number;
  credits: {  // Ajoute cette ligne pour définir 'credits'
    name: string;
    role: string;
    image: string;
  }[];
}
