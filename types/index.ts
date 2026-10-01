export type PropertyStatus = 'available' | 'reserved' | 'sold';

export interface PropertyImage {
  id: string;
  property_id: string;
  storage_path: string;
  public_url: string;
  sort_order: number;
}

export interface PropertyVideo {
  id: string;
  property_id: string;
  title?: string;
  storage_path: string;
  public_url: string;
  sort_order: number;
}

export interface PropertyFeature {
  id: string;
  property_id: string;
  feature: string;
}

export interface Property {
  id: string;
  title: string;
  slug: string;
  price: number;
  area: number;
  floor: string;
  rooms: number;
  bathrooms: number;
  direction?: string;
  view?: string;
  finish?: string;
  status: PropertyStatus;
  description?: string;
  location: string;
  google_maps_url?: string;
  down_payment?: number;
  installments?: string;
  payment_method?: string;
  mortgage_available?: boolean;
  meters?: string;
  cover_image: string;
  created_at: string;
  images?: PropertyImage[];
  videos?: PropertyVideo[];
  features?: PropertyFeature[];
}
