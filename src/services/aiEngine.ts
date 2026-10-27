import { JudgePersona, ProjectData } from '@/types';

export interface AIAnalysisRequest {
  type: 'jury_question' | 'jury_evaluation' | 'pitch_critique' | 'problem_validation' | 'idea_scoring';
  payload: Record<string, unknown>;
}

export interface AIEvaluationResponse {
  isAI: boolean;
  modelUsed: string;
  data: Record<string, unknown>;
}

/**
 * Checks whether an external AI key (GEMINI_API_KEY or OPENAI_API_KEY) is configured.
 */
export function isAIConfigured(): boolean {
  return Boolean(process.env.GEMINI_API_KEY || process.env.OPENAI_API_KEY);
}

/**
 * Generates an adversarial, in-character jury question.
 * Uses real API if configured, or high-fidelity deterministic evaluation engine.
 */
export async function generateJuryQuestion(
  judge: JudgePersona,
  project: ProjectData,
  turnNumber: number,
  previousAnswer?: string
): Promise<{ question: string; isAI: boolean; provider: string }> {
  const apiKey = process.env.GEMINI_API_KEY;

  if (apiKey) {
    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: `You are ${judge.name}, ${judge.title}. Your persona is: ${judge.personality}. Evaluation priority: ${judge.evaluationPriority}. Strictness: ${judge.strictness}/10.
The student is competing in a hackathon with project "${project.name}".
Problem: ${project.problemStatement}
Solution: ${project.proposedSolution}
MVP Scope: ${project.mvpScope}
Architecture: ${JSON.stringify(project.architecture)}
Current round: Turn ${turnNumber}.
${previousAnswer ? `The student previously answered: "${previousAnswer}". Identify weaknesses or probe their implementation deeper.` : 'Ask your sharpest initial question probing their claims, evidence, and implementation truth.'}
Rules:
- Be concise (1-2 sentences).
- Do not flatter or praise.
- Challenge vague statements, buzzwords, or missing details.
Return ONLY the question in plain text.`
            }]
          }]
        })
      });

      if (response.ok) {
        const json = await response.json();
        const text = json.candidates?.[0]?.content?.parts?.[0]?.text?.trim();
        if (text) {
          return { question: text, isAI: true, provider: 'Gemini 1.5 Flash' };
        }
      }
    } catch {
      // Fallback cleanly to deterministic engine below
    }
  }

  // Deterministic Persona-Engine Fallback
  return {
    question: getDeterministicJuryQuestion(judge, project, turnNumber, previousAnswer),
    isAI: false,
    provider: 'HackForge Deterministic Evaluation Engine'
  };
}

function getDeterministicJuryQuestion(
  judge: JudgePersona,
  project: ProjectData,
  turn: number,
  previousAnswer?: string
): string {
  if (previousAnswer && previousAnswer.length < 50) {
    return `Your previous response was too brief and lacked verifiable evidence. In your ${project.name} architecture, exactly what happens at the network and database layer when this action fails?`;
  }

  switch (judge.id) {
    case 'judge-1': // Technical Architect
      return turn === 1
        ? `You listed ${project.architecture.database} and ${project.architecture.frontend}. How do you prevent race conditions and duplicate writes when 50 concurrent requests arrive in under 500 milliseconds?`
        : `If your primary API or database connection drops during an emergency, what is your client-side failover protocol and how do you ensure eventual consistency?`;

    case 'judge-2': // Product & UX
      return turn === 1
        ? `Walk me through the exact first 15 seconds of a first-time user's journey. What is the single call-to-action, and how do you prevent abandonment if they don't have high-speed Wi-Fi?`
        : `Have you verified that your interface meets WCAG 2.1 AA accessibility standards for color contrast and screen readers, or is this only designed for tech-savvy developers?`;

    case 'judge-3': // Innovation Judge
      return turn === 1
        ? `Be honest: why couldn't this entire project simply be an automated Google Form linked to a Slack webhook or a standard Airtable view? What is the genuine technical differentiator here?`
        : `You claim novelty, but existing tools like PagerDuty or basic ticketing systems already exist. What specific capability does your MVP possess that they cannot duplicate with a single script?`;

    case 'judge-4': // Business & Impact
      return turn === 1
        ? `Who specifically is the buyer that pays the recurring cloud hosting and SMS costs for this solution, and what is their quantifiable return on investment?`
        : `If your customer acquisition cost exceeds $20 per organization, how does this remain financially sustainable for small community groups?`;

    case 'judge-5': // Security & AI
      return turn === 1
        ? `Where are your API keys and session tokens stored, and what prevents a malicious client from spoofing user permissions or forging payload timestamps?`
        : `If an adversary inputs an 8MB corrupted payload or automated spam injection into your public submission form, what specific layer catches and drops it?`;

    case 'judge-6': // Ruthless Judge
      return turn === 1
        ? `Cut the marketing fluff. What percentage of the features on your screen are actually connected to a live database right now versus hardcoded static mockups?`
        : `That sounds good on paper, but if I pull the network cable out of your laptop right now during the demo, does your application crash with an unhandled exception or degrade gracefully?`;

    default:
      return `How did you validate that your target users actually experience this problem at the frequency you described, rather than this being an assumed problem?`;
  }
}

