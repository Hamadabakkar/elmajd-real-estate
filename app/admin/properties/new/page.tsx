'use client';

import PropertyForm from '@/components/admin/PropertyForm';

export default function NewPropertyPage() {
  return (
    <div className="bg-beige-100 min-h-screen py-10">
      <div className="max-w-3xl mx-auto px-4">
        <h1 className="text-2xl font-bold mb-6">إضافة وحدة جديدة</h1>
        <PropertyForm />
      </div>
    </div>
  );
}
