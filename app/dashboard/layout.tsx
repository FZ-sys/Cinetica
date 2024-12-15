"use client"; 

import React from 'react'; 
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'; 
import { ApplicationRepositoryContextProvider } from '@/repository/ApplicationRepositoryContext'; 
import { DashboardProvider } from './context/DashboardContext'; 

// Créez un client QueryClient pour gérer les requêtes
const queryClient = new QueryClient();

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}> {/* Fournit le QueryClient à l'application */}
      <ApplicationRepositoryContextProvider>
        <DashboardProvider>
          {children} {/* Tous les enfants (pages, composants) sont rendus ici */}
        </DashboardProvider>
      </ApplicationRepositoryContextProvider>
    </QueryClientProvider>
  );
}
