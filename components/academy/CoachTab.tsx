"use client";

import { motion } from "framer-motion";
import { Lock, ShieldAlert } from "lucide-react";
import { Task } from "./types";

interface CoachTabProps {
  tasks: Task[];
  coachPin: string;
  onPinChange: (value: string) => void;
  onApprove: (id: string) => void;
}

export default function CoachTab({ tasks, coachPin, onPinChange, onApprove }: CoachTabProps) {
  const pendingTasks = tasks.filter((t) => t.status === "VAR Check");

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-2xl mx-auto mt-12">
      <div className="bg-[#1C2541] border border-[#FFD700]/30 rounded-2xl p-8 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-10">
          <ShieldAlert size={100} />
        </div>

        <h2 className="text-3xl font-black uppercase text-[#FFD700] mb-2">VAR Room</h2>
        <p className="text-slate-400 mb-8">Head Coach Usamah's Approval Panel</p>

        <div className="mb-6 flex gap-4">
          <div className="relative flex-1">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
            <input
              type="password"
              placeholder="Enter Coach PIN (1234)"
              className="w-full bg-black/50 border border-white/10 rounded-lg py-3 pl-10 pr-4 text-white focus:outline-none focus:border-[#FFD700]"
              value={coachPin}
              onChange={(e) => onPinChange(e.target.value)}
            />
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-bold border-b border-white/10 pb-2">Pending Reviews for Ibrahim</h3>
          {pendingTasks.length === 0 ? (
            <p className="text-slate-500 italic">No drills pending VAR check.</p>
          ) : (
            pendingTasks.map((task) => (
              <div key={task.id} className="bg-black/40 border border-yellow-500/30 p-4 rounded-lg flex justify-between items-center">
                <div>
                  <h4 className="font-bold text-yellow-500">{task.title}</h4>
                  <a href={task.demoUrl} target="_blank" rel="noreferrer" className="text-sm text-blue-400 hover:underline">
                    View Submission Link
                  </a>
                </div>
                <button
                  onClick={() => onApprove(task.id)}
                  className="bg-[#00E676] hover:bg-green-500 text-black font-bold px-4 py-2 rounded shadow-[0_0_10px_rgba(0,230,118,0.3)] transition-all"
                >
                  Approve Goal
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </motion.div>
  );
}