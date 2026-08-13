import React from 'react';
import { Clock, CheckCircle2, Brain } from 'lucide-react';

export default function HeaderHero() {
  return (
    <div className="relative overflow-hidden pt-4 pb-4 sm:pt-8 sm:pb-6 px-2 sm:px-6 mb-2 sm:mb-4">
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-2xl h-48 bg-gradient-to-b from-emerald-100/50 to-transparent blur-3xl pointer-events-none -z-10" />

      <div className="max-w-2xl mx-auto text-center">
        {/* Top Badge */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-emerald-200 text-emerald-800 text-[11px] font-semibold mb-3 shadow-xs">
          <Brain className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
          <span>會前 3 階段深思考</span>
          <span className="w-1 h-1 rounded-full bg-emerald-400"></span>
          <Clock className="w-3.5 h-3.5 text-teal-600 shrink-0" />
          <span>約 5 分鐘</span>
        </div>

        {/* Main Title - Mobile Optimized */}
        <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-slate-900 mb-2 sm:mb-3 leading-tight font-heading">
          打造買回人生主導權的 <br />
          <span className="gradient-text-emerald">「減法理財」1on1 事前深度診斷</span>
        </h1>

        {/* Subtitle - Mobile Compact */}
        <p className="text-slate-600 text-xs sm:text-sm leading-relaxed max-w-xl mx-auto mb-4">
          為讓我們的 60 分鐘諮詢發揮最大效益，請在會前透過這 3 個階段深思考，帶您盤點財務底層防禦力、投資摩擦力與未來生活藍圖。
        </p>

        {/* Features Checklist */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 text-[11px] sm:text-xs text-slate-600 font-medium">
          <div className="flex items-center gap-1 bg-white/80 px-2.5 py-1 rounded-md border border-slate-200">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            <span>財務防禦力盤點</span>
          </div>
          <div className="flex items-center gap-1 bg-white/80 px-2.5 py-1 rounded-md border border-slate-200">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            <span>消除盯盤焦慮</span>
          </div>
          <div className="flex items-center gap-1 bg-white/80 px-2.5 py-1 rounded-md border border-slate-200">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            <span>買回理想生活節奏</span>
          </div>
        </div>
      </div>
    </div>
  );
}
