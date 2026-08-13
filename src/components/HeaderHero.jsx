import React from 'react';
import { CheckCircle2, Sparkles, Clock } from 'lucide-react';

export default function HeaderHero() {
  return (
    <div className="relative overflow-hidden pt-3 pb-6 sm:pt-6 sm:pb-8 px-2 sm:px-6 mb-4 sm:mb-6">
      {/* Radiant Background Aura Light */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-80 bg-gradient-to-r from-emerald-200/50 via-teal-100/40 to-blue-200/40 blur-3xl pointer-events-none -z-10 rounded-full" />

      <div className="max-w-3xl mx-auto text-center relative z-10">
        
        {/* Main Hero Card Container for Ultimate Highlight */}
        <div className="bg-white/80 backdrop-blur-md rounded-2xl sm:rounded-3xl border border-emerald-200/80 p-5 sm:p-8 shadow-xl shadow-emerald-950/5 relative overflow-hidden mb-6">
          {/* Subtle Corner Glow */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-400/10 rounded-full blur-2xl pointer-events-none" />
          
          {/* Top Highlight Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs sm:text-sm font-bold mb-4 sm:mb-6 shadow-2xs">
            <Sparkles className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>1on1 專屬諮詢事前深度診斷</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
            <Clock className="w-4 h-4 text-teal-600 shrink-0" />
            <span>建議預留 15-30 分鐘沉澱思考</span>
          </div>

          {/* Super Sized Highlighted Main Title */}
          <h1 className="font-black tracking-tight text-slate-900 mb-4 sm:mb-6 leading-[1.15] font-heading">
            <span className="text-slate-900 font-black block text-3xl sm:text-5xl md:text-6xl mb-2 sm:mb-3">
              從理財到理心
            </span>
            <span className="gradient-text-emerald text-3xl sm:text-5xl md:text-6xl drop-shadow-xs block font-black">
              建立你的專屬財務系統
            </span>
          </h1>

          {/* Subtitle with High Readability */}
          <p className="text-slate-700 text-xs sm:text-base md:text-lg leading-relaxed max-w-2xl mx-auto font-medium">
            為了讓後面諮詢能夠發揮最大效益，請預留半個小時靜靜坐下來，透過這 3 個階段深入思考，盤點你的狀況與未來生活藍圖。
          </p>
        </div>

        {/* Feature Highlight Chips */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-4 text-xs sm:text-sm font-bold">
          <div className="flex items-center gap-1.5 bg-white shadow-xs px-3.5 py-2 rounded-xl border border-slate-200 text-slate-800">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>財務狀況分析</span>
          </div>
          <div className="flex items-center gap-1.5 bg-white shadow-xs px-3.5 py-2 rounded-xl border border-slate-200 text-slate-800">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>合適投資節奏</span>
          </div>
          <div className="flex items-center gap-1.5 bg-white shadow-xs px-3.5 py-2 rounded-xl border border-slate-200 text-slate-800">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>建構理想生活</span>
          </div>
        </div>

      </div>
    </div>
  );
}
