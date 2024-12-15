export interface Movie {
  id: string;
  title: string; 
  releaseDate: string;
  description: string; 
  genres: string[];
  images: string[]; 
  credits: { name: string; role: string; image: string }[];
}
