import { Property } from '@/types';

export const DEMO_PROPERTIES: Property[] = [
  {
    id: 'demo-1',
    title: 'شقة 118م² – سكن مصر مدينة الإنتاج الإعلامي',
    slug: 'sakan-misr-118m-third-floor',
    price: 2400000,
    area: 118,
    floor: 'الدور الثالث',
    rooms: 3,
    bathrooms: 1,
    direction: 'بحري شرقي',
    view: 'لاندسكيب مفتوح وحدائق',
    finish: 'تشطيب كامل سوبر لوكس',
    status: 'available',
    description: 'شقة 118 متر داخل كمبوند سكن مصر بمدينة الإنتاج الإعلامي، الموقع ممتاز جداً بالقرب من البوابة الرئيسية، تقسيم داخلي استثماري وممتاز: 3 غرف نوم واسعة، ريسبشن قطعتين، حمام ومطبخ. العمارة مزودة بجميع المرافق ومصعد، واجهة مودرن، جاهزة للسكن الفوري.',
    location: 'مدينة الإنتاج الإعلامي - 6 أكتوبر',
    google_maps_url: 'https://maps.google.com',
    down_payment: 2400000,
    installments: 'خالصة الثمن بدون أقساط',
    payment_method: 'كاش',
    mortgage_available: true,
    meters: 'كهرباء كارت + مياه مستقل',
    cover_image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80',
    created_at: new Date().toISOString(),
    images: [
      { id: 'img-1', property_id: 'demo-1', storage_path: '', public_url: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80', sort_order: 1 },
      { id: 'img-2', property_id: 'demo-1', storage_path: '', public_url: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80', sort_order: 2 },
      { id: 'img-3', property_id: 'demo-1', storage_path: '', public_url: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=80', sort_order: 3 },
    ],
    videos: [
      { id: 'vid-1', property_id: 'demo-1', title: 'Video Tour المعاينة الكاملة', storage_path: '', public_url: 'https://www.w3schools.com/html/mov_bbb.mp4', sort_order: 1 }
    ],
    features: [
      { id: 'f-1', property_id: 'demo-1', feature: 'كاملة المرافق' },
      { id: 'f-2', property_id: 'demo-1', feature: 'جميع العدادات' },
      { id: 'f-3', property_id: 'demo-1', feature: 'قريبة من البوابة' },
      { id: 'f-4', property_id: 'demo-1', feature: 'تمويل عقاري متاح' }
    ]
  },
  {
    id: 'demo-2',
    title: 'شقة 140م² – دار مصر حدائق أكتوبر',
    slug: 'dar-misr-140m-first-floor',
    price: 3100000,
    area: 140,
    floor: 'الدور الأول بعد الأرضي',
    rooms: 3,
    bathrooms: 2,
    direction: 'قبلي بحري',
    view: 'شارع الرئيسي والمول التجاري',
    finish: 'تشطيب فاخر ممتاز',
    status: 'available',
    description: 'شقة بموقع استثنائي بدار مصر حدائق أكتوبر، ناصية صريحة غير مجروحة. تتكون من 3 غرف منهم غرفة ماستر، 2 حمام، مطبخ كبير، ريسبشن واسع. موقع الكمبوند متكامل الخدمات.',
    location: 'حدائق أكتوبر - بجوار الطريق الدائري الأوسطي',
    google_maps_url: 'https://maps.google.com',
    down_payment: 2500000,
    installments: 'متبقي أقساط سنوية مع الهيئة',
    payment_method: 'مقدم + تسهيلات',
    mortgage_available: false,
    meters: 'جميع العدادات راكبة',
    cover_image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    created_at: new Date().toISOString(),
    images: [
      { id: 'img-4', property_id: 'demo-2', storage_path: '', public_url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80', sort_order: 1 },
    ],
    videos: [],
    features: [
      { id: 'f-5', property_id: 'demo-2', feature: 'كمبوند مغلق أمن 24 ساعة' },
      { id: 'f-6', property_id: 'demo-2', feature: 'جاهزة للسكن' }
    ]
  }
];
