import React from 'react';
import { UserCheck, User, Mail, MessageSquare, Clock, AlertCircle, Sparkles } from 'lucide-react';
import { PREFERRED_TIME_SLOTS } from '../data/questionnaireOptions';

export default function Step4ContactSchedule({ formData, updateFormData, errors }) {
  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="border-b border-slate-200 pb-4">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-700 text-xs font-bold mb-2 border border-emerald-200">
          <Sparkles className="w-3.5 h-3.5" />
          <span>恭喜完成前三階段自測</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 flex items-center gap-2 font-heading">
          <UserCheck className="w-6 h-6 text-emerald-600" />
          <span>第四階段：預約 1on1 諮詢對接</span>
        </h2>
        <p className="text-sm text-slate-600 mt-1">
          請提供能聯繫到您的真實資訊與偏好時段，我們將為您統整這份財務診斷報告，並安排顧問會議。
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
            <p className="text-[11px] text-slate-500">此問券診斷報告與會前行事曆邀請將寄至此信箱</p>
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

      {/* Preferred Consultation Time Slot */}
      <div className="space-y-3 pt-2">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
            <Clock className="w-4 h-4 text-emerald-600" />
            <span>偏好的諮詢時段 <span className="text-emerald-600">*</span></span>
          </label>
          <span className="text-[11px] text-slate-500">若時間尚不確定，可直接選擇「暫時還沒想好」</span>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {PREFERRED_TIME_SLOTS.map((slot) => {
            const isSelected = formData.preferredTimeSlot === slot;
            const isUndecided = slot.includes('暫時還沒想好');
            return (
              <button
                type="button"
                key={slot}
                onClick={() => updateFormData('preferredTimeSlot', slot)}
                className={`px-4 py-3 rounded-xl text-left border transition-all text-xs font-semibold flex items-center justify-between ${
                  isSelected
                    ? isUndecided
                      ? 'bg-amber-50 border-amber-500 text-amber-950 shadow-sm ring-1 ring-amber-400/40'
                      : 'bg-emerald-50 border-emerald-600 text-emerald-900 shadow-sm ring-1 ring-emerald-500/30'
                    : isUndecided
                    ? 'bg-slate-50/90 border-dashed border-slate-300 text-slate-600 hover:border-slate-400 hover:bg-slate-100/70'
                    : 'bg-white border-slate-300 text-slate-700 hover:border-slate-400 hover:bg-slate-50'
                }`}
              >
                <span>{slot}</span>
                <div className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ml-2 ${
                  isSelected
                    ? isUndecided
                      ? 'border-amber-600 bg-amber-600 text-white'
                      : 'border-emerald-600 bg-emerald-600 text-white'
                    : 'border-slate-400 bg-white'
                }`}>
                  {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                </div>
              </button>
            );
          })}
        </div>

        {formData.preferredTimeSlot?.includes('暫時還沒想好') && (
          <div className="p-3 bg-amber-50/70 border border-amber-200 rounded-xl text-xs text-amber-900 leading-relaxed">
            💡 <strong>沒問題！</strong>送出預約後，顧問會先審閱您的自測報告，並透過 LINE 或信箱與您進一步協調最合適的時間。
          </div>
        )}

        {errors?.preferredTimeSlot && (
          <p className="text-xs text-rose-600 font-medium flex items-center gap-1 mt-1">
            <AlertCircle className="w-3.5 h-3.5" /> {errors.preferredTimeSlot}
          </p>
        )}
      </div>
    </div>
  );
}
