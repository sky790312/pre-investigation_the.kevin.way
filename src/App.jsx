import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import HeaderHero from './components/HeaderHero';
import StepProgress from './components/StepProgress';
import Step1Personal from './components/Step1Personal';
import Step2FinancialFoundation from './components/Step2FinancialFoundation';
import Step3InvestmentFriction from './components/Step3InvestmentFriction';
import Step4MentalModelGoals from './components/Step4MentalModelGoals';
import Step5ReviewSubmit from './components/Step5ReviewSubmit';
import Footer from './components/Footer';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { initGA } from './utils/analytics';

const STORAGE_KEY = 'the_kevin_way_pre_investigation_v2';
const RECIPIENT_EMAIL = 'sky790312yks@gmail.com';

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
  const [formData, setFormData] = useState({
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
  });

  const [errors, setErrors] = useState({});

  // Load draft from localStorage on mount
  useEffect(() => {
    try {
      const savedDraft = localStorage.getItem(STORAGE_KEY);
      if (savedDraft) {
        const parsed = JSON.parse(savedDraft);
        if (parsed.formData) setFormData(parsed.formData);
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

  // Step Validation
  const validateStep = (step) => {
    const newErrors = {};

    if (step === 1) {
      if (!formData.name?.trim()) newErrors.name = '請填寫您的姓名或稱呼';
      if (!formData.email?.trim() || !formData.email.includes('@')) newErrors.email = '請填寫有效的 Email';
      if (!formData.preferredTimeSlot) newErrors.preferredTimeSlot = '請選擇偏好的諮詢時段';
    } else if (step === 2) {
      if (!formData.expenseControl) newErrors.expenseControl = '請選擇支出掌控狀況';
      if (!formData.emergencyMonths || parseFloat(formData.emergencyMonths) < 0) {
        newErrors.emergencyMonths = '請填寫緊急預備金維持月數';
      }
      if (!formData.anxiousDebtsText?.trim()) {
        newErrors.anxiousDebtsText = '請誠實描述您目前焦慮的債務狀況 (若無請填無)';
      }
    } else if (step === 3) {
      if (!formData.assetAllocationText?.trim()) {
        newErrors.assetAllocationText = '請大致寫下目前的資產配置比例';
      }
      if (!formData.leverageAndLossText?.trim()) {
        newErrors.leverageAndLossText = '請描述高槓桿/頻繁盯盤經驗與虧損影響 (若無請填無)';
      }
      if (!formData.marketAttentionHours) {
        newErrors.marketAttentionHours = '請選擇平均每週關注市場的時間';
      }
    } else if (step === 4) {
      if (!formData.rebuySoulQuestionText?.trim()) {
        newErrors.rebuySoulQuestionText = '請誠實回答靈魂拷問：明天重新買入會一模一樣嗎？';
      }
      if (!formData.desiredLifePaceText?.trim()) {
        newErrors.desiredLifePaceText = '請具體描述您想買回的生活節奏';
      }
      if (!formData.absoluteOnePainPointText?.trim()) {
        newErrors.absoluteOnePainPointText = '請寫出最希望能解決的一個絕對痛點';
      }
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
    if (stepId <= highestCompletedStep || stepId === currentStep - 1) {
      setCurrentStep(stepId);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      if (validateStep(currentStep)) {
        setCurrentStep(stepId);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-emerald-500/20 selection:text-emerald-900">
      {/* Clean Production Navbar */}
      <Navbar />

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

        {/* Form Container Card - Mobile Optimized Padding */}
        <div className="glass-panel-light rounded-2xl sm:rounded-3xl p-4 sm:p-8 md:p-10 shadow-md relative border border-slate-200">
          {currentStep === 1 && (
            <Step1Personal
              formData={formData}
              updateFormData={updateFormData}
              errors={errors}
            />
          )}

          {currentStep === 2 && (
            <Step2FinancialFoundation
              formData={formData}
              updateFormData={updateFormData}
              errors={errors}
            />
          )}

          {currentStep === 3 && (
            <Step3InvestmentFriction
              formData={formData}
              updateFormData={updateFormData}
              errors={errors}
            />
          )}

          {currentStep === 4 && (
            <Step4MentalModelGoals
              formData={formData}
              updateFormData={updateFormData}
              errors={errors}
            />
          )}

          {currentStep === 5 && (
            <Step5ReviewSubmit
              formData={formData}
              recipientEmail={RECIPIENT_EMAIL}
              onEditStep={(step) => setCurrentStep(step)}
            />
          )}

          {/* Navigation Control Buttons */}
          {currentStep < 5 && (
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
                <span>下一步</span>
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
