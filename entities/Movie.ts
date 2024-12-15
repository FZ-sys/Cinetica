export interface Movie {
  id: string; // Identifiant unique du film
  title: string; // Titre du film
  releaseDate: string; // Date de sortie
  description: string; // Description ou synopsis du film
  genres: string[]; // Liste des genres associés au film (par nom)
  images: string[]; // Liste des URLs des images associées au film (ex : affiches, bannières)
  credits: { name: string; role: string; image: string }[];
}
