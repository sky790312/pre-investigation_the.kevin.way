import React, { useState } from 'react';
import { Send, CheckCircle2, RefreshCw, FileText, Lock, MessageCircle, ExternalLink, AlertTriangle, Mail } from 'lucide-react';
import confetti from 'canvas-confetti';

import { EXPENSE_CONTROL_OPTIONS, MARKET_ATTENTION_OPTIONS } from '../data/questionnaireOptions';
import { trackEvent } from '../utils/analytics';

export default function Step5ReviewSubmit({
  formData,
  recipientEmail = 'sky790312yks@gmail.com',
  onEditStep,
  onSubmitSuccess,
}) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' | 'error' | null
  const [statusMessage, setSubmitMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const lineOfficialUrl = import.meta.env.VITE_LINE_OFFICIAL_URL || 'https://line.me';

  const expOptionLabel = EXPENSE_CONTROL_OPTIONS.find(o => o.id === formData.expenseControl)?.label || '未選擇';
  const attOptionLabel = MARKET_ATTENTION_OPTIONS.find(o => o.id === formData.marketAttentionHours)?.label || '未選擇';

  // Format report markdown
  const generateReportMarkdown = () => {
    return `# 【The Kevin Way】建立你的專屬財務系統

## 🛡️ 第一階段：生活與財務的底層邏輯 (Financial Foundation)
- **Q1. 每月必要與無意識支出掌控度**：
  ${expOptionLabel}
- **Q2. 緊急預備金水位（純現金）**：
  ${formData.emergencyMonths || '0'} 個月生活費
- **Q3. 讓人感到焦慮的債務狀況**：
  ${formData.anxiousDebtsText || '無描述'}

---

## 🧭 第二階段：投資現況與「摩擦力」盤點 (Investment & Friction)
- **Q4. 當前投資資產配置比例與規模**：
  ${formData.assetAllocationText || '無描述'}
- **Q5. 高槓桿商品/頻繁盯盤經驗與重大虧損影響**：
  ${formData.leverageAndLossText || '無描述'}
- **Q6. 每週花在看盤關注市場與焦慮的時間**：
  ${attOptionLabel}

---

## 🧠 第三階段：心智模型與未來藍圖 (Mental Model & Goal)
- **Q7. 【靈魂拷問】若明天出清重買，會一模一樣嗎？**：
  ${formData.rebuySoulQuestionText || '無描述'}
- **Q8. 希望能幫你買回的生活節奏**：
  ${formData.desiredLifePaceText || '無描述'}
- **Q9. 本次諮詢最想解決的「一個絕對痛點」**：
  ${formData.absoluteOnePainPointText || '無描述'}

---

## 📋 第四階段：諮詢預約與個人基本資料 (Contact & Schedule)
- **姓名 / 稱呼**：${formData.name || '未填寫'}
- **Email**：${formData.email || '未填寫'}
- **LINE ID**：${formData.contactApp || '未提供'}
- **偏好諮詢時段**：${formData.preferredTimeSlot || '未選擇'}

---
*填寫時間：${new Date().toLocaleString('zh-TW')}*
`;
  };

  const triggerConfetti = () => {
    confetti({
      particleCount: 120,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#059669', '#10b981', '#3b82f6', '#f59e0b'],
    });
  };

  const handleMailtoFallback = () => {
    const reportContent = generateReportMarkdown();
    const mailtoSubject = encodeURIComponent(`【The Kevin Way】${formData.name} 的事前調查報告`);
    const mailtoBody = encodeURIComponent(reportContent);
    window.location.href = `mailto:sky790312yks@gmail.com?subject=${mailtoSubject}&body=${mailtoBody}`;
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setSubmitStatus(null);
    setSubmitMessage('');
    setErrorMessage('');

    const reportContent = generateReportMarkdown();

    try {
      // Vercel Serverless Resend API Route (/api/send)
      const response = await fetch('/api/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          recipientEmail: 'sky790312yks@gmail.com',
          userEmail: formData.email,
          userName: formData.name,
          reportMarkdown: reportContent,
          formData: formData,
        }),
      });

      const resData = await response.json();

      if (response.ok && resData.success) {
        setSubmitStatus('success');
        setSubmitMessage('已收到你的諮詢申請。Kevin 會再聯繫你確認需求與時間；目前尚未成立預約。');
        triggerConfetti();
        trackEvent('submit_questionnaire', {});
        if (typeof onSubmitSuccess === 'function') {
          onSubmitSuccess();
        }
      } else {
        throw new Error(resData.error || resData.details?.message || 'Email 發送失敗');
      }
    } catch (err) {
      console.error('Submission error:', err);
      setSubmitStatus('error');
      setErrorMessage(err.message || '自動發送服務暫時無法回應。');
      trackEvent('submit_questionnaire_error', { error_type: 'submission_failed' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="border-b border-slate-200 pb-3">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 flex items-center gap-2 font-heading">
          <Send className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-600" />
          <span>確認並送出諮詢申請</span>
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 mt-1">
          請確認回答與聯絡方式。只有按下送出後，這些內容才會寄給 Kevin，供後續聯繫與討論使用。
        </p>
      </div>


      {/* Structured Review List */}
      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 sm:p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-200 pb-2.5">
          <span className="font-bold text-slate-900 text-xs sm:text-sm flex items-center gap-1.5">
            <FileText className="w-4 h-4 text-emerald-600" />
            <span>摘要</span>
          </span>
        </div>

        {/* Phase 1 Summary */}
        <div className="space-y-1.5 bg-white p-3.5 rounded-xl border border-slate-200">
          <div className="flex items-center justify-between">
            <h4 className="text-[11px] font-bold text-emerald-800 uppercase tracking-wider">Phase 1: 財務底層邏輯</h4>
            <button onClick={() => onEditStep(1)} className="text-xs text-emerald-700 hover:underline font-semibold">修改</button>
          </div>
          <div className="text-xs text-slate-700 space-y-1">
            <div><span className="text-slate-400">Q1. 支出掌控:</span> {expOptionLabel}</div>
            <div><span className="text-slate-400">Q2. 緊急預備金:</span> <span className="font-bold text-emerald-800">{formData.emergencyMonths} 個月生活費</span></div>
            <div><span className="text-slate-400">Q3. 焦慮債務描述:</span> <p className="text-slate-800 font-medium mt-0.5 bg-slate-50 p-2 rounded">{formData.anxiousDebtsText}</p></div>
          </div>
        </div>

        {/* Phase 2 Summary */}
        <div className="space-y-1.5 bg-white p-3.5 rounded-xl border border-slate-200">
          <div className="flex items-center justify-between">
            <h4 className="text-[11px] font-bold text-emerald-800 uppercase tracking-wider">Phase 2: 投資現況與摩擦力</h4>
            <button onClick={() => onEditStep(2)} className="text-xs text-emerald-700 hover:underline font-semibold">修改</button>
          </div>
          <div className="text-xs text-slate-700 space-y-1">
            <div><span className="text-slate-400">Q4. 配置比例:</span> <p className="text-slate-800 font-medium mt-0.5 bg-slate-50 p-2 rounded">{formData.assetAllocationText}</p></div>
            <div><span className="text-slate-400">Q5. 槓桿與虧損影響:</span> <p className="text-slate-800 font-medium mt-0.5 bg-slate-50 p-2 rounded">{formData.leverageAndLossText}</p></div>
            <div><span className="text-slate-400">Q6. 每週看盤耗時:</span> {attOptionLabel}</div>
          </div>
        </div>

        {/* Phase 3 Summary */}
        <div className="space-y-1.5 bg-white p-3.5 rounded-xl border border-slate-200">
          <div className="flex items-center justify-between">
            <h4 className="text-[11px] font-bold text-amber-800 uppercase tracking-wider">Phase 3: 心智模型與未來藍圖</h4>
            <button onClick={() => onEditStep(3)} className="text-xs text-emerald-700 hover:underline font-semibold">修改</button>
          </div>
          <div className="text-xs text-slate-700 space-y-1">
            <div><span className="text-slate-400">Q7. 重新選擇配置:</span> <p className="text-slate-800 font-medium mt-0.5 bg-amber-50/60 p-2 rounded text-amber-950 font-semibold">{formData.rebuySoulQuestionText}</p></div>
            <div><span className="text-slate-400">Q8. 想買回的生活節奏:</span> <p className="text-slate-800 font-medium mt-0.5 bg-slate-50 p-2 rounded">{formData.desiredLifePaceText}</p></div>
            <div><span className="text-slate-400">Q9. 諮詢最想解決的痛點:</span> <p className="text-slate-800 font-medium mt-0.5 bg-slate-50 p-2 rounded">{formData.absoluteOnePainPointText}</p></div>
          </div>
        </div>

        {/* Phase 4 Summary */}
        <div className="space-y-1.5 bg-white p-3.5 rounded-xl border border-slate-200">
          <div className="flex items-center justify-between">
            <h4 className="text-[11px] font-bold text-emerald-800 uppercase tracking-wider">Phase 4: 個人基本資料與諮詢時段</h4>
            <button onClick={() => onEditStep(5)} className="text-xs text-emerald-700 hover:underline font-semibold">修改</button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs text-slate-700">
            <div><span className="text-slate-400">姓名:</span> {formData.name}</div>
            <div><span className="text-slate-400">Email:</span> {formData.email}</div>
            <div><span className="text-slate-400">LINE ID:</span> {formData.contactApp || '未提供'}</div>
            <div className="sm:col-span-2"><span className="text-slate-400">偏好時段:</span> <span className="font-bold text-slate-900">{formData.preferredTimeSlot}</span></div>
          </div>
        </div>
      </div>

      {/* Error State */}
      {submitStatus === 'error' && (
        <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-900 space-y-3">
          <div className="flex items-start gap-2.5">
            <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold text-sm">自動發送失敗提示</h4>
              <p className="text-xs text-rose-700 mt-0.5">{errorMessage}</p>
            </div>
          </div>
          <div className="pt-2 border-t border-rose-200/80 flex flex-wrap gap-2">
            <button
              onClick={handleMailtoFallback}
              className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs rounded-lg transition-all flex items-center gap-1.5"
            >
              <Mail className="w-4 h-4" />
              <span>改用本地信箱 App 開啟並傳送</span>
            </button>
            <button
              onClick={handleSubmit}
              className="px-4 py-2 bg-white border border-rose-300 hover:bg-rose-100 text-rose-900 font-bold text-xs rounded-lg transition-all"
            >
              再試一次
            </button>
          </div>
        </div>
      )}

      {/* Submit Action */}
      {submitStatus === 'success' ? (
        <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-300 text-center space-y-5 shadow-sm">
          <div className="w-12 h-12 rounded-full bg-emerald-600 text-white flex items-center justify-center mx-auto shadow-md">
            <CheckCircle2 className="w-7 h-7" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-emerald-950 font-heading">諮詢申請已送出</h3>
            <p className="text-xs sm:text-sm text-emerald-800 mt-1">{statusMessage}</p>
          </div>

          {/* LINE Official CTA Box */}
          <div className="bg-white p-5 rounded-2xl border border-emerald-200 text-left space-y-3 shadow-xs">
            <div className="flex items-center gap-2 text-emerald-900 font-bold text-sm">
              <MessageCircle className="w-5 h-5 text-emerald-600 shrink-0" />
              <span>想用 LINE 聯絡？可選擇加入官方帳號</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              你的申請已送出，不需重複填寫。如果偏好 LINE 聯絡，可以加入官方帳號並告知稱呼，方便核對申請。
            </p>
            <a
              href={lineOfficialUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 px-4 bg-[#00B900] hover:bg-[#009900] text-white font-extrabold text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2 transform active:scale-[0.99]"
            >
              <MessageCircle className="w-5 h-5 fill-current" />
              <span>加入 LINE 官方帳號</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      ) : (
        <div className="space-y-3">
          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="w-full py-4 px-6 bg-gradient-to-r from-emerald-600 via-teal-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700 text-white font-extrabold text-base rounded-2xl shadow-md shadow-emerald-600/20 hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2 transform active:scale-[0.99] disabled:opacity-50"
          >
            {isSubmitting ? (
              <>
                <RefreshCw className="w-5 h-5 animate-spin" />
                <span>正在送出申請...</span>
              </>
            ) : (
              <>
                <Send className="w-5 h-5" />
                <span>送出諮詢申請</span>
              </>
            )}
          </button>

          <div className="flex items-center justify-center gap-1.5 text-xs text-slate-500">
            <Lock className="w-3.5 h-3.5 text-emerald-600" />
            <span>送出後，填答與聯絡資料將透過寄信服務傳送給 Kevin。</span>
          </div>
        </div>
      )}
    </div>
  );
}
