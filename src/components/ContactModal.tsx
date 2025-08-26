import { X, Phone, Mail, MapPin } from 'lucide-react';
import GlassCard from './GlassCard';
import NeonButton from './NeonButton';

interface ContactModalProps {
  onClose: () => void;
}

const ContactModal = ({ onClose }: ContactModalProps) => {
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
              📬 Get in Touch
            </h2>
          </div>

          {/* Main Content */}
          <div className="space-y-6 text-lg leading-relaxed text-muted-foreground text-center">
            <p>
              Have questions, want to collaborate, or need urgent assistance?
              <br />
              Reach out anytime—we're here to help.
            </p>

            <div className="text-2xl font-bold text-foreground mb-6">
              Contact Details:
            </div>

            {/* Contact Information Cards */}
            <div className="grid gap-4 max-w-md mx-auto">
              {/* Phone */}
              <GlassCard className="p-4">
                <div className="flex items-center gap-3">
                  <Phone className="w-6 h-6 text-primary" />
                  <div className="text-left">
                    <div className="text-sm text-muted-foreground">Phone</div>
                    <a 
                      href="tel:+918547242798"
                      className="text-foreground font-medium hover:text-primary transition-colors"
                    >
                      +91 8547242798
                    </a>
                  </div>
                </div>
              </GlassCard>

              {/* Email */}
              <GlassCard className="p-4">
                <div className="flex items-center gap-3">
                  <Mail className="w-6 h-6 text-primary" />
                  <div className="text-left">
                    <div className="text-sm text-muted-foreground">Email</div>
                    <a 
                      href="mailto:libinbabukalpurackal@gmail.com"
                      className="text-foreground font-medium hover:text-primary transition-colors break-all"
                    >
                      libinbabukalpurackal@gmail.com
                    </a>
                  </div>
                </div>
              </GlassCard>

              {/* Location */}
              <GlassCard className="p-4">
                <div className="flex items-center gap-3">
                  <MapPin className="w-6 h-6 text-primary" />
                  <div className="text-left">
                    <div className="text-sm text-muted-foreground">Location</div>
                    <div className="text-foreground font-medium">
                      Kochi, Kerala, India
                    </div>
                  </div>
                </div>
              </GlassCard>
            </div>

            {/* Highlighted Closing Line */}
            <div className="text-center mt-8 p-6 rounded-lg bg-primary/10 border border-primary/20">
              <p className="text-xl font-bold neon-text">
                💡 We respond quickly, because every second matters.
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

export default ContactModal;