# Technical Context: Money Pink

## Technology Stack

| Technology | Role | Version |
|---|---|---|
| **React** | Component-driven UI framework | `^19.2.4` |
| **Vite** | Fast frontend build tool & HMR dev server | `^8.0.4` |
| **Recharts** | Interactive SVG charts | `^3.8.1` |
| **lucide-react** | Clean SVG icon kit | `^1.8.0` |
| **html2canvas** | Client-side dashboard screenshotting | `^1.4.1` |
| **gh-pages** | Seamless production builds and deployment | `^6.3.0` |

---

## Directory Structure

```
money-pink/
├── public/                 # Static assets (favicons, etc.)
├── src/
│   ├── assets/             # Images and local media
│   ├── components/         # Modular react components
│   │   ├── CentralMoney/   # Central Money specific components
│   │   │   ├── CentralMoneyCharts.jsx
│   │   │   ├── CentralMoneyDashboard.jsx
│   │   │   ├── CentralMoneyMemberCard.jsx
│   │   │   └── CentralMoneySummaryCards.jsx
│   │   ├── CentralMoneyView.jsx
│   │   ├── RealEstateView.jsx
│   │   ├── Charts.jsx
│   │   ├── Dashboard.jsx
│   │   ├── MemberCard.jsx
│   │   └── SummaryCards.jsx
│   ├── utils/              # Data parsing and math utilities
│   │   ├── centralMoneyDataProcessor.js
│   │   └── dataProcessor.js
│   ├── App.css             # Main component level styles
│   ├── App.jsx             # Entry layout and tab routers
│   ├── index.css           # Design token base & animations
│   └── main.jsx            # DOM bootstrapping
├── package.json            # Scripts & dependencies
└── vite.config.js          # Vite config
```

---

## API Endpoints & Core Data Structure

### 1. Real Estate API
* **Endpoint**: `https://script.googleusercontent.com/macros/echo?user_content_key=AWDtjMUXZc8ENGNqufB_jL4JGclgSzTkMibN3C75zrLGNNMnodQRnI8bc9whGWox-9MM5wzU7BFvb7_u55RDkT5Ha7MeAcjIjDG3Q6jDWaTOFxkMO5zBuEj7g5jXb9U3KqsLKVW94CJrJ7DgRgZJWmCciwqMRORQ6rPLZHBqTjb1ZsXyi8dKQVRpbQZib4Z2PmAdJ9yhyB5HplDinyL2PfHQRO9pIPmfnhk_Kg3s0yP4iruq5Rg_uJ43o_4T6bpm3glEQcN43ODS9xZXJW-IfLU&lib=MIJPxqDUveZMHAuU6EOU0QllmX6t1pghm`
* **JSON Properties**:
  * `source_year` (String: `"2025"`, `"2026"`, etc.)
  * `สมาชิก` (String: Member's name)
  * `ต้นทุน (฿)` (Number)
  * `ยอดจ่าย (฿)` (Number)
  * `ค้างจ่าย (฿)` (Number)
  * `รายได้ (฿)` (Number)
  * `ยอดรับ (฿)` (Number)
  * `ค้างรับ (฿)` (Number)
  * `สถานะ` (String: `"จ่ายแล้ว"`, `"ค้างจ่าย"`, etc.)
  * `วันที่สรุป` / `วันที่ทำ` (String: Date)

### 2. Central Money API
* **Endpoint**: `https://script.google.com/macros/s/AKfycbxTd6QCvaTFiNSjbVicZKb_8bAw3VCjOOMwPlUtZ8hKmdllFcb30D5Azi0Iqj_XMpY/exec`
* **JSON Properties**:
  * `source_year` (String)
  * `สมาชิก` (String)
  * `ยอดเรียก (฿)` (Number)
  * `ยอดเก็บ (฿)` (Number)
  * `ยอดค้าง (฿)` (Number)
  * `ยอดเบิกเงิน (฿)` (Number)
  * `ยอดยืมเงิน (฿)` (Number)
  * `ยอดคืนเงิน (฿)` (Number)
  * `ยอดค้างคืน (฿)` (Number)
  * `สถานะ` (String)
  * `เดือน` (String)

---

## Command Reference

* **Start Development Server**:
  ```bash
  npm run dev
  ```
* **Build App for Production**:
  ```bash
  npm run build
  ```
* **Predeploy (triggers build automatically)**:
  ```bash
  npm run predeploy
  ```
* **Deploy to GitHub Pages**:
  ```bash
  npm run deploy
  ```
* **Lint Files**:
  ```bash
  npm run lint
  ```
