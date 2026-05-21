"use client";

import { useState } from "react";
import { siteConfig } from "@/lib/site-config";

export default function ContactForm() {
  const [status, setStatus] = useState<"idle"|"loading"|"success"|"error">("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");
    const data = Object.fromEntries(new FormData(e.currentTarget));
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    setStatus(res.ok ? "success" : "error");
  };

  if (status === "success") return (
    <div className="card p-8 lg:p-10 bg-white border-2 border-black flex flex-col items-center justify-center text-center gap-4 min-h-[380px]">
      <div className="w-14 h-14 rounded-full bg-lime flex items-center justify-center text-black text-2xl font-bold">✓</div>
      <h3 className="text-2xl font-bold text-black">Message sent!</h3>
      <p className="text-sm text-ink-60 leading-relaxed max-w-xs">We'll be in touch within one business day.</p>
    </div>
  );

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold text-black uppercase tracking-wider mb-2" htmlFor="name">Name</label>
          <input id="name" name="name" type="text" required className="w-full px-4 py-3 border border-ink-20 rounded-md text-black focus:border-black focus:outline-none" />
        </div>
        <div>
          <label className="block text-xs font-bold text-black uppercase tracking-wider mb-2" htmlFor="company">Company</label>
          <input id="company" name="company" type="text" required className="w-full px-4 py-3 border border-ink-20 rounded-md text-black focus:border-black focus:outline-none" />
        </div>
      </div>

      <div>
        <label className="block text-xs font-bold text-black uppercase tracking-wider mb-2" htmlFor="email">Email</label>
        <input id="email" name="email" type="email" required className="w-full px-4 py-3 border border-ink-20 rounded-md text-black focus:border-black focus:outline-none" />
      </div>

      <div>
        <label className="block text-xs font-bold text-black uppercase tracking-wider mb-2" htmlFor="revenue">Project Size</label>
        <select id="revenue" name="revenue" className="w-full px-4 py-3 border border-ink-20 rounded-md text-black focus:border-black focus:outline-none bg-white">
          <option>Select Project Size</option>
          <option>Small ($5K - 10K)</option>
          <option>Medium ($10K - 50K)</option>
          <option>Large ($50K - 100K)</option>
          <option>Enterprise ($50M+)</option>
        </select>
      </div>

      <div>
        <label className="block text-xs font-bold text-black uppercase tracking-wider mb-2" htmlFor="message">What is eating the most hours?</label>
        <textarea id="message" name="message" rows={4} required className="w-full px-4 py-3 border border-ink-20 rounded-md text-black focus:border-black focus:outline-none" />
      </div>

      {status === "error" && (
        <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-md px-4 py-3">
          Something went wrong. Please try again or email directly.
        </p>
      )}

      <button type="submit" disabled={status === "loading"} className="btn-primary w-full justify-center disabled:opacity-60 disabled:cursor-not-allowed">
        {status === "loading" ? "Sending..." : "Send request →"}
      </button>
    </form>
  );
}