import { useState, useEffect } from 'react';
import { ArrowLeft, Search, Mic } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import GlassCard from './GlassCard';
import NeonButton from './NeonButton';
import DonorCard from './DonorCard';
import ParticleBackground from './ParticleBackground';

interface Donor {
  id: string;
  name: string;
  blood_group: string;
  gender: string;
  phone: string;
  location: string;
  age: number;
  email: string;
  is_available: boolean;
  address?: string;
  created_at?: string;
  updated_at?: string;
  last_donation_date?: string;
  medical_conditions?: string;
  emergency_contact?: string;
}

interface DonorSearchProps {
  onNavigateHome: () => void;
}

const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

const DonorSearch = ({ onNavigateHome }: DonorSearchProps) => {
  const [selectedBloodGroup, setSelectedBloodGroup] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [donors, setDonors] = useState<Donor[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const searchDonors = async (bloodGroup?: string, query?: string) => {
    setIsLoading(true);
    
    try {
      let supabaseQuery = supabase
        .from('donors')
        .select('*')
        .eq('is_available', true)
        .order('created_at', { ascending: false });
      
      if (bloodGroup) {
        supabaseQuery = supabaseQuery.eq('blood_group', bloodGroup);
      }
      
      if (query) {
        // Use * wildcard pattern as expected by PostgREST for ilike filters
        supabaseQuery = supabaseQuery.or(
          `name.ilike.*${query}*,location.ilike.*${query}*,gender.ilike.*${query}*`
        );
      }
      
      const { data, error } = await supabaseQuery;
      
      if (error) {
        toast({
          title: "Error",
          description: "Failed to fetch donors. Please try again.",
          variant: "destructive",
        });
        setDonors([]);
      } else {
        setDonors(data || []);
      }
    } catch (error) {
      console.error('Error searching donors:', error);
      toast({
        title: "Error",
        description: "Failed to fetch donors. Please try again.",
        variant: "destructive",
      });
      setDonors([]);
    }
    
    setIsLoading(false);
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
      toast({
        title: "Not Supported",
        description: "Speech recognition not supported in your browser",
        variant: "destructive",
      });
    }
  };

  // Subscribe to new/updated donors only once on mount
  useEffect(() => {
    searchDonors();
    
    const channel = supabase
      .channel('donors-changes')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'donors'
        },
        (payload) => {
          console.log('New donor added:', payload);
          // Refresh the search to include new donor
          searchDonors(selectedBloodGroup, searchQuery);
          toast({
            title: "New Donor Available!",
            description: `${payload.new.name} with ${payload.new.blood_group} blood group just registered.`,
          });
        }
      )
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'donors'
        },
        (payload) => {
          console.log('Donor updated:', payload);
          // Refresh the search to reflect updates
          searchDonors(selectedBloodGroup, searchQuery);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  // Run a search automatically whenever user updates the inputs
  useEffect(() => {
    searchDonors(selectedBloodGroup, searchQuery);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedBloodGroup, searchQuery]);

  return (
    <div className="min-h-screen relative overflow-hidden">
      <ParticleBackground />
      
      {/* Header */}
      <header className="relative z-10 p-6">
        <GlassCard className="flex justify-between items-center">
          <h1 className="text-2xl font-bold neon-text">Find Blood Donors</h1>
          <NeonButton variant="outline" size="sm" onClick={onNavigateHome}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
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
                onClick={() => searchDonors(selectedBloodGroup, searchQuery)}
                className="mb-2"
              >
                <Search className="w-4 h-4 mr-2" />
                Search Donors
              </NeonButton>
              <NeonButton 
                variant="outline" 
                size="sm"
                onClick={handleVoiceSearch}
              >
                <Mic className="w-4 h-4 mr-2" />
                Voice Search
              </NeonButton>
            </div>
          </div>

          <div className="text-center text-sm text-muted-foreground">
            <p>Select a blood group and click search to find available donors in your area.</p>
          </div>
        </GlassCard>

        {/* Results Section */}
        {isLoading && (
          <div className="text-center">
            <GlassCard className="max-w-md mx-auto">
              <div className="animate-pulse">
                <div className="text-xl neon-text mb-2">Searching...</div>
                <div className="text-muted-foreground">Finding donors for {selectedBloodGroup}</div>
              </div>
            </GlassCard>
          </div>
        )}

        {!isLoading && donors.length > 0 && (
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold neon-text mb-2">
                Found {donors.length} donors {selectedBloodGroup && `for ${selectedBloodGroup}`}
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

        {!isLoading && donors.length === 0 && (selectedBloodGroup || searchQuery) && (
          <div className="text-center">
            <GlassCard className="max-w-md mx-auto">
              <div className="text-xl font-bold mb-2">No donors found</div>
              <div className="text-muted-foreground mb-4">
                No donors available matching your search criteria.
              </div>
              <NeonButton 
                variant="outline" 
                onClick={() => {
                  setSearchQuery('');
                  setSelectedBloodGroup('');
                  searchDonors();
                }}
              >
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