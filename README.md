# ⚡ HACKFORGE ARENA
### The Ultimate AI-Powered Hackathon Preparation and Competition Simulator
> **Tagline:** *Train Like a Beginner. Compete Like a Champion.*

---

## 🌟 Overview & Architecture

**HACKFORGE ARENA** is an interactive web platform engineered specifically for engineering students preparing to compete in college hackathons, national innovation challenges (SIH), and global developer competitions.

### 🎯 Key Design & Engineering Highlights
- **Framework:** Next.js 14+ (App Router) + TypeScript + React 19 + Tailwind CSS 4
- **Theme:** Dark charcoal (`#090D16`), electric violet (`#8B5CF6`), and cyan (`#06B6D4`) developer platform aesthetic
- **Persistence:** LocalStorage session recovery + Server-ready schemas for PostgreSQL / Prisma
- **AI Engine:** Dual-mode architecture:
  - **High-Fidelity Deterministic Engine:** Fully functional out of the box with zero external API keys or subscription dependencies.
  - **Live LLM Integration:** Connects seamlessly to Google Gemini (`GEMINI_API_KEY`) or OpenAI for real-time natural language synthesis.

---

## 🚀 Quick Start & Development

To run the application locally:

```bash
cd hackforge-app
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser. The application will automatically direct you to `/dashboard`.

To verify the production build:
```bash
npm run build
```

---

## 📦 Delivered Modules & Routes

| Route | Module | Description |
|---|---|---|
| `/dashboard` | **Main Dashboard** | Readiness Score (0-100), active simulation spotlight, skill matrix, and personalized training recommendations. |
| `/competition` | **Competition Arena** | 17-step end-to-end competition pipeline with countdown timer, Guided Practice, Realistic, and Pressure modes with crisis injections. |
| `/jury-room` | **AI Jury Room** | 10 distinct judge personas (Technical Architect, Ruthless Judge, UX Judge, Security CISO, etc.) across 8 panel modes with multi-turn defense and report cards. |
| `/project-studio` | **Project Studio** | Sprint Kanban board (Backlog, Todo, In Progress, Testing, Done), system architecture specifications, and security checklists. |
| `/pitch-arena` | **Pitch Arena** | Multi-format pitch simulator (30s, 60s, 3m, 5m) with words-per-minute delivery pace calculator and sentence polish suggestions. |
| `/technical-lab` | **Technical Lab** | Practical coding and architecture challenges (Idempotency keys, prompt injection guardrails, optimistic state rollbacks). |
| `/problem-discovery` | **Problem Discovery** | 7-question Problem Validation Canvas separating surface symptoms from operational root causes. |
| `/idea-lab` | **Idea Innovation Lab** | Side-by-side concept comparison matrix with built-in anti-buzzword filter. |
| `/team-simulator` | **Team Simulator** | Interactive crisis scenarios (3:00 AM API rewrites, feature creep ambushes) scoring communication and technical soundness. |
| `/academy` | **Knowledge Academy** | Structured hackathon playbooks and interactive knowledge check quizzes. |
| `/analytics` | **Performance Analytics** | 10-vector radar/bar breakdown, attempt tracking, and targeted remediation plans. |
| `/achievements` | **Achievements & Ranks** | Merit-based progression from *Rookie* to *Arena Champion*. |
| `/settings` | **Settings** | Competitor profile, experience track, and external API key configuration. |
| `/help` | **Help Center** | Comprehensive operational guide and scoring rubrics documentation. |

---

## 🏛️ 10 Seeded Judge Personas

1. **Dr. Aris Thorne (Technical Architect)**: Drills into database indexes, concurrency race conditions, and failover mechanics.
2. **Elena Rostova (Product & UX Judge)**: Probes user retention, friction, and WCAG accessibility standards.
3. **Kaelen Vance (Innovation Judge)**: Skeptical of wrappers; challenges why a basic Google Form or script does not solve this.
4. **Mei-Ling Zhou (Business & Impact Judge)**: Demands unit economics and clear buyer identity.
5. **Vikram Sethi (Security & Responsible AI Judge)**: Probes prompt injection vulnerabilities, API token exposure, and input sanitization.
6. **Marcus "The Hammer" Sterling (Ruthless Judge)**: Zero patience for mockups; demands live working terminal and network proofs.
7. **Sarah Jenkins (Nontechnical Stakeholder)**: Tests real-world usability on intermittent rural 3G connections.
8. **Dr. Tariq Al-Mansoor (Industry Domain Expert)**: Exposes regulatory and clinical/agronomic workflow bottlenecks.
9. **Chloe Zhang (Demo Examiner)**: Methodically tests error boundaries and edge-case inputs.
10. **Prof. Jonathan Cross (Cross-Disciplinary Panel Chair)**: Synthesizes critiques and flags contradictions between pitch and defense.

---

## 📜 12 Seeded Original Scenarios

1. **Smart Campus Infrastructure**: Water & HVAC leakage sentinel.
2. **AgroGuard**: Precision micro-climate frost & pest warning.
3. **VoiceBridge**: Accessible STEM classroom translation for neurodiverse learners.
4. **TransitPulse**: Real-time municipal bus fleet bunching predictor.
5. **DisasterMesh**: Zero-cellular peer-to-peer emergency relief coordinator.
6. **CareRoute**: Decentralized rural clinic appointment & medicine triage.
7. **KilowattSentry**: Smart grid load balancer & peak shaving advisor.
8. **PhishGuard Academy**: Cognitive threat defense for high schoolers.
9. **KioskNet**: Asynchronous offline citizen certificate portal.
10. **DocuAudit**: Verifiable AI claim extractor & evidence highlighter.
11. **EcoTrace**: Neighborhood industrial effluent & noise hotspot map.
12. **CodeRed MVP**: Emergency triage dashboard with a dead external API (Pressure Sprint).

---

## 🛡️ Security & Reliability

- **No untrusted arbitrary code execution:** The Technical Lab uses safe, deterministic static verification checks without executing untrusted arbitrary strings on the server.
- **Client Security:** API keys are never leaked to client bundles.
- **Safe Fallbacks:** 100% of application features function smoothly without external credentials.
