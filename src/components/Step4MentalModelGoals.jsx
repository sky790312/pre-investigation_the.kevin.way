import React from 'react';
import { HeartHandshake, HelpCircle, Flame, Sun, Target, AlertCircle } from 'lucide-react';

export default function Step4MentalModelGoals({ formData, updateFormData, errors }) {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="border-b border-slate-200 pb-4">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-bold mb-2">
          第三階段 • 心智模型與未來藍圖 (Mental Model & Goal)
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 flex items-center gap-2 font-heading">
          <HeartHandshake className="w-6 h-6 text-emerald-600" />
          <span>Phase 4: 把焦點從「錢」拉回「生活」的核心價值</span>
        </h2>
        <p className="text-sm text-slate-600 mt-1">
          設計目的：引導您深刻審視現有持股決策，並具體繪製您希望透過減法理財買回的理想生活節奏。
        </p>
      </div>

      {/* Q7: Soul Question - Rebuy Everything tomorrow? */}
      <div className="space-y-2 p-5 rounded-2xl bg-amber-50/60 border border-amber-200/80 shadow-xs">
        <label className="block text-xs font-bold text-amber-900 uppercase tracking-wider flex items-center gap-2">
          <Flame className="w-4 h-4 text-amber-600 shrink-0" />
          <span>Q7. 【靈魂拷問】如果你現在要把所有的投資資產全部賣掉，明天重新買入，你會跟今天買的一模一樣嗎？如果不會，為什麼？ <span className="text-rose-600">*</span></span>
        </label>
        <textarea
          rows={3}
          value={formData.rebuySoulQuestionText || ''}
          onChange={(e) => updateFormData('rebuySoulQuestionText', e.target.value)}
          placeholder="請誠實思考：例如「絕對不會，當初買了某些炒作個股現在套牢不敢賣，重新來過我會全換成市值型 ETF」..."
          className={`w-full p-3.5 bg-white border ${
            errors?.rebuySoulQuestionText ? 'border-rose-500' : 'border-amber-300 focus:border-amber-600'
          } rounded-xl text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 transition-all leading-relaxed shadow-xs`}
        />
        {errors?.rebuySoulQuestionText && (
          <p className="text-xs text-rose-600 font-medium flex items-center gap-1 mt-1">
            <AlertCircle className="w-3.5 h-3.5" /> {errors.rebuySoulQuestionText}
          </p>
        )}
      </div>

      {/* Q8: Desired Life Pace */}
      <div className="space-y-2">
        <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2">
          <Sun className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>Q8. 你希望這套未來的「減法理財系統」，最終能幫你買回什麼樣的生活節奏？ <span className="text-emerald-600">*</span></span>
        </label>
        <textarea
          rows={3}
          value={formData.desiredLifePaceText || ''}
          onChange={(e) => updateFormData('desiredLifePaceText', e.target.value)}
          placeholder="越具體越好：例如「晚上能安心睡覺不受美股漲跌焦慮」、「每年能帶家人去國外滑雪兩週且不用看盤盯盤」、「下班後能把時間完全留給陪伴孩子與個人興趣」..."
          className={`w-full p-3.5 bg-white border ${
            errors?.desiredLifePaceText ? 'border-rose-500' : 'border-slate-300 focus:border-emerald-600'
          } rounded-xl text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all leading-relaxed shadow-xs`}
        />
        {errors?.desiredLifePaceText && (
          <p className="text-xs text-rose-600 font-medium flex items-center gap-1 mt-1">
            <AlertCircle className="w-3.5 h-3.5" /> {errors.desiredLifePaceText}
          </p>
        )}
      </div>

      {/* Q9: One Absolute Pain Point */}
      <div className="space-y-2">
        <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2">
          <Target className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>Q9. 在即將到來的 1on1 諮詢中，你最希望能解決的「一個絕對痛點」是什麼？ <span className="text-emerald-600">*</span></span>
        </label>
        <textarea
          rows={3}
          value={formData.absoluteOnePainPointText || ''}
          onChange={(e) => updateFormData('absoluteOnePainPointText', e.target.value)}
          placeholder="請明確寫出：例如「幫我診斷現有持股並建立明確的停損機制」、「幫我打造一份不需要每天看盤的資產配置藍圖」..."
          className={`w-full p-3.5 bg-white border ${
            errors?.absoluteOnePainPointText ? 'border-rose-500' : 'border-slate-300 focus:border-emerald-600'
          } rounded-xl text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all leading-relaxed shadow-xs`}
        />
        {errors?.absoluteOnePainPointText && (
          <p className="text-xs text-rose-600 font-medium flex items-center gap-1 mt-1">
            <AlertCircle className="w-3.5 h-3.5" /> {errors.absoluteOnePainPointText}
          </p>
        )}
      </div>
    </div>
  );
}
