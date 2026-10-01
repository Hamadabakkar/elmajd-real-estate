import Link from 'next/link';
import Image from 'next/image';
import { Maximize2, BedDouble, Building, ArrowLeft } from 'lucide-react';
import { Property } from '@/types';

export default function PropertyCard({ property }: { property: Property }) {
  const statusLabels = {
    available: { text: 'متاحة', bg: 'bg-emerald-600 text-white' },
    reserved: { text: 'محجوزة', bg: 'bg-amber-600 text-white' },
    sold: { text: 'مباعة', bg: 'bg-red-600 text-white' },
  };

  const status = statusLabels[property.status] || statusLabels.available;

  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col group">
      <div className="relative h-64 overflow-hidden bg-gray-100">
        <Image 
          src={property.cover_image} 
          alt={property.title} 
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute top-4 right-4">
          <span className={`px-3 py-1 rounded-full text-xs font-bold shadow-md ${status.bg}`}>
            {status.text}
          </span>
        </div>
        <div className="absolute bottom-4 left-4 bg-charcoal-900/90 backdrop-blur-md px-3.5 py-1.5 rounded-xl text-gold-400 font-extrabold text-base border border-gray-800">
          {property.price.toLocaleString('ar-EG')} جنيه
        </div>
      </div>

      <div className="p-6 flex-1 flex flex-col justify-between bg-white">
        <div>
          <h3 className="text-lg font-bold text-charcoal-900 mb-2 line-clamp-1 group-hover:text-gold-600 transition-colors">
            {property.title}
          </h3>
          <p className="text-xs text-gray-500 mb-4 flex items-center gap-1">
            📍 {property.location}
          </p>

          <div className="grid grid-cols-3 gap-2 py-3 px-2 bg-beige-100 rounded-xl border border-gray-100 text-center text-xs text-gray-700 mb-6 font-semibold">
            <div className="flex flex-col items-center justify-center gap-1">
              <Maximize2 className="w-4 h-4 text-gold-500" />
              <span>{property.area} م²</span>
            </div>
            <div className="flex flex-col items-center justify-center gap-1 border-r border-l border-gray-200">
              <BedDouble className="w-4 h-4 text-gold-500" />
              <span>{property.rooms} غرف</span>
            </div>
            <div className="flex flex-col items-center justify-center gap-1">
              <Building className="w-4 h-4 text-gold-500" />
              <span className="truncate">{property.floor}</span>
            </div>
          </div>
        </div>

        <Link 
          href={`/properties/${property.slug}`}
          className="w-full bg-charcoal-900 hover:bg-gold-500 hover:text-charcoal-900 text-white text-center py-3.5 rounded-xl font-bold transition-all duration-300 flex items-center justify-center gap-2 text-sm shadow-md"
        >
          <span>عرض التفاصيل</span>
          <ArrowLeft className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
