'use client';
import { Video } from 'lucide-react';
import { PropertyVideo } from '@/types';

export default function VideoPlayer({ videos }: { videos?: PropertyVideo[] }) {
  if (!videos || videos.length === 0) return null;

  return (
    <div className="my-10">
      <h3 className="text-xl font-bold text-charcoal-900 mb-4 border-r-4 border-gold-500 pr-3 flex items-center gap-2">
        <Video className="w-5 h-5 text-gold-500" />
        <span>فيديوهات المعاينة المباشرة للوحدة</span>
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {videos.map((vid, idx) => (
          <div key={vid.id || idx} className="bg-black rounded-2xl overflow-hidden shadow-xl border border-gray-800">
            <video controls className="w-full h-64 md:h-80 object-cover" preload="metadata">
              <source src={vid.public_url} type="video/mp4" />
              متصفحك لا يدعم تشغيل الفيديو.
            </video>
            {vid.title && (
              <div className="p-3 bg-charcoal-900 text-gray-300 text-xs font-semibold text-center border-t border-gray-800">
                {vid.title}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
