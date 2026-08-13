import React, { useState } from 'react';
import { X, Mail, Server, Shield, Check, Info } from 'lucide-react';

export default function EmailConfigModal({
  isOpen,
  onClose,
  recipientEmail,
  setRecipientEmail,
  emailEngine,
  setEmailEngine,
}) {
  if (!isOpen) return null;

  const [tempEmail, setTempEmail] = useState(recipientEmail);
  const [tempEngine, setTempEngine] = useState(emailEngine);

  const handleSave = () => {
    setRecipientEmail(tempEmail);
    setEmailEngine(tempEngine);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white border border-slate-200 rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-5 relative">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 pb-3">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-emerald-100 text-emerald-700">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 font-heading">問卷發送引擎與信箱設定</h3>
              <p className="text-xs text-slate-500">調整此問券發送目標與 Serverless 引擎</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <div className="space-y-4">
          {/* Target Email */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
              問卷接收信箱 (Recipient Email)
            </label>
            <input
              type="email"
              value={tempEmail}
              onChange={(e) => setTempEmail(e.target.value)}
              placeholder="the.kevin.way@gmail.com"
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 text-sm focus:outline-none focus:border-emerald-600 focus:bg-white font-mono"
            />
          </div>

          {/* Engine Selector */}
          <div className="space-y-2">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
              發送引擎機制
            </label>

            <div className="space-y-2">
              <button
                type="button"
                onClick={() => setTempEngine('resend')}
                className={`w-full p-3 rounded-xl border text-left flex items-start justify-between transition-all ${
                  tempEngine === 'resend'
                    ? 'bg-emerald-50 border-emerald-600 text-emerald-900 ring-1 ring-emerald-500/20'
                    : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
              >
                <div>
                  <div className="text-xs font-bold flex items-center gap-1.5">
                    <Server className="w-3.5 h-3.5 text-emerald-600" />
                    <span>🏆 Vercel + Resend API (推薦首選)</span>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-1 leading-normal">
                    100% 免費 (每月 3,000 封)，不曝露 API Key，原生背景無痛發送。
                  </p>
                </div>
                {tempEngine === 'resend' && <Check className="w-4 h-4 text-emerald-600 shrink-0" />}
              </button>

              <button
                type="button"
                onClick={() => setTempEngine('formspree')}
                className={`w-full p-3 rounded-xl border text-left flex items-start justify-between transition-all ${
                  tempEngine === 'formspree'
                    ? 'bg-emerald-50 border-emerald-600 text-emerald-900 ring-1 ring-emerald-500/20'
                    : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
              >
                <div>
                  <div className="text-xs font-bold">Formspree API</div>
                  <p className="text-[11px] text-slate-500 mt-1">每月免費 50 封，需要 Formspree Form ID。</p>
                </div>
                {tempEngine === 'formspree' && <Check className="w-4 h-4 text-emerald-600 shrink-0" />}
              </button>

              <button
                type="button"
                onClick={() => setTempEngine('mailto')}
                className={`w-full p-3 rounded-xl border text-left flex items-start justify-between transition-all ${
                  tempEngine === 'mailto'
                    ? 'bg-emerald-50 border-emerald-600 text-emerald-900 ring-1 ring-emerald-500/20'
                    : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
              >
                <div>
                  <div className="text-xs font-bold">Mailto 通用傳送 (備用機制)</div>
                  <p className="text-[11px] text-slate-500 mt-1">直接喚起使用者電腦預設郵件軟體 (Gmail/Outlook) 寄出。</p>
                </div>
                {tempEngine === 'mailto' && <Check className="w-4 h-4 text-emerald-600 shrink-0" />}
              </button>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-200">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800 rounded-xl"
          >
            取消
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-xs"
          >
            儲存設定
          </button>
        </div>
      </div>
    </div>
  );
}
