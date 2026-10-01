'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { Lock, Building2 } from 'lucide-react';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const supabase = createClient();
    const { error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (authError) {
      setError(authError.message || 'خطأ في تسجيل الدخول');
      setLoading(false);
    } else {
      router.push('/admin/dashboard');
    }
  };

  return (
    <div className="min-h-[75vh] flex items-center justify-center bg-beige-100 px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-xl border border-gray-200">
        <div className="text-center mb-6">
          <div className="bg-gold-500 w-12 h-12 rounded-xl flex items-center justify-center mx-auto text-charcoal-900 mb-2">
            <Building2 className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-bold text-charcoal-900">تسجيل دخول Admin</h1>
          <p className="text-xs text-gray-500">لوحة إدارة المجد للعقارات</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">البريد الإلكتروني</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-xl border border-gray-300 text-sm focus:outline-none focus:border-gold-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">كلمة المرور</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-xl border border-gray-300 text-sm focus:outline-none focus:border-gold-500"
            />
          </div>

          {error && <p className="text-xs text-red-600 font-bold">{error}</p>}

          <button 
            type="submit"
            disabled={loading}
            className="w-full bg-charcoal-900 hover:bg-gold-500 hover:text-charcoal-900 text-white py-3 rounded-xl font-bold text-sm transition-all"
          >
            {loading ? 'جاري الدخول...' : 'دخول اللوحة'}
          </button>
        </form>
      </div>
    </div>
  );
}
