import React from 'react';
import { User, Mail, MessageSquare, AlertCircle } from 'lucide-react';

export default function Step1Personal({ formData, updateFormData, errors }) {
  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="border-b border-slate-200 pb-4">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 flex items-center gap-2 font-heading">
          <User className="w-6 h-6 text-emerald-600" />
          <span>個人基本資料</span>
        </h2>
        <p className="text-sm text-slate-600 mt-1">
          請提供能聯繫到您的真實資訊，以便寄送會前準備與安排會議邀請。
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Name / Nickname */}
        <div className="space-y-1.5">
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
            姓名 / 稱呼 <span className="text-emerald-600">*</span>
          </label>
          <div className="relative">
            <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={formData.name || ''}
              onChange={(e) => updateFormData('name', e.target.value)}
              placeholder="例如：Kevin / 胡凱文"
              className={`w-full pl-10 pr-4 py-2.5 bg-white border ${
                errors?.name ? 'border-rose-500 focus:ring-rose-500' : 'border-slate-300 focus:border-emerald-600 focus:ring-emerald-500/20'
              } rounded-xl text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 transition-all shadow-xs`}
            />
          </div>
          {errors?.name && (
            <p className="text-xs text-rose-600 font-medium flex items-center gap-1 mt-1">
              <AlertCircle className="w-3.5 h-3.5" /> {errors.name}
            </p>
          )}
        </div>

        {/* Email Address */}
        <div className="space-y-1.5">
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
            常用 Email <span className="text-emerald-600">*</span>
          </label>
          <div className="relative">
            <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="email"
              value={formData.email || ''}
              onChange={(e) => updateFormData('email', e.target.value)}
              placeholder="your.email@example.com"
              className={`w-full pl-10 pr-4 py-2.5 bg-white border ${
                errors?.email ? 'border-rose-500 focus:ring-rose-500' : 'border-slate-300 focus:border-emerald-600 focus:ring-emerald-500/20'
              } rounded-xl text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 transition-all shadow-xs`}
            />
          </div>
          {errors?.email ? (
            <p className="text-xs text-rose-600 font-medium flex items-center gap-1 mt-1">
              <AlertCircle className="w-3.5 h-3.5" /> {errors.email}
            </p>
          ) : (
            <p className="text-[11px] text-slate-500">此問券報告與會前行事曆邀請將寄至此信箱</p>
          )}
        </div>

        {/* Line ID (Only) */}
        <div className="space-y-1.5 md:col-span-2">
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
            LINE ID (選填)
          </label>
          <div className="relative">
            <MessageSquare className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={formData.contactApp || ''}
              onChange={(e) => updateFormData('contactApp', e.target.value)}
              placeholder="例如：kevin_invest"
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-300 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20 rounded-xl text-slate-900 placeholder-slate-400 text-sm focus:outline-none transition-all shadow-xs"
            />
          </div>
          <p className="text-[11px] text-slate-500">方便顧問會前與您快速確認與對接訊息</p>
        </div>
      </div>
    </div>
  );
}
