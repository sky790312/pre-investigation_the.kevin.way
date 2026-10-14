import React from 'react';
import { ShieldCheck, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-slate-200 bg-white py-8 px-4 text-center text-xs text-slate-500">
      <div className="max-w-4xl mx-auto space-y-3">
        <div className="flex items-center justify-center gap-2 text-slate-700 font-semibold">
          {/* <Heart className="w-4 h-4 text-emerald-600" /> */}
          <span>凱文生活實驗室 · 用投資提升人生的選擇權</span>
        </div>
        <p className="max-w-xl mx-auto leading-relaxed text-slate-500">
          填答草稿會自動儲存在目前瀏覽器，可用「清空重填」移除。<br/>選擇送出諮詢申請時，填答與聯絡資料會透過 Resend 寄信服務傳送給 Kevin，用於需求確認與後續聯繫。<br/>如需詢問或申請刪除已提交的資料，請透過下方 IG 聯絡 Kevin。
        </p>
        <a href="https://www.instagram.com/the.kevin.way/" target="_blank" rel="noopener noreferrer" className="inline-block text-emerald-700 underline">聯絡 Kevin（Instagram）</a>
        <p className="text-[11px] text-slate-400">
          © {new Date().getFullYear()} The Kevin Way.
        </p>
      </div>
    </footer>
  );
}
