import React from 'react';
import { Sparkles, Settings, RotateCcw, Mail, Eye, EyeOff } from 'lucide-react';

export default function Navbar({
  onOpenSettings,
  onResetForm,
  recipientEmail,
  isDraftSaved,
  isProductionView,
  setIsProductionView,
}) {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200/80 bg-white/90 backdrop-blur-md transition-all shadow-xs">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        
        {/* Logo Section */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 via-teal-600 to-blue-600 p-[1px] shadow-sm">
            <div className="w-full h-full bg-white rounded-[11px] flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-emerald-600" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-heading font-extrabold text-lg tracking-tight text-slate-900">
                The Kevin Way
              </span>
              <span className="px-2.5 py-0.5 text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200 rounded-full">
                1on1 減法理財深度問券
              </span>
            </div>
            <p className="text-xs text-slate-500 hidden sm:block">理財底層邏輯與心智模型盤點系統</p>
          </div>
        </div>

        {/* Right Tools */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* Toggle Production View Switch (Kevin's preview toggle) */}
          <button
            onClick={() => setIsProductionView(!isProductionView)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all flex items-center gap-1.5 ${
              isProductionView
                ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                : 'bg-amber-50 text-amber-800 border-amber-300 hover:bg-amber-100'
            }`}
            title="切換「正式學員視角」或「測試管理者視角」"
          >
            {isProductionView ? (
              <>
                <Eye className="w-3.5 h-3.5 text-emerald-400" />
                <span>正式台學員畫面</span>
              </>
            ) : (
              <>
                <EyeOff className="w-3.5 h-3.5 text-amber-600" />
                <span>測試台模式 (帶工具)</span>
              </>
            )}
          </button>

          {/* Dev/Demo tools - Only shown when NOT in production view */}
          {!isProductionView && (
            <>
              {/* Draft Saved Status */}
              {isDraftSaved && (
                <div className="hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-50 border border-emerald-200 text-xs text-emerald-700 font-medium">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  草稿自動儲存
                </div>
              )}

              {/* Email Recipient Indicator */}
              <button
                onClick={onOpenSettings}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-200 rounded-xl transition-all"
                title="設定問券接收信箱或發送引擎"
              >
                <Mail className="w-3.5 h-3.5 text-emerald-600" />
                <span className="hidden sm:inline text-slate-500">收件:</span>
                <span className="text-emerald-700 font-mono max-w-[100px] truncate">{recipientEmail}</span>
                <Settings className="w-3.5 h-3.5 text-slate-400 ml-0.5" />
              </button>

              {/* Reset Form */}
              <button
                onClick={onResetForm}
                className="p-2 text-slate-500 hover:text-rose-600 hover:bg-rose-50 rounded-xl border border-transparent hover:border-rose-200 transition-all"
                title="重填問卷"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
