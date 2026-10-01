'use client';
import { MessageCircle, Phone } from 'lucide-react';

export default function FloatingWhatsapp() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-charcoal-900/95 backdrop-blur-lg border-t border-gray-800 p-3 md:hidden flex gap-3 shadow-2xl">
      <a
        href="https://wa.me/201001363727?text=السلام%20عليكم،%20أرغب%20في%20الاستفسار%20عن%20الوحدات%20المتاحة%20لدى%20المجد%20للعقارات"
        target="_blank"
        rel="noopener noreferrer"
        className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3.5 px-4 rounded-xl flex items-center justify-center gap-2 text-sm shadow-lg"
      >
        <MessageCircle className="w-5 h-5" />
        <span>تواصل واتساب</span>
      </a>
      <a
        href="tel:01001363727"
        className="flex-1 bg-gold-500 hover:bg-gold-400 text-charcoal-900 font-bold py-3.5 px-4 rounded-xl flex items-center justify-center gap-2 text-sm shadow-lg"
      >
        <Phone className="w-5 h-5" />
        <span>اتصل الآن</span>
      </a>
    </div>
  );
}
