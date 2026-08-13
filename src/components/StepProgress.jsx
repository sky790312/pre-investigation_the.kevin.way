import React from 'react';
import { User, ShieldCheck, Compass, HeartHandshake, Send, Check } from 'lucide-react';

const STEPS = [
  { id: 1, name: '基本資料', icon: User, desc: '對接聯絡方式' },
  { id: 2, name: '財務底層', icon: ShieldCheck, desc: '防禦力與預備金' },
  { id: 3, name: '投資摩擦', icon: Compass, desc: '配置與看盤心力' },
  { id: 4, name: '心智藍圖', icon: HeartHandshake, desc: '持股拷問與生活' },
  { id: 5, name: '摘要發送', icon: Send, desc: '報告剖析與發送' },
];

export default function StepProgress({ currentStep, onStepClick, highestCompletedStep }) {
  const currentStepData = STEPS.find((s) => s.id === currentStep) || STEPS[0];
  const progressPercent = Math.min(100, Math.max(0, ((currentStep - 1) / (STEPS.length - 1)) * 100));

  return (
    <div className="max-w-3xl mx-auto px-1 sm:px-6 mb-6 sm:mb-8">
      {/* Mobile Optimized View (< sm) */}
      <div className="block sm:hidden bg-white p-3.5 rounded-2xl border border-slate-200 shadow-xs">
        <div className="flex items-center justify-between text-xs font-bold mb-2">
          <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
            Phase {currentStep} / {STEPS.length}
          </span>
          <span className="text-slate-800">{currentStepData.name}</span>
        </div>
        {/* Compact Progress Line */}
        <div className="overflow-hidden h-2 text-xs flex rounded-full bg-slate-100 border border-slate-200">
          <div
            style={{ width: `${progressPercent}%` }}
            className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-gradient-to-r from-emerald-600 to-teal-500 transition-all duration-300 ease-out"
          />
        </div>
      </div>

      {/* Desktop Full View (>= sm) */}
      <div className="hidden sm:block relative">
        <div className="overflow-hidden h-2.5 mb-6 text-xs flex rounded-full bg-slate-200 border border-slate-300/80">
          <div
            style={{ width: `${progressPercent}%` }}
            className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-gradient-to-r from-emerald-600 via-teal-500 to-blue-600 transition-all duration-500 ease-out"
          />
        </div>

        {/* Step Circles */}
        <div className="grid grid-cols-5 gap-1 text-center">
          {STEPS.map((step) => {
            const Icon = step.icon;
            const isActive = currentStep === step.id;
            const isCompleted = step.id < currentStep || highestCompletedStep >= step.id;
            const isClickable = step.id <= highestCompletedStep + 1 || step.id <= currentStep;

            return (
              <button
                key={step.id}
                disabled={!isClickable}
                onClick={() => isClickable && onStepClick(step.id)}
                className={`flex flex-col items-center group transition-all ${
                  isClickable ? 'cursor-pointer' : 'cursor-not-allowed opacity-40'
                }`}
              >
                {/* Step Circle Icon */}
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center mb-1.5 transition-all duration-300 ${
                    isActive
                      ? 'bg-gradient-to-br from-emerald-600 to-teal-700 text-white font-bold shadow-md shadow-emerald-600/30 scale-110 ring-4 ring-emerald-100'
                      : isCompleted
                      ? 'bg-white border-2 border-emerald-500 text-emerald-700 font-bold group-hover:border-emerald-600'
                      : 'bg-white border border-slate-300 text-slate-400'
                  }`}
                >
                  {isCompleted && !isActive ? (
                    <Check className="w-4 h-4 stroke-[3] text-emerald-600" />
                  ) : (
                    <Icon className="w-4 h-4" />
                  )}
                </div>

                {/* Step Text Label */}
                <span
                  className={`text-xs font-semibold transition-colors ${
                    isActive
                      ? 'text-emerald-800 font-bold'
                      : isCompleted
                      ? 'text-slate-800'
                      : 'text-slate-500'
                  }`}
                >
                  {step.name}
                </span>

                <span className="text-[10px] text-slate-500 max-w-[90px] truncate mt-0.5 font-medium">
                  {step.desc}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
