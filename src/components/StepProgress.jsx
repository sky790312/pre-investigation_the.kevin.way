import React from 'react';
import { User, ShieldCheck, Compass, HeartHandshake, Send, Check } from 'lucide-react';

const STEPS = [
  { id: 1, name: '基本資料', icon: User, desc: '聯絡方式與諮詢時段' },
  { id: 2, name: '財務底層', icon: ShieldCheck, desc: '支出掌控與防禦預備金' },
  { id: 3, name: '投資摩擦', icon: Compass, desc: '資產配置與看盤情緒' },
  { id: 4, name: '心智藍圖', icon: HeartHandshake, desc: '持股拷問與減法生活' },
  { id: 5, name: '摘要發送', icon: Send, desc: '報告剖析與發送 Email' },
];

export default function StepProgress({ currentStep, onStepClick, highestCompletedStep }) {
  const progressPercent = Math.min(100, Math.max(0, ((currentStep - 1) / (STEPS.length - 1)) * 100));

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 mb-8">
      {/* Progress Bar Line Background */}
      <div className="relative">
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
                  className={`w-9 h-9 sm:w-11 sm:h-11 rounded-xl flex items-center justify-center mb-1.5 transition-all duration-300 ${
                    isActive
                      ? 'bg-gradient-to-br from-emerald-600 to-teal-700 text-white font-bold shadow-md shadow-emerald-600/30 scale-110 ring-4 ring-emerald-100'
                      : isCompleted
                      ? 'bg-white border-2 border-emerald-500 text-emerald-700 font-bold group-hover:border-emerald-600'
                      : 'bg-white border border-slate-300 text-slate-400'
                  }`}
                >
                  {isCompleted && !isActive ? (
                    <Check className="w-4 h-4 sm:w-5 sm:h-5 stroke-[3] text-emerald-600" />
                  ) : (
                    <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
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
                  <span className="hidden sm:inline">Phase {step.id}: </span>
                  {step.name}
                </span>

                <span className="text-[10px] text-slate-500 hidden md:block max-w-[100px] truncate mt-0.5 font-medium">
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
