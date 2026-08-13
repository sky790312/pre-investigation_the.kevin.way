import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import HeaderHero from './components/HeaderHero';
import StepProgress from './components/StepProgress';
import Step1Personal from './components/Step1Personal';
import Step2FinancialFoundation from './components/Step2FinancialFoundation';
import Step3InvestmentFriction from './components/Step3InvestmentFriction';
import Step4MentalModelGoals from './components/Step4MentalModelGoals';
import Step5ReviewSubmit from './components/Step5ReviewSubmit';
import EmailConfigModal from './components/EmailConfigModal';
import Footer from './components/Footer';
import { ArrowLeft, ArrowRight } from 'lucide-react';

const STORAGE_KEY = 'the_kevin_way_pre_investigation_v2';

export default function App() {
  const [currentStep, setCurrentStep] = useState(1);
  const [highestCompletedStep, setHighestCompletedStep] = useState(1);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isDraftSaved, setIsDraftSaved] = useState(false);

  // Production Preview Mode Switch (Default true in production, or toggled via URL ?demo=true)
  const [isProductionView, setIsProductionView] = useState(() => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      if (urlParams.get('demo') === 'true') return false;
    }
    return import.meta.env.PROD; // Automatically true on Vercel deployment
  });

  // Email Config
  const [recipientEmail, setRecipientEmail] = useState('the.kevin.way@gmail.com');
  const [emailEngine, setEmailEngine] = useState('resend'); // 'resend' | 'formspree' | 'mailto'

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
        if (parsed.recipientEmail) setRecipientEmail(parsed.recipientEmail);
        if (parsed.emailEngine) setEmailEngine(parsed.emailEngine);
      }
    } catch (err) {
      console.error('Failed to load draft:', err);
    }
  }, []);

  // Save draft to localStorage on change
  useEffect(() => {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ formData, recipientEmail, emailEngine })
      );
      setIsDraftSaved(true);
      const timer = setTimeout(() => setIsDraftSaved(false), 2000);
      return () => clearTimeout(timer);
    } catch (err) {
      console.error('Failed to save draft:', err);
    }
  }, [formData, recipientEmail, emailEngine]);

  const updateFormData = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) {
      setErrors((prev) => ({ ...prev, [key]: null }));
    }
  };

  // Populate Demo Data
  const handleLoadDemoData = () => {
    setFormData({
      name: '華特 Kevin',
      email: 'kevin.investor@example.com',
      contactApp: 'Line ID: kevin_way_2026',
      timezone: '台灣/香港/新加坡 (GMT+8)',
      preferredTimeSlot: '平日晚上 (19:00 - 22:00)',

      // Q1, Q2, Q3
      expenseControl: 'exp_vague',
      emergencyMonths: '6',
      anxiousDebtsText: '有一筆 30 萬元的 5.8% 信貸，雖然每月正常還款，但心裡總覺得有一塊石頭壓著。房貸部分目前正常繳納中。',

      // Q4, Q5, Q6
      assetAllocationText: '台股個股 40% (電子與航運高波動股)、美股 ETF (VOO/QQQ) 30%、加密貨幣 15%、現金 15%。總可投資資產約 350 萬 TWD。',
      leverageAndLossText: '去年曾嘗試台指期當沖與個股期貨，兩個月內大虧過 25 萬元。這次虧損讓我極度焦慮且睡眠品質變差，意識到自己不適合頻繁盯盤與高槓桿投資，非常希望轉向不盯盤的穩健系統。',
      marketAttentionHours: 'att_frequent',

      // Q7, Q8, Q9
      rebuySoulQuestionText: '絕對不會！當初買台股個股有許多是聽信網路明牌或追高套牢的，不敢砍倉。如果明天出清重來，我會把 80% 以上直接配置在市值型 ETF 與穩健債券，不再亂碰熱門明牌股。',
      desiredLifePaceText: '希望晚上能安心睡覺不受美股漲跌影響心情。每年能帶全家人去國外滑雪度假兩週，且過程中不需要打開任何看盤軟體看盤！',
      absoluteOnePainPointText: '希望能幫我徹底診斷並重構現有的 350 萬資產配置，刪除高心力消耗的標的，建立一套不需要天天看盤、能自動運轉的「減法理財系統」。',
    });
    setErrors({});
    setHighestCompletedStep(5);
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
        newErrors.absoluteOnePainPointText = '請寫出本次 1on1 最希望能解決的一個絕對痛點';
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

  const handleResetForm = () => {
    if (window.confirm('確定要清除現有填答內容並重填嗎？')) {
      localStorage.removeItem(STORAGE_KEY);
      setFormData({
        name: '',
        email: '',
        contactApp: '',
        timezone: '台灣/香港/新加坡 (GMT+8)',
        preferredTimeSlot: '',
        expenseControl: '',
        emergencyMonths: '',
        anxiousDebtsText: '',
        assetAllocationText: '',
        leverageAndLossText: '',
        marketAttentionHours: '',
        rebuySoulQuestionText: '',
        desiredLifePaceText: '',
        absoluteOnePainPointText: '',
      });
      setCurrentStep(1);
      setHighestCompletedStep(1);
      setErrors({});
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-emerald-500/20 selection:text-emerald-900">
      {/* Navbar */}
      <Navbar
        onOpenSettings={() => setIsSettingsOpen(true)}
        onResetForm={handleResetForm}
        recipientEmail={recipientEmail}
        isDraftSaved={isDraftSaved}
        isProductionView={isProductionView}
        setIsProductionView={setIsProductionView}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 pt-4 pb-12">
        {/* Header Hero Banner */}
        <HeaderHero
          onLoadDemoData={handleLoadDemoData}
          isProductionView={isProductionView}
        />

        {/* Step Progress Bar */}
        <StepProgress
          currentStep={currentStep}
          onStepClick={handleStepClick}
          highestCompletedStep={highestCompletedStep}
        />

        {/* Form Container Card */}
        <div className="glass-panel-light rounded-3xl p-6 sm:p-8 md:p-10 shadow-lg relative border border-slate-200">
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
              recipientEmail={recipientEmail}
              emailEngine={emailEngine}
              onEditStep={(step) => setCurrentStep(step)}
              onResetForm={handleResetForm}
              isProductionView={isProductionView}
            />
          )}

          {/* Navigation Control Buttons */}
          {currentStep < 5 && (
            <div className="flex items-center justify-between border-t border-slate-200 pt-6 mt-8">
              <button
                type="button"
                onClick={handlePrevStep}
                disabled={currentStep === 1}
                className={`px-5 py-2.5 rounded-xl border font-semibold text-xs transition-all flex items-center gap-2 ${
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
                className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md shadow-emerald-600/20 transition-all flex items-center gap-2 transform active:scale-95"
              >
                <span>下一步 (Phase {currentStep + 1})</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </main>

      {/* Email Configuration Modal */}
      <EmailConfigModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        recipientEmail={recipientEmail}
        setRecipientEmail={setRecipientEmail}
        emailEngine={emailEngine}
        setEmailEngine={setEmailEngine}
      />

      {/* Footer */}
      <Footer />
    </div>
  );
}
