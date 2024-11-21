'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const router = useRouter();

  const inputStyle = {
    backgroundColor: 'transparent',
    color: 'white',
    border: 'none',
    borderBottom: '1px solid white',
    outline: 'none',
    height: '25px',
    paddingLeft: '5px',
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!email || !password) {
      setError('Veuillez remplir tous les champs.');
      return;
    }
    setIsLoading(true);

    const res = await fetch('/api/route', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    if (data.success) {
      localStorage.setItem('user', JSON.stringify({ email }));
      router.push('/dashboard');
    } else {
      setError(data.message);
    }
    setIsLoading(false);
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
              color: '#f57c8b',
              marginBottom: '0.1px',
            }}
          >
            🎀Cinetica🎀
          </div>
          <CardHeader>
            <div style={{ textAlign: 'center', marginBottom: '0.1px' }}>
              <CardTitle>S&apos;identifier🔎</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="w-[350px]">
            <div style={{ backgroundColor: '#F8A8D6', width: '90%', borderRadius: '10px', padding: '20px' }}>
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
                      style={inputStyle}
                      disabled={isLoading}
                    />
                    <Label htmlFor="password">Mot de passe</Label>
                    <div style={{ position: 'relative' }}>
                      <Input
                        id="password"
                        type={isPasswordVisible ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Votre mot de passe"
                        required
                        style={inputStyle}
                        disabled={isLoading}
                      />
                      <span
                        onClick={() => setIsPasswordVisible(!isPasswordVisible)}
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
                        {isPasswordVisible ? '🔒' : '👁️'}
                      </span>
                    </div>
                    {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
                    <CardFooter className="flex justify-between">
                      <Button className="bg-red-500" type="submit" disabled={isLoading}>
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
