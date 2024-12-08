'use client'; 
import { useState } from "react";

export const useCredentials = () => {
  const [credentials, setCredentials] = useState<{ email: string; password: string }>({
    email: "",
    password: "",
  });

  return { credentials, setCredentials };
};
