import { X } from 'lucide-react';
import GlassCard from './GlassCard';
import NeonButton from './NeonButton';

interface TermsModalProps {
  onClose: () => void;
}

const TermsModal = ({ onClose }: TermsModalProps) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-background/80 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <GlassCard className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto">
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
              📜 Terms & Conditions
            </h2>
            <p className="text-sm text-muted-foreground">Effective Date: [Insert Date]</p>
          </div>

          {/* Main Content */}
          <div className="space-y-6 text-left">
            <p className="text-lg text-muted-foreground">
              Welcome to Blood Connect. By accessing or using our website, you agree to the following terms and conditions. Please read them carefully.
            </p>

            {/* Section 1 */}
            <div className="space-y-3">
              <h3 className="text-2xl font-bold text-foreground">1. Purpose of the Platform</h3>
              <ul className="space-y-2 text-muted-foreground pl-4">
                <li>• Blood Connect is a community-based platform that connects blood donors and receivers.</li>
                <li>• We are not a hospital, blood bank, or medical institution.</li>
                <li>• Our role is limited to sharing information provided by donors.</li>
              </ul>
            </div>

            {/* Section 2 */}
            <div className="space-y-3">
              <h3 className="text-2xl font-bold text-foreground">2. User Responsibilities</h3>
              <ul className="space-y-2 text-muted-foreground pl-4">
                <li>• <strong>Donors:</strong> You agree to provide accurate and truthful details (name, blood group, gender, and contact info).</li>
                <li>• <strong>Receivers:</strong> You agree to use the donor information only for genuine blood donation needs.</li>
                <li>• Users must not use this platform for spam, fraud, or any unlawful activity.</li>
              </ul>
            </div>

            {/* Section 3 */}
            <div className="space-y-3">
              <h3 className="text-2xl font-bold text-foreground">3. Privacy and Data Usage</h3>
              <ul className="space-y-2 text-muted-foreground pl-4">
                <li>• Your data is handled as described in our Privacy Policy.</li>
                <li>• Donor contact details will only be shared with receivers for donation purposes.</li>
                <li>• We are not responsible for how donors and receivers interact outside our platform.</li>
              </ul>
            </div>

            {/* Section 4 */}
            <div className="space-y-3">
              <h3 className="text-2xl font-bold text-foreground">4. Limitations of Liability</h3>
              <ul className="space-y-2 text-muted-foreground pl-4">
                <li>• Blood Connect does not guarantee donor availability at all times.</li>
                <li>• We are not responsible for any health risks, refusal to donate, or disputes between donors and receivers.</li>
                <li>• Users are advised to seek proper medical supervision during any donation.</li>
              </ul>
            </div>

            {/* Section 5 */}
            <div className="space-y-3">
              <h3 className="text-2xl font-bold text-foreground">5. Eligibility</h3>
              <ul className="space-y-2 text-muted-foreground pl-4">
                <li>• You must be 18 years or older to register as a donor.</li>
                <li>• Users must comply with local laws and medical guidelines for blood donation.</li>
              </ul>
            </div>

            {/* Section 6 */}
            <div className="space-y-3">
              <h3 className="text-2xl font-bold text-foreground">6. Suspension or Removal</h3>
              <p className="text-muted-foreground">We reserve the right to suspend or remove any user who:</p>
              <ul className="space-y-2 text-muted-foreground pl-4">
                <li>• Provides false information</li>
                <li>• Misuses donor/receiver details</li>
                <li>• Violates these Terms & Conditions</li>
              </ul>
            </div>

            {/* Section 7 */}
            <div className="space-y-3">
              <h3 className="text-2xl font-bold text-foreground">7. Changes to Terms</h3>
              <p className="text-muted-foreground">
                We may update these Terms & Conditions from time to time. Updates will be posted here with a new effective date.
              </p>
            </div>

            {/* Section 8 */}
            <div className="space-y-3">
              <h3 className="text-2xl font-bold text-foreground">8. Contact Us</h3>
              <p className="text-muted-foreground">For questions about these Terms & Conditions, contact us at:</p>
              <div className="space-y-2 text-muted-foreground pl-4">
                <div>📧 <a href="mailto:libinbabukalpurackal@gmail.com" className="text-primary hover:underline">libinbabukalpurackal@gmail.com</a></div>
                <div>📞 <a href="tel:+918547242798" className="text-primary hover:underline">+91 8547242798</a></div>
              </div>
            </div>

            {/* Disclaimer */}
            <div className="mt-8 p-6 rounded-lg bg-destructive/10 border border-destructive/20">
              <p className="text-lg font-bold text-destructive mb-2">⚠️ Disclaimer</p>
              <p className="text-muted-foreground">
                Blood Connect is only an information-sharing platform. We do not collect, store, test, or supply blood. 
                All donations are voluntary, and users are responsible for verifying suitability with proper medical guidance.
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

export default TermsModal;