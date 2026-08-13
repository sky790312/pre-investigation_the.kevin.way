import React from 'react';
import { Clock, CheckCircle2, Wand2, Brain } from 'lucide-react';

export default function HeaderHero({ onLoadDemoData, isProductionView }) {
  return (
    <div className="relative overflow-hidden pt-8 pb-6 px-4 sm:px-6 mb-4">
      {/* Background Subtle Gradient Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-64 bg-gradient-to-b from-emerald-100/60 via-teal-50/40 to-transparent blur-3xl pointer-events-none -z-10" />

      <div className="max-w-3xl mx-auto text-center">
        {/* Top Badges */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-emerald-200 text-emerald-800 text-xs font-semibold mb-4 shadow-sm">
          <Brain className="w-3.5 h-3.5 text-emerald-600" />
          <span>高深度思考問問 • 僅開放認真學習者</span>
          <span className="w-1 h-1 rounded-full bg-emerald-400"></span>
          <Clock className="w-3.5 h-3.5 text-teal-600" />
          <span>預估所需時間：約 5 - 8 分鐘</span>
        </div>

        {/* Main Title */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 mb-4 leading-tight font-heading">
          打造買回人生主導權的 <br className="hidden sm:inline" />
          <span className="gradient-text-emerald">「減法理財」1on1 事前深度診斷</span>
        </h1>

        {/* Subtitle */}
        <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto mb-6">
          這不是一份隨便勾選的罐頭問卷。為了讓我們的 60 分鐘諮詢發揮 200% 的最高效益，請在會前透過這 3 個階段深思考，帶您盤點財務底層防禦力、投資摩擦力與未來生活藍圖。
        </p>

        {/* Features Checklist */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-xs text-slate-600 pt-1 font-medium">
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>財務底層防禦力診斷</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>消除投資看盤情緒摩擦力</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>拷問持股與買回生活節奏</span>
          </div>

          {/* Demo Filler Button - ONLY shown in Dev/Demo mode */}
          {!isProductionView && (
            <button
              onClick={onLoadDemoData}
              className="ml-0 sm:ml-2 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-50 hover:bg-amber-100 border border-amber-300 text-xs text-amber-800 font-bold transition-all shadow-xs"
              title="測試模式：一鍵填入範例資料"
            >
              <Wand2 className="w-3.5 h-3.5 text-amber-600" />
              <span>[測試按鈕] 填入測試資料</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
