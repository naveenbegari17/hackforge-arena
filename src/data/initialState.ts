import { UserProfile, SkillScore, JurySession, ProjectData, PitchAttempt } from '@/types';

export const INITIAL_USER_PROFILE: UserProfile = {
  id: 'usr-student-01',
  name: 'Alex Rivera',
  email: 'alex.rivera@engineering.edu',
  role: 'student',
  experienceLevel: 'intermediate',
  programmingLanguages: ['TypeScript', 'Python', 'SQL'],
  technicalStrengths: ['Fullstack UI', 'REST APIs', 'Fast Prototyping'],
  areasNeedingImprovement: ['Technical Defense under Pressure', 'Distributed Architecture', 'Unit Economics'],
  preferredCategories: ['Smart Cities', 'Accessible Education', 'Developer Tools'],
  availableHoursPerWeek: 8,
  previousHackathonsCount: 2,
  familiarity: {
    cloud: 3,
    ai: 3,
    databases: 4,
    apis: 4,
    deployment: 3
  },
  competitionPreference: 'team',
  readinessScore: 68,
  currentRank: 'Prototype Engineer',
  completedSimulationsCount: 3,
  isOnboarded: true,
  createdAt: '2026-10-15T10:00:00Z'
};

export const INITIAL_SKILL_SCORES: SkillScore[] = [
  { name: 'Problem-solving', category: 'Problem-solving', score: 74, isProvisional: false, attemptCount: 5 },
  { name: 'Innovation & Differentiation', category: 'Innovation', score: 62, isProvisional: false, attemptCount: 4 },
  { name: 'Technical Execution', category: 'Technical Execution', score: 81, isProvisional: false, attemptCount: 7 },
  { name: 'Product Thinking & MVP Scope', category: 'Product Thinking', score: 70, isProvisional: false, attemptCount: 5 },
  { name: 'Pitching & Storytelling', category: 'Pitching', score: 58, isProvisional: false, attemptCount: 4 },
  { name: 'Teamwork & Crisis Resolution', category: 'Teamwork', score: 75, isProvisional: false, attemptCount: 3 },
  { name: 'Time Management', category: 'Time Management', score: 64, isProvisional: false, attemptCount: 4 },
  { name: 'Technical Defense', category: 'Technical Defense', score: 55, isProvisional: false, attemptCount: 3 },
  { name: 'Security & Responsible AI', category: 'Security & AI', score: 60, isProvisional: true, attemptCount: 2 },
  { name: 'Adaptability & Pressure', category: 'Adaptability', score: 67, isProvisional: false, attemptCount: 3 }
];

export const INITIAL_PROJECT: ProjectData = {
  id: 'proj-1',
  userId: 'usr-student-01',
  name: 'Campus LeakWatch Sentinel',
  theme: 'Smart Campus Infrastructure',
  problemStatement: 'Campus water leakage and HVAC failures waste thousands of dollars weekly because facilities rely on slow manual ticketing.',
  targetUsers: 'University facilities maintenance teams and resident student monitors.',
  proposedSolution: 'A crowd-verified incident reporting portal that uses proximity clustering and priority weighting to dispatch technicians in under 30 minutes.',
  mvpScope: '1) Geotagged submission form, 2) Proximity duplicate merger, 3) Technician triage dashboard.',
  features: [
    { id: 'f1', title: 'Geotagged Photo & Incident Form', category: 'must', isImplemented: true },
    { id: 'f2', title: '50-meter Proximity Duplicate Clustering', category: 'must', isImplemented: true },
    { id: 'f3', title: 'Technician Urgent Dispatch View', category: 'must', isImplemented: true },
    { id: 'f4', title: 'Automated SMS alerts to dormitory managers', category: 'should', isImplemented: false },
    { id: 'f5', title: 'Predictive pipe burst vibration analytics', category: 'could', isImplemented: false },
    { id: 'f6', title: 'Blockchain water credit token ledger', category: 'out_of_scope', isImplemented: false }
  ],
  architecture: {
    frontend: 'Next.js 14 App Router, Tailwind CSS, Lucide Icons',
    backend: 'Next.js Server Actions with Zod validation',
    database: 'SQLite (local demo) / PostgreSQL (production) with Prisma Schema',
    apis: ['Browser Geolocation API', 'Simulated SMS Webhook'],
    deployment: 'Vercel Edge Network',
    auth: 'Secure HTTP-only session cookies with role verification'
  },
  tasks: [
    { id: 't1', title: 'Define data models & incident schemas', status: 'done', priority: 'critical', estimateMinutes: 30, assignedRole: 'Backend Lead' },
    { id: 't2', title: 'Implement duplicate detection algorithm', status: 'done', priority: 'high', estimateMinutes: 45, assignedRole: 'Fullstack' },
    { id: 't3', title: 'Build technician triage queue UI', status: 'in_progress', priority: 'critical', estimateMinutes: 60, assignedRole: 'Frontend Lead' },
    { id: 't4', title: 'Stress test with 100 concurrent mock submissions', status: 'todo', priority: 'medium', estimateMinutes: 30, assignedRole: 'QA / Tester' },
    { id: 't5', title: 'Rehearse 3-minute pitch deck and live demo script', status: 'backlog', priority: 'high', estimateMinutes: 45, assignedRole: 'Presenter' }
  ],
  demoScript: '1. Open student view. Click "Report Water Burst" in Building C basement. Notice geolocation auto-pins.\n2. Submit report. Switch tab to Technician Dashboard: Notice ticket appears instantly in "Critical Triage".\n3. Simulate second student reporting same leak 10 meters away: Observe duplicate badge auto-groups reports without spamming technician.',
  pitchNotes: 'Lead with the number: 180,000 gallons wasted last semester. Introduce technician John who currently drives around blindly. Show the 30-second fix.',
  securityChecklist: [
    { id: 's1', item: 'All user input strings sanitized against XSS', checked: true },
    { id: 's2', item: 'Rate limiting on incident submission endpoint (max 5 per min per IP)', checked: true },
    { id: 's3', item: 'No raw API keys or database secrets committed to Git', checked: true },
    { id: 's4', item: 'Image uploads scanned for MIME type and limited to 5MB', checked: false },
    { id: 's5', item: 'Role-based authorization prevents students from modifying technician tickets', checked: true }
  ],
  updatedAt: '2026-10-27T18:00:00Z'
};

