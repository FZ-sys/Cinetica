"use client"; 

import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'; 
import { ApplicationRepositoryContextProvider } from '@/repository/ApplicationRepositoryContext'; 
import { DashboardProvider } from './context/DashboardContext'; 

const queryClient = new QueryClient();

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <QueryClientProvider client={queryClient}> 
            <ApplicationRepositoryContextProvider>
                <DashboardProvider>
                    {children}
                </DashboardProvider>
            </ApplicationRepositoryContextProvider>
        </QueryClientProvider>
    );
}
