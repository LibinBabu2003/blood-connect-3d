import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface DonorFormData {
  name: string;
  email: string;
  phone: string;
  blood_group: string;
  gender: string;
  age: number;
  location: string;
  address: string;
  last_donation_date?: string;
  medical_conditions?: string;
  emergency_contact: string;
}

const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

interface DonorRegistrationFormProps {
  onSuccess: () => void;
}

const DonorRegistrationForm = ({ onSuccess }: DonorRegistrationFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedBloodGroup, setSelectedBloodGroup] = useState('');
  const [selectedGender, setSelectedGender] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<DonorFormData>();

  const onSubmit = async (data: DonorFormData) => {
    if (!selectedBloodGroup || !selectedGender) {
      toast({
        title: "Missing Information",
        description: "Please select blood group and gender.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const donorData = {
        ...data,
        blood_group: selectedBloodGroup,
        gender: selectedGender,
        age: Number(data.age),
        is_available: true
      };

      const { error } = await supabase
        .from('donors')
        .insert([donorData]);

      if (error) {
        console.error('Error inserting donor:', error);
        toast({
          title: "Registration Failed",
          description: "Failed to register as a donor. Please try again.",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Registration Successful!",
          description: "You have been successfully registered as a blood donor.",
        });
        reset();
        setSelectedBloodGroup('');
        setSelectedGender('');
        onSuccess();
      }
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    }

    setIsSubmitting(false);
  };

  return (
    <div className="max-h-[600px] overflow-y-auto p-4">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Personal Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="name">Full Name *</Label>
            <Input
              id="name"
              {...register('name', { required: 'Name is required' })}
              className="glass border-primary/30"
            />
            {errors.name && (
              <p className="text-destructive text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="email">Email *</Label>
            <Input
              id="email"
              type="email"
              {...register('email', { 
                required: 'Email is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Invalid email address'
                }
              })}
              className="glass border-primary/30"
            />
            {errors.email && (
              <p className="text-destructive text-sm mt-1">{errors.email.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="phone">Phone Number *</Label>
            <Input
              id="phone"
              {...register('phone', { required: 'Phone number is required' })}
              placeholder="+91 9876543210"
              className="glass border-primary/30"
            />
            {errors.phone && (
              <p className="text-destructive text-sm mt-1">{errors.phone.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="age">Age *</Label>
            <Input
              id="age"
              type="number"
              {...register('age', { 
                required: 'Age is required',
                min: { value: 18, message: 'Must be at least 18 years old' },
                max: { value: 65, message: 'Must be under 65 years old' }
              })}
              className="glass border-primary/30"
            />
            {errors.age && (
              <p className="text-destructive text-sm mt-1">{errors.age.message}</p>
            )}
          </div>

          <div>
            <Label>Blood Group *</Label>
            <Select value={selectedBloodGroup} onValueChange={setSelectedBloodGroup}>
              <SelectTrigger className="glass border-primary/30">
                <SelectValue placeholder="Select blood group" />
              </SelectTrigger>
              <SelectContent>
                {bloodGroups.map(group => (
                  <SelectItem key={group} value={group}>
                    {group}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Gender *</Label>
            <Select value={selectedGender} onValueChange={setSelectedGender}>
              <SelectTrigger className="glass border-primary/30">
                <SelectValue placeholder="Select gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Male">Male</SelectItem>
                <SelectItem value="Female">Female</SelectItem>
                <SelectItem value="Other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Location Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="location">City/Location *</Label>
            <Input
              id="location"
              {...register('location', { required: 'Location is required' })}
              placeholder="Mumbai, Maharashtra"
              className="glass border-primary/30"
            />
            {errors.location && (
              <p className="text-destructive text-sm mt-1">{errors.location.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="emergency_contact">Emergency Contact *</Label>
            <Input
              id="emergency_contact"
              {...register('emergency_contact', { required: 'Emergency contact is required' })}
              placeholder="+91 9876543210"
              className="glass border-primary/30"
            />
            {errors.emergency_contact && (
              <p className="text-destructive text-sm mt-1">{errors.emergency_contact.message}</p>
            )}
          </div>
        </div>

        <div>
          <Label htmlFor="address">Full Address</Label>
          <Textarea
            id="address"
            {...register('address')}
            placeholder="Complete address including pincode"
            className="glass border-primary/30"
            rows={3}
          />
        </div>

        {/* Medical Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="last_donation_date">Last Donation Date (if any)</Label>
            <Input
              id="last_donation_date"
              type="date"
              {...register('last_donation_date')}
              className="glass border-primary/30"
            />
          </div>

          <div>
            <Label htmlFor="medical_conditions">Medical Conditions/Allergies</Label>
            <Textarea
              id="medical_conditions"
              {...register('medical_conditions')}
              placeholder="Any medical conditions or allergies (optional)"
              className="glass border-primary/30"
              rows={2}
            />
          </div>
        </div>

        {/* Consent */}
        <div className="bg-primary/5 p-4 rounded-lg border border-primary/20">
          <p className="text-sm text-muted-foreground">
            By submitting this form, you consent to:
          </p>
          <ul className="list-disc list-inside text-sm text-muted-foreground mt-2 space-y-1">
            <li>Being contacted by blood recipients in emergency situations</li>
            <li>Your contact information being shared with verified blood banks</li>
            <li>Regular health screening before blood donation</li>
            <li>Following medical guidelines for blood donation eligibility</li>
          </ul>
        </div>

        <Button 
          type="submit" 
          disabled={isSubmitting} 
          className="w-full h-12 text-lg"
        >
          {isSubmitting ? 'Registering...' : 'Register as Blood Donor'}
        </Button>
      </form>
    </div>
  );
};

export default DonorRegistrationForm;