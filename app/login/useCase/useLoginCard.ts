'use client';
import { signIn } from "next-auth/react";
import { useState } from "react"; 
import { useCredentials } from "./useCredentials";

export const useLoginUseCase = () => {
  const { credentials, setCredentials } = useCredentials(); // Utilisation de useCredentials pour récupérer les credentials
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
        redirect: false, // Ne pas rediriger automatiquement
      });

      console.log("SignIn Response:", signInResponse); 

      if (signInResponse?.ok) {
        // Vérifier si le code s'exécute côté client avant d'utiliser window.location
        if (typeof window !== 'undefined') {
          // Redirection manuelle après connexion réussie
          window.location.href = "/dashboard"; // Redirection vers /dashboard
        }
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
