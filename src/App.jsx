import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import HeaderHero from './components/HeaderHero';
import StepProgress from './components/StepProgress';
import Step2FinancialFoundation from './components/Step2FinancialFoundation';
import Step3InvestmentFriction from './components/Step3InvestmentFriction';
import Step4MentalModelGoals from './components/Step4MentalModelGoals';
import Step4ContactSchedule from './components/Step4ContactSchedule';
import Step5ReviewSubmit from './components/Step5ReviewSubmit';
import Footer from './components/Footer';
import PersonaCard from './components/PersonaCard';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { initGA } from './utils/analytics';

const STORAGE_KEY = 'the_kevin_way_pre_investigation_v2';
const RECIPIENT_EMAIL = 'sky790312yks@gmail.com';

const INITIAL_FORM_DATA = {
  name: '',
  email: '',
  contactApp: '',
  timezone: '台灣/香港/新加坡 (GMT+8)',
  preferredTimeSlot: '',

  // Phase 1 (Financial Foundation)
  expenseControl: '', // Q1
  emergencyMonths: '', // Q2
  anxiousDebtsText: '', // Q3

  // Phase 2 (Investment & Friction)
  assetAllocationText: '', // Q4
  leverageAndLossText: '', // Q5
  marketAttentionHours: '', // Q6

  // Phase 3 (Mental Model & Goal)
  rebuySoulQuestionText: '', // Q7
  desiredLifePaceText: '', // Q8
  absoluteOnePainPointText: '', // Q9
};

