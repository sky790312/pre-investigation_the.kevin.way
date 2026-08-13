import React from 'react';
import { CheckCircle2, Sparkles, Clock } from 'lucide-react';

export default function HeaderHero() {
  return (
    <div className="relative overflow-hidden pt-4 pb-6 sm:pt-8 sm:pb-8 px-3 sm:px-6 mb-4 sm:mb-6">
      {/* Radiant Background Aura Light */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl h-64 bg-gradient-to-r from-emerald-200/40 via-teal-100/30 to-blue-100/40 blur-3xl pointer-events-none -z-10 rounded-full" />

      <div className="max-w-2xl mx-auto text-center relative z-10">
        
        {/* Top Highlight Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-emerald-50 via-teal-50 to-emerald-50 border border-emerald-200/90 text-emerald-900 text-[11px] sm:text-xs font-bold mb-4 sm:mb-5 shadow-xs animate-fadeIn">
          <Sparkles className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
          <span>1on1 專屬諮詢事前深度診斷</span>
          <span className="w-1 h-1 rounded-full bg-emerald-500"></span>
          <Clock className="w-3.5 h-3.5 text-teal-600 shrink-0" />
          <span>建議預留 15-30 分鐘沉澱思考</span>
        </div>

        {/* Highlighted Main Title */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-slate-900 mb-3 sm:mb-4 leading-[1.2] font-heading">
          <span className="text-slate-800 font-extrabold block text-2xl sm:text-3xl md:text-4xl mb-1 opacity-90">
            從理財到理心
          </span>
          <span className="gradient-text-emerald text-3xl sm:text-4xl md:text-5xl drop-shadow-xs block">
            建立你的專屬財務系統
          </span>
        </h1>

        {/* Subtitle with better line height & contrast */}
        <p className="text-slate-600 text-xs sm:text-sm md:text-base leading-relaxed max-w-xl mx-auto mb-5 sm:mb-6 font-medium">
          為了讓後面諮詢能夠發揮最大效益，請預留半個小時靜靜坐下來，透過這 3 個階段深入思考，盤點你的狀況與未來生活藍圖。
        </p>

        {/* Feature Highlight Chips */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-xs font-semibold">
          <div className="flex items-center gap-1.5 bg-white/90 shadow-xs px-3 py-1.5 rounded-xl border border-emerald-200/80 text-slate-800 transition-all hover:border-emerald-300">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>財務狀況分析</span>
          </div>
          <div className="flex items-center gap-1.5 bg-white/90 shadow-xs px-3 py-1.5 rounded-xl border border-emerald-200/80 text-slate-800 transition-all hover:border-emerald-300">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>合適投資節奏</span>
          </div>
          <div className="flex items-center gap-1.5 bg-white/90 shadow-xs px-3 py-1.5 rounded-xl border border-emerald-200/80 text-slate-800 transition-all hover:border-emerald-300">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>建構理想生活</span>
          </div>
        </div>

      </div>
    </div>
  );
}
