'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';  // Importer useRouter depuis next/navigation
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false); // État de chargement
  const [isPasswordVisible, setIsPasswordVisible] = useState(false); // Gérer la visibilité du mot de passe
  const router = useRouter();  // Utilisation de useRouter depuis next/navigation

  useEffect(() => {
    // Le hook useEffect est toujours utilisé pour garantir qu'on est côté client
  }, []);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true); // Démarrer le chargement

    // Envoyer une requête POST à l'API pour vérifier l'utilisateur
    const res = await fetch('/api/route', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (data.success) {
      // Authentification réussie, stocker les données de l'utilisateur dans localStorage
      localStorage.setItem('user', JSON.stringify({ email }));
      router.push('/dashboard'); // Rediriger vers le tableau de bord
    } else {
      // Afficher un message d'erreur si l'authentification échoue
      setError(data.message);
    }

    setIsLoading(false); // Arrêter le chargement
  };

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        backgroundColor: '#F0F0F0',
      }}
    >
      <Card className="w-[350px] #F5C2D6">
        <div
          style={{
            backgroundColor: '#F8A8D6',
            color: 'white',
            borderRadius: '13px',
            padding: '20px',
          }}
        >
        <div
            style={{
              textAlign: 'center',
              fontSize: '1.5rem',
              fontWeight: '',
              color: '#f57c8b', // Rose vif
              marginBottom: '0.1px', // Espacement entre le titre et "S'identifier"
            }}
          >
            🎀Cinetica🎀
          </div>

          <CardHeader>
            <div style={{ textAlign: 'center', marginBottom: '0.1px' }}>
              <CardTitle>S'identifier🔎</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="w-[350px]">
            <div
              style={{
                backgroundColor: '#F8A8D6',
                width: '90%',
                color: 'white',
                borderRadius: '10px',
                padding: '20px',
              }}
            >
              <form onSubmit={handleSubmit}>
                <div className="grid w-full items-center gap-4">
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="email">E-Mail</Label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Votre email"
                      required
                      style={{
                        backgroundColor: 'transparent',
                        color: 'white',
                        border: 'none',
                        borderBottom: '1px solid white',
                        outline: 'none',
                        height: '25px',
                        paddingLeft: '5px',
                      }}
                    />
                    <Label htmlFor="password">Mot de passe</Label>
                    <div style={{ position: 'relative' }}>
                      <Input
                        id="password"
                        type={isPasswordVisible ? 'text' : 'password'}  // Bascule entre 'text' et 'password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Votre mot de passe"
                        required
                        style={{
                          backgroundColor: 'transparent',
                          color: 'white',
                          border: 'none',
                          borderBottom: '1px solid white',
                          outline: 'none',
                          height: '25px',
                          paddingLeft: '5px',
                        }}
                      />
                      <span
                        onClick={() => setIsPasswordVisible(!isPasswordVisible)} // Basculer la visibilité
                        style={{
                          position: 'absolute',
                          right: 5,
                          top: '50%',
                          transform: 'translateY(-50%)',
                          cursor: 'pointer',
                          color: 'white',
                          userSelect: 'none',
                        }}
                      >
                        {isPasswordVisible ? '🔒' : '👁️'} {/* Icône de visibilité du mot de passe */}
                      </span>
                    </div>
                    {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
                    <CardFooter className="flex justify-between">
                      <Button
                        className="bg-red-500"
                        type="submit"
                        disabled={isLoading}
                      >
                        {isLoading ? 'Un moment...' : 'Se connecter'}
                      </Button>
                    </CardFooter>
                  </div>
                </div>
              </form>
            </div>
          </CardContent>
        </div>
      </Card>
    </div>
  );
};

export default LoginPage;
