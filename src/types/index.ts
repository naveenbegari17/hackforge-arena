// Common types for HackForge Arena

export type ExperienceLevel = 'beginner' | 'intermediate' | 'advanced' | 'expert';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  role: 'student' | 'admin';
  experienceLevel: ExperienceLevel;
  programmingLanguages: string[];
  technicalStrengths: string[];
  areasNeedingImprovement: string[];
  preferredCategories: string[];
  availableHoursPerWeek: number;
  previousHackathonsCount: number;
  familiarity: {
    cloud: number; // 1-5
    ai: number;
    databases: number;
    apis: number;
    deployment: number;
  };
  competitionPreference: 'individual' | 'team';
  readinessScore: number; // 0 - 100
  currentRank: string;
  completedSimulationsCount: number;
  isOnboarded: boolean;
  createdAt: string;
}

export interface SkillScore {
  name: string;
  category: 'Problem-solving' | 'Innovation' | 'Technical Execution' | 'Product Thinking' | 'Pitching' | 'Teamwork' | 'Time Management' | 'Technical Defense' | 'Security & AI' | 'Adaptability';
  score: number; // 0 - 100
  isProvisional: boolean;
  attemptCount: number;
}

export type CompetitionDifficulty = 'Beginner' | 'Intermediate' | 'Advanced' | 'Extreme';
export type CompetitionMode = 'guided' | 'realistic' | 'pressure';

export interface ScenarioMilestone {
  id: string;
  stepNumber: number;
  title: string;
  description: string;
  expectedDeliverable: string;
  points: number;
  isCompleted?: boolean;
  completedAt?: string;
  evidenceNotes?: string;
}

export interface CompetitionScenario {
  id: string;
  title: string;
  category: string;
  difficulty: CompetitionDifficulty;
  durationMinutes: number;
  recommendedTeamSize: number;
  briefing: string;
  problemStatement: string;
  targetUser: string;
  clearObjective: string;
  constraints: string[];
  availableTechnologies: string[];
  deliverables: string[];
  technicalRisks: string[];
  rubric: RubricCriterion[];
  milestones?: ScenarioMilestone[];
  judgePersonaIds: string[];
  surpriseDisruptions?: SurpriseDisruption[];
}

export interface SurpriseDisruption {
  id: string;
  triggerMinute: number;
  title: string;
  description: string;
  impactType: 'api_failure' | 'requirement_change' | 'database_failure' | 'scope_reduction' | 'judge_demand';
  options: {
    text: string;
    scoreEffect: number;
    rationale: string;
  }[];
}

export interface RubricCriterion {
  id: string;
  name: string;
  description: string;
  weight: number; // e.g. 15, 20
  levels: {
    level: number; // 0 to 5
    description: string;
  }[];
}

export interface JudgePersona {
  id: string;
  name: string;
  title: string;
  avatar: string;
  archetype: string;
  evaluationPriority: string;
  personality: string;
  questioningStyle: string;
  strictness: number; // 1-10
  biasAreas: string[];
}

export interface JurySession {
  id: string;
  userId: string;
  projectId: string;
  projectName: string;
  mode: 'friendly_mentor' | 'standard_panel' | 'ruthless_panel' | 'technical_defense' | 'startup_investor' | 'social_impact' | 'surprise_panel' | 'grand_finale';
  judgeIds: string[];
  status: 'in_progress' | 'completed';
  createdAt: string;
  completedAt?: string;
  currentTurn: number;
  maxTurns: number;
  turns: JuryTurn[];
  overallScore?: number;
  judgeScores?: { judgeId: string; judgeName: string; score: number }[];
  report?: JuryReport;
}

export interface JuryTurn {
  id: string;
  judgeId: string;
  judgeName: string;
  judgeTitle: string;
  question: string;
  userAnswer?: string;
  submittedAt?: string;
  feedback?: {
    technicalCorrectness: number; // 1-5
    specificity: number;
    evidence: number;
    clarity: number;
    confidenceOfReasoning: number;
    awarenessOfLimitations: number;
    critique: string;
    unsupportedClaimsDetected: string[];
    contradictions: string[];
    suggestedStrongerAnswer: string;
  };
}

export interface JuryReport {
  overallScore: number; // out of 100
  summary: string;
  verdict: 'Approved for Presentation' | 'Needs Critical Revision' | 'Strong Contender' | 'Disqualified / Unsubstantiated';
  strongestAnswers: string[];
  weakestAnswers: string[];
  unsupportedClaims: string[];
  contradictions: string[];
  missingEvidence: string[];
  technicalRisks: string[];
  productRisks: string[];
  suggestedImprovements: string[];
  recommendedFollowUps: string[];
}

export interface ProjectData {
  id: string;
  userId: string;
  name: string;
  theme: string;
  problemStatement: string;
  targetUsers: string;
  proposedSolution: string;
  mvpScope: string;
  features: {
    id: string;
    title: string;
    category: 'must' | 'should' | 'could' | 'out_of_scope';
    isImplemented: boolean;
  }[];
  architecture: {
    frontend: string;
    backend: string;
    database: string;
    apis: string[];
    deployment: string;
    auth: string;
  };
  tasks: KanbanTask[];
  demoScript: string;
  pitchNotes: string;
  securityChecklist: {
    id: string;
    item: string;
    checked: boolean;
  }[];
  updatedAt: string;
}

export interface KanbanTask {
  id: string;
  title: string;
  status: 'backlog' | 'todo' | 'in_progress' | 'testing' | 'done';
  priority: 'low' | 'medium' | 'high' | 'critical';
  estimateMinutes: number;
  assignedRole?: string;
}

export interface PitchAttempt {
  id: string;
  userId: string;
  projectId?: string;
  format: '30s_elevator' | '60s_idea' | '3m_competition' | '5m_technical' | '7m_grand_finale';
  pitchText: string;
  hookScore: number;
  problemScore: number;
  solutionScore: number;
  demoScore: number;
  differentiationScore: number;
  overallScore: number;
  wordCount: number;
  deliveryPaceWPM: number;
  vagueClaims: string[];
  sentenceImprovements: { original: string; suggested: string; reason: string }[];
  toughQuestions: string[];
  createdAt: string;
}

export interface TechnicalChallenge {
  id: string;
  title: string;
  category: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  timeEstimateMinutes: number;
  prerequisites: string[];
  problemStatement: string;
  constraints: string[];
  starterCode: string;
  testCases: { input: string; expectedOutput: string; isHidden?: boolean }[];
  hints: string[];
  referenceSolution: string;
  explanation: string;
  commonMistakes: string[];
  interviewFollowUps: string[];
}

export interface KnowledgeLesson {
  id: string;
  slug: string;
  track: 'Fundamentals' | 'Ideation & Discovery' | 'System Architecture' | 'Presentation & Pitch' | 'Competition Strategy';
  title: string;
  timeMinutes: number;
  summary: string;
  explanation: string;
  practicalExample: string;
  commonMistakes: string[];
  knowledgeCheck: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  }[];
  handsOnChallenge: string;
}

export interface TeamScenario {
  id: string;
  title: string;
  conflictCategory: string;
  involvedRoles: string[];
  context: string;
  incident: string;
  options: {
    id: string;
    action: string;
    scores: {
      communication: number;
      prioritization: number;
      conflictResolution: number;
      technicalSoundness: number;
    };
    outcome: string;
  }[];
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: string;
  unlockedAt?: string;
  progress: number; // 0 - 100
}