export default function App() {
  const [currentStep, setCurrentStep] = useState(1);
  const [highestCompletedStep, setHighestCompletedStep] = useState(1);

  // Initialize GA4 if Measurement ID is present
  useEffect(() => {
    const gaMeasurementId = import.meta.env.VITE_GA_MEASUREMENT_ID || 'G-XXXXXXXXXX';
    if (gaMeasurementId && gaMeasurementId !== 'G-XXXXXXXXXX') {
      initGA(gaMeasurementId);
    }
  }, []);

  // Form State
  const [formData, setFormData] = useState(INITIAL_FORM_DATA);
  const [errors, setErrors] = useState({});

  // Load draft from localStorage on mount
  useEffect(() => {
    try {
      const savedDraft = localStorage.getItem(STORAGE_KEY);
      if (savedDraft) {
        const parsed = JSON.parse(savedDraft);
        if (parsed.formData) {
          setFormData(parsed.formData);
        }
      }
    } catch (err) {
      console.error('Failed to load draft:', err);
    }
  }, []);

  // Save draft to localStorage on change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ formData }));
    } catch (err) {
      console.error('Failed to save draft:', err);
    }
  }, [formData]);

  const updateFormData = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) {
      setErrors((prev) => ({ ...prev, [key]: null }));
    }
  };

  // Clear device storage & reset form
  const handleResetForm = () => {
    const confirmed = window.confirm('確定要清空目前填寫的所有內容並重填嗎？這將會清除此裝置上的草稿紀錄。');
    if (confirmed) {
      try {
        localStorage.removeItem(STORAGE_KEY);
      } catch (err) {
        console.error('Failed to clear storage:', err);
      }
      setFormData(INITIAL_FORM_DATA);
      setErrors({});
      setCurrentStep(1);
      setHighestCompletedStep(1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Clear storage upon successful submission
  const handleSubmitSuccess = () => {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (err) {
      console.error('Failed to clear storage after submission:', err);
    }
  };

  // Step Validation (Step 1~3: Self-assessment, Step 4: Contact & Schedule)
  const validateStep = (step) => {
    const newErrors = {};

    if (step === 1) {
      // Phase 1: 財務底層邏輯
      if (!formData.expenseControl) newErrors.expenseControl = '請選擇支出掌控狀況';
      if (formData.emergencyMonths === '' || !Number.isFinite(Number(formData.emergencyMonths)) || Number(formData.emergencyMonths) < 0 || Number(formData.emergencyMonths) > 120) {
        newErrors.emergencyMonths = '請填寫 0 到 120 之間的預備金月數';
      }
      if (!formData.anxiousDebtsText?.trim()) {
        newErrors.anxiousDebtsText = '請簡單描述債務狀況；沒有可填「無」，不確定也可以';
      }
    } else if (step === 2) {
      // Phase 2: 投資摩擦力
      if (!formData.assetAllocationText?.trim()) {
        newErrors.assetAllocationText = '請大致寫下目前的資產配置比例';
      }
      if (!formData.leverageAndLossText?.trim()) {
        newErrors.leverageAndLossText = '請描述高槓桿/頻繁盯盤經驗與虧損影響 (若無請填無)';
      }
      if (!formData.marketAttentionHours) {
        newErrors.marketAttentionHours = '請選擇平均每週關注市場的時間';
      }
    } else if (step === 3) {
      // Phase 3: 心智模型與目標
      if (!formData.rebuySoulQuestionText?.trim()) {
        newErrors.rebuySoulQuestionText = '請寫下是否會選擇同樣的配置；不確定也可以';
      }
      if (!formData.desiredLifePaceText?.trim()) {
        newErrors.desiredLifePaceText = '請具體描述您想買回的生活節奏';
      }
      if (!formData.absoluteOnePainPointText?.trim()) {
        newErrors.absoluteOnePainPointText = '請寫下目前最想釐清的一個問題';
      }
    } else if (step === 5) {
      // Phase 4: 聯絡資訊與預約時段
      if (!formData.name?.trim()) newErrors.name = '請填寫您的姓名或稱呼';
      if (!formData.email?.trim() || !formData.email.includes('@')) newErrors.email = '請填寫有效的 Email';
      if (!formData.preferredTimeSlot) newErrors.preferredTimeSlot = '請選擇偏好的諮詢時段';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Navigation Logic
  const handleNextStep = () => {
    if (validateStep(currentStep)) {
      const next = currentStep + 1;
      setCurrentStep(next);
      if (next > highestCompletedStep) {
        setHighestCompletedStep(next);
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleStepClick = (stepId) => {
    if (stepId < currentStep) {
      setCurrentStep(stepId);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-emerald-500/20 selection:text-emerald-900">
      {/* Clean Production Navbar with Clear Storage option */}
      <Navbar onResetForm={handleResetForm} />

      {/* Main Container */}
      <main className="flex-1 max-w-3xl w-full mx-auto px-3 sm:px-6 pt-2 sm:pt-4 pb-10">
        {/* Header Hero Banner */}
        <HeaderHero />

        {/* Mobile Optimized Step Progress Bar */}
        <StepProgress
          currentStep={currentStep}
          onStepClick={handleStepClick}
          highestCompletedStep={highestCompletedStep}
        />

        {/* Form Container Card */}
        <div className="glass-panel-light rounded-2xl sm:rounded-3xl p-4 sm:p-8 md:p-10 shadow-md relative border border-slate-200">
          {currentStep === 1 && (
            <Step2FinancialFoundation
              formData={formData}
              updateFormData={updateFormData}
              errors={errors}
            />
          )}

          {currentStep === 2 && (
            <Step3InvestmentFriction
              formData={formData}
              updateFormData={updateFormData}
              errors={errors}
            />
          )}

          {currentStep === 3 && (
            <Step4MentalModelGoals
              formData={formData}
              updateFormData={updateFormData}
              errors={errors}
            />
          )}

          {currentStep === 4 && (
            <section aria-labelledby="result-title" className="space-y-5">
              <h2 id="result-title" className="text-2xl font-bold">你的投資節奏觀察</h2>
              <p className="text-sm text-slate-600 leading-relaxed">檢測已完成。先看看哪些地方值得整理，再決定是否需要進一步討論。</p>
              <PersonaCard formData={formData} />
              <div className="rounded-xl bg-emerald-50 p-5 space-y-3">
                <h3 className="font-bold">想一起整理你的下一步？</h3>
                <p className="text-sm leading-relaxed">你可以選擇留下聯絡方式，提出 1 對 1 諮詢申請。送出後會再確認需求與時間；目前尚未成立預約。</p>
                <button type="button" onClick={handleNextStep} className="rounded-xl bg-emerald-700 px-5 py-3 font-bold text-white">我想了解諮詢，填寫聯絡方式</button>
              </div>
              <p className="text-sm text-slate-600">暫時不需要諮詢也沒關係，你已經可以從上方的一個小行動開始。</p>
              <a href="https://www.instagram.com/the.kevin.way/" target="_blank" rel="noopener noreferrer" className="inline-block text-emerald-700 underline">到 IG 看更多投資與生活實驗</a>
              <button type="button" onClick={handlePrevStep} className="block text-sm text-slate-600 underline">返回調整回答</button>
            </section>
          )}

          {currentStep === 5 && (
            <Step4ContactSchedule
              formData={formData}
              updateFormData={updateFormData}
              errors={errors}
            />
          )}

          {currentStep === 6 && (
            <Step5ReviewSubmit
              formData={formData}
              recipientEmail={RECIPIENT_EMAIL}
              onEditStep={(step) => setCurrentStep(step)}
              onSubmitSuccess={handleSubmitSuccess}
            />
          )}

          {/* Navigation Control Buttons */}
          {currentStep !== 4 && currentStep < 6 && (
            <div className="flex items-center justify-between border-t border-slate-200 pt-5 mt-6 sm:mt-8">
              <button
                type="button"
                onClick={handlePrevStep}
                disabled={currentStep === 1}
                className={`px-4 py-2.5 rounded-xl border font-semibold text-xs transition-all flex items-center gap-1.5 ${
                  currentStep === 1
                    ? 'border-slate-200 text-slate-300 cursor-not-allowed'
                    : 'border-slate-300 text-slate-700 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <ArrowLeft className="w-4 h-4" />
                <span>上一步</span>
              </button>

              <button
                type="button"
                onClick={handleNextStep}
                className="px-5 sm:px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md shadow-emerald-600/20 transition-all flex items-center gap-1.5 transform active:scale-95"
              >
                <span>{currentStep === 3 ? '查看我的檢測結果' : currentStep === 5 ? '確認諮詢申請' : '下一步'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </main>

      {/* Clean Footer */}
      <Footer />
    </div>
  );
}
