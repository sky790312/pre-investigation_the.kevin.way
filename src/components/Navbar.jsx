import { Flame, RotateCcw } from 'lucide-react';

export default function Navbar({ onResetForm }) {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200/80 bg-white/90 backdrop-blur-md transition-all shadow-xs">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 h-14 sm:h-16 flex items-center justify-between">
        
        {/* Brand Logo Section */}
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-600 p-[1px] shadow-xs shrink-0">
            <div className="w-full h-full bg-white rounded-[11px] flex items-center justify-center">
              <Flame className="w-4 h-4 text-emerald-600" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-heading font-extrabold text-base sm:text-lg tracking-tight text-slate-900">
                The Kevin Way
              </span>
            </div>
          </div>
        </div>

        {/* Clear & Reset Form Button */}
        {onResetForm && (
          <button
            type="button"
            onClick={onResetForm}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-slate-500 hover:text-rose-600 hover:bg-rose-50 border border-slate-200 hover:border-rose-200 rounded-lg transition-all"
            title="清空目前裝置上記錄的草稿內容並重新填寫"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">清空重填</span>
            <span className="sm:hidden">重填</span>
          </button>
        )}
      </div>
    </header>
  );
}
