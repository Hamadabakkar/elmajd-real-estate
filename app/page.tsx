import Link from 'next/link';
import Image from 'next/image';
import { getProperties } from '@/services/properties';
import PropertyCard from '@/components/ui/PropertyCard';
import { ArrowDown, Sparkles } from 'lucide-react';

export const revalidate = 60;

export default async function HomePage() {
  const properties = await getProperties();
  const availableProperties = properties.filter(p => p.status !== 'sold');

  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[80vh] min-h-[550px] bg-charcoal-900 flex items-center justify-center text-white text-center px-4 overflow-hidden">
        <Image 
          src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1920&q=80" 
          alt="Hero Cover"
          fill
          priority
          className="object-cover opacity-35"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900 via-charcoal-900/50 to-transparent" />

        <div className="relative z-10 max-w-4xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold-500/20 border border-gold-500/40 text-gold-400 text-xs font-bold">
            <Sparkles className="w-4 h-4" />
            <span>المجد ينفعك وقت الجد</span>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold leading-tight text-white">
            اختار شقتك من <span className="text-gold-400 border-b-4 border-gold-500 pb-1">الواقع</span> مش من الكلام.
          </h1>

          <p className="text-base sm:text-lg text-gray-300 max-w-2xl mx-auto font-light leading-relaxed">
            كتالوج وحدات متاحة بصور وفيديوهات وتفاصيل واضحة ودقيقة مباشرة بدون تزييف.
          </p>

          <div className="pt-4">
            <Link 
              href="#catalog"
              className="inline-flex items-center gap-3 bg-gold-500 hover:bg-gold-400 text-charcoal-900 px-8 py-4 rounded-xl font-extrabold text-base transition-all transform hover:-translate-y-1 shadow-xl shadow-gold-500/20"
            >
              <span>شوف الوحدات المتاحة</span>
              <ArrowDown className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Catalog Grid */}
      <section id="catalog" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-4 border-b border-gray-200">
          <div>
            <span className="text-gold-600 font-bold text-xs uppercase tracking-wider">كتالوج الوحدات العقارية</span>
            <h2 className="text-3xl font-extrabold text-charcoal-900 mt-1">الوحدات المتاحة حالياً</h2>
          </div>
          <Link href="/properties" className="text-sm text-gold-600 font-bold hover:underline mt-2 md:mt-0">
            عرض كافة الوحدات والفلاتر ←
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {availableProperties.map(property => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      </section>
    </div>
  );
}
