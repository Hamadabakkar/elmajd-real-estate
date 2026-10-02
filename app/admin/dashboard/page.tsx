'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { Property } from '@/types';
import { Plus, Trash2, Edit, LogOut } from 'lucide-react';

export default function AdminDashboardPage() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function loadData() {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        router.push('/admin/login');
        return;
      }

      const { data } = await supabase.from('properties').select('*').order('created_at', { ascending: false });
      setProperties((data as Property[]) || []);
      setLoading(false);
    }
    loadData();
  }, [router]);

  const handleDelete = async (id: string) => {
    if (!confirm('هل أنت تأكد من حذف هذه الوحدة نهائياً مع صورها وفيديوهاتها؟')) return;

    const supabase = createClient();
    await supabase.from('properties').delete().eq('id', id);
    setProperties(properties.filter(p => p.id !== id));
  };

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push('/admin/login');
  };

  if (loading) return <div className="p-10 text-center font-bold">جاري تحميل اللوحة...</div>;

  return (
    <div className="bg-beige-100 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex items-center justify-between bg-white p-6 rounded-2xl shadow-sm mb-8">
          <div>
            <h1 className="text-2xl font-bold">لوحة تحكم إدارة العقارات</h1>
            <p className="text-xs text-gray-500">إجمالي الوحدات: {properties.length}</p>
          </div>

          <div className="flex items-center gap-3">
            <Link href="/admin/properties/new" className="bg-gold-500 text-charcoal-900 px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2">
              <Plus className="w-4 h-4" />
              <span>إضافة وحدة جديدة</span>
            </Link>
            <button onClick={handleLogout} className="bg-red-50 text-red-600 p-2.5 rounded-xl">
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <table className="w-full text-right text-sm">
            <thead className="bg-gray-50 border-b text-xs text-gray-500">
              <tr>
                <th className="p-4">الوحدة</th>
                <th className="p-4">السعر</th>
                <th className="p-4">المساحة</th>
                <th className="p-4">الحالة</th>
                <th className="p-4 text-center">الإجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {properties.map(p => (
                <tr key={p.id}>
                  <td className="p-4 font-bold">{p.title}</td>
                  <td className="p-4 text-gold-600 font-bold">{p.price.toLocaleString('ar-EG')} ج.م</td>
                  <td className="p-4">{p.area} م²</td>
                  <td className="p-4">{p.status}</td>
                  <td className="p-4 flex justify-center gap-2">
                    <Link href={`/admin/properties/${p.id}/edit`} className="p-2 text-gold-600 hover:bg-beige-100 rounded-lg">
                      <Edit className="w-4 h-4" />
                    </Link>
                    <button onClick={() => handleDelete(p.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
}
