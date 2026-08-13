# 📈 The Kevin Way - 1on1 投資諮詢事前調查問券網站 (Pre-Investigation)

這是一個專為 **1on1 投資諮詢 / 會前溝通** 所設計的高質感互動式問卷網站。讓學員/客戶在諮詢前填寫他們的投資現況、資產規模、諮詢目標與卡關痛點，並可直接將整理好的報告發送至您的 Email 信箱！

---

## ✨ 網站核心特色與設計亮點

1. **🎨 頂級暗色調 Glassmorphism 視覺美學**
   - 採用 Plus Jakarta Sans + Space Grotesk 質感字型
   - 深鈦灰與翡翠綠 (Emerald) 微漸層與光暈效果
   - 完全響應式 RWD 佈局，完美支援手機、平板與電腦

2. **📊 5 步驟引導式問券 (5-Step Interactive Form)**
   - **Step 1: 個人基本資料** (姓名、Email、Line/Telegram ID、居住時區、偏好諮詢時段)
   - **Step 2: 目前投資現況** (經驗年資、資產規模區間、持有的主要標的多選、月可支配投資額)
   - **Step 3: 核心目標與風險** (1on1 會議目標多選、期望年化報酬率、最大心理承受回檔 Drawdown)
   - **Step 4: 具體痛點與問題** (常見卡關痛點一鍵勾選、核心困境詳細描述、指定討論標的/持股代碼)
   - **Step 5: 事前調查摘要與 Email 發送** (自動生成個人化報告、即時投資屬性小診斷卡片、多管道發送)

3. **🤖 實時投資屬性小診斷 (Investment Persona Card)**
   - 系統根據填寫的經驗年資、資產規模與風險承受，即時演算並呈現如「資產穩健成長者」、「高動能突破交易者」、「家族/跨國配置家」或「系統化策略探索者」專屬風格標籤。

4. **✉️ 靈活無後端 Email 發送整合 (Email Delivery Engine)**
   - **Formspree (推薦)**：直接填入 Formspree URL，免費免伺服器自動發送至指定 Email。
   - **EmailJS**：支援自訂模板與 EmailJS 金鑰發送。
   - **Mailto 直發 + 複製備份**：自動開啟系統預設郵件，並可一鍵複製 Markdown/文字格式完整報告或下載 JSON 備份檔。

5. **💾 草稿自動儲存 (Auto-Save Draft) 與範例一鍵帶入**
   - 支援 `localStorage` 自動草稿儲存，防止誤關瀏覽器遺失內容。
   - 提供「填入範例資料測試」按鈕，方便快速展示與驗證發送流程。

---

## 🚀 本地開發與啟動指令

```bash
# 1. 安裝依賴套件
npm install

# 2. 啟動開發伺服器
npm run dev

# 3. 測試生產打包
npm run build
```

---

## 🛠️ 如何設定您的收件信箱？

1. 點擊頂部導覽列的 **「收件者 / 設定」** 按鈕（預設收件信箱為 `the.kevin.way@gmail.com`）。
2. 可直接修改接收 Email 地址。
3. 若希望以 Formspree 免費發送，可至 [formspree.io](https://formspree.io) 註冊並填入專屬 Form ID。
4. 設定完成後將自動儲存於瀏覽器中，提交問券即可自動寄出！

---

## 🌐 建議部署平台

此專案為單頁純前端靜態 React 應用，可直接免費一鍵部署至：
- **Vercel**: `vercel`
- **Netlify**: 直接連結 GitHub Repository 即可自動 CI/CD 發布
- **GitHub Pages**: `npm run build` 後構建 `dist` 資料夾發布
