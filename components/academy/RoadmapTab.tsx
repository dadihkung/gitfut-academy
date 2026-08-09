"use client";

import { motion } from "framer-motion";
import { Clock } from "lucide-react";
import { Task } from "./types";
import { STATUS_COLORS } from "@/lib/constants";

interface RoadmapTabProps {
  tasks: Task[];
  ovr: number;
  onSelectTask: (task: Task) => void;
}

export default function RoadmapTab({ tasks, ovr, onSelectTask }: RoadmapTabProps) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
      <div className="flex justify-between items-end border-b border-white/10 pb-4">
        <div>
          <h2 className="text-3xl font-bold">Match Fixtures</h2>
          <p className="text-slate-400">8-Week Training Season Roadmap</p>
        </div>
        <div className="text-right">
          <span className="text-[#00E676] font-bold text-xl">{ovr} OVR</span>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((week) => (
          <div key={week} className="bg-white/5 border border-white/10 rounded-xl p-5 backdrop-blur-sm">
            <h3 className="text-lg font-bold text-[#FFD700] mb-4 flex items-center gap-2">
              <Clock size={18} /> Match Week {week}
            </h3>
            <div className="space-y-3">
              {tasks.filter((t) => t.week === week).map((task) => (
                <div
                  key={task.id}
                  onClick={() => onSelectTask(task)}
                  className="bg-black/40 hover:bg-black/60 border border-white/5 rounded-lg p-4 cursor-pointer transition-colors group"
                >
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <span className="text-xs font-mono text-slate-500">{task.id}</span>
                      <h4 className="font-bold text-slate-200 group-hover:text-[#00E676] transition-colors">{task.title}</h4>
                    </div>
                    <span className={`text-[10px] font-bold px-2 py-1 rounded uppercase ${STATUS_COLORS[task.status]}`}>
                      {task.status}
                    </span>
                  </div>
                  <p className="text-sm text-slate-400">{task.desc}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}