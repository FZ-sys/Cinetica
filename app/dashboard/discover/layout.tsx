// app/dashboard/layout.tsx
'use client';
import React, { useState } from 'react';
import Sidebar from '../Components/Sidebar'; // Ajustez l'import selon votre structure
import styles from './styles/layout.module.css'
const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen((prevState) => !prevState);
  };

  return (
    <div className={styles.layoutContainer}>
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div className={styles.content}>
        {children}
      </div>
    </div>
  );
};

export default DashboardLayout;
