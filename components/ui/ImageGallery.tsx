'use client';
import { useState } from 'react';
import Image from 'next/image';
import { X, ChevronRight, ChevronLeft, Maximize } from 'lucide-react';
import { PropertyImage } from '@/types';

export default function ImageGallery({ images, title }: { images?: PropertyImage[]; title: string }) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  if (!images || images.length === 0) return null;

  return (
    <div className="my-8">
      <h3 className="text-xl font-bold text-charcoal-900 mb-4 border-r-4 border-gold-500 pr-3">
        معرض الصور المعاينة الحقيقية ({images.length} صورة)
      </h3>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {images.map((img, idx) => (
          <div 
            key={img.id || idx} 
            onClick={() => setSelectedIndex(idx)}
            className="relative h-40 md:h-48 rounded-xl overflow-hidden cursor-pointer group bg-gray-200 border border-gray-200 shadow-sm"
          >
            <Image 
              src={img.public_url} 
              alt={`${title} - صورة ${idx + 1}`} 
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
              <Maximize className="w-6 h-6" />
            </div>
          </div>
        ))}
      </div>

      {selectedIndex !== null && (
        <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4">
          <button 
            onClick={() => setSelectedIndex(null)}
            className="absolute top-6 left-6 text-white bg-gray-800 p-3 rounded-full hover:bg-gold-500 hover:text-black transition-colors"
          >
            <X className="w-6 h-6" />
          </button>

          <button 
            onClick={() => setSelectedIndex(selectedIndex === 0 ? images.length - 1 : selectedIndex - 1)}
            className="absolute right-6 text-white bg-gray-800 p-3 rounded-full hover:bg-gold-500 hover:text-black transition-colors"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          <button 
            onClick={() => setSelectedIndex(selectedIndex === images.length - 1 ? 0 : selectedIndex + 1)}
            className="absolute left-6 text-white bg-gray-800 p-3 rounded-full hover:bg-gold-500 hover:text-black transition-colors"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <div className="relative max-w-5xl w-full h-[75vh]">
            <Image 
              src={images[selectedIndex].public_url} 
              alt="صورة مكبرة" 
              fill
              className="object-contain"
            />
          </div>
        </div>
      )}
    </div>
  );
}
