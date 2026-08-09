"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Play, CheckCircle, Clock, BookOpen, ExternalLink } from "lucide-react";
import { Task, STATUS_COLORS } from "../types";

interface Props {
  task: Task | null;
  demoInput: string;
  setDemoInput: (v: string) => void;
  onSubmit: () => void;
  onClose: () => void;
}

const STATUS_LABELS: Record<string, string> = {
  "Bench": "Cadangan (Bench)",
  "In Play": "Sedang Dikerjakan (In Play)",
  "VAR Check": "Lagi Dicek (VAR Check)",
  "Goal Scored!": "Gol! ✅ (Goal Scored!)",
};

export default function TaskModal({ task, demoInput, setDemoInput, onSubmit, onClose }: Props) {
  return (
    <AnimatePresence>
      {task && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="bg-[#1C2541] border border-white/10 w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden max-h-[85vh] overflow-y-auto"
          >
            <div className="p-6 border-b border-white/10 flex justify-between items-start sticky top-0 bg-[#1C2541] z-10">
              <div>
                <span className="text-xs font-mono text-[#00E676] bg-[#00E676]/10 px-2 py-1 rounded">
                  {task.id} • {task.category}
                </span>
                <h3 className="text-2xl font-bold mt-2">{task.title}</h3>
                <p className="text-slate-400 mt-1">{task.desc}</p>
              </div>
              <button onClick={onClose} className="text-slate-500 hover:text-white text-xl p-2">&times;</button>
            </div>

            <div className="p-6 space-y-6">
              <div className="flex items-center justify-between bg-black/30 p-4 rounded-lg border border-white/5">
                <span className="text-sm font-semibold text-slate-300">Status Pertandingan: <span className="italic font-normal text-slate-500">(Match Status)</span></span>
                <span className={`text-xs font-bold px-3 py-1.5 rounded uppercase ${STATUS_COLORS[task.status]}`}>
                  {STATUS_LABELS[task.status]}
                </span>
              </div>

              <div className="bg-black/30 border border-white/5 rounded-lg p-4 space-y-4">
                <h4 className="flex items-center gap-2 text-sm font-bold text-[#FFD700] uppercase tracking-wide">
                  <BookOpen size={16} /> Cara Belajar Ini <span className="text-slate-500 font-normal normal-case">(How to Learn This)</span>
                </h4>
                <ol className="space-y-2">
                  {task.guide.steps.map((step, i) => (
                    <li key={i} className="flex gap-3 text-sm text-slate-300">
                      <span className="flex-shrink-0 w-5 h-5 rounded-full bg-[#00E676]/20 text-[#00E676] text-xs font-bold flex items-center justify-center mt-0.5">
                        {i + 1}
                      </span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ol>
                {task.guide.resources.length > 0 && (
                  <div className="pt-3 border-t border-white/5 space-y-2">
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                      Sumber Belajar <span className="normal-case italic">(Resources)</span>
                    </p>
                    {task.guide.resources.map((r, i) => (
                      <a key={i} href={r.url} target="_blank" rel="noreferrer"
                        className="flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300 hover:underline"
                      >
                        <ExternalLink size={12} /> {r.label}
                      </a>
                    ))}
                  </div>
                )}
              </div>

              {task.status === "Bench" || task.status === "In Play" ? (
                <div className="space-y-4">
                  <label className="block text-sm font-semibold text-slate-300">
                    Link Demo / Repo kamu <span className="italic font-normal text-slate-500">(Demo / Repo URL)</span>
                  </label>
                  <input
                    type="url"
                    placeholder="https://github.com/... atau link Replit"
                    className="w-full bg-black/50 border border-white/10 rounded-lg py-3 px-4 text-white focus:outline-none focus:border-[#00E676]"
                    value={demoInput}
                    onChange={(e) => setDemoInput(e.target.value)}
                  />
                  <button
                    onClick={onSubmit}
                    disabled={!demoInput}
                    className="w-full bg-[#00E676] disabled:bg-slate-700 disabled:text-slate-500 text-black font-bold py-3 rounded-lg flex items-center justify-center gap-2 transition-colors"
                  >
                    <Play size={18} fill="currentColor" /> Kirim untuk Dicek Pelatih <span className="font-normal text-xs ml-1 italic">(Submit for VAR Review)</span>
                  </button>
                </div>
              ) : (
                <div className="bg-[#00E676]/10 border border-[#00E676]/30 p-4 rounded-lg text-center space-y-2">
                  {task.status === "Goal Scored!" ? (
                    <>
                      <CheckCircle className="mx-auto text-[#00E676] w-12 h-12" />
                      <p className="font-bold text-[#00E676]">Gol disetujui Pelatih Usamah! 🎉</p>
                      <p className="text-sm text-slate-400 italic">(Goal Approved by Coach Usamah!)</p>
                      <p className="text-sm text-slate-400">Atribut FUT Card Ibrahim sudah diupgrade. <span className="italic">(Stats upgraded on Ibrahim's FUT Card.)</span></p>
                    </>
                  ) : (
                    <>
                      <Clock className="mx-auto text-yellow-500 w-12 h-12" />
                      <p className="font-bold text-yellow-500">Lagi Dicek Pelatih ⏳</p>
                      <p className="text-sm text-slate-400 italic">(Under VAR Review)</p>
                      <p className="text-sm text-slate-400">Menunggu persetujuan Pelatih Usamah. <span className="italic">(Awaiting Coach Usamah's approval.)</span></p>
                      <p className="text-xs truncate bg-black/30 p-2 mt-2 rounded">{task.demoUrl}</p>
                    </>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
