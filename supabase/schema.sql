-- Create Properties Table
CREATE TABLE IF NOT EXISTS public.properties (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  price NUMERIC NOT NULL,
  area NUMERIC NOT NULL,
  floor TEXT NOT NULL,
  rooms INTEGER NOT NULL DEFAULT 1,
  bathrooms INTEGER NOT NULL DEFAULT 1,
  direction TEXT,
  view TEXT,
  finish TEXT,
  status TEXT CHECK (status IN ('available', 'reserved', 'sold')) DEFAULT 'available',
  description TEXT,
  location TEXT NOT NULL,
  google_maps_url TEXT,
  down_payment NUMERIC DEFAULT 0,
  installments TEXT,
  payment_method TEXT DEFAULT 'cash',
  mortgage_available BOOLEAN DEFAULT false,
  meters TEXT,
  cover_image TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create Property Images Table
CREATE TABLE IF NOT EXISTS public.property_images (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  property_id UUID REFERENCES public.properties(id) ON DELETE CASCADE NOT NULL,
  storage_path TEXT NOT NULL,
  public_url TEXT NOT NULL,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create Property Videos Table
CREATE TABLE IF NOT EXISTS public.property_videos (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  property_id UUID REFERENCES public.properties(id) ON DELETE CASCADE NOT NULL,
  title TEXT,
  storage_path TEXT NOT NULL,
  public_url TEXT NOT NULL,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create Property Features Table
CREATE TABLE IF NOT EXISTS public.property_features (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  property_id UUID REFERENCES public.properties(id) ON DELETE CASCADE NOT NULL,
  feature TEXT NOT NULL
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.properties ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.property_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.property_videos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.property_features ENABLE ROW LEVEL SECURITY;

-- Public Read Policies
CREATE POLICY "Allow public read properties" ON public.properties FOR SELECT USING (true);
CREATE POLICY "Allow public read property_images" ON public.property_images FOR SELECT USING (true);
CREATE POLICY "Allow public read property_videos" ON public.property_videos FOR SELECT USING (true);
CREATE POLICY "Allow public read property_features" ON public.property_features FOR SELECT USING (true);

-- Authenticated Admin Full Write Policies
CREATE POLICY "Allow auth all properties" ON public.properties FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Allow auth all property_images" ON public.property_images FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Allow auth all property_videos" ON public.property_videos FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Allow auth all property_features" ON public.property_features FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Create Buckets for Media Storage
INSERT INTO storage.buckets (id, name, public) VALUES ('properties-media', 'properties-media', true)
ON CONFLICT (id) DO NOTHING;

-- Storage Policies
CREATE POLICY "Public Read Storage" ON storage.objects FOR SELECT USING (bucket_id = 'properties-media');
CREATE POLICY "Admin All Storage" ON storage.objects FOR ALL TO authenticated USING (bucket_id = 'properties-media') WITH CHECK (bucket_id = 'properties-media');
