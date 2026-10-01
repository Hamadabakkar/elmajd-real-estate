import { createClient } from '@/lib/supabase/client';
import { Property } from '@/types';
import { DEMO_PROPERTIES } from '@/lib/demoData';

export async function getProperties(filters?: {
  minPrice?: number;
  maxPrice?: number;
  rooms?: number;
  status?: string;
  sortBy?: string;
}): Promise<Property[]> {
  const supabase = createClient();
  
  try {
    let query = supabase.from('properties').select(`
      *,
      images:property_images(*),
      videos:property_videos(*),
      features:property_features(*)
    `);

    if (filters?.status) {
      query = query.eq('status', filters.status);
    }
    if (filters?.minPrice) {
      query = query.gte('price', filters.minPrice);
    }
    if (filters?.maxPrice) {
      query = query.lte('price', filters.maxPrice);
    }
    if (filters?.rooms) {
      query = query.eq('rooms', filters.rooms);
    }

    if (filters?.sortBy === 'price_asc') {
      query = query.order('price', { ascending: true });
    } else if (filters?.sortBy === 'price_desc') {
      query = query.order('price', { ascending: false });
    } else {
      query = query.order('created_at', { ascending: false });
    }

    const { data, error } = await query;

    if (error || !data || data.length === 0) {
      return DEMO_PROPERTIES;
    }

    return data as Property[];
  } catch (err) {
    return DEMO_PROPERTIES;
  }
}

export async function getPropertyBySlug(slug: string): Promise<Property | null> {
  const supabase = createClient();

  try {
    const { data, error } = await supabase
      .from('properties')
      .select(`
        *,
        images:property_images(*),
        videos:property_videos(*),
        features:property_features(*)
      `)
      .eq('slug', slug)
      .single();

    if (error || !data) {
      const demo = DEMO_PROPERTIES.find(p => p.slug === slug);
      return demo || DEMO_PROPERTIES[0];
    }

    return data as Property;
  } catch {
    const demo = DEMO_PROPERTIES.find(p => p.slug === slug);
    return demo || DEMO_PROPERTIES[0];
  }
}
