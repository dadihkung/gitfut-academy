"use client";

import { motion } from "framer-motion";
import { ShieldAlert, Lock } from "lucide-react";
import { Task } from "../types";

interface Props {
  tasks: Task[];
  coachPin: string;
  setCoachPin: (v: string) => void;
  onApprove: (id: string) => void;
}

export default function CoachTab({ tasks, coachPin, setCoachPin, onApprove }: Props) {
  const pending = tasks.filter(t => t.status === "VAR Check");

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-2xl mx-auto mt-12">
      <div className="bg-[#1C2541] border border-[#FFD700]/30 rounded-2xl p-8 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-10">
          <ShieldAlert size={100} />
        </div>

        <h2 className="text-3xl font-black uppercase text-[#FFD700] mb-1">Ruang VAR</h2>
        <p className="text-xs text-slate-500 italic mb-1">VAR Room</p>
        <p className="text-slate-400 mb-8">Panel Persetujuan Pelatih Usamah <span className="italic text-slate-500 text-sm">(Head Coach Usamah's Approval Panel)</span></p>

        <div className="mb-6 flex gap-4">
          <div className="relative flex-1">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
            <input
              type="password"
              placeholder="Masukkan PIN Pelatih (Enter Coach PIN)"
              className="w-full bg-black/50 border border-white/10 rounded-lg py-3 pl-10 pr-4 text-white focus:outline-none focus:border-[#FFD700]"
              value={coachPin}
              onChange={(e) => setCoachPin(e.target.value)}
            />
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-bold border-b border-white/10 pb-2">
            Tugas yang Menunggu Review Ibrahim{" "}
            <span className="text-slate-500 font-normal text-sm italic">(Pending Reviews for Ibrahim)</span>
          </h3>
          {pending.length === 0 ? (
            <p className="text-slate-500 italic">Belum ada tugas yang perlu dicek. <span className="text-slate-600">(No drills pending VAR check.)</span></p>
          ) : (
            pending.map(task => (
              <div key={task.id} className="bg-black/40 border border-yellow-500/30 p-4 rounded-lg flex justify-between items-center">
                <div>
                  <h4 className="font-bold text-yellow-500">{task.title}</h4>
                  <a href={task.demoUrl} target="_blank" rel="noreferrer" className="text-sm text-blue-400 hover:underline">
                    Lihat Link Tugas <span className="italic text-blue-500">(View Submission Link)</span>
                  </a>
                </div>
                <button
                  onClick={() => onApprove(task.id)}
                  className="bg-[#00E676] hover:bg-green-500 text-black font-bold px-4 py-2 rounded shadow-[0_0_10px_rgba(0,230,118,0.3)] transition-all"
                >
                  Setujui Gol! <span className="font-normal text-xs block">(Approve Goal)</span>
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </motion.div>
  );
}
