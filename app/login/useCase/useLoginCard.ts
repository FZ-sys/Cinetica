'use client';

import { signIn } from "next-auth/react";
import { useCredentials } from "./useCredentials";
import { useState } from "react"; 

export const useLoginUseCase = () => {
  const { credentials, setCredentials } = useCredentials();
  const [loading, setLoading] = useState(false); 
  const [error, setError] = useState<string | null>(null); 
  
  const loginAndRedirectIfSuccess = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const signInResponse = await signIn("credentials", {
        email: credentials.email,
        password: credentials.password,
        redirect: false,  
        callbackUrl: "/dashboard",  
      });
  
      console.log("SignIn Response:", signInResponse); 
  
      if (signInResponse?.ok) {
        window.location.href = "/dashboard"; 
      } else {
        setError("Adresse e-mail ou mot de passe incorrect.");
      }
    } catch (error) {
      console.error("SignIn Error:", error);
      setError("Une erreur est survenue lors de la connexion."); 
    } finally {
      setLoading(false); 
    }
  };

  return { credentials, setCredentials, loginAndRedirectIfSuccess, loading, error };
};
