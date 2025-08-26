import { X } from 'lucide-react';
import GlassCard from './GlassCard';
import NeonButton from './NeonButton';

interface AboutModalProps {
  onClose: () => void;
}

const AboutModal = ({ onClose }: AboutModalProps) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-background/80 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <GlassCard className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-background/20 hover:bg-background/40 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-8 space-y-6">
          {/* Title */}
          <div className="text-center">
            <h2 className="text-4xl font-bold neon-text mb-2">
              ✨ About Blood Connect
            </h2>
          </div>

          {/* Main Content */}
          <div className="space-y-6 text-lg leading-relaxed text-muted-foreground">
            <p>
              Blood Connect is a community-driven platform that bridges the gap between donors and receivers in times of need.
              Our mission is simple: to make finding a lifesaving blood donor fast, secure, and hassle-free.
            </p>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <span className="text-2xl">🩸</span>
                <div>
                  <strong className="text-foreground">For Donors:</strong> Register easily through a simple form and make your availability known to those in need.
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="text-2xl">❤️</span>
                <div>
                  <strong className="text-foreground">For Receivers:</strong> Search by blood group and instantly find verified donors near you.
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="text-2xl">🔒</span>
                <div>
                  <strong className="text-foreground">Privacy First:</strong> Donor data is kept safe and shown only to genuine receivers.
                </div>
              </div>
            </div>

            <p>
              Every drop counts, and your contribution can save lives. Together, we can build a world where no one struggles to find blood in emergencies.
            </p>

            {/* Highlighted Closing Line */}
            <div className="text-center mt-8 p-6 rounded-lg bg-primary/10 border border-primary/20">
              <p className="text-xl font-bold neon-text">
                💡 Donate Blood, Save Lives. Be the reason someone lives another day.
              </p>
            </div>
          </div>

          {/* Close Button */}
          <div className="flex justify-center pt-4">
            <NeonButton onClick={onClose} variant="outline">
              Close
            </NeonButton>
          </div>
        </div>
      </GlassCard>
    </div>
  );
};

export default AboutModal;