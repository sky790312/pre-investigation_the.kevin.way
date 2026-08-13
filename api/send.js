import { Resend } from 'resend'

// Vercel Serverless Route for Resend Email Sending
export default async function handler(req, res) {
  // CORS & Method Check
  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' })
  }

  try {
    const { recipientEmail, userEmail, userName, reportMarkdown, formData } =
      req.body

    const apiKey = process.env.RESEND_API_KEY
    const targetRecipient =
      recipientEmail || process.env.RECIPIENT_EMAIL || 'sky790312yks@gmail.com'

    // If RESEND_API_KEY is not configured yet on Vercel
    if (!apiKey) {
      console.warn('RESEND_API_KEY is missing on Vercel environment variables.')
      return res.status(200).json({
        success: true,
        message:
          '【預覽模式】問券已嘗試發送。在 Vercel 設定 RESEND_API_KEY 後即可收至真實信箱！',
        note: 'Mock response because RESEND_API_KEY is not set.',
      })
    }

    const resend = new Resend(apiKey)

    // Format Styled HTML Email
    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #f8fafc; color: #0f172a; margin: 0; padding: 20px; }
          .container { max-width: 650px; margin: 0 auto; background: #ffffff; border-radius: 16px; border: 1px solid #e2e8f0; overflow: hidden; box-shadow: 0 10px 25px rgba(0,0,0,0.05); }
          .header { background: linear-gradient(135deg, #047857 0%, #059669 100%); padding: 28px 24px; text-align: center; color: #ffffff; }
          .header h1 { margin: 0; font-size: 22px; font-weight: 800; }
          .header p { margin: 6px 0 0 0; font-size: 13px; opacity: 0.9; }
          .content { padding: 28px 24px; }
          .section-title { font-size: 14px; font-weight: 800; color: #047857; text-transform: uppercase; border-bottom: 2px solid #e2e8f0; padding-bottom: 6px; margin-top: 24px; margin-bottom: 12px; }
          .field-box { background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 12px 16px; margin-bottom: 12px; font-size: 13px; line-height: 1.6; }
          .field-label { font-weight: bold; color: #334155; margin-bottom: 4px; }
          .field-value { color: #0f172a; font-weight: 600; whitespace: pre-wrap; }
          .soul-box { background-color: #fffbeb; border: 1px solid #fde68a; border-radius: 8px; padding: 12px 16px; margin-bottom: 12px; font-size: 13px; line-height: 1.6; }
          .footer { background-color: #f1f5f9; text-align: center; padding: 16px; font-size: 11px; color: #64748b; border-top: 1px solid #e2e8f0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>【The Kevin Way】建立你的專屬財務系統</h1>
            <p>填答者：${userName || '學員'} (${userEmail})</p>
          </div>

          <div class="content">
            <div class="section-title">📋 Phase 1: 個人基本資料</div>
            <div class="field-box">
              <div className="field-label">姓名 / 稱呼：<span className="field-value">${formData?.name || userName}</span></div>
              <div className="field-label">Email：<span className="field-value">${formData?.email || userEmail}</span></div>
              <div className="field-label">聯絡方式：<span className="field-value">${formData?.contactApp || '未提供'}</span></div>
              <div className="field-label">居住時區：<span className="field-value">${formData?.timezone}</span></div>
              <div className="field-label">偏好 1on1 時段：<span className="field-value" style="color: #047857; font-weight: 800;">${formData?.preferredTimeSlot}</span></div>
            </div>

            <div class="section-title">🛡️ Phase 2: 財務底層邏輯 (Financial Foundation)</div>
            <div class="field-box">
              <div class="field-label">Q1. 支出掌控度：</div>
              <div class="field-value">${formData?.expenseControl}</div>
            </div>
            <div class="field-box">
              <div class="field-label">Q2. 緊急預備金水位（純現金）：</div>
              <div class="field-value" style="color: #047857; font-size: 15px;">${formData?.emergencyMonths} 個月生活費</div>
            </div>
            <div class="field-box">
              <div class="field-label">Q3. 焦慮債務描述：</div>
              <div class="field-value">${formData?.anxiousDebtsText}</div>
            </div>

            <div class="section-title">🧭 Phase 3: 投資現況與摩擦力 (Investment & Friction)</div>
            <div class="field-box">
              <div class="field-label">Q4. 當前資產配置比例：</div>
              <div class="field-value">${formData?.assetAllocationText}</div>
            </div>
            <div class="field-box">
              <div class="field-label">Q5. 高槓桿/頻繁盯盤經驗與重大虧損影響：</div>
              <div class="field-value">${formData?.leverageAndLossText}</div>
            </div>
            <div class="field-box">
              <div class="field-label">Q6. 每週盯盤關注市場耗時：</div>
              <div class="field-value">${formData?.marketAttentionHours}</div>
            </div>

            <div class="section-title">🧠 Phase 4: 心智模型與未來藍圖 (Mental Model & Goal)</div>
            <div class="soul-box">
              <div class="field-label" style="color: #b45309;">Q7. 【靈魂拷問】明天重新買入會一模一樣嗎？</div>
              <div class="field-value" style="color: #78350f;">${formData?.rebuySoulQuestionText}</div>
            </div>
            <div class="field-box">
              <div class="field-label">Q8. 減法理財想買回的生活節奏：</div>
              <div class="field-value">${formData?.desiredLifePaceText}</div>
            </div>
            <div class="field-box">
              <div class="field-label">Q9. 本次 1on1 最想解決的「一個絕對痛點」：</div>
              <div class="field-value" style="color: #047857;">${formData?.absoluteOnePainPointText}</div>
            </div>
          </div>

          <div class="footer">
            1on1 減法理財事前調查系統 • 送出時間：${new Date().toLocaleString('zh-TW')}
          </div>
        </div>
      </body>
      </html>
    `

    const data = await resend.emails.send({
      from: 'The Kevin Way Questionnaire <onboarding@resend.dev>',
      to: targetRecipient,
      replyTo: userEmail,
      subject: `【The Kevin Way】建立你的專屬財務系統 - ${userName}`,
      html: htmlContent,
    })

    return res
      .status(200)
      .json({ success: true, message: '問券已成功發送！', data })
  } catch (error) {
    console.error('Error in Resend API:', error)
    return res.status(500).json({ error: '發送失敗', details: error.message })
  }
}
