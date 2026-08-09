"use client";

import { GitBranch, Trophy } from "lucide-react";

type Tab = "profile" | "roadmap" | "coach";

interface AppHeaderProps {
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
  githubLink: string | null;
  onGithubBadgeClick: () => void;
}

export default function AppHeader({ activeTab, onTabChange, githubLink, onGithubBadgeClick }: AppHeaderProps) {
  return (
    <header className="border-b border-white/10 bg-[#1C2541]/80 backdrop-blur-md sticky top-0 z-10">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <Trophy className="text-[#FFD700] w-8 h-8" />
          <h1 className="text-2xl font-bold tracking-wider uppercase text-transparent bg-clip-text bg-gradient-to-r from-[#00E676] to-[#FFD700]">
            GitFut Academy
          </h1>
        </div>

        <div className="flex items-center gap-4">
          {githubLink && (
            <button
              onClick={onGithubBadgeClick}
              className="hidden sm:flex items-center gap-2 text-xs text-slate-400 hover:text-[#00E676] transition-colors bg-black/30 px-3 py-2 rounded-lg border border-white/10"
            >
              <GitBranch size={14} />
              {githubLink.replace("https://github.com/", "@")}
            </button>
          )}
          <nav className="flex gap-2 bg-black/30 p-1 rounded-lg border border-white/10">
            {(["profile", "roadmap", "coach"] as Tab[]).map((tab) => (
              <button
                key={tab}
                onClick={() => onTabChange(tab)}
                className={`px-4 py-2 rounded-md text-sm font-semibold uppercase tracking-wider transition-all ${
                  activeTab === tab
                    ? "bg-gradient-to-r from-[#FFD700] to-[#FDB931] text-black shadow-[0_0_15px_rgba(255,215,0,0.4)]"
                    : "hover:bg-white/10 text-slate-400"
                }`}
              >
                {tab}
              </button>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}