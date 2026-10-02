import { getProperties } from '@/services/properties';
import PropertyCard from '@/components/ui/PropertyCard';

export const dynamic = 'force-dynamic';

export default async function PropertiesPage() {
  const properties = await getProperties();

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-3xl font-extrabold text-charcoal-900 mb-10">كل الوحدات</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {properties.map(p => (
          <PropertyCard key={p.id} property={p} />
        ))}
      </div>
    </section>
  );
}
