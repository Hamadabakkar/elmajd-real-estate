import Link from 'next/link';
import Image from 'next/image';
import { getProperties } from '@/services/properties';
import PropertyCard from '@/components/ui/PropertyCard';
import { ArrowDown, Sparkles } from 'lucide-react';
import { isPlaceholderImage } from '@/lib/utils';

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  const properties = await getProperties();
  const availableProperties = properties.filter(p => p.status !== 'sold');
  const availableCount = properties.filter(p => p.status === 'available').length;
  // خلفية الـ Hero: صورة حقيقية مرفوعة لو موجودة، وإلا خلفية سادة بدون صور مخترعة
  const heroImage = properties.find(p => !isPlaceholderImage(p.cover_image))?.cover_image;

  return (
    <div>
      {/* Hero Section */}
      <section className="relative min-h-[520px] h-[75vh] bg-charcoal-900 flex items-center justify-center text-white text-center px-4 overflow-hidden">
        {heroImage ? (
          <Image
            src={heroImage}
            alt="وحدات سكن مصر"
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-30"
          />
        ) : (
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(197,155,39,0.18),_transparent_60%)]" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900 via-charcoal-900/70 to-charcoal-900/30" />

        <div className="relative z-10 max-w-3xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold-500/15 border border-gold-500/40 text-gold-400 text-xs font-bold">
            <Sparkles className="w-4 h-4" />
            <span>المجد ينفعك وقت الجد</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold leading-snug text-white">
            شوف <span className="text-gold-400 border-b-4 border-gold-500 pb-1">المتاح الحقيقي</span> في سكن مصر – مدينة الإنتاج الإعلامي
          </h1>

          <p className="text-sm sm:text-base text-gray-300 flex flex-wrap items-center justify-center gap-x-3 gap-y-1">
            {['صور حقيقية', 'تفاصيل واضحة', 'أسعار محدثة', 'وحدات متاحة فعليًا'].map((t, i) => (
              <span key={t} className="flex items-center gap-3">
                {i > 0 && <span className="text-gold-500">•</span>}
                {t}
              </span>
            ))}
          </p>

          <div className="pt-2 flex flex-col items-center gap-3">
            <Link
              href="#catalog"
              className="inline-flex items-center gap-3 bg-gold-500 hover:bg-gold-400 text-charcoal-900 px-8 py-4 rounded-xl font-extrabold text-base transition-colors shadow-lg shadow-gold-500/20"
            >
              <span>شوف الشقق</span>
              <ArrowDown className="w-5 h-5" />
            </Link>
            {availableCount > 0 && (
              <span className="text-xs text-gray-400">{availableCount.toLocaleString('ar-EG')} وحدة متاحة الآن</span>
            )}
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
