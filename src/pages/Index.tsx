import { useState } from 'react';
import HomePage from '@/components/HomePage';
import DonorSearch from '@/components/DonorSearch';

const Index = () => {
  const [currentPage, setCurrentPage] = useState<'home' | 'search'>('home');

  const navigateToSearch = () => setCurrentPage('search');
  const navigateToHome = () => setCurrentPage('home');

  return (
    <div className="min-h-screen bg-background">
      {currentPage === 'home' && (
        <HomePage onNavigateToSearch={navigateToSearch} />
      )}
      {currentPage === 'search' && (
        <DonorSearch onNavigateHome={navigateToHome} />
      )}
    </div>
  );
};

export default Index;
