"use client";
import { useState } from "react";

export default function Home() {
  const [inputs, setInputs] = useState<Record<string, string>>({
    brand_name: "",
    target_market: "",
    competitors: "",
    unique_value: "",
    brand_personality: "",
    key_benefits: "",
  });
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (key: string, value: string) => {
    setInputs((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setOutput("");
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ inputs }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Generation failed");
      setOutput(data.result || "No output received.");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-950 to-gray-900 text-gray-100">
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-fuchsia-500/10" />
        <div className="relative max-w-5xl mx-auto px-4 pt-16 pb-12 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-medium mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
            AI-Powered Brand Strategy
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            <span className="text-purple-400">Brand Positioning</span> Generator
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Craft compelling positioning statements and brand strategies with DeepSeek AI
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 pb-20">
        <div className="bg-gray-800/40 rounded-2xl p-8 border border-gray-700/50 backdrop-blur-sm">
          <h2 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
            <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A2 2 0 013 12V7a4 4 0 014-4z" />
            </svg>
            Brand Details
          </h2>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Brand Name</label>
                <input type="text" value={inputs.brand_name} onChange={(e) => handleChange("brand_name", e.target.value)} placeholder="e.g. Acme, Tesla, Notion" className="w-full px-4 py-2.5 bg-gray-900/80 border border-gray-700 rounded-xl text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Target Market</label>
                <input type="text" value={inputs.target_market} onChange={(e) => handleChange("target_market", e.target.value)} placeholder="e.g. Gen Z creators, B2B SaaS teams" className="w-full px-4 py-2.5 bg-gray-900/80 border border-gray-700 rounded-xl text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Key Competitors</label>
              <input type="text" value={inputs.competitors} onChange={(e) => handleChange("competitors", e.target.value)} placeholder="e.g. Competitor A, Competitor B — what makes you different?" className="w-full px-4 py-2.5 bg-gray-900/80 border border-gray-700 rounded-xl text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Unique Value Proposition</label>
              <textarea value={inputs.unique_value} onChange={(e) => handleChange("unique_value", e.target.value)} placeholder="What makes your brand uniquely valuable? What problem do you solve better than anyone else?" rows={3} className="w-full px-4 py-2.5 bg-gray-900/80 border border-gray-700 rounded-xl text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all resize-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Brand Personality</label>
              <input type="text" value={inputs.brand_personality} onChange={(e) => handleChange("brand_personality", e.target.value)} placeholder="e.g. Bold, playful, professional, disruptor, trustworthy" className="w-full px-4 py-2.5 bg-gray-900/80 border border-gray-700 rounded-xl text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Key Benefits (functional & emotional)</label>
              <textarea value={inputs.key_benefits} onChange={(e) => handleChange("key_benefits", e.target.value)} placeholder="List the top functional benefits (e.g. saves time, reduces cost) and emotional benefits (e.g. confidence, belonging)..." rows={3} className="w-full px-4 py-2.5 bg-gray-900/80 border border-gray-700 rounded-xl text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all resize-none" />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 px-6 rounded-xl font-semibold text-white bg-gradient-to-r from-purple-600 to-fuchsia-600 hover:from-purple-500 hover:to-fuchsia-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg shadow-purple-500/20 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Crafting Positioning...
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                  </svg>
                  Generate Brand Positioning
                </>
              )}
            </button>
          </form>
        </div>

        {error && (
          <div className="mt-6 bg-red-900/20 border border-red-500/40 rounded-xl p-4">
            <div className="flex items-start gap-3">
              <svg className="w-5 h-5 text-red-400 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-red-300 text-sm">{error}</p>
            </div>
          </div>
        )}

        {output && (
          <div className="mt-8 bg-gray-800/40 rounded-2xl p-8 border border-purple-500/30 backdrop-blur-sm">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Brand Positioning Framework
              </h3>
              <button onClick={() => navigator.clipboard.writeText(output)} className="text-sm text-purple-400 hover:text-purple-300 flex items-center gap-1 transition-colors">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                Copy
              </button>
            </div>
            <pre className="whitespace-pre-wrap text-gray-300 text-sm leading-relaxed font-mono">{output}</pre>
          </div>
        )}

        <div className="mt-12 text-center text-gray-600 text-sm">
          Powered by DeepSeek AI · Built with Next.js 16
        </div>
      </div>
    </div>
  );
}
