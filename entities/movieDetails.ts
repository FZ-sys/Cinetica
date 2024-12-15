import { Movie } from './Movie';

export interface MovieDetails extends Movie {
  runtime: number;
  budget: number;
  revenue: number;
  credits: {  
    name: string;
    role: string;
    image: string;
  }[];
}
