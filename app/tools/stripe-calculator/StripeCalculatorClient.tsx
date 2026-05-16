'use client';

import { useState } from 'react';

type Mode = 'forward' | 'gross-up';
type Variant = 'standard' | 'international' | 'ach';

const RATES: Record<Variant, { pct: number; fixed: number; label: string }> = {
  standard: { pct: 0.029, fixed: 0.3, label: 'US/Canada cards (2.9% + $0.30)' },
  international: { pct: 0.039, fixed: 0.3, label: 'International cards (3.9% + $0.30)' },
  ach: { pct: 0.008, fixed: 0, label: 'ACH (0.8%, capped at $5)' },
};

export default function StripeCalculatorClient() {
  const [mode, setMode] = useState<Mode>('forward');
  const [variant, setVariant] = useState<Variant>('standard');
  const [amount, setAmount] = useState<string>('100');

  const numeric = parseFloat(amount) || 0;
  const rate = RATES[variant];

  let invoice = 0;
  let fee = 0;
  let net = 0;
  let effectiveRate = 0;

  if (mode === 'forward') {
    invoice = numeric;
    fee = numeric * rate.pct + rate.fixed;
    if (variant === 'ach') fee = Math.min(fee, 5);
    net = invoice - fee;
    effectiveRate = invoice > 0 ? (fee / invoice) * 100 : 0;
  } else {
    net = numeric;
    invoice = (net + rate.fixed) / (1 - rate.pct);
    if (variant === 'ach') {
      const alt = net + 5;
      const altFee = alt * rate.pct;
      if (altFee >= 5) {
        invoice = alt;
        fee = 5;
      } else {
        invoice = net / (1 - rate.pct);
        fee = invoice * rate.pct;
      }
    } else {
      fee = invoice - net;
    }
    effectiveRate = invoice > 0 ? (fee / invoice) * 100 : 0;
  }

  return (
    <div className="bg-white border-2 border-black rounded-xl p-8 lg:p-10">
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <div>
          <label className="block text-xs font-bold text-black uppercase tracking-wider mb-3">Mode</label>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => setMode('forward')}
              className={`px-4 py-3 rounded-md text-sm font-semibold ${mode === 'forward' ? 'bg-black text-white' : 'bg-ink-5 text-black hover:bg-ink-10'}`}
            >
              Forward
            </button>
            <button
              onClick={() => setMode('gross-up')}
              className={`px-4 py-3 rounded-md text-sm font-semibold ${mode === 'gross-up' ? 'bg-black text-white' : 'bg-ink-5 text-black hover:bg-ink-10'}`}
            >
              Gross-up
            </button>
          </div>
          <p className="text-xs text-ink-60 mt-2">
            {mode === 'forward' ? 'Invoice amount → net received' : 'Target net → invoice amount needed'}
          </p>
        </div>

        <div>
          <label className="block text-xs font-bold text-black uppercase tracking-wider mb-3">Variant</label>
          <select
            value={variant}
            onChange={(e) => setVariant(e.target.value as Variant)}
            className="w-full px-4 py-3 border border-ink-20 rounded-md text-black focus:border-black focus:outline-none bg-white"
          >
            {Object.entries(RATES).map(([k, v]) => (
              <option key={k} value={k}>{v.label}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="mb-8">
        <label className="block text-xs font-bold text-black uppercase tracking-wider mb-3">
          {mode === 'forward' ? 'Invoice amount (USD)' : 'Target net (USD)'}
        </label>
        <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-2xl text-black font-bold">$</span>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            min="0"
            step="0.01"
            className="w-full pl-12 pr-4 py-4 text-2xl font-bold border border-ink-20 rounded-md text-black focus:border-black focus:outline-none"
          />
        </div>
      </div>

      <div className="bg-lime rounded-xl p-7">
        <div className="text-xs font-bold text-black uppercase tracking-wider mb-4">Result</div>
        <div className="grid sm:grid-cols-3 gap-6">
          <div>
            <div className="text-xs text-ink-70 mb-1 font-semibold">Invoice amount</div>
            <div className="text-2xl lg:text-3xl font-bold text-black">${invoice.toFixed(2)}</div>
          </div>
          <div>
            <div className="text-xs text-ink-70 mb-1 font-semibold">Stripe fee</div>
            <div className="text-2xl lg:text-3xl font-bold text-black">${fee.toFixed(2)}</div>
          </div>
          <div>
            <div className="text-xs text-ink-70 mb-1 font-semibold">Net received</div>
            <div className="text-2xl lg:text-3xl font-bold text-black">${net.toFixed(2)}</div>
          </div>
        </div>
        <div className="mt-5 pt-5 border-t border-black/20 flex items-baseline justify-between">
          <span className="text-xs font-bold text-black uppercase tracking-wider">Effective fee rate</span>
          <span className="text-xl font-bold text-black">{effectiveRate.toFixed(2)}%</span>
        </div>
      </div>
    </div>
  );
}
