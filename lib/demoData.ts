import { Property } from '@/types';

const IMGS = [
  'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
];

type U = {
  slug: string; floor: string; side?: string; area: number; price: number;
  balconies?: number; direction?: string; view?: string; financing?: boolean;
  title?: string; installments?: string; payment?: string;
};

const UNITS: U[] = [
  { slug: 'ground-takeover', floor: 'الدور الأرضي', area: 115, price: 1300000, title: 'شقة دور أرضي – تكملة أقساط (مقدم 1.3 مليون)', payment: 'تكملة أقساط - مقدم 1.300.000', installments: 'قسط 58 ألف كل 3 شهور لمدة 6 سنين' },
  { slug: 'ground-1900', floor: 'الدور الأرضي', area: 115, price: 1900000 },
  { slug: 'first-front-115-landscape', floor: 'الدور الأول', side: 'أمامي', area: 115, price: 2500000, direction: 'بحري شرقي', view: 'مميز - لاند سكيب', financing: true },
  { slug: 'first-front-115-2balcony', floor: 'الدور الأول', side: 'أمامي', area: 115, price: 2500000, balconies: 2, direction: 'بحري صريح', view: 'غير مجروح' },
  { slug: 'second-front-115', floor: 'الدور الثاني', side: 'أمامي', area: 115, price: 2450000, view: 'عادي' },
  { slug: 'third-front-118-2balcony', floor: 'الدور الثالث', side: 'أمامي', area: 118, price: 2400000, balconies: 2, direction: 'قبلي', view: 'ممتاز - على شارع الحديقة المركزية' },
  { slug: 'third-front-115', floor: 'الدور الثالث', side: 'أمامي', area: 115, price: 2450000, direction: 'قبلي', view: 'عادي', financing: true },
  { slug: 'fourth-back-115', floor: 'الدور الرابع', side: 'خلفي', area: 115, price: 2200000 },
  { slug: 'fifth-front-115-a', floor: 'الدور الخامس', side: 'أمامي', area: 115, price: 2100000, view: 'غير مجروح' },
  { slug: 'fifth-front-115-b', floor: 'الدور الخامس', side: 'أمامي', area: 115, price: 2000000, direction: 'بحري', view: 'غير مجروح' },
];

export const DEMO_PROPERTIES: Property[] = UNITS.map((u, i) => {
  const id = `unit-${i + 1}`;
  const cover = IMGS[i % IMGS.length];
  const features = ['3 غرف + ريسبشن', 'قريبة جداً من مول مصر', 'كمبوند سكن مصر'];
  if (u.balconies) features.push(`${u.balconies} بلكونة`);
  if (u.financing) features.push('تصلح تمويل عقاري');
  const lines = [
    `شقة ${u.area} متر بـ${u.floor}${u.side ? ' (' + u.side + ')' : ''}${u.balconies ? ` بعدد ${u.balconies} بلكونة` : ''}، داخل كمبوند سكن مصر بمدينة الإنتاج الإعلامي، قريبة جداً من مول مصر.`,
    'تتكون من 3 غرف نوم + ريسبشن + مطبخ + حمام.',
  ];
  if (u.direction) lines.push(`الاتجاه: ${u.direction}`);
  if (u.view) lines.push(`الفيو: ${u.view}`);
  return {
    id,
    title: u.title ?? `شقة ${u.area}م² – ${u.floor}${u.side ? ' ' + u.side : ''} – سكن مصر`,
    slug: u.slug,
    price: u.price,
    area: u.area,
    floor: u.side ? `${u.floor} ${u.side}` : u.floor,
    rooms: 3,
    bathrooms: 1,
    direction: u.direction,
    view: u.view,
    status: 'available',
    description: lines.join('\n'),
    location: 'كمبوند سكن مصر - مدينة الإنتاج الإعلامي',
    installments: u.installments ?? 'اتصل للتفاصيل',
    payment_method: u.payment ?? 'اتصل للتفاصيل',
    mortgage_available: !!u.financing,
    cover_image: cover,
    created_at: new Date().toISOString(),
    images: [{ id: `${id}-img`, property_id: id, storage_path: '', public_url: cover, sort_order: 1 }],
    videos: [],
    features: features.map((f, k) => ({ id: `${id}-f${k}`, property_id: id, feature: f })),
  } as Property;
});
