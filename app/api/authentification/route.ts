import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';

// Importer `users` depuis `repository/user.ts`
import { users } from '@/repository/user'; 

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();

  // Vérifier si l'email existe dans la base de données (ici simulée avec `users`)
  if (email === users.email) {
    // Comparer le mot de passe haché avec bcrypt
    const isPasswordValid = await bcrypt.compare(password, users.password);
    if (isPasswordValid) {
      // Authentification réussie
      return NextResponse.json({ success: true, message: 'Connexion réussie' });
    } else {
      // Mot de passe incorrect
      return NextResponse.json({ success: false, message: 'Mot de passe incorrect' }, { status: 401 });
    }
  } else {
    // Email non trouvé
    return NextResponse.json({ success: false, message: 'Email introuvable' }, { status: 404 });
  }
}
