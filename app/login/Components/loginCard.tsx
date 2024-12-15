'use client';
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useLoginUseCase } from "../useCase/useLoginCard";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export const LoginCard: React.FC = () => {
  const { credentials, setCredentials, loginAndRedirectIfSuccess } = useLoginUseCase();
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState(""); 

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); 
    setErrorMessage(""); 
    try {
      await loginAndRedirectIfSuccess(e);
    } catch (err: any) {
      setErrorMessage(err.message); 
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F0F0F0] px-4 sm:px-0">
      <Card className="w-full sm:w-[350px] lg:w-[400px] p-6 border-0 shadow-lg bg-[#FFB6C1] rounded-lg">
        <form onSubmit={handleSubmit}>
          <CardHeader>
            <CardTitle className="flex justify-center text-[#FFFFFF] text-2xl font-bold">🎀 Cinetica 🎀</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5 w-full">
                <Label htmlFor="email" className="text-[#FFFFFF] text-left font-semibold">E-Mail</Label>
                <Input 
                  id="email" 
                  placeholder="Votre email" 
                  value={credentials.email}
                  onChange={(e) => setCredentials({ ...credentials, email: e.target.value })} 
                  required
                  className="text-[#FFFFFF] placeholder:text-[#FFFFFF] w-full bg-transparent border-b-2 border-white focus:outline-none focus:ring-0" 
                />
              </div>
              <div className="flex flex-col space-y-1.5 w-full">
                <Label htmlFor="password" className="text-[#FFFFFF] text-left font-semibold">Mot de passe</Label>
                <div className="relative">
                  <Input 
                    type={showPassword ? "text" : "password"} 
                    id="password" 
                    placeholder="Votre mot de passe" 
                    value={credentials.password}
                    onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                    required
                    className="text-[#FFFFFF] placeholder:text-[#FFFFFF] w-full bg-transparent border-b-2 border-white focus:outline-none focus:ring-0" 
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-2 top-2 text-white focus:outline-none"
                    aria-label={showPassword ? "Masquer le mot de passe" : "Afficher le mot de passe"} 
                  >
                    {showPassword ? "🙈" : "👁️"} 
                  </button>
                </div>
              </div>
              {errorMessage && (
                <div className="text-red-500 text-center mt-2">
                  {errorMessage}
                </div>
              )}
            </div>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Button type="submit" variant="outline" className="text-[#FFFFFF] bg-[#FF6F92] hover:bg-[#FF4D7A] transition duration-200 font-semibold w-full">
              Se connecter
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};
