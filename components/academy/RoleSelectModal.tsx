"use client";

import { ShieldAlert, Trophy } from "lucide-react";
import { UserRole } from "./types";

interface RoleSelectModalProps {
  onSelect: (role: UserRole) => void;
}

export default function RoleSelectModal({ onSelect }: RoleSelectModalProps) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#0B132B]/90 backdrop-blur-sm p-4">
      <div className="w-full max-w-2xl rounded-3xl border border-[#FFD700]/30 bg-[#1C2541] p-8 shadow-[0_0_50px_rgba(255,215,0,0.15)]">
        <div className="text-center mb-8">
          <p className="text-xs uppercase tracking-[0.35em] text-[#FFD700]">GitFut Academy</p>
          <h2 className="mt-4 text-3xl font-black text-white">Who are you?</h2>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <button
            onClick={() => onSelect("coach")}
            className="group rounded-2xl border border-[#FFD700]/30 bg-gradient-to-br from-[#FFD700]/10 to-[#00E676]/10 p-6 text-left transition hover:scale-[1.01] hover:border-[#FFD700]"
          >
            <div className="mb-3 inline-flex rounded-full bg-[#FFD700]/20 p-3 text-[#FFD700]">
              <ShieldAlert size={22} />
            </div>
            <h3 className="text-xl font-bold text-white">I am the Coach</h3>
            <p className="mt-2 text-sm text-slate-400">Review tasks, approve goals, and manage the academy.</p>
          </button>

          <button
            onClick={() => onSelect("player")}
            className="group rounded-2xl border border-[#00E676]/30 bg-gradient-to-br from-[#00E676]/10 to-[#FFD700]/10 p-6 text-left transition hover:scale-[1.01] hover:border-[#00E676]"
          >
            <div className="mb-3 inline-flex rounded-full bg-[#00E676]/20 p-3 text-[#00E676]">
              <Trophy size={22} />
            </div>
            <h3 className="text-xl font-bold text-white">I am the Player</h3>
            <p className="mt-2 text-sm text-slate-400">View my card, complete drills, and track progress.</p>
          </button>
        </div>
      </div>
    </div>
  );
}