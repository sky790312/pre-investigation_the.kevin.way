import React, { useState } from 'react';
import { Send, Copy, Download, CheckCircle2, AlertCircle, Sparkles, RefreshCw, Mail, FileText, Lock } from 'lucide-react';
import confetti from 'canvas-confetti';
import PersonaCard from './PersonaCard';
import { EXPENSE_CONTROL_OPTIONS, MARKET_ATTENTION_OPTIONS } from '../data/questionnaireOptions';

export default function Step5ReviewSubmit({
  formData,
  recipientEmail,
  emailEngine,
  onEditStep,
  onResetForm,
}) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' | 'error' | null
  const [statusMessage, setSubmitMessage] = useState('');
  const [copiedMarkdown, setCopiedMarkdown] = useState(false);

  // Format full structured report markdown
  const expOptionLabel = EXPENSE_CONTROL_OPTIONS.find(o => o.id === formData.expenseControl)?.label || '未選擇';
  const attOptionLabel = MARKET_ATTENTION_OPTIONS.find(o => o.id === formData.marketAttentionHours)?.label || '未選擇';

  const generateReportMarkdown = () => {
    return `# 【The Kevin Way 1on1 減法理財深度問券】事前調查報告

## 📋 基本資料 (Phase 1)
- **姓名 / 稱呼**：${formData.name || '未填寫'}
- **Email**：${formData.email || '未填寫'}
- **Line ID / 電話**：${formData.contactApp || '未提供'}
- **居住時區**：${formData.timezone || '未選擇'}
- **偏好 1on1 時段**：${formData.preferredTimeSlot || '未選擇'}

---

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
- **Q8. 減法理財系統希望能幫你買回的生活節奏**：
  ${formData.desiredLifePaceText || '無描述'}
- **Q9. 本次 1on1 諮詢最想解決的「一個絕對痛點」**：
  ${formData.absoluteOnePainPointText || '無描述'}

---
*填寫時間：${new Date().toLocaleString('zh-TW')} | 系統版本：v2.0 Deep-Investigation*
`;
  };

  // Trigger confetti celebration
  const triggerConfetti = () => {
    confetti({
      particleCount: 120,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#059669', '#10b981', '#3b82f6', '#f59e0b'],
    });
  };

  // Copy Markdown to Clipboard
  const handleCopyMarkdown = () => {
    const md = generateReportMarkdown();
    navigator.clipboard.writeText(md);
    setCopiedMarkdown(true);
    setTimeout(() => setCopiedMarkdown(false), 3000);
  };

  // Download JSON report file
  const handleDownloadJSON = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(formData, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `1on1_pre_investigation_${formData.name || 'user'}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  // Submit via selected Email Engine
  const handleSubmit = async () => {
    setIsSubmitting(true);
    setSubmitStatus(null);
    setSubmitMessage('');

    const reportContent = generateReportMarkdown();

    try {
      if (emailEngine === 'resend') {
        // Vercel Serverless Resend API Route (/api/send)
        const response = await fetch('/api/send', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            recipientEmail: recipientEmail,
            userEmail: formData.email,
            userName: formData.name,
            reportMarkdown: reportContent,
            formData: formData,
          }),
        });

        const resData = await response.json();

        if (response.ok && resData.success) {
          setSubmitStatus('success');
          setSubmitMessage(resData.message || '問券已成功發送！顧問將在 24 小時內與您聯繫對接 1on1 時間。');
          triggerConfetti();
        } else {
          // If in local dev or no API Key set on Vercel, gracefully fallback
          throw new Error(resData.error || resData.details || '伺服器發送失敗');
        }
      } else if (emailEngine === 'formspree') {
        // Formspree API Submission
        const formspreeEndpoint = `https://formspree.io/f/${recipientEmail}`;
        const response = await fetch(formspreeEndpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
          body: JSON.stringify({
            _replyto: formData.email,
            name: formData.name,
            message: reportContent,
          }),
        });

        if (response.ok) {
          setSubmitStatus('success');
          setSubmitMessage('問券已透過 Formspree 成功發送至顧問信箱！');
          triggerConfetti();
        } else {
          throw new Error('Formspree 發送失敗，請檢查 Formspree ID');
        }
      } else {
        // Mailto Fallback
        const mailtoSubject = encodeURIComponent(`【1on1問卷】${formData.name} 的減法理財深度調查報告`);
        const mailtoBody = encodeURIComponent(reportContent);
        window.location.href = `mailto:${recipientEmail}?subject=${mailtoSubject}&body=${mailtoBody}`;
        
        setSubmitStatus('success');
        setSubmitMessage('已為您開啟預設郵件軟體，請按下「發送」即可將問券寄出！');
        triggerConfetti();
      }
    } catch (err) {
      console.warn('Primary submission failed, activating fail-safe fallback:', err);
      // Fail-safe Mailto Fallback
      const mailtoSubject = encodeURIComponent(`【1on1問券備份發送】${formData.name} 的調查報告`);
      const mailtoBody = encodeURIComponent(reportContent);
      window.location.href = `mailto:${recipientEmail}?subject=${mailtoSubject}&body=${mailtoBody}`;

      setSubmitStatus('success');
      setSubmitMessage('已啟動備用郵件通道，請在開啟的郵件程式中點擊「發送」即可完成！');
      triggerConfetti();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="border-b border-slate-200 pb-4">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 flex items-center gap-2 font-heading">
          <Send className="w-6 h-6 text-emerald-600" />
          <span>Phase 5: 問券報告匯總與一鍵發送</span>
        </h2>
        <p className="text-sm text-slate-600 mt-1">
          請確認以下填答內容無誤。按下發送後，問卷內容將直接寄至顧問電子信箱 <span className="font-mono text-emerald-700 font-bold">{recipientEmail}</span>。
        </p>
      </div>

      {/* Dynamic Persona Card Diagnosis */}
      <PersonaCard formData={formData} />

      {/* Structured Review List */}
      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 sm:p-6 space-y-5">
        <div className="flex items-center justify-between border-b border-slate-200 pb-3">
          <span className="font-bold text-slate-900 text-sm flex items-center gap-2">
            <FileText className="w-4 h-4 text-emerald-600" />
            <span>問券完整填答核對摘要</span>
          </span>
          <span className="text-xs text-slate-500">點擊右側按鈕可修改特定階段</span>
        </div>

        {/* Phase 1 Summary */}
        <div className="space-y-2 bg-white p-4 rounded-xl border border-slate-200">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold text-emerald-800 uppercase tracking-wider">Phase 1: 個人基本資料</h4>
            <button onClick={() => onEditStep(1)} className="text-xs text-emerald-700 hover:underline font-semibold">修改</button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700">
            <div><span className="text-slate-400">姓名:</span> {formData.name}</div>
            <div><span className="text-slate-400">Email:</span> {formData.email}</div>
            <div><span className="text-slate-400">聯絡方式:</span> {formData.contactApp || '未提供'}</div>
            <div><span className="text-slate-400">時區:</span> {formData.timezone}</div>
            <div className="sm:col-span-2"><span className="text-slate-400">偏好諮詢時段:</span> <span className="font-bold text-slate-900">{formData.preferredTimeSlot}</span></div>
          </div>
        </div>

        {/* Phase 2 Summary */}
        <div className="space-y-2 bg-white p-4 rounded-xl border border-slate-200">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold text-emerald-800 uppercase tracking-wider">Phase 2: 財務底層邏輯</h4>
            <button onClick={() => onEditStep(2)} className="text-xs text-emerald-700 hover:underline font-semibold">修改</button>
          </div>
          <div className="text-xs text-slate-700 space-y-1.5">
            <div><span className="text-slate-400">Q1. 支出掌控:</span> {expOptionLabel}</div>
            <div><span className="text-slate-400">Q2. 緊急預備金:</span> <span className="font-bold text-emerald-800">{formData.emergencyMonths} 個月生活費</span></div>
            <div><span className="text-slate-400">Q3. 焦慮債務描述:</span> <p className="text-slate-800 font-medium mt-0.5 bg-slate-50 p-2 rounded">{formData.anxiousDebtsText}</p></div>
          </div>
        </div>

        {/* Phase 3 Summary */}
        <div className="space-y-2 bg-white p-4 rounded-xl border border-slate-200">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold text-emerald-800 uppercase tracking-wider">Phase 3: 投資現況與摩擦力</h4>
            <button onClick={() => onEditStep(3)} className="text-xs text-emerald-700 hover:underline font-semibold">修改</button>
          </div>
          <div className="text-xs text-slate-700 space-y-1.5">
            <div><span className="text-slate-400">Q4. 配置比例:</span> <p className="text-slate-800 font-medium mt-0.5 bg-slate-50 p-2 rounded">{formData.assetAllocationText}</p></div>
            <div><span className="text-slate-400">Q5. 槓桿與虧損影響:</span> <p className="text-slate-800 font-medium mt-0.5 bg-slate-50 p-2 rounded">{formData.leverageAndLossText}</p></div>
            <div><span className="text-slate-400">Q6. 每週看盤耗時:</span> {attOptionLabel}</div>
          </div>
        </div>

        {/* Phase 4 Summary */}
        <div className="space-y-2 bg-white p-4 rounded-xl border border-slate-200">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold text-amber-800 uppercase tracking-wider">Phase 4: 心智模型與未來藍圖</h4>
            <button onClick={() => onEditStep(4)} className="text-xs text-emerald-700 hover:underline font-semibold">修改</button>
          </div>
          <div className="text-xs text-slate-700 space-y-1.5">
            <div><span className="text-slate-400">Q7. 出清重新買入拷問:</span> <p className="text-slate-800 font-medium mt-0.5 bg-amber-50/60 p-2 rounded text-amber-950 font-semibold">{formData.rebuySoulQuestionText}</p></div>
            <div><span className="text-slate-400">Q8. 想買回的生活節奏:</span> <p className="text-slate-800 font-medium mt-0.5 bg-slate-50 p-2 rounded">{formData.desiredLifePaceText}</p></div>
            <div><span className="text-slate-400">Q9. 諮詢最想解決的痛點:</span> <p className="text-slate-800 font-medium mt-0.5 bg-slate-50 p-2 rounded">{formData.absoluteOnePainPointText}</p></div>
          </div>
        </div>
      </div>

      {/* Submit Actions & Extra Export Options */}
      {submitStatus === 'success' ? (
        <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-300 text-center space-y-4 shadow-md">
          <div className="w-12 h-12 rounded-full bg-emerald-600 text-white flex items-center justify-center mx-auto shadow-md">
            <CheckCircle2 className="w-7 h-7" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-emerald-950 font-heading">感謝您的認真填寫！報告已成功提交</h3>
            <p className="text-xs sm:text-sm text-emerald-800 mt-1">{statusMessage}</p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              onClick={handleCopyMarkdown}
              className="px-4 py-2 bg-white hover:bg-emerald-100 text-emerald-800 border border-emerald-300 rounded-xl text-xs font-bold transition-all shadow-xs flex items-center gap-1.5"
            >
              <Copy className="w-4 h-4" />
              {copiedMarkdown ? '複製成功！' : '複製報告 Markdown 留存'}
            </button>
            <button
              onClick={handleDownloadJSON}
              className="px-4 py-2 bg-white hover:bg-slate-100 text-slate-800 border border-slate-300 rounded-xl text-xs font-bold transition-all shadow-xs flex items-center gap-1.5"
            >
              <Download className="w-4 h-4" />
              下載報告 JSON 備份
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="w-full py-4 px-6 bg-gradient-to-r from-emerald-600 via-teal-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700 text-white font-extrabold text-base rounded-2xl shadow-lg shadow-emerald-600/25 hover:shadow-xl transition-all duration-200 flex items-center justify-center gap-2 transform active:scale-[0.99] disabled:opacity-50"
          >
            {isSubmitting ? (
              <>
                <RefreshCw className="w-5 h-5 animate-spin" />
                <span>加密傳送問券中...</span>
              </>
            ) : (
              <>
                <Send className="w-5 h-5" />
                <span>確認無誤，傳送 1on1 深度事前問券</span>
              </>
            )}
          </button>

          {/* Backup Copy & Download tools */}
          <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500 pt-1">
            <div className="flex items-center gap-1">
              <Lock className="w-3.5 h-3.5 text-emerald-600" />
              <span>資料僅用於會前診斷，絕對隱私保密</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleCopyMarkdown}
                className="hover:text-emerald-700 underline font-medium"
              >
                {copiedMarkdown ? '已複製！' : '複製 Markdown'}
              </button>
              <span>•</span>
              <button
                type="button"
                onClick={handleDownloadJSON}
                className="hover:text-emerald-700 underline font-medium"
              >
                下載 JSON 備份
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
