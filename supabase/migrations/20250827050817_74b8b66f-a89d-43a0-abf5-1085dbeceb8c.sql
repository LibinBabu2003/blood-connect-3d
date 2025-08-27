-- Create donors table
CREATE TABLE public.donors (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  blood_group TEXT NOT NULL CHECK (blood_group IN ('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-')),
  gender TEXT NOT NULL CHECK (gender IN ('Male', 'Female', 'Other')),
  age INTEGER NOT NULL CHECK (age >= 18 AND age <= 65),
  location TEXT NOT NULL,
  address TEXT,
  last_donation_date DATE,
  medical_conditions TEXT,
  emergency_contact TEXT,
  is_available BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.donors ENABLE ROW LEVEL SECURITY;

-- Create policies for donor access
CREATE POLICY "Donors are viewable by everyone" 
ON public.donors 
FOR SELECT 
USING (true);

CREATE POLICY "Anyone can insert donor data" 
ON public.donors 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Donors can update their own data" 
ON public.donors 
FOR UPDATE 
USING (true);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_donors_updated_at
BEFORE UPDATE ON public.donors
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Enable realtime for the donors table
ALTER PUBLICATION supabase_realtime ADD TABLE public.donors;