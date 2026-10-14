import { EXPENSE_CONTROL_OPTIONS, MARKET_ATTENTION_OPTIONS } from '../data/questionnaireOptions';

export default function PersonaCard({ formData }) {
  const months = Number(formData.emergencyMonths);
  const expense = EXPENSE_CONTROL_OPTIONS.findIndex(option => option.id === formData.expenseControl);
  const attention = MARKET_ATTENTION_OPTIONS.findIndex(option => option.id === formData.marketAttentionHours);
  const expenseLabel = EXPENSE_CONTROL_OPTIONS[expense]?.label || '尚未填寫';
  const attentionLabel = MARKET_ATTENTION_OPTIONS[attention]?.label || '尚未填寫';
  const observations = [
    {
      title: '財務準備｜先看清楚你的緩衝',
      evidence: `你填寫的現金預備金為 ${Number.isFinite(months) ? months : '未確認'} 個月；支出習慣是「${expenseLabel}」。`,
      note: expense === 2 || months < 3
        ? '可以先整理必要支出與可動用的現金，讓生活中的不確定性更容易被看見。'
        : '你已提供現金緩衝的估計；是否足夠，仍需配合收入穩定度、負債與家庭責任一起看。',
      action: '列出一個月的必要支出，再核對目前可隨時動用的現金。',
    },
    {
      title: '投資習慣｜留意注意力花在哪裡',
      evidence: `你選擇的市場關注狀況是「${attentionLabel}」。`,
      note: attention >= 2
        ? '你提到投資會影響心情或佔用較多生活心力，可以先觀察哪些時刻最容易想查看行情。'
        : '看盤時間本身沒有標準答案，也不代表配置是否適合你；重點是這個習慣能否支持你的生活。',
      action: '記錄三次查看行情的原因：是在執行計畫、查找資料，還是想獲得安心？',
    },
    {
      title: '生活目標｜把想要的改變說具體',
      evidence: `你希望的生活節奏：「${formData.desiredLifePaceText || '尚未填寫'}」`,
      note: `你最想釐清的是：「${formData.absoluteOnePainPointText || '尚未填寫'}」。這可以成為下一次整理投資決策時的起點。`,
      action: '選一個本週想保留給生活的時段，寫下你想做的事，觀察投資習慣是否會打斷它。',
    },
  ];

  return (
    <div className="space-y-4 my-6">
      <p className="text-sm text-slate-600 leading-relaxed">以下依你的支出、預備金、關注市場習慣與生活目標整理。其他文字回答會保留在申請摘要中，不會自動判定你的配置或風險承受能力。</p>
      {observations.map(item => (
        <article key={item.title} className="rounded-2xl border border-emerald-200 bg-white p-5 space-y-3">
          <h3 className="text-lg font-bold text-emerald-900">{item.title}</h3>
          <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-wrap break-words">{item.evidence}</p>
          <p className="text-sm text-slate-600 leading-relaxed">{item.note}</p>
          <p className="rounded-xl bg-emerald-50 p-3 text-sm text-emerald-950 leading-relaxed"><strong>一個小行動：</strong>{item.action}</p>
        </article>
      ))}
      <p className="text-sm text-slate-500 leading-relaxed">這是自我盤點工具，並非完整財務評估或個別投資建議，也不提供買賣指示。先選一個最有感的小行動就好。</p>
    </div>
  );
}
