# Workday Simulator: Zero to Infinity Journey with Kapil

[![PWA Ready](https://img.shields.io/badge/PWA-100%25%20Offline%20Ready-0284c7?style=for-the-badge&logo=pwa&logoColor=white)](https://github.com/sarlayash/My-Workday-Learning-App-With-Kapil)
[![Fortune 500 Standard](https://img.shields.io/badge/Enterprise-Fortune%20500%20Standard-amber-500?style=for-the-badge&logo=shield&logoColor=white)](https://github.com/sarlayash/My-Workday-Learning-App-With-Kapil)
[![Curriculum](https://img.shields.io/badge/Curriculum-30%20Hours%20%7C%2030%20Levels-emerald-500?style=for-the-badge)](https://github.com/sarlayash/My-Workday-Learning-App-With-Kapil)

A Fortune 500-grade interactive Workday learning platform and live enterprise tenant simulator, structured as an immersive **30-Hour, 30-Level** mastery journey created with **Kapil Narula**.

---

## 🌟 Key Capabilities

### 1. 30-Hour Enterprise Curriculum (1 Hour = 1 Level)
- **Phase 1: Foundation Specialist (Hours 1–5):** Workday Object Architecture, Multi-Tenant Cloud Topology, Supervisory Organization Studio, Staffing Models (Position Management vs Job Management), and Job Profiles & Compensation Grades.
- **Phase 2: Business Process & Transactions (Hours 6–10):** BP Definition Framework, Multi-Step Approvals & Condition Rules, Hire Employee Life-Cycle Transaction Wizard, Reorganization & Movement, and Compensation Package Assembly.
- **Phase 3: Security & Governance (Hours 11–15):** Role-Based & User-Based Security Groups, Domain Security Policies (DSP), Business Process Security Policies (BPSP), Segregation of Duties (SoD), and Audit Trails & Compliance.
- **Phase 4: Reporting & Calculated Fields (Hours 16–20):** Standard & Advanced Custom Reports (RaaS), Calculated Field Studio (Lookup Related Value, Extract Single/Multi-Instance, Evaluate Expression), Matrix Reporting & Dashboards, and Composite Reporting.
- **Phase 5: Enterprise Integrations & EIB (Hours 21–25):** Inbound & Outbound Enterprise Interface Builder (EIB), Core Connector Architecture, Document Transformation (XSLT) & Cloud Connect, Workday Web Services (WWS), and Integration Monitoring & Error Handling.
- **Phase 6: Advanced Financials, Prism Analytics & Cutover (Hours 26–30):** Financial Data Model (FDM) & Worktags, Prism Analytics & Big Data, Tenant Management & Migration, Enterprise Cutover Playbook, and Grand Capstone Certification.

---

### 2. Live Interactive Workday Tenant Simulator
- **Supervisory Organization Studio:** Real-time visual organization tree management, creating child orgs, modifying staffing models, and assigning leadership.
- **Business Process Configurator:** Visual workflow builder for Initiation, Action, Approval, To-Do, and Condition Rule branching.
- **Hire Employee Transaction Wizard:** 4-step guided transaction simulator validating legal name, position allocation, compensation grades, and auto-initiating the Hire BP.
- **Calculated Fields Studio:** Interactive formula tester simulating Workday's calculation engine with real-time test inputs.
- **Security & Domain Permissions Matrix:** Interactive role-based access control matrix toggling View/Modify permissions for domains and action steps.

---

### 3. Progressive Badges & Verifiable Credentials
- **Tier 1–6 Milestone Badges:** Digital badges earned at 5-hour milestone intervals.
- **Print-Ready Landscape Certificate:** Official Workday Specialist Certificate with customizable learner name, dynamic issue date, verification ID, and authorized signature.
- **Dual Export:** One-click download as **Vector PDF** (via `jspdf`) and high-resolution **PNG image**.

---

### 4. Progressive Web App (PWA) & 100% Offline Mode
- **Downloadable Directly from Browser:** Installable on macOS, Windows, Linux, Android, and iOS as a standalone native-feeling application.
- **Zero Internet Required:** All 30 levels, interactive simulator labs, formula testers, badges, and certificate generation work **100% offline** through Workbox service workers and local storage caching.
- **Install Flow Support:** Native `beforeinstallprompt` trigger with guided step-by-step modal for iOS Safari and desktop browsers.

---

### 5. Kapil's Technical Interview Vault
- 30 curated real-world scenario interview questions asked by top Fortune 500 companies (Amazon, Microsoft, Deloitte, Accenture, Walmart).
- Searchable by topic, phase, and difficulty with architectural rationale for each scenario.

---

## 🚀 Quick Start (Local Development)

### Prerequisites
- Node.js 18+ (Node 20 recommended)
- npm or bun

### Installation
```bash
# Clone the repository
git clone https://github.com/sarlayash/My-Workday-Learning-App-With-Kapil.git

# Navigate into the project folder
cd My-Workday-Learning-App-With-Kapil

# Install dependencies
npm install

# Start development server
npm run dev
```
Open your browser at `http://localhost:3000` to explore the simulator.

---

## 📱 How to Download & Install as an App

### Google Chrome / Brave / Microsoft Edge (Desktop)
1. Open the app in your browser.
2. Click the **"Install App"** button in the top navigation bar, or click the install icon (⊕) in the browser address bar.
3. Confirm the prompt to launch as a standalone desktop app.

### Apple iOS (iPhone / iPad)
1. Open the link in **Safari**.
2. Tap the **Share** button in the bottom navigation bar.
3. Scroll down and tap **"Add to Home Screen"**.
4. Tap **Add** in the top right corner.

### Google Android (Chrome)
1. Open the link in Chrome.
2. Tap the **three-dots menu (⋮)** in the top right corner.
3. Tap **"Install app"** or **"Add to Home screen"**.

---

## 🛠 Tech Stack
- **Framework:** React 19 + TypeScript
- **Bundler:** Vite 8 + `@vitejs/plugin-react`
- **PWA & Offline:** `vite-plugin-pwa` + Workbox
- **Styling:** Tailwind CSS 4 + Lucide Icons + Motion
- **Credentials & PDF:** `jspdf` + HTML5 Canvas rasterizer + `canvas-confetti`

---

## 👨‍🏫 Mentorship & Authors
- **Curriculum & Architecture:** Kapil Narula
- **Repository:** [sarlayash/My-Workday-Learning-App-With-Kapil](https://github.com/sarlayash/My-Workday-Learning-App-With-Kapil)
- **License:** Apache-2.0
