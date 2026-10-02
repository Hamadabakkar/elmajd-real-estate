import { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getPropertyBySlug } from '@/services/properties';
import ImageGallery from '@/components/ui/ImageGallery';
import VideoPlayer from '@/components/ui/VideoPlayer';
import { isPlaceholderImage } from '@/lib/utils';
import { 
  Building2, Maximize2, BedDouble, Bath, MapPin, 
  Compass, Eye, CheckCircle2, Phone, MessageSquare, Map 
} from 'lucide-react';

export const dynamic = 'force-dynamic';

interface Props {
  params: { slug: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const property = await getPropertyBySlug(params.slug);
  if (!property) return { title: 'الوحدة غير موجودة' };

  return {
    title: `${property.title} | المجد للعقارات`,
    description: property.description || property.title,
    openGraph: {
      images: [property.cover_image],
    },
  };
}

export default async function PropertyDetailPage({ params }: Props) {
  const property = await getPropertyBySlug(params.slug);
  if (!property) notFound();

  const statusMap = {
    available: { label: 'متاحة للبيع / الحجز', color: 'bg-emerald-600 text-white' },
    reserved: { label: 'محجوزة حالياً', color: 'bg-amber-600 text-white' },
    sold: { label: 'تم البيع', color: 'bg-red-600 text-white' },
  };

  const whatsappMessage = encodeURIComponent(`مرحبًا، أريد معرفة تفاصيل ${property.title}`);

  return (
    <div className="bg-beige-100 min-h-screen pb-20">
      {/* Cover Banner */}
      <div className="relative h-[50vh] min-h-[380px] bg-charcoal-900">
        {!isPlaceholderImage(property.cover_image) && (
          <Image
            src={property.cover_image}
            alt={property.title}
            fill
            priority
            className="object-cover opacity-75"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900 via-charcoal-900/40 to-transparent" />
        
        <div className="absolute bottom-6 right-0 left-0">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
            <div className="inline-block mb-3">
              <span className={`px-4 py-1.5 rounded-full text-xs font-bold ${statusMap[property.status].color}`}>
                {statusMap[property.status].label}
              </span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold mb-2">{property.title}</h1>
            <p className="text-gold-400 text-xl font-bold">{property.price.toLocaleString('ar-EG')} جنيه مصري</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          
          <div className="lg:col-span-2 space-y-10">
            {/* Quick Spec Cards */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
              <div className="space-y-1">
                <Maximize2 className="w-5 h-5 text-gold-500 mx-auto" />
                <span className="block text-xs text-gray-500">المساحة</span>
                <span className="font-bold text-sm text-charcoal-900">{property.area} م²</span>
              </div>
              <div className="space-y-1">
                <BedDouble className="w-5 h-5 text-gold-500 mx-auto" />
                <span className="block text-xs text-gray-500">الغرف</span>
                <span className="font-bold text-sm text-charcoal-900">{property.rooms} غرف</span>
              </div>
              <div className="space-y-1">
                <Bath className="w-5 h-5 text-gold-500 mx-auto" />
                <span className="block text-xs text-gray-500">الحمامات</span>
                <span className="font-bold text-sm text-charcoal-900">{property.bathrooms} حمام</span>
              </div>
              <div className="space-y-1">
                <Building2 className="w-5 h-5 text-gold-500 mx-auto" />
                <span className="block text-xs text-gray-500">الدور</span>
                <span className="font-bold text-sm text-charcoal-900">{property.floor}</span>
              </div>
            </div>

            {/* Technical Details */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
              <h3 className="text-lg font-bold text-charcoal-900 mb-6 border-r-4 border-gold-500 pr-3">المواصفات الفنية والمالية</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-500">الاتجاه:</span>
                  <span className="font-semibold">{property.direction || 'غير محدد'}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-500">الـ View:</span>
                  <span className="font-semibold">{property.view || 'غير محدد'}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-500">التشطيب:</span>
                  <span className="font-semibold">{property.finish || 'غير محدد'}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-500">العدادات:</span>
                  <span className="font-semibold">{property.meters || 'غير محدد'}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-500">الأقساط:</span>
                  <span className="font-semibold">{property.installments || 'خالصة'}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-500">طريقة السداد:</span>
                  <span className="font-semibold">{property.payment_method || 'كاش'}</span>
                </div>
              </div>
            </div>

            {/* Gallery */}
            <ImageGallery images={property.images} title={property.title} />

            {/* Videos */}
            <VideoPlayer videos={property.videos} />

            {/* Features */}
            {property.features && property.features.length > 0 && (
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
                <h3 className="text-lg font-bold text-charcoal-900 mb-4 border-r-4 border-gold-500 pr-3">مميزات الوحدة</h3>
                <div className="grid grid-cols-2 gap-3">
                  {property.features.map(f => (
                    <div key={f.id} className="flex items-center gap-2 text-sm text-gray-700">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                      <span>{f.feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Description */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
              <h3 className="text-lg font-bold text-charcoal-900 mb-4 border-r-4 border-gold-500 pr-3">تفاصيل الوحدة</h3>
              <p className="text-gray-700 leading-relaxed text-sm whitespace-pre-line">{property.description}</p>
            </div>
          </div>

          {/* Sidebar CTA */}
          <div className="lg:col-span-1">
            <div className="sticky top-28 bg-charcoal-900 text-white p-6 rounded-2xl shadow-xl space-y-6 border border-gray-800">
              <div>
                <span className="text-gold-400 text-xs font-bold">عايز تعرف تفاصيل أكتر عن الوحدة؟</span>
                <h3 className="text-xl font-extrabold mt-1">تواصل مباشر مع المعاينة</h3>
              </div>

              <div className="space-y-3">
                <a
                  href={`https://wa.me/201001363727?text=${whatsappMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3.5 px-4 rounded-xl flex items-center justify-center gap-2 text-sm shadow-lg shadow-emerald-600/30 transition-all"
                >
                  <MessageSquare className="w-5 h-5" />
                  <span>تواصل على واتساب</span>
                </a>

                <a
                  href="tel:01001363727"
                  className="w-full bg-gold-500 hover:bg-gold-400 text-charcoal-900 font-bold py-3.5 px-4 rounded-xl flex items-center justify-center gap-2 text-sm shadow-lg shadow-gold-500/20 transition-all"
                >
                  <Phone className="w-5 h-5" />
                  <span>اتصل الآن: 01001363727</span>
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