/**
 * Evaluates a student's answer against rigorous criteria.
 */
export async function evaluateJuryAnswer(
  judge: JudgePersona,
  question: string,
  userAnswer: string
): Promise<{
  technicalCorrectness: number;
  specificity: number;
  evidence: number;
  clarity: number;
  confidenceOfReasoning: number;
  awarenessOfLimitations: number;
  critique: string;
  unsupportedClaimsDetected: string[];
  contradictions: string[];
  suggestedStrongerAnswer: string;
  isAI: boolean;
}> {
  const words = userAnswer.trim().split(/\s+/).length;
  const lower = userAnswer.toLowerCase();

  const unsupportedClaims: string[] = [];
  if (lower.includes('100%') || lower.includes('completely safe') || lower.includes('impossible to hack')) {
    unsupportedClaims.push('Absolutist claim (100% security / impossible to hack) without threat model qualification.');
  }
  if (lower.includes('everyone needs') || lower.includes('all users want')) {
    unsupportedClaims.push('Unsubstantiated market claim without citation or sample survey size.');
  }
  if (lower.includes('blockchain') && !lower.includes('gas') && !lower.includes('consensus')) {
    unsupportedClaims.push('Superficial blockchain buzzword cited without detailing transaction consensus.');
  }

  // Calculate scores objectively based on depth, terminology, and evidence
  const hasTechnicalDetails = lower.includes('index') || lower.includes('cache') || lower.includes('http') || lower.includes('token') || lower.includes('queue') || lower.includes('retry');
  const hasQuantifiableMetric = /\d+/.test(userAnswer);
  const acknowledgesTradeoff = lower.includes('however') || lower.includes('tradeoff') || lower.includes('limitation') || lower.includes('future') || lower.includes('currently');

  let technicalCorrectness = hasTechnicalDetails ? 4 : 3;
  let specificity = hasQuantifiableMetric ? 4 : 2;
  let evidence = acknowledgesTradeoff ? 4 : 2;
  let clarity = words >= 25 && words <= 120 ? 4 : words < 15 ? 2 : 3;
  const confidenceOfReasoning = words >= 30 ? 4 : 2;
  const awarenessOfLimitations = acknowledgesTradeoff ? 5 : 2;

  if (unsupportedClaims.length > 0) {
    evidence = Math.max(1, evidence - 1);
    technicalCorrectness = Math.max(1, technicalCorrectness - 1);
  }

  let critique = '';
  if (words < 20) {
    critique = `${judge.name} found this response too shallow. In high-stakes hackathon judging, answers must articulate the exact architectural layer or operational logic.`;
  } else if (unsupportedClaims.length > 0) {
    critique = `${judge.name} immediately penalized the ungrounded assertion: "${unsupportedClaims[0]}". Always ground answers in measurable boundaries.`;
  } else if (!acknowledgesTradeoff) {
    critique = `Solid explanation of functionality, but ${judge.name} noted a lack of humble constraint awareness. Proactively stating what your MVP cannot do builds immense credibility.`;
  } else {
    critique = `Strong, grounded engineering defense. You clearly stated the current implementation logic while acknowledging the next phase production roadmap.`;
  }

  return {
    technicalCorrectness,
    specificity,
    evidence,
    clarity,
    confidenceOfReasoning,
    awarenessOfLimitations,
    critique,
    unsupportedClaimsDetected: unsupportedClaims,
    contradictions: [],
    suggestedStrongerAnswer: `A stronger answer from a winning team: "In our 24-hour prototype, we use a lightweight in-memory cache with an SQLite backing store to maintain sub-50ms latency. If a write fails, our client shows an immediate retry toast with exponential backoff. For full production scale, we would replace this with Redis pub/sub and distributed transaction locks."`,
    isAI: false
  };
}

