import React from 'react';
import { CheckCircle2, Sparkles, Clock } from 'lucide-react';

export default function HeaderHero() {
  return (
    <div className="relative overflow-hidden pt-6 pb-8 sm:pt-10 sm:pb-12 px-3 sm:px-6">
      {/* Soft Background Aura Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl h-64 bg-gradient-to-r from-emerald-100/60 via-teal-50/40 to-blue-100/40 blur-3xl pointer-events-none -z-10 rounded-full" />

      <div className="max-w-2xl mx-auto text-center relative z-10">

        {/* Clean Responsive Main Title - Single Line Guaranteed on Most Devices */}
        <h1 className="font-extrabold tracking-tight text-slate-900 mt-6 mb-3 sm:mb-4 leading-snug font-heading">
          <span className="text-slate-900 font-extrabold block text-2xl sm:text-3xl md:text-4xl mb-1.5 sm:mb-2">
            從理財到理心
          </span>
          <span className="gradient-text-emerald text-2xl sm:text-3xl md:text-4xl font-black block">
            建立你的專屬財務系統
          </span>
        </h1>

        {/* Subtitle with Comfortable Line Spacing */}
        <p className="text-slate-600 text-xs sm:text-base leading-relaxed max-w-xl mx-auto font-medium mb-6">
          為了讓後面諮詢能夠發揮最大效益，請至少預留半個小時靜靜坐下來，透過這 3 個階段深入思考，盤點你的狀況與未來生活藍圖。
        </p>

      </div>
    </div>
  );
}
