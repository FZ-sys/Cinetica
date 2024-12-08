import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';

import { users } from '@/repository/user'; 

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();
  if (email === users.email) {
    const isPasswordValid = await bcrypt.compare(password, users.password);
    if (isPasswordValid) {
      return NextResponse.json({ success: true, message: 'Connexion réussie' });
    } else {
      return NextResponse.json({ success: false, message: 'Mot de passe incorrect' }, { status: 401 });
    }
  } else {
    return NextResponse.json({ success: false, message: 'Email introuvable' }, { status: 404 });
  }
}