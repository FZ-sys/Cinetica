import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useCredentials } from "./useCredentials"; 
import { useState } from "react"; // Importer useState pour gérer l'état de chargement

export const useLoginUseCase = () => {
  const { credentials, setCredentials } = useCredentials();
  const router = useRouter();
  const [loading, setLoading] = useState(false); // État pour gérer le chargement
  const [error, setError] = useState<string | null>(null); // État pour gérer les erreurs

  const loginAndRedirectIfSuccess = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true); // Activer l'état de chargement
    setError(null); // Réinitialiser l'erreur

    const signInResponse = await signIn("credentials", {
      email: credentials.email,  
      password: credentials.password,
      redirect: false,
    });

    setLoading(false); // Désactiver l'état de chargement

    if (signInResponse?.ok) {
      router.push("/dashboard"); 
    } else {
      setError("Adresse e-mail ou mot de passe incorrect."); // Enregistrer l'erreur
      // Vous pouvez également choisir de ne pas rediriger ici pour laisser l'utilisateur sur la même page
    }
  };

  return { credentials, setCredentials, loginAndRedirectIfSuccess, loading, error };
};
