'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { Property } from '@/types';
import PropertyForm from '@/components/admin/PropertyForm';

export default function EditPropertyPage() {
  const { id } = useParams<{ id: string }>();
  const [property, setProperty] = useState<Property | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const supabase = createClient();
    supabase
      .from('properties')
      .select('*, images:property_images(*), videos:property_videos(*), features:property_features(*)')
      .eq('id', id)
      .single()
      .then(({ data, error }) => {
        if (error || !data) setError('الوحدة غير موجودة');
        else setProperty(data as Property);
      });
  }, [id]);

  return (
    <div className="bg-beige-100 min-h-screen py-10">
      <div className="max-w-3xl mx-auto px-4">
        <h1 className="text-2xl font-bold mb-6">تعديل الوحدة</h1>
        {error && <p className="text-red-600 font-bold">{error}</p>}
        {!property && !error && <p className="font-bold">جاري التحميل...</p>}
        {property && <PropertyForm key={property.id} property={property} />}
      </div>
    </div>
  );
}
