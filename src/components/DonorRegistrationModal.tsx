import { useEffect, useRef } from 'react';
import GlassCard from './GlassCard';
import NeonButton from './NeonButton';

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

        {/* Google Form Embed */}
        <div className="w-full h-[600px] rounded-lg overflow-hidden">
          <iframe
            src="https://docs.google.com/forms/d/e/1FAIpQLSfxXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/viewform?embedded=true"
            width="100%"
            height="100%"
            frameBorder="0"
            marginHeight={0}
            marginWidth={0}
            className="bg-white rounded-lg"
            title="Blood Donor Registration Form"
          >
            Loading…
          </iframe>
        </div>

        <div className="mt-6 text-center">
          <p className="text-sm text-muted-foreground mb-4">
            Can't see the form? <a href="https://forms.google.com/your-form-link" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Open in new tab</a>
          </p>
          <NeonButton variant="outline" onClick={onClose}>
            Close
          </NeonButton>
        </div>
      </GlassCard>
    </div>
  );
};

export default DonorRegistrationModal;