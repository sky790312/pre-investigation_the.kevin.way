import React from 'react';
import { Sparkles, Shield, Clock, Flame, Zap, CheckCircle2 } from 'lucide-react';
import { EXPENSE_CONTROL_OPTIONS, MARKET_ATTENTION_OPTIONS } from '../data/questionnaireOptions';

export default function PersonaCard({ formData }) {
  // Calculate persona metrics dynamically
  const emergencyMonths = parseFloat(formData.emergencyMonths) || 0;
  const isPreciseExpense = formData.expenseControl === 'exp_precise';
  const isHighFrictionMarket = formData.marketAttentionHours === 'att_frequent' || formData.marketAttentionHours === 'att_obsessed';
  
  // Calculate Readiness Score (0 - 100)
  let score = 50;
  if (emergencyMonths >= 6) score += 20;
  else if (emergencyMonths >= 3) score += 10;
  
  if (isPreciseExpense) score += 15;
  if (!isHighFrictionMarket) score += 15;
  
  score = Math.min(95, Math.max(25, score));

  // Determine Persona Title
  let personaTitle = '潛在減法理財升級者';
  let personaDesc = '具備基礎財務觀念，正尋求擺脫高摩擦盯盤、打造自動化理財系統的關鍵轉折點。';
  let badgeColor = 'from-emerald-600 to-teal-700';

  if (emergencyMonths < 3 || formData.expenseControl === 'exp_blind') {
    personaTitle = '急需築起防禦牆的急迫學習者';
    personaDesc = '當前現金流與預備金水位較薄弱，1on1 諮詢首要任務是先止血、補齊防禦牆，防止投資波動干擾正常生活。';
    badgeColor = 'from-amber-600 to-rose-700';
  } else if (isHighFrictionMarket) {
    personaTitle = '高心力摩擦的重度盯盤者';
    personaDesc = '投資佔用了過多時間與生活精力，亟需透過 1on1 進行持股減法拷問，重新買回安心睡覺的生活節奏。';
    badgeColor = 'from-purple-600 to-blue-700';
  } else if (score >= 80) {
    personaTitle = '高防禦力的優質系統實踐者';
    personaDesc = '已有優異的底層防禦力與低摩擦心態，1on1 能幫助您將配置調整至極致自動化與高資本效率。';
    badgeColor = 'from-emerald-700 to-teal-800';
  }

  const expOptionLabel = EXPENSE_CONTROL_OPTIONS.find(o => o.id === formData.expenseControl)?.label || '未評估';
  const attOptionLabel = MARKET_ATTENTION_OPTIONS.find(o => o.id === formData.marketAttentionHours)?.label || '未評估';

  return (
    <div className="rounded-2xl p-6 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white shadow-xl relative overflow-hidden my-6 border border-slate-700">
      {/* Subtle Background Glow */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 space-y-4">
        {/* Top Header */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-700/80 pb-4">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-400">
                1on1 事前問券演算法速診
              </span>
              <h3 className="text-lg sm:text-xl font-bold font-heading text-white">
                {personaTitle}
              </h3>
            </div>
          </div>

          {/* Score Badge */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-800 border border-slate-700 text-xs font-semibold">
            <span className="text-slate-400">減法理財準備度</span>
            <span className="text-emerald-400 font-extrabold text-base">{score} / 100</span>
          </div>
        </div>

        {/* Persona Description */}
        <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
          {personaDesc}
        </p>

        {/* Dynamic Metric Chips */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
          <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700/80">
            <div className="flex items-center gap-1.5 text-[11px] text-slate-400 font-semibold mb-1">
              <Shield className="w-3.5 h-3.5 text-emerald-400" />
              <span>緊急預備金水位</span>
            </div>
            <p className="text-sm font-bold text-white">
              {emergencyMonths} 個月生活費
            </p>
          </div>

          <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700/80">
            <div className="flex items-center gap-1.5 text-[11px] text-slate-400 font-semibold mb-1">
              <Zap className="w-3.5 h-3.5 text-amber-400" />
              <span>支出掌控習慣</span>
            </div>
            <p className="text-xs font-bold text-slate-200 truncate">
              {expOptionLabel}
            </p>
          </div>

          <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700/80">
            <div className="flex items-center gap-1.5 text-[11px] text-slate-400 font-semibold mb-1">
              <Clock className="w-3.5 h-3.5 text-blue-400" />
              <span>每週看盤心力消耗</span>
            </div>
            <p className="text-xs font-bold text-slate-200 truncate">
              {attOptionLabel}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
