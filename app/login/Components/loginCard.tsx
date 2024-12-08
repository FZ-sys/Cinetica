'use client';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useLoginUseCase } from "../useCase/useLoginCard";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"; 
import React from "react";
import { useState } from "react";

export const LoginCard: React.FC = () => {
  const { credentials, setCredentials, loginAndRedirectIfSuccess } = useLoginUseCase();
  const [showPassword, setShowPassword] = useState(false); 

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F0F0F0]">
      <Card className="w-full sm:w-[100px] md:w-[350px] lg:w-[400px] p-6 border-0 sm:border shadow-lg bg-[#FFB6C1] rounded-lg"> 
        <form onSubmit={loginAndRedirectIfSuccess}>  
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
                  >
                    {showPassword ? "🙈" : "👁️"} 
                  </button>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Button type="submit" variant="outline" className="text-[#FFFFFF] bg-[#FF6F92] hover:bg-[#FF4D7A] transition duration-200 font-semibold">Se connecter</Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};
