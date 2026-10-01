export default function Footer() {
  return (
    <footer className="bg-charcoal-900 text-gray-400 text-center text-xs py-8 pb-24 md:pb-8 border-t border-gray-800">
      <p className="text-white font-bold mb-1">المجد للعقارات</p>
      <p>المجد ينفعك وقت الجد</p>
      <p className="mt-2">© {new Date().getFullYear()} جميع الحقوق محفوظة</p>
    </footer>
  );
}
