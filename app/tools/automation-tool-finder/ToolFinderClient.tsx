'use client';

import { useState } from 'react';

type Answer = string | null;

interface Question {
  id: string;
  prompt: string;
  options: { value: string; label: string }[];
}

const QUESTIONS: Question[] = [
  {
    id: 'volume',
    prompt: 'How many workflow executions per month?',
    options: [
      { value: 'low', label: 'Under 1,000' },
      { value: 'medium', label: '1,000 – 25,000' },
      { value: 'high', label: '25,000 – 250,000' },
      { value: 'enterprise', label: '250,000+' },
    ],
  },
  {
    id: 'complexity',
    prompt: 'How complex is the typical workflow?',
    options: [
      { value: 'simple', label: 'Linear (A → B → C)' },
      { value: 'branching', label: 'Branching logic (if/else)' },
      { value: 'custom', label: 'Custom code required' },
    ],
  },
  {
    id: 'governance',
    prompt: 'Do you have data residency or governance requirements?',
    options: [
      { value: 'none', label: 'No specific requirements' },
      { value: 'regional', label: 'Regional data residency (EU, US)' },
      { value: 'strict', label: 'Self-hosted required' },
    ],
  },
  {
    id: 'team',
    prompt: 'Who will maintain the workflows?',
    options: [
      { value: 'business', label: 'Business operator (non-technical)' },
      { value: 'mixed', label: 'Mixed team (some technical)' },
      { value: 'engineering', label: 'Engineering team' },
    ],
  },
];

interface ToolScore {
  name: string;
  score: number;
  pros: string[];
  cons: string[];
}

function evaluate(answers: Record<string, Answer>): ToolScore[] {
  const scores = {
    Zapier: { score: 0, pros: [] as string[], cons: [] as string[] },
    Make: { score: 0, pros: [] as string[], cons: [] as string[] },
    n8n: { score: 0, pros: [] as string[], cons: [] as string[] },
    'Native CRM': { score: 0, pros: [] as string[], cons: [] as string[] },
  };

  // Volume scoring
  if (answers.volume === 'low') {
    scores.Zapier.score += 3; scores.Zapier.pros.push('Cheapest option at low volume');
    scores['Native CRM'].score += 3; scores['Native CRM'].pros.push('Often free at low volume');
    scores.Make.score += 2;
  }
  if (answers.volume === 'medium') {
    scores.Zapier.score += 2; scores.Make.score += 3; scores.Make.pros.push('Best cost/feature ratio at medium volume');
    scores.n8n.score += 2;
  }
  if (answers.volume === 'high') {
    scores.n8n.score += 3; scores.n8n.pros.push('Per-execution cost stays flat with self-hosting');
    scores.Make.score += 2;
    scores.Zapier.cons.push('Per-task pricing becomes expensive');
  }
  if (answers.volume === 'enterprise') {
    scores.n8n.score += 3; scores.n8n.pros.push('Cost predictable at scale');
    scores.Zapier.cons.push('Cost prohibitive at this volume');
    scores.Make.cons.push('May hit operation limits');
  }

  // Complexity
  if (answers.complexity === 'simple') {
    scores.Zapier.score += 3; scores.Zapier.pros.push('Simplest to build linear workflows');
    scores['Native CRM'].score += 2;
  }
  if (answers.complexity === 'branching') {
    scores.Make.score += 3; scores.Make.pros.push('Best branching logic visualizer');
    scores.n8n.score += 2;
  }
  if (answers.complexity === 'custom') {
    scores.n8n.score += 3; scores.n8n.pros.push('Native custom code support');
    scores.Make.score += 1;
    scores.Zapier.cons.push('Code by Zapier exists but is limited');
  }

  // Governance
  if (answers.governance === 'strict') {
    scores.n8n.score += 4; scores.n8n.pros.push('Self-hosted satisfies strict governance');
    scores.Zapier.cons.push('Cannot self-host');
    scores.Make.cons.push('Cannot self-host');
  }
  if (answers.governance === 'regional') {
    scores.Zapier.score += 1;
    scores.Make.score += 1;
    scores.n8n.score += 2;
  }

  // Team
  if (answers.team === 'business') {
    scores.Zapier.score += 3; scores.Zapier.pros.push('Lowest learning curve for non-technical operators');
    scores['Native CRM'].score += 2;
  }
  if (answers.team === 'mixed') {
    scores.Make.score += 3; scores.Make.pros.push('Visual interface accessible to mixed teams');
  }
  if (answers.team === 'engineering') {
    scores.n8n.score += 3; scores.n8n.pros.push('Engineers prefer the developer experience');
  }

  return Object.entries(scores)
    .map(([name, data]) => ({ name, ...data }))
    .sort((a, b) => b.score - a.score);
}

export default function ToolFinderClient() {
  const [answers, setAnswers] = useState<Record<string, Answer>>({});
  const allAnswered = QUESTIONS.every((q) => answers[q.id]);
  const results = allAnswered ? evaluate(answers) : [];

  return (
    <div>
      <div className="space-y-6 mb-10">
        {QUESTIONS.map((q, i) => (
          <div key={q.id} className="card p-7">
            <div className="flex items-start gap-4 mb-4">
              <span className="w-9 h-9 bg-black text-white rounded-md flex items-center justify-center font-bold flex-shrink-0">
                {i + 1}
              </span>
              <h3 className="text-lg font-bold text-black leading-tight pt-1">{q.prompt}</h3>
            </div>
            <div className="grid sm:grid-cols-2 gap-2 ml-13">
              {q.options.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => setAnswers({ ...answers, [q.id]: opt.value })}
                  className={`text-left px-4 py-3 rounded-md text-sm font-semibold transition-colors ${
                    answers[q.id] === opt.value
                      ? 'bg-lime text-black'
                      : 'bg-ink-5 text-black hover:bg-ink-10'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      {allAnswered && (
        <div className="bg-black text-white rounded-xl p-8 lg:p-10">
          <div className="eyebrow-light mb-3">Recommendation</div>
          <h2 className="text-3xl font-bold text-white mb-8">Ranked results</h2>
          <div className="space-y-4">
            {results.map((r, i) => (
              <div key={r.name} className={`rounded-xl p-6 ${i === 0 ? 'bg-lime text-black' : 'bg-white/5 text-white border border-white/15'}`}>
                <div className="flex items-baseline justify-between mb-3 gap-3 flex-wrap">
                  <div className="flex items-center gap-3">
                    <span className={`w-9 h-9 rounded-md flex items-center justify-center font-bold ${i === 0 ? 'bg-black text-lime' : 'bg-lime text-black'}`}>
                      {i + 1}
                    </span>
                    <h3 className="text-2xl font-bold">{r.name}</h3>
                    {i === 0 && <span className="text-xs font-bold uppercase tracking-wider bg-black text-lime px-2 py-1 rounded">Best fit</span>}
                  </div>
                  <span className="text-sm font-bold opacity-70">Score: {r.score}</span>
                </div>
                {r.pros.length > 0 && (
                  <div className="mb-3">
                    <div className="text-xs font-bold uppercase tracking-wider mb-2 opacity-70">Why</div>
                    <ul className="space-y-1">
                      {r.pros.map((p, idx) => <li key={idx} className="text-sm">✓ {p}</li>)}
                    </ul>
                  </div>
                )}
                {r.cons.length > 0 && (
                  <div>
                    <div className="text-xs font-bold uppercase tracking-wider mb-2 opacity-70">Watch out for</div>
                    <ul className="space-y-1">
                      {r.cons.map((c, idx) => <li key={idx} className="text-sm">✕ {c}</li>)}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
