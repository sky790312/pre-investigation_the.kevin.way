import React from 'react';
import { ShieldCheck, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-slate-200 bg-white py-8 px-4 text-center text-xs text-slate-500">
      <div className="max-w-4xl mx-auto space-y-3">
        <div className="flex items-center justify-center gap-2 text-slate-700 font-semibold">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>The Kevin Way 1on1 理財深度事前調查系統</span>
        </div>
        <p className="max-w-xl mx-auto leading-relaxed text-slate-500">
          本問卷填答內容僅作為 1on1 諮詢會議前之狀況對接與策略規劃使用。未經您同意，絕對不會公開或透露給第三方。
        </p>
        <p className="text-[11px] text-slate-400">
          © {new Date().getFullYear()} The Kevin Way. Built with precision for meaningful life transformation.
        </p>
      </div>
    </footer>
  );
}
