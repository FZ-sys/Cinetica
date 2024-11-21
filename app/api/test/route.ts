import { NextApiRequest, NextApiResponse } from 'next';

// Fonction qui gère les requêtes à cette route
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // Vérifie si la méthode de la requête est bien POST
  if (req.method === 'POST') {
    const { email, password } = req.body; // On récupère les données envoyées

    // Juste un test : si les données sont reçues, renvoyer un message de succès
    res.status(200).json({
      message: 'Données reçues',
      email,
      password,
    });
  } else {
    // Si la méthode n'est pas POST, on renvoie un code 405 (méthode non autorisée)
    res.status(405).json({ message: 'Méthode non autorisée' });
  }
}
