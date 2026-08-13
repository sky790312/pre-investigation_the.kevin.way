import React from 'react';
import { User, Mail, MessageSquare, Clock, Globe2, AlertCircle } from 'lucide-react';
import { PREFERRED_TIME_SLOTS } from '../data/questionnaireOptions';

export default function Step1Personal({ formData, updateFormData, errors }) {
  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="border-b border-slate-200 pb-4">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 flex items-center gap-2 font-heading">
          <User className="w-6 h-6 text-emerald-600" />
          <span>Phase 1: 個人基本資料與諮詢對接</span>
        </h2>
        <p className="text-sm text-slate-600 mt-1">
          請提供顧問能聯繫到您的真實資訊，以便寄送會前準備備忘錄與安排 1on1 會議邀請。
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
              placeholder="例如：華特 Kevin / 華先生"
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

        {/* Line ID or Phone */}
        <div className="space-y-1.5">
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
            Line ID 或 手機號碼 (選填)
          </label>
          <div className="relative">
            <MessageSquare className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={formData.contactApp || ''}
              onChange={(e) => updateFormData('contactApp', e.target.value)}
              placeholder="例如：Line ID: kevin_invest / 0912-345-678"
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-300 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20 rounded-xl text-slate-900 placeholder-slate-400 text-sm focus:outline-none transition-all shadow-xs"
            />
          </div>
          <p className="text-[11px] text-slate-500">僅用於會前時間調整聯繫，絕發送任何推銷簡訊</p>
        </div>

        {/* Timezone / Residence */}
        <div className="space-y-1.5">
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
            居住地與時區
          </label>
          <div className="relative">
            <Globe2 className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <select
              value={formData.timezone || '台灣/香港/新加坡 (GMT+8)'}
              onChange={(e) => updateFormData('timezone', e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-300 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20 rounded-xl text-slate-900 text-sm focus:outline-none transition-all appearance-none cursor-pointer shadow-xs"
            >
              <option value="台灣/香港/新加坡 (GMT+8)">台灣 / 香港 / 新加坡 (GMT+8)</option>
              <option value="日本/韓國 (GMT+9)">日本 / 韓國 (GMT+9)</option>
              <option value="北美東岸 EST (GMT-5)">北美東岸 EST (如紐約/多倫多)</option>
              <option value="北美西岸 PST (GMT-8)">北美西岸 PST (如舊金山/溫哥華)</option>
              <option value="歐洲 CET/GMT">歐洲時間 (如倫敦/巴黎)</option>
              <option value="其他區域">其他區域 (會前信件對對時間)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Preferred Consultation Time Slot */}
      <div className="space-y-3 pt-2">
        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
          <Clock className="w-4 h-4 text-emerald-600" />
          <span>偏好的 1on1 會議諮詢時段 <span className="text-emerald-600">*</span></span>
        </label>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {PREFERRED_TIME_SLOTS.map((slot) => {
            const isSelected = formData.preferredTimeSlot === slot;
            return (
              <button
                type="button"
                key={slot}
                onClick={() => updateFormData('preferredTimeSlot', slot)}
                className={`px-4 py-3 rounded-xl text-left border transition-all text-xs font-semibold flex items-center justify-between ${
                  isSelected
                    ? 'bg-emerald-50 border-emerald-600 text-emerald-900 shadow-sm ring-1 ring-emerald-500/30'
                    : 'bg-white border-slate-300 text-slate-700 hover:border-slate-400 hover:bg-slate-50'
                }`}
              >
                <span>{slot}</span>
                <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                  isSelected ? 'border-emerald-600 bg-emerald-600 text-white' : 'border-slate-400 bg-white'
                }`}>
                  {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                </div>
              </button>
            );
          })}
        </div>
        {errors?.preferredTimeSlot && (
          <p className="text-xs text-rose-600 font-medium flex items-center gap-1 mt-1">
            <AlertCircle className="w-3.5 h-3.5" /> {errors.preferredTimeSlot}
          </p>
        )}
      </div>
    </div>
  );
}
