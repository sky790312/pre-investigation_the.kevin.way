import React from 'react';
import { Compass, PieChart, Activity, Clock, AlertCircle } from 'lucide-react';
import { MARKET_ATTENTION_OPTIONS } from '../data/questionnaireOptions';

export default function Step3InvestmentFriction({ formData, updateFormData, errors }) {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="border-b border-slate-200 pb-4">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-bold mb-2">
          第二階段 • 投資現況與「摩擦力」盤點 (Investment & Friction)
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 flex items-center gap-2 font-heading">
          <Compass className="w-6 h-6 text-emerald-600" />
          <span>Phase 3: 找出投資系統裡的誤區與時間浪費</span>
        </h2>
        <p className="text-sm text-slate-600 mt-1">
          設計目的：進入投資深水區，了解您的資產分佈、高風險商品歷程，以及心力與時間的消耗情況。
        </p>
      </div>

      {/* Q4: Asset Allocation Ratio */}
      <div className="space-y-2">
        <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2">
          <PieChart className="w-4 h-4 text-emerald-600" />
          <span>Q4. 請大致寫下你目前的投資資產配置比例與總規模 <span className="text-emerald-600">*</span></span>
        </label>
        <textarea
          rows={3}
          value={formData.assetAllocationText || ''}
          onChange={(e) => updateFormData('assetAllocationText', e.target.value)}
          placeholder="例如：台股 ETF 30%、美股個股 30%、加密貨幣 10%、現金/外幣 30%。 或是後續再提供。"
          className={`w-full p-3.5 bg-white border ${
            errors?.assetAllocationText ? 'border-rose-500' : 'border-slate-300 focus:border-emerald-600'
          } rounded-xl text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all leading-relaxed shadow-xs`}
        />
        {errors?.assetAllocationText && (
          <p className="text-xs text-rose-600 font-medium flex items-center gap-1 mt-1">
            <AlertCircle className="w-3.5 h-3.5" /> {errors.assetAllocationText}
          </p>
        )}
      </div>

      {/* Q5: High Leverage & Loss Mindset */}
      <div className="space-y-2">
        <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2">
          <Activity className="w-4 h-4 text-emerald-600" />
          <span>Q5. 目前的投資組合中，是否包含高槓桿、需要頻繁盯盤的商品（例如期貨/選擇權/當沖）？如果曾面臨重大虧損，這對你的投資心態產生了什麼影響？ <span className="text-emerald-600">*</span></span>
        </label>
        <textarea
          rows={3}
          value={formData.leverageAndLossText || ''}
          onChange={(e) => updateFormData('leverageAndLossText', e.target.value)}
          placeholder="例如：「完全不碰槓桿，只做現貨」、「曾做過個股期貨大虧 30 萬，導致現在看盤都很焦慮不安，希望轉向不盯盤的穩健減法配置」..."
          className={`w-full p-3.5 bg-white border ${
            errors?.leverageAndLossText ? 'border-rose-500' : 'border-slate-300 focus:border-emerald-600'
          } rounded-xl text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all leading-relaxed shadow-xs`}
        />
        {errors?.leverageAndLossText && (
          <p className="text-xs text-rose-600 font-medium flex items-center gap-1 mt-1">
            <AlertCircle className="w-3.5 h-3.5" /> {errors.leverageAndLossText}
          </p>
        )}
      </div>

      {/* Q6: Weekly Market Attention Time */}
      <div className="space-y-3">
        <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2">
          <Clock className="w-4 h-4 text-emerald-600" />
          <span>Q6. 過去一年，你平均每週花多少小時在「關注市場、看盤、聽分析或焦慮漲跌」上？ <span className="text-emerald-600">*</span></span>
        </label>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {MARKET_ATTENTION_OPTIONS.map((att) => {
            const isSelected = formData.marketAttentionHours === att.id;
            return (
              <button
                type="button"
                key={att.id}
                onClick={() => updateFormData('marketAttentionHours', att.id)}
                className={`p-4 rounded-xl text-left border transition-all ${
                  isSelected
                    ? 'bg-emerald-50 border-emerald-600 text-emerald-900 shadow-sm ring-1 ring-emerald-500/30'
                    : 'bg-white border-slate-300 text-slate-700 hover:border-slate-400 hover:bg-slate-50'
                }`}
              >
                <div className="font-bold text-xs text-slate-900 mb-1 flex items-center justify-between">
                  <span>{att.label}</span>
                  <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                    isSelected ? 'border-emerald-600 bg-emerald-600 text-white' : 'border-slate-400'
                  }`}>
                    {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                  </div>
                </div>
                <p className="text-[11px] text-slate-500 leading-normal">{att.desc}</p>
              </button>
            );
          })}
        </div>
        {errors?.marketAttentionHours && (
          <p className="text-xs text-rose-600 font-medium flex items-center gap-1 mt-1">
            <AlertCircle className="w-3.5 h-3.5" /> {errors.marketAttentionHours}
          </p>
        )}
      </div>
    </div>
  );
}
