import { useEffect, useRef } from 'react';
import GlassCard from './GlassCard';
import NeonButton from './NeonButton';
import DonorRegistrationForm from './DonorRegistrationForm';

interface DonorRegistrationModalProps {
  onClose: () => void;
}

const DonorRegistrationModal = ({ onClose }: DonorRegistrationModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
      
      <GlassCard ref={modalRef} className="relative w-full max-w-4xl max-h-[90vh] overflow-hidden animate-scale-in">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold neon-text">Donor Registration</h2>
          <button
            onClick={onClose}
            className="text-muted-foreground hover:text-primary transition-colors text-2xl"
          >
            ×
          </button>
        </div>

        <div className="mb-6">
          <p className="text-lg text-muted-foreground">
            Fill out the form below to register as a blood donor. Your information will be securely stored 
            and used to connect you with recipients in need.
          </p>
        </div>

        {/* Custom Registration Form */}
        <DonorRegistrationForm onSuccess={onClose} />

        <div className="mt-6 text-center">
          <NeonButton variant="outline" onClick={onClose}>
            Close
          </NeonButton>
        </div>
      </GlassCard>
    </div>
  );
};

export default DonorRegistrationModal;