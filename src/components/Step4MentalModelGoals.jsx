import React from 'react';
import { HeartHandshake, HelpCircle, Flame, Sun, Target, AlertCircle } from 'lucide-react';

export default function Step4MentalModelGoals({ formData, updateFormData, errors }) {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="border-b border-slate-200 pb-4">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 flex items-center gap-2 font-heading">
          <HeartHandshake className="w-6 h-6 text-emerald-600" />
          <span>讓投資回到你想過的生活</span>
        </h2>
        <p className="text-sm text-slate-600 mt-1">
          想想你現在的選擇，以及最想改善的一件事。不確定的地方也可以直接寫下來。
        </p>
      </div>

      {/* Q7: Soul Question - Rebuy Everything tomorrow? */}
      <div className="space-y-2 p-5 rounded-2xl bg-amber-50/60 border border-amber-200/80 shadow-xs">
        <label className="block text-sm font-bold text-amber-900 uppercase tracking-wider flex items-center gap-2">
          <Flame className="w-4 h-4 text-amber-600 shrink-0" />
          <span>Q7. 假設今天重新開始投資，你會選擇同樣的配置嗎？為什麼？（只是思考練習，不需要實際買賣） <span className="text-rose-600">*</span></span>
        </label>
        <textarea
          rows={3}
          value={formData.rebuySoulQuestionText || ''}
          onChange={(e) => updateFormData('rebuySoulQuestionText', e.target.value)}
          placeholder="例如：「大致相同，因為符合我的目標」、「不確定，有些持股已忘記當初買入的原因」。尚未投資也可以直接填寫。"
          className={`w-full p-3.5 bg-white border ${
            errors?.rebuySoulQuestionText ? 'border-rose-500' : 'border-amber-300 focus:border-amber-600'
          } rounded-xl text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 transition-all leading-relaxed shadow-xs`}
        />
        {errors?.rebuySoulQuestionText && (
          <p className="text-sm text-rose-600 font-medium flex items-center gap-1 mt-1">
            <AlertCircle className="w-3.5 h-3.5" /> {errors.rebuySoulQuestionText}
          </p>
        )}
      </div>

      {/* Q8: Desired Life Pace */}
      <div className="space-y-2">
        <label className="block text-sm font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2">
          <Sun className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>Q8. 你希望投資能配合什麼樣的生活節奏？ <span className="text-emerald-600">*</span></span>
        </label>
        <textarea
          rows={3}
          value={formData.desiredLifePaceText || ''}
          onChange={(e) => updateFormData('desiredLifePaceText', e.target.value)}
          placeholder="越具體越好：例如「晚上能安心睡覺不受美股漲跌焦慮」、「下班後能把時間完全留給陪伴孩子與個人興趣」..."
          className={`w-full p-3.5 bg-white border ${
            errors?.desiredLifePaceText ? 'border-rose-500' : 'border-slate-300 focus:border-emerald-600'
          } rounded-xl text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all leading-relaxed shadow-xs`}
        />
        {errors?.desiredLifePaceText && (
          <p className="text-sm text-rose-600 font-medium flex items-center gap-1 mt-1">
            <AlertCircle className="w-3.5 h-3.5" /> {errors.desiredLifePaceText}
          </p>
        )}
      </div>

      {/* Q9: One Absolute Pain Point */}
      <div className="space-y-2">
        <label className="block text-sm font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2">
          <Target className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>Q9. 目前關於投資與生活，你最想釐清的一個問題是什麼？ <span className="text-emerald-600">*</span></span>
        </label>
        <textarea
          rows={3}
          value={formData.absoluteOnePainPointText || ''}
          onChange={(e) => updateFormData('absoluteOnePainPointText', e.target.value)}
          placeholder="例如：「如何減少反覆查看行情？」、「我不確定現有配置與生活目標是否一致」。"
          className={`w-full p-3.5 bg-white border ${
            errors?.absoluteOnePainPointText ? 'border-rose-500' : 'border-slate-300 focus:border-emerald-600'
          } rounded-xl text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all leading-relaxed shadow-xs`}
        />
        {errors?.absoluteOnePainPointText && (
          <p className="text-sm text-rose-600 font-medium flex items-center gap-1 mt-1">
            <AlertCircle className="w-3.5 h-3.5" /> {errors.absoluteOnePainPointText}
          </p>
        )}
      </div>
    </div>
  );
}
