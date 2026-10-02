'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { Property } from '@/types';
import { Trash2, Star } from 'lucide-react';

const BUCKET = 'properties-media';
const PLACEHOLDER = 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80';
const MAX_MB = 50;
const inp = 'w-full px-3 py-2.5 rounded-xl border border-gray-300 text-sm focus:outline-none focus:border-gold-500 bg-white';

const FIELDS: [string, string][] = [
  ['title', 'العنوان'], ['slug', 'الرابط (إنجليزي - اتركه فاضي للتوليد التلقائي)'],
  ['price', 'السعر بالجنيه'], ['area', 'المساحة م²'], ['floor', 'الدور'],
  ['rooms', 'الغرف'], ['bathrooms', 'الحمامات'], ['direction', 'الاتجاه'],
  ['view', 'الفيو'], ['finish', 'التشطيب'], ['location', 'الموقع'],
  ['installments', 'الأقساط'], ['payment_method', 'طريقة السداد'], ['meters', 'العدادات'],
];

export default function PropertyForm({ property }: { property?: Property }) {
  const router = useRouter();
  const [supabase] = useState(() => createClient());
  const p = property;
  const [f, setF] = useState<Record<string, any>>({
    title: p?.title ?? '', slug: p?.slug ?? '', price: String(p?.price ?? ''), area: String(p?.area ?? ''),
    floor: p?.floor ?? '', rooms: String(p?.rooms ?? 3), bathrooms: String(p?.bathrooms ?? 1),
    direction: p?.direction ?? '', view: p?.view ?? '', finish: p?.finish ?? '',
    location: p?.location ?? 'كمبوند سكن مصر - مدينة الإنتاج الإعلامي',
    installments: p?.installments ?? '', payment_method: p?.payment_method ?? '', meters: p?.meters ?? '',
    status: p?.status ?? 'available', description: p?.description ?? '',
    mortgage: !!p?.mortgage_available,
    features: (p?.features ?? []).map(x => x.feature).join('\n'),
  });
  const [images, setImages] = useState(p?.images ?? []);
  const [videos, setVideos] = useState(p?.videos ?? []);
  const [cover, setCover] = useState(p?.cover_image ?? '');
  const [newImgs, setNewImgs] = useState<File[]>([]);
  const [newVids, setNewVids] = useState<File[]>([]);
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState('');
  const set = (k: string, v: any) => setF(s => ({ ...s, [k]: v }));

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => { if (!data.user) router.push('/admin/login'); });
  }, [supabase, router]);

  const removeMedia = async (table: 'property_images' | 'property_videos', item: any) => {
    if (!confirm('حذف نهائي؟')) return;
    await supabase.from(table).delete().eq('id', item.id);
    if (item.storage_path) await supabase.storage.from(BUCKET).remove([item.storage_path]);
    if (table === 'property_images') {
      const rest = images.filter(i => i.id !== item.id);
      setImages(rest);
      if (cover === item.public_url) setCover(rest[0]?.public_url ?? '');
    } else {
      setVideos(videos.filter(v => v.id !== item.id));
    }
  };

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true); setMsg('');
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { router.push('/admin/login'); return; }
      if (!p && newImgs.length === 0) throw new Error('ارفع صورة واحدة على الأقل');
      const big = [...newImgs, ...newVids].find(x => x.size > MAX_MB * 1024 * 1024);
      if (big) throw new Error(`الملف ${big.name} أكبر من ${MAX_MB}MB. صغّره الأول.`);

      const id = p?.id ?? crypto.randomUUID();
      const upload = async (file: File, kind: string, i: number) => {
        const ext = (file.name.split('.').pop() || 'bin').toLowerCase();
        const path = `${id}/${kind}/${Date.now()}-${i}.${ext}`;
        const { error } = await supabase.storage.from(BUCKET).upload(path, file, { contentType: file.type });
        if (error) throw error;
        return { path, url: supabase.storage.from(BUCKET).getPublicUrl(path).data.publicUrl };
      };

      const upImgs = [];
      for (let i = 0; i < newImgs.length; i++) upImgs.push(await upload(newImgs[i], 'images', i));
      const upVids = [];
      for (let i = 0; i < newVids.length; i++) upVids.push({ ...(await upload(newVids[i], 'videos', i)), title: newVids[i].name });

      let finalCover = cover;
      if ((!finalCover || finalCover.includes('images.unsplash.com')) && upImgs[0]) finalCover = upImgs[0].url;
      if (!finalCover) finalCover = PLACEHOLDER;

      const row = {
        id, title: f.title, slug: f.slug.trim() || `unit-${id.slice(0, 8)}`,
        price: Number(f.price), area: Number(f.area), floor: f.floor,
        rooms: Number(f.rooms), bathrooms: Number(f.bathrooms),
        direction: f.direction || null, view: f.view || null, finish: f.finish || null,
        status: f.status, description: f.description || null, location: f.location,
        installments: f.installments || null, payment_method: f.payment_method || null,
        mortgage_available: f.mortgage, meters: f.meters || null,
        cover_image: finalCover, updated_at: new Date().toISOString(),
      };
      const { error: pe } = await supabase.from('properties').upsert(row);
      if (pe) throw pe;

      if (upImgs.length) {
        const { error } = await supabase.from('property_images').insert(
          upImgs.map((u, i) => ({ property_id: id, storage_path: u.path, public_url: u.url, sort_order: images.length + i }))
        );
        if (error) throw error;
      }
      if (upVids.length) {
        const { error } = await supabase.from('property_videos').insert(
          upVids.map((u, i) => ({ property_id: id, title: u.title, storage_path: u.path, public_url: u.url, sort_order: videos.length + i }))
        );
        if (error) throw error;
      }

      await supabase.from('property_features').delete().eq('property_id', id);
      const feats = String(f.features).split('\n').map(x => x.trim()).filter(Boolean);
      if (feats.length) await supabase.from('property_features').insert(feats.map(feature => ({ property_id: id, feature })));

      router.push('/admin/dashboard');
    } catch (err: any) {
      setMsg(err?.message || 'حصل خطأ');
    } finally {
      setBusy(false);
    }
  };

  return (
    <form onSubmit={save} className="space-y-6">
      <div className="bg-white p-6 rounded-2xl shadow-sm grid grid-cols-1 sm:grid-cols-2 gap-4">
        {FIELDS.map(([k, label]) => (
          <div key={k} className={k === 'title' ? 'sm:col-span-2' : ''}>
            <label className="block text-xs font-bold text-gray-700 mb-1">{label}</label>
            <input
              className={inp} value={f[k]} onChange={e => set(k, e.target.value)}
              required={['title', 'price', 'area', 'floor', 'location'].includes(k)}
              type={['price', 'area', 'rooms', 'bathrooms'].includes(k) ? 'number' : 'text'}
            />
          </div>
        ))}
        <div>
          <label className="block text-xs font-bold text-gray-700 mb-1">الحالة</label>
          <select className={inp} value={f.status} onChange={e => set('status', e.target.value)}>
            <option value="available">متاحة</option>
            <option value="reserved">محجوزة</option>
            <option value="sold">مباعة</option>
          </select>
        </div>
        <label className="flex items-center gap-2 text-sm font-bold mt-6">
          <input type="checkbox" checked={f.mortgage} onChange={e => set('mortgage', e.target.checked)} />
          تصلح تمويل عقاري
        </label>
        <div className="sm:col-span-2">
          <label className="block text-xs font-bold text-gray-700 mb-1">المميزات (كل ميزة في سطر)</label>
          <textarea className={inp} rows={4} value={f.features} onChange={e => set('features', e.target.value)} />
        </div>
        <div className="sm:col-span-2">
          <label className="block text-xs font-bold text-gray-700 mb-1">الوصف</label>
          <textarea className={inp} rows={5} value={f.description} onChange={e => set('description', e.target.value)} />
        </div>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-sm space-y-4">
        <h3 className="font-bold">الصور</h3>
        {images.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {images.map(img => (
              <div key={img.id} className="relative rounded-xl overflow-hidden border">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={img.public_url} alt="" className="w-full h-28 object-cover" />
                <div className="absolute top-1 left-1 flex gap-1">
                  <button type="button" onClick={() => setCover(img.public_url)}
                    className={`p-1.5 rounded-lg ${cover === img.public_url ? 'bg-gold-500' : 'bg-white/90'}`} title="تعيين كغلاف">
                    <Star className="w-4 h-4" />
                  </button>
                  <button type="button" onClick={() => removeMedia('property_images', img)} className="p-1.5 rounded-lg bg-white/90 text-red-600">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
        <input type="file" accept="image/*" multiple onChange={e => setNewImgs(Array.from(e.target.files ?? []))} className="text-sm" />
        {newImgs.length > 0 && <p className="text-xs text-gray-500">{newImgs.length} صورة جاهزة للرفع</p>}

        <h3 className="font-bold pt-4">الفيديوهات (حتى {MAX_MB}MB للفيديو)</h3>
        {videos.map(v => (
          <div key={v.id} className="flex items-center justify-between text-sm border rounded-xl p-2">
            <span className="truncate">{v.title || 'فيديو'}</span>
            <button type="button" onClick={() => removeMedia('property_videos', v)} className="p-1.5 text-red-600">
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
        <input type="file" accept="video/*" multiple onChange={e => setNewVids(Array.from(e.target.files ?? []))} className="text-sm" />
        {newVids.length > 0 && <p className="text-xs text-gray-500">{newVids.length} فيديو جاهز للرفع</p>}
      </div>

      {msg && <p className="text-sm text-red-600 font-bold">{msg}</p>}
      <button disabled={busy} className="w-full bg-charcoal-900 hover:bg-gold-500 hover:text-charcoal-900 text-white py-3.5 rounded-xl font-bold text-sm transition-all disabled:opacity-60">
        {busy ? 'جاري الحفظ والرفع...' : 'حفظ الوحدة'}
      </button>
    </form>
  );
}
