"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, GitBranch } from "lucide-react";

interface GithubOnboardingModalProps {
  show: boolean;
  value: string;
  error: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
}

export default function GithubOnboardingModal({
  show,
  value,
  error,
  onChange,
  onSubmit,
}: GithubOnboardingModalProps) {
  return (
    <AnimatePresence>
      {show && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm">
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="bg-[#1C2541] border border-[#FFD700]/30 w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden max-h-[85vh] overflow-y-auto"
          >
            <div className="p-6 border-b border-white/10">
              <div className="flex items-center gap-3">
                <GitBranch className="text-[#FFD700]" size={28} />
                <div>
                  <h3 className="text-xl font-bold">Connect Your GitHub</h3>
                  <p className="text-sm text-slate-400">Needed before kickoff — this is where your work will live.</p>
                </div>
              </div>
            </div>

            <div className="p-6 space-y-6">
              <div className="space-y-3">
                <h4 className="text-sm font-bold text-[#00E676] uppercase tracking-wide">
                  Don't have a GitHub account yet?
                </h4>
                <ol className="space-y-2">
                  <li className="flex gap-3 text-sm text-slate-300">
                    <span className="flex-shrink-0 w-5 h-5 rounded-full bg-[#FFD700]/20 text-[#FFD700] text-xs font-bold flex items-center justify-center mt-0.5">1</span>
                    <span>
                      Go to{" "}
                      <a href="https://github.com/signup" target="_blank" rel="noreferrer" className="text-blue-400 hover:underline">
                        github.com/signup
                      </a>{" "}
                      and create a free account.
                    </span>
                  </li>
                  <li className="flex gap-3 text-sm text-slate-300">
                    <span className="flex-shrink-0 w-5 h-5 rounded-full bg-[#FFD700]/20 text-[#FFD700] text-xs font-bold flex items-center justify-center mt-0.5">2</span>
                    <span>Pick a username you're comfortable using long-term — it becomes part of your profile link.</span>
                  </li>
                  <li className="flex gap-3 text-sm text-slate-300">
                    <span className="flex-shrink-0 w-5 h-5 rounded-full bg-[#FFD700]/20 text-[#FFD700] text-xs font-bold flex items-center justify-center mt-0.5">3</span>
                    <span>Verify your email, then log in.</span>
                  </li>
                  <li className="flex gap-3 text-sm text-slate-300">
                    <span className="flex-shrink-0 w-5 h-5 rounded-full bg-[#FFD700]/20 text-[#FFD700] text-xs font-bold flex items-center justify-center mt-0.5">4</span>
                    <span>
                      Your profile link is: <code className="bg-black/40 px-1.5 py-0.5 rounded text-[#00E676]">https://github.com/yourusername</code>
                      <br />
                      <span className="text-slate-500">(Click your profile photo, top-right → "Your profile" to see it.)</span>
                    </span>
                  </li>
                </ol>

                
                  href="https://github.com/signup"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300 hover:underline"
                >
                  Open GitHub signup <ArrowRight size={14} />
                </a>
              </div>

              <div className="border-t border-white/10 pt-6 space-y-3">
                <label className="block text-sm font-semibold text-slate-300">
                  Paste your GitHub profile link
                </label>
                <input
                  type="url"
                  placeholder="https://github.com/yourusername"
                  className="w-full bg-black/50 border border-white/10 rounded-lg py-3 px-4 text-white focus:outline-none focus:border-[#FFD700]"
                  value={value}
                  onChange={(e) => onChange(e.target.value)}
                />
                {error && <p className="text-xs text-red-400">{error}</p>}
                <button
                  onClick={onSubmit}
                  disabled={!value}
                  className="w-full bg-gradient-to-r from-[#00E676] to-[#FFD700] disabled:from-slate-700 disabled:to-slate-700 disabled:text-slate-500 text-black font-bold py-3 rounded-lg flex items-center justify-center gap-2 transition-colors"
                >
                  <GitBranch size={18} /> Save & Enter the Academy
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}