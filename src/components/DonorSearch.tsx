import { useState, useEffect } from 'react';
import GlassCard from './GlassCard';
import NeonButton from './NeonButton';
import ParticleBackground from './ParticleBackground';
import DonorCard from './DonorCard';

interface Donor {
  id: string;
  name: string;
  bloodGroup: string;
  gender: 'Male' | 'Female';
  phone: string;
  location: string;
}

const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

const DonorSearch = ({ onNavigateHome }: { onNavigateHome: () => void }) => {
  const [selectedBloodGroup, setSelectedBloodGroup] = useState('');
  const [donors, setDonors] = useState<Donor[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Mock data for demonstration
  const mockDonors: Donor[] = [
    { id: '1', name: 'Rajesh Kumar', bloodGroup: 'O+', gender: 'Male', phone: '+91 9876543210', location: 'Mumbai' },
    { id: '2', name: 'Priya Sharma', bloodGroup: 'O+', gender: 'Female', phone: '+91 9876543211', location: 'Delhi' },
    { id: '3', name: 'Amit Singh', bloodGroup: 'A+', gender: 'Male', phone: '+91 9876543212', location: 'Bangalore' },
    { id: '4', name: 'Sneha Patel', bloodGroup: 'B+', gender: 'Female', phone: '+91 9876543213', location: 'Pune' },
    { id: '5', name: 'Vikram Joshi', bloodGroup: 'AB+', gender: 'Male', phone: '+91 9876543214', location: 'Chennai' },
  ];

  const searchDonors = async () => {
    if (!selectedBloodGroup) return;

    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const filteredDonors = mockDonors
        .filter(donor => donor.bloodGroup === selectedBloodGroup)
        .filter(donor => 
          searchQuery === '' || 
          donor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          donor.location.toLowerCase().includes(searchQuery.toLowerCase())
        )
        .sort((a, b) => {
          // Sort: Males first, then females
          if (a.gender === 'Male' && b.gender === 'Female') return -1;
          if (a.gender === 'Female' && b.gender === 'Male') return 1;
          return a.name.localeCompare(b.name);
        });

      setDonors(filteredDonors);
      setLoading(false);
    }, 1000);
  };

  const handleVoiceSearch = () => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript.toLowerCase();
        
        // Extract blood group from speech
        bloodGroups.forEach(group => {
          if (transcript.includes(group.toLowerCase()) || 
              transcript.includes(group.replace('+', ' positive').replace('-', ' negative'))) {
            setSelectedBloodGroup(group);
          }
        });
      };

      recognition.start();
    } else {
      alert('Speech recognition not supported in your browser');
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      <ParticleBackground />
      
      {/* Header */}
      <header className="relative z-10 p-6">
        <GlassCard className="flex justify-between items-center">
          <h1 className="text-2xl font-bold neon-text">Find Blood Donors</h1>
          <NeonButton variant="outline" size="sm" onClick={onNavigateHome}>
            ← Back to Home
          </NeonButton>
        </GlassCard>
      </header>

      {/* Search Section */}
      <main className="relative z-10 p-6">
        <GlassCard className="max-w-4xl mx-auto mb-8">
          <h2 className="text-3xl font-bold neon-text text-center mb-8">
            Search for Blood Donors
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            {/* Blood Group Selection */}
            <div>
              <label className="block text-sm font-medium mb-2">Blood Group</label>
              <select
                value={selectedBloodGroup}
                onChange={(e) => setSelectedBloodGroup(e.target.value)}
                className="w-full p-3 glass rounded-lg border border-primary/30 text-foreground bg-transparent"
              >
                <option value="" className="bg-background">Select Blood Group</option>
                {bloodGroups.map(group => (
                  <option key={group} value={group} className="bg-background">
                    {group}
                  </option>
                ))}
              </select>
            </div>

            {/* Search Query */}
            <div>
              <label className="block text-sm font-medium mb-2">Search by Name/Location</label>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Enter name or location..."
                className="w-full p-3 glass rounded-lg border border-primary/30 text-foreground bg-transparent placeholder-muted-foreground"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-2">
              <label className="block text-sm font-medium mb-2">Actions</label>
              <NeonButton 
                variant="hero" 
                onClick={searchDonors}
                disabled={!selectedBloodGroup}
                className="mb-2"
              >
                🔍 Search Donors
              </NeonButton>
              <NeonButton 
                variant="outline" 
                size="sm"
                onClick={handleVoiceSearch}
              >
                🎤 Voice Search
              </NeonButton>
            </div>
          </div>

          <div className="text-center text-sm text-muted-foreground">
            <p>Select a blood group and click search to find available donors in your area.</p>
          </div>
        </GlassCard>

        {/* Results Section */}
        {loading && (
          <div className="text-center">
            <GlassCard className="max-w-md mx-auto">
              <div className="animate-pulse">
                <div className="text-xl neon-text mb-2">Searching...</div>
                <div className="text-muted-foreground">Finding donors for {selectedBloodGroup}</div>
              </div>
            </GlassCard>
          </div>
        )}

        {!loading && donors.length > 0 && (
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold neon-text mb-2">
                Found {donors.length} donors for {selectedBloodGroup}
              </h3>
              <p className="text-muted-foreground">Contact donors directly for blood donation requests</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {donors.map((donor, index) => (
                <DonorCard 
                  key={donor.id} 
                  donor={donor} 
                  delay={index * 0.1}
                />
              ))}
            </div>
          </div>
        )}

        {!loading && selectedBloodGroup && donors.length === 0 && (
          <div className="text-center">
            <GlassCard className="max-w-md mx-auto">
              <div className="text-xl font-bold mb-2">No donors found</div>
              <div className="text-muted-foreground mb-4">
                No donors available for {selectedBloodGroup} matching your search criteria.
              </div>
              <NeonButton variant="outline" onClick={() => setSearchQuery('')}>
                Clear Search
              </NeonButton>
            </GlassCard>
          </div>
        )}
      </main>
    </div>
  );
};

export default DonorSearch;