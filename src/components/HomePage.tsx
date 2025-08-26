import { useState } from 'react';
import BloodDrop3D from './BloodDrop3D';
import ParticleBackground from './ParticleBackground';
import GlassCard from './GlassCard';
import NeonButton from './NeonButton';
import DonorRegistrationModal from './DonorRegistrationModal';
import AboutModal from './AboutModal';

const HomePage = ({ onNavigateToSearch }: { onNavigateToSearch: () => void }) => {
  const [showRegistrationModal, setShowRegistrationModal] = useState(false);
  const [showAboutModal, setShowAboutModal] = useState(false);

  return (
    <div className="min-h-screen relative overflow-hidden">
      <ParticleBackground />
      
      {/* Header */}
      <header className="relative z-10 p-6">
        <GlassCard className="flex justify-between items-center">
          <h1 className="text-2xl font-bold neon-text">Blood Connect</h1>
          <nav className="flex space-x-4">
            <NeonButton variant="outline" size="sm" onClick={() => setShowAboutModal(true)}>About</NeonButton>
            <NeonButton variant="outline" size="sm">Contact</NeonButton>
          </nav>
        </GlassCard>
      </header>

      {/* Hero Section */}
      <main className="relative z-10 flex flex-col items-center justify-center min-h-[80vh] px-6 text-center">
        {/* 3D Blood Drop */}
        <div className="mb-8">
          <BloodDrop3D />
        </div>

        {/* Title */}
        <div className="mb-12 space-y-4">
          <h1 className="text-6xl md:text-8xl font-bold neon-text mb-4">
            Blood Connect
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl">
            Connecting lives through blood donation. Find donors or register as a donor in your area.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col md:flex-row gap-6 mb-16">
          <GlassCard hover3D className="group cursor-pointer" 
            onClick={() => setShowRegistrationModal(true)}>
            <div className="text-center p-8">
              <div className="text-4xl mb-4">🩸</div>
              <h3 className="text-2xl font-bold mb-2 neon-text">Become a Donor</h3>
              <p className="text-muted-foreground mb-4">
                Register to save lives in your community
              </p>
              <NeonButton variant="hero" className="w-full">
                Register Now
              </NeonButton>
            </div>
          </GlassCard>

          <GlassCard hover3D className="group cursor-pointer" onClick={onNavigateToSearch}>
            <div className="text-center p-8">
              <div className="text-4xl mb-4">🔍</div>
              <h3 className="text-2xl font-bold mb-2 neon-text">Find a Donor</h3>
              <p className="text-muted-foreground mb-4">
                Search for blood donors by blood group
              </p>
              <NeonButton variant="hero" className="w-full">
                Search Donors
              </NeonButton>
            </div>
          </GlassCard>
        </div>

        {/* Stats Section */}
        <GlassCard className="w-full max-w-4xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold neon-text mb-2">1000+</div>
              <div className="text-muted-foreground">Registered Donors</div>
            </div>
            <div>
              <div className="text-3xl font-bold neon-text mb-2">500+</div>
              <div className="text-muted-foreground">Lives Saved</div>
            </div>
            <div>
              <div className="text-3xl font-bold neon-text mb-2">24/7</div>
              <div className="text-muted-foreground">Emergency Support</div>
            </div>
          </div>
        </GlassCard>
      </main>

      {/* Footer */}
      <footer className="relative z-10 p-6 mt-16">
        <GlassCard>
          <div className="flex justify-center space-x-8 text-sm">
            <button 
              onClick={() => setShowAboutModal(true)}
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              About
            </button>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
              Contact
            </a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
              Terms of Service
            </a>
          </div>
        </GlassCard>
      </footer>

      {/* Registration Modal */}
      {showRegistrationModal && (
        <DonorRegistrationModal onClose={() => setShowRegistrationModal(false)} />
      )}

      {/* About Modal */}
      {showAboutModal && (
        <AboutModal onClose={() => setShowAboutModal(false)} />
      )}
    </div>
  );
};

export default HomePage;