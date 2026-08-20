import React from 'react';
import { ShieldCheck, PieChart, DollarSign, AlertCircle, FileText, AlertTriangle } from 'lucide-react';
import { EXPENSE_CONTROL_OPTIONS } from '../data/questionnaireOptions';

export default function Step2FinancialFoundation({ formData, updateFormData, errors }) {
  return (
    <div className="space-y-8">
      {/* Step Header */}
      <div className="border-b border-slate-200 pb-4">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 flex items-center gap-2 font-heading">
          <ShieldCheck className="w-6 h-6 text-emerald-600" />
          <span>盤點財務防禦力與現金流漏洞</span>
        </h2>
        <p className="text-sm text-slate-600 mt-1">
          設計目的：確認您是否有足夠的理財「防禦力」，防止現金流失控導致投資心理崩盤。
        </p>
      </div>

      {/* Q1: Expense Control */}
      <div className="space-y-3">
        <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2">
          <PieChart className="w-4 h-4 text-emerald-600" />
          <span>Q1. 你清楚自己每個月的「絕對必要支出」與「無意識支出」大約是多少嗎？ <span className="text-emerald-600">*</span></span>
        </label>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {EXPENSE_CONTROL_OPTIONS.map((item) => {
            const isSelected = formData.expenseControl === item.id;
            return (
              <button
                type="button"
                key={item.id}
                onClick={() => updateFormData('expenseControl', item.id)}
                className={`p-4 rounded-xl text-left border transition-all flex flex-col justify-between ${
                  isSelected
                    ? 'bg-emerald-50 border-emerald-600 text-emerald-900 shadow-sm ring-1 ring-emerald-500/30'
                    : 'bg-white border-slate-300 text-slate-700 hover:border-slate-400 hover:bg-slate-50'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                      {item.tag}
                    </span>
                    <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                      isSelected ? 'border-emerald-600 bg-emerald-600 text-white' : 'border-slate-400'
                    }`}>
                      {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                    </div>
                  </div>
                  <p className="text-xs font-semibold leading-relaxed text-slate-800">{item.label}</p>
                </div>
              </button>
            );
          })}
        </div>
        {errors?.expenseControl && (
          <p className="text-xs text-rose-600 font-medium flex items-center gap-1 mt-1">
            <AlertCircle className="w-3.5 h-3.5" /> {errors.expenseControl}
          </p>
        )}
      </div>

      {/* Q2: Emergency Fund Months */}
      <div className="space-y-3 p-5 rounded-2xl bg-white border border-slate-200 shadow-xs">
        <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2">
          <DollarSign className="w-4 h-4 text-emerald-600" />
          <span>Q2. 如果明天突然失去所有主動收入，你手邊的緊急預備金（純現金）能讓你維持目前的生活水準多久？ <span className="text-emerald-600">*</span></span>
        </label>
        
        <div className="flex items-center gap-3 max-w-xs">
          <div className="relative flex-1">
            <input
              type="number"
              min="0"
              max="120"
              step="0.5"
              value={formData.emergencyMonths || ''}
              onChange={(e) => updateFormData('emergencyMonths', e.target.value)}
              placeholder="請填寫月數 (例如: 6)"
              className={`w-full px-4 py-2.5 bg-slate-50 border ${
                errors?.emergencyMonths ? 'border-rose-500' : 'border-slate-300 focus:border-emerald-600'
              } rounded-xl text-slate-900 font-bold text-sm focus:outline-none focus:bg-white transition-all`}
            />
          </div>
          <span className="text-sm font-bold text-slate-800">個月</span>
        </div>
        
        {errors?.emergencyMonths ? (
          <p className="text-xs text-rose-600 font-medium flex items-center gap-1 mt-1">
            <AlertCircle className="w-3.5 h-3.5" /> {errors.emergencyMonths}
          </p>
        ) : (
          <p className="text-[11px] text-slate-500">建議防禦水位通常為 3 - 6 個月以上的純流動現金或活存。</p>
        )}
      </div>

      {/* Q3: Debt & Anxiety */}
      <div className="space-y-2">
        <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-emerald-600" />
          <span>Q3. 在你目前的資產淨值中，有沒有哪些債務是讓你感到焦慮的？ (例如：高利率信貸、未償還的卡費、車貸、親友借款) <span className="text-emerald-600">*</span></span>
        </label>
        <textarea
          rows={3}
          value={formData.anxiousDebtsText || ''}
          onChange={(e) => updateFormData('anxiousDebtsText', e.target.value)}
          placeholder="請誠實描述：例如「有一筆 50 萬的 6% 信貸讓我每月還款壓力很大」、「沒有高利債務，只有房貸與一般信用卡每月繳清」..."
          className={`w-full p-3.5 bg-white border ${
            errors?.anxiousDebtsText ? 'border-rose-500 focus:ring-rose-500' : 'border-slate-300 focus:border-emerald-600'
          } rounded-xl text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all leading-relaxed shadow-xs`}
        />
        {errors?.anxiousDebtsText && (
          <p className="text-xs text-rose-600 font-medium flex items-center gap-1 mt-1">
            <AlertCircle className="w-3.5 h-3.5" /> {errors.anxiousDebtsText}
          </p>
        )}
      </div>
    </div>
  );
}
