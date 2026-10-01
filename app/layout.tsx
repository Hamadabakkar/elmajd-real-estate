import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/ui/Header';
import Footer from '@/components/ui/Footer';
import FloatingWhatsapp from '@/components/ui/FloatingWhatsapp';

export const metadata: Metadata = {
  title: 'المجد للعقارات | Elmajd Real Estate',
  description: 'المجد ينفعك وقت الجد - كتالوج عقارات فاخر يعرض الشقق والوحدات المتاحة بصور وفيديوهات من أرض الواقع.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl">
      <body className="bg-beige-100 text-charcoal-900 font-sans min-h-screen flex flex-col antialiased">
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
        <FloatingWhatsapp />
      </body>
    </html>
  );
}
