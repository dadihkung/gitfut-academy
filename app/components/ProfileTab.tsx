"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Trophy, Zap, Target, TrendingUp } from "lucide-react";
import { Task } from "../types";

interface Stats {
  ovr: number;
  LOG: number;
  PYT: number;
  HTM: number;
  CSS: number;
  JS: number;
  GIT: number;
  approvedCount: number;
  total: number;
}

interface Props {
  stats: Stats;
  tasks: Task[];
}

const cardTextColor = "text-[#3d2b1f]";

const SKILL_LABELS: Record<string, string> = {
  LOG: "Logic",
  PYT: "Python",
  HTM: "HTML",
  CSS: "CSS",
  JS: "JavaScript",
  GIT: "Git & Deploy",
};

const SKILL_COLORS: Record<string, string> = {
  LOG: "from-purple-500 to-purple-400",
  PYT: "from-blue-500 to-blue-400",
  HTM: "from-orange-500 to-orange-400",
  CSS: "from-pink-500 to-pink-400",
  JS: "from-yellow-500 to-yellow-400",
  GIT: "from-[#00E676] to-green-400",
};

export default function ProfileTab({ stats, tasks }: Props) {
  const completedTasks = tasks.filter(t => t.status === "Goal Scored!");
  const pendingTasks = tasks.filter(t => t.status === "VAR Check");
  const progressPct = Math.round((stats.approvedCount / stats.total) * 100);

  const rank =
    stats.ovr >= 90 ? "Legenda 🏆" :
    stats.ovr >= 80 ? "Pro ⭐" :
    stats.ovr >= 70 ? "Semi-Pro 🔥" :
    "Pemula 🌱";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
      className="max-w-5xl mx-auto space-y-10"
    >
      {/* TOP SECTION: card + skill bars side by side */}
      <div className="flex flex-col lg:flex-row gap-10 items-center lg:items-start justify-center">

        {/* FUT CARD */}
        <div className="flex flex-col items-center space-y-4">
          <motion.div
            whileHover={{ scale: 1.05, rotateY: 10, rotateX: 5 }}
            className="relative w-[320px] h-[460px] cursor-pointer drop-shadow-2xl flex-shrink-0"
            style={{ transformStyle: "preserve-3d" }}
          >
            <Image src="/card-bg.png" alt="FUT Card Base" fill priority sizes="320px"
              className="z-0 object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)]" />

            <div className="absolute inset-0 z-10 font-sans">
              <div className="absolute left-1/2 -translate-x-1/2 top-[9%] z-[15] h-[210px] w-[200px] overflow-visible pointer-events-none">
                <Image src="/fatih-pic.png" alt="Fatih portrait" width={480} height={600}
                  sizes="200px" className="h-full w-full object-contain object-bottom scale-[1.1]" priority />
                <div className="absolute pointer-events-none" style={{
                  left: "-15px", right: "-15px", bottom: "-14px",
                  height: "calc(25% + 22px)",
                  background: "linear-gradient(to top, #f5f5ed 0%, #f5f5ed 20%, rgba(245,245,237,0.85) 45%, rgba(245,245,237,0.4) 70%, rgba(245,245,237,0) 100%)",
                }} />
              </div>

              <div className="absolute left-[18%] top-[15%] flex flex-col items-center z-20">
                <span className={`text-[44px] font-black leading-none drop-shadow-[0_2px_2px_rgba(0,0,0,0.25)] ${cardTextColor}`}>{stats.ovr}</span>
                <span className={`text-[18px] font-bold uppercase tracking-wide ${cardTextColor} mt-[-4px]`}>ST</span>
                <div className="mt-[4px] h-4 w-[26px] bg-white shadow-sm border border-black/10 flex flex-col">
                  <div className="h-1/2 w-full bg-red-600"></div>
                </div>
                <div className="mt-[6px] h-8 w-8 relative">
                  <Image src="/smk-badge1.png" alt="School badge" fill sizes="32px" className="object-contain" />
                </div>
              </div>

              <div className="absolute top-[54%] w-full text-center z-20">
                <h2 className={`text-[26px] font-black uppercase tracking-[0.08em] drop-shadow-[0_1px_1px_rgba(0,0,0,0.2)] ${cardTextColor}`}>FATIH</h2>
              </div>

              <div className="absolute top-[61%] bottom-[22%] left-1/2 -translate-x-1/2 w-[68%] z-20">
                <div className={`absolute left-1/2 top-[5%] bottom-[5%] w-px bg-current opacity-15 -translate-x-1/2 ${cardTextColor}`}></div>
                <div className={`grid grid-cols-2 gap-x-8 gap-y-1 h-full items-center ${cardTextColor}`}>
                  {([["LOG", stats.LOG], ["CSS", stats.CSS], ["PYT", stats.PYT], ["JS", stats.JS], ["HTM", stats.HTM], ["GIT", stats.GIT]] as [string, number][]).map(([label, val], i) => (
                    <div key={label} className={`flex items-baseline gap-2 ${i % 2 === 0 ? "justify-end pr-3" : "pl-3"}`}>
                      <span className="text-[18px] font-black leading-none">{val}</span>
                      <span className="text-[12px] font-bold uppercase tracking-wide leading-none">{label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Rank badge */}
          <div className="text-center">
            <span className="text-xs uppercase tracking-widest text-slate-500">Peringkat / Rank</span>
            <p className="text-xl font-black text-[#FFD700] mt-1">{rank}</p>
          </div>
        </div>

        {/* RIGHT SIDE: progress + skill bars */}
        <div className="flex-1 w-full space-y-6 lg:pt-4">

          {/* Season progress */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-3">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-bold text-lg">Progres Musim <span className="text-slate-500 font-normal text-sm italic">(Season Progress)</span></h3>
                <p className="text-slate-400 text-sm">{stats.approvedCount} dari {stats.total} tugas selesai <span className="italic text-slate-500">(of {stats.total} tasks done)</span></p>
              </div>
              <span className="text-3xl font-black text-[#00E676]">{progressPct}%</span>
            </div>
            <div className="h-4 bg-slate-800 rounded-full overflow-hidden border border-white/10">
              <motion.div
                className="h-full bg-gradient-to-r from-[#00E676] to-[#FFD700] rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${progressPct}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
              />
            </div>
          </div>

          {/* Quick stats row */}
          <div className="grid grid-cols-3 gap-3">
            {[
              { icon: <Trophy size={18} />, label: "Gol / Goals", value: stats.approvedCount, color: "text-[#FFD700]" },
              { icon: <Target size={18} />, label: "VAR Check", value: pendingTasks.length, color: "text-yellow-400" },
              { icon: <Zap size={18} />, label: "OVR", value: stats.ovr, color: "text-[#00E676]" },
            ].map(({ icon, label, value, color }) => (
              <div key={label} className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
                <div className={`flex justify-center mb-1 ${color}`}>{icon}</div>
                <p className={`text-2xl font-black ${color}`}>{value}</p>
                <p className="text-xs text-slate-500 mt-1">{label}</p>
              </div>
            ))}
          </div>

          {/* Skill bars */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-4">
            <h3 className="font-bold text-sm uppercase tracking-widest text-slate-400">
              Atribut Skill <span className="italic normal-case">(Skill Attributes)</span>
            </h3>
            {(["LOG", "PYT", "HTM", "CSS", "JS", "GIT"] as const).map((key) => (
              <div key={key} className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span className="font-semibold text-slate-300">{SKILL_LABELS[key]} <span className="text-slate-600 text-xs">({key})</span></span>
                  <span className="font-black text-white">{stats[key]}</span>
                </div>
                <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                  <motion.div
                    className={`h-full rounded-full bg-gradient-to-r ${SKILL_COLORS[key]}`}
                    initial={{ width: 0 }}
                    animate={{ width: `${stats[key]}%` }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* RECENT ACTIVITY */}
      <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
        <h3 className="font-bold text-sm uppercase tracking-widest text-slate-400 mb-4">
          <TrendingUp size={14} className="inline mr-2" />
          Aktivitas Terbaru <span className="italic normal-case">(Recent Activity)</span>
        </h3>
        {completedTasks.length === 0 ? (
          <p className="text-slate-500 italic text-sm">Belum ada tugas yang selesai. Ayo mulai! <span className="text-slate-600">(No completed tasks yet. Let's go!)</span></p>
        ) : (
          <div className="space-y-2">
            {completedTasks.slice(-5).reverse().map(task => (
              <div key={task.id} className="flex items-center gap-3 bg-black/30 rounded-lg px-4 py-3">
                <span className="text-[#00E676] text-lg">⚽</span>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-slate-200">{task.title}</p>
                  <p className="text-xs text-slate-500">{task.id} • {task.category}</p>
                </div>
                <span className="text-xs font-bold text-[#00E676] bg-[#00E676]/10 px-2 py-1 rounded">Gol! ✅</span>
              </div>
            ))}
          </div>
        )}
      </div>

    </motion.div>
  );
}
