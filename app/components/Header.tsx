"use client";

import { Trophy, GitBranch } from "lucide-react";

interface Props {
  activeTab: "profile" | "roadmap" | "coach";
  setActiveTab: (tab: "profile" | "roadmap" | "coach") => void;
  githubLink: string | null;
  onEditGithub: () => void;
  onSwitchUser: () => void;
}

const TAB_LABELS: Record<string, string> = {
  profile: "Profil",
  roadmap: "Roadmap",
  coach: "Pelatih",
};

export default function Header({ activeTab, setActiveTab, githubLink, onEditGithub, onSwitchUser }: Props) {
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
              onClick={onEditGithub}
              className="hidden sm:flex items-center gap-2 text-xs text-slate-400 hover:text-[#00E676] transition-colors bg-black/30 px-3 py-2 rounded-lg border border-white/10"
            >
              <GitBranch size={14} />
              {githubLink.replace("https://github.com/", "@")}
            </button>
          )}
          <button
            onClick={onSwitchUser}
            className="text-xs text-slate-500 hover:text-white bg-black/30 px-3 py-2 rounded-lg border border-white/10 transition-colors"
          >
            Ganti Pengguna
          </button>
          <nav className="flex gap-2 bg-black/30 p-1 rounded-lg border border-white/10">
            {(["profile", "roadmap", "coach"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-md text-sm font-semibold uppercase tracking-wider transition-all ${
                  activeTab === tab
                    ? "bg-gradient-to-r from-[#FFD700] to-[#FDB931] text-black shadow-[0_0_15px_rgba(255,215,0,0.4)]"
                    : "hover:bg-white/10 text-slate-400"
                }`}
              >
                {TAB_LABELS[tab]}
              </button>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}
