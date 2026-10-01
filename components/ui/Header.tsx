'use client';
import Link from 'next/link';
import { Building2, Phone } from 'lucide-react';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-charcoal-900/95 backdrop-blur-md text-white border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          <Link href="/" className="flex items-center gap-3 group">
            <div className="bg-gold-500 p-2.5 rounded-xl text-charcoal-900 group-hover:bg-gold-400 transition-colors">
              <Building2 className="w-6 h-6" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold tracking-wide text-white">المجد للعقارات</span>
              <span className="text-[10px] text-gold-400 tracking-wider">المجد ينفعك وقت الجد</span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-8 font-medium text-sm">
            <Link href="/" className="hover:text-gold-400 transition-colors">الرئيسية</Link>
            <Link href="/properties" className="hover:text-gold-400 transition-colors">الوحدات المتاحة</Link>
            <Link href="/admin/login" className="text-xs px-3.5 py-1.5 border border-gold-500/40 rounded-lg text-gold-400 hover:bg-gold-500 hover:text-charcoal-900 transition-all">لوحة التحكم</Link>
          </nav>

          <div className="flex items-center gap-3">
            <a 
              href="tel:01001363727" 
              className="flex items-center gap-2 bg-gold-500 text-charcoal-900 px-5 py-2.5 rounded-xl font-bold hover:bg-gold-400 transition-all text-xs sm:text-sm shadow-lg shadow-gold-500/10"
            >
              <Phone className="w-4 h-4" />
              <span>01001363727</span>
            </a>
          </div>

        </div>
      </div>
    </header>
  );
}
