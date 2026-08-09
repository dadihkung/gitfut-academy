import { useMemo } from "react";
import { Task, Category, Stats } from "./types";

export function useStats(tasks: Task[]): Stats {
  return useMemo(() => {
    const baseStats = { LOG: 50, PYT: 50, HTM: 50, CSS: 50, JS: 50, GIT: 50 };
    let approvedCount = 0;

    tasks.forEach((task) => {
      if (task.status === "Goal Scored!") {
        approvedCount++;
        baseStats[task.category] += 15;
      }
    });

    const ovr = Math.min(99, 60 + Math.floor((approvedCount / tasks.length) * 39));

    (Object.keys(baseStats) as Category[]).forEach((k) => {
      if (baseStats[k] > 99) baseStats[k] = 99;
    });

    return { ...baseStats, ovr, approvedCount, total: tasks.length };
  }, [tasks]);
}