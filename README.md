# 🏛️ Elmajd Real Estate — المجد للعقارات

كتالوج عقاري احترافي لعرض العقارات بصور وفيديوهات حقيقية، مع لوحة تحكم.

## خطوات التشغيل والنشر

### 1) إنشاء مشروع Supabase
1. ادخل على https://supabase.com وأنشئ حساب مجاني.
2. اضغط **New Project** وسمّيه `elmajd-real-estate`.
3. احفظ كلمة مرور قاعدة البيانات.

### 2) تشغيل SQL Schema
1. افتح **SQL Editor** في Supabase.
2. انسخ محتوى `supabase/schema.sql` والصقه واضغط **Run**.
   (بيعمل الجداول + سياسات الأمان + bucket اسمه `properties-media`).

### 3) إنشاء حساب Admin
**Authentication → Users → Add User → Create User** وحط الإيميل والباسورد.

### 4) المتغيرات البيئية
انسخ `.env.example` إلى `.env.local` وعدّل القيم:
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

### 5) التشغيل محلياً
```bash
npm install
npm run dev
```
افتح http://localhost:3000

### 6) الرفع على GitHub
```bash
git init
git add .
git commit -m "Initial commit - Elmajd Real Estate"
git branch -M main
git remote add origin https://github.com/your-username/elmajd-real-estate.git
git push -u origin main
```

### 7) النشر على Vercel
1. ادخل على https://vercel.com واربط GitHub.
2. اختار مستودع `elmajd-real-estate`.
3. أضف `NEXT_PUBLIC_SUPABASE_URL` و `NEXT_PUBLIC_SUPABASE_ANON_KEY` في Environment Variables.
4. اضغط **Deploy**.
