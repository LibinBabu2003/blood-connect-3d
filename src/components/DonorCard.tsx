import { useEffect, useRef } from 'react';
import GlassCard from './GlassCard';
import NeonButton from './NeonButton';

interface Donor {
  id: string;
  name: string;
  bloodGroup: string;
  gender: 'Male' | 'Female';
  phone: string;
  location: string;
}

interface DonorCardProps {
  donor: Donor;
  delay?: number;
}

const DonorCard = ({ donor, delay = 0 }: DonorCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (cardRef.current) {
        cardRef.current.classList.add('visible');
      }
    }, delay * 1000);

    return () => clearTimeout(timer);
  }, [delay]);

  const handleContact = () => {
    if (donor.phone) {
      window.open(`tel:${donor.phone}`, '_self');
    }
  };

  const handleWhatsApp = () => {
    const message = `Hi ${donor.name}, I found your contact through Blood Connect. I need ${donor.bloodGroup} blood donation. Could you please help?`;
    const whatsappUrl = `https://wa.me/${donor.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <GlassCard 
      ref={cardRef}
      hover3D 
      glowEffect 
      className="fade-in opacity-0 transform translate-y-8 transition-all duration-500"
    >
      <div className="text-center">
        {/* Gender Icon */}
        <div className="text-4xl mb-4">
          {donor.gender === 'Male' ? '👨‍⚕️' : '👩‍⚕️'}
        </div>

        {/* Donor Name */}
        <h3 className="text-xl font-bold mb-2 text-foreground">
          {donor.name}
        </h3>

        {/* Blood Group */}
        <div className="mb-4">
          <span className="inline-block px-4 py-2 rounded-full text-lg font-bold neon-text border border-primary/50 glass">
            {donor.bloodGroup}
          </span>
        </div>

        {/* Details */}
        <div className="space-y-2 mb-6">
          <div className="flex items-center justify-center space-x-2">
            <span className="text-sm text-muted-foreground">Gender:</span>
            <span className="text-sm font-medium">{donor.gender}</span>
          </div>
          <div className="flex items-center justify-center space-x-2">
            <span className="text-sm text-muted-foreground">Location:</span>
            <span className="text-sm font-medium">{donor.location}</span>
          </div>
          <div className="flex items-center justify-center space-x-2">
            <span className="text-sm text-muted-foreground">Phone:</span>
            <span className="text-sm font-medium font-mono">{donor.phone}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col space-y-3">
          <NeonButton 
            variant="hero" 
            size="sm" 
            onClick={handleContact}
            className="w-full"
          >
            📞 Call Now
          </NeonButton>
          <NeonButton 
            variant="outline" 
            size="sm" 
            onClick={handleWhatsApp}
            className="w-full"
          >
            💬 WhatsApp
          </NeonButton>
        </div>
      </div>
    </GlassCard>
  );
};

export default DonorCard;