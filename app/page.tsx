"use client";

import React, { useState, useEffect, useMemo } from "react";
import { INITIAL_TASKS } from "./data/tasks";
import { Task, UserRole, Category, Who, GITHUB_STORAGE_KEY, USER_ROLE_STORAGE_KEY, WHO_STORAGE_KEY } from "./types";
import RoleSelector from "./components/RoleSelector";
import Header from "./components/Header";
import ProfileTab from "./components/ProfileTab";
import RoadmapTab from "./components/RoadmapTab";
import CoachTab from "./components/CoachTab";
import TaskModal from "./components/TaskModal";

export default function GitFutAcademy() {
  const [tasks, setTasks] = useState<Task[]>(INITIAL_TASKS);
  const [activeTab, setActiveTab] = useState<"profile" | "roadmap" | "coach">("roadmap");
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [demoInput, setDemoInput] = useState("");
  const [coachPin, setCoachPin] = useState("");
  const [userRole, setUserRole] = useState<UserRole | null>(null);
  const [githubLink, setGithubLink] = useState<string | null>(null);
  const [who, setWho] = useState<Who | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("gitfut_tasks");
    if (saved) setTasks(JSON.parse(saved));

    const savedWho = localStorage.getItem(WHO_STORAGE_KEY) as Who | null;
    if (savedWho === "me" || savedWho === "brother") {
      setWho(savedWho);
      applyWho(savedWho);
    }

    const savedLink = localStorage.getItem(GITHUB_STORAGE_KEY);
    if (savedLink) setGithubLink(savedLink);
  }, []);

  useEffect(() => {
    localStorage.setItem("gitfut_tasks", JSON.stringify(tasks));
  }, [tasks]);

  function applyWho(w: Who) {
    const role: UserRole = w === "me" ? "coach" : "player";
    setUserRole(role);
    setActiveTab(w === "me" ? "coach" : "profile");
    localStorage.setItem(USER_ROLE_STORAGE_KEY, role);
  }

  const handleOnboardingDone = (w: Who, link?: string) => {
    localStorage.setItem(WHO_STORAGE_KEY, w);
    if (link) {
      localStorage.setItem(GITHUB_STORAGE_KEY, link);
      setGithubLink(link);
    }
    setWho(w);
    applyWho(w);
  };

  const stats = useMemo(() => {
    const baseStats = { LOG: 50, PYT: 50, HTM: 50, CSS: 50, JS: 50, GIT: 50 };
    let approvedCount = 0;
    tasks.forEach(task => {
      if (task.status === "Goal Scored!") {
        approvedCount++;
        baseStats[task.category] += 15;
      }
    });
    const ovr = Math.min(99, 60 + Math.floor((approvedCount / tasks.length) * 39));
    (Object.keys(baseStats) as Category[]).forEach(k => { if (baseStats[k] > 99) baseStats[k] = 99; });
    return { ...baseStats, ovr, approvedCount, total: tasks.length };
  }, [tasks]);

  const handleTaskSubmit = () => {
    if (!selectedTask) return;
    setTasks(tasks.map(t => t.id === selectedTask.id ? { ...t, status: "VAR Check", demoUrl: demoInput } : t));
    setSelectedTask(null);
    setDemoInput("");
  };

  const handleCoachApprove = (id: string) => {
    if (coachPin !== "1234") return alert("VAR Overruled: Incorrect Coach PIN");
    setTasks(tasks.map(t => t.id === id ? { ...t, status: "Goal Scored!" } : t));
  };

  return (
    <div className="min-h-screen bg-[#0B132B] text-slate-100 font-sans selection:bg-[#00E676] selection:text-black">
      {!who && <RoleSelector onDone={handleOnboardingDone} />}

      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        githubLink={githubLink}
        onEditGithub={() => {}}
      />

      <main className="max-w-6xl mx-auto px-6 py-12">
        {activeTab === "profile" && <ProfileTab stats={stats} />}
        {activeTab === "roadmap" && <RoadmapTab tasks={tasks} ovr={stats.ovr} onSelectTask={setSelectedTask} />}
        {activeTab === "coach" && (
          <CoachTab tasks={tasks} coachPin={coachPin} setCoachPin={setCoachPin} onApprove={handleCoachApprove} />
        )}
      </main>

      <TaskModal
        task={selectedTask}
        demoInput={demoInput}
        setDemoInput={setDemoInput}
        onSubmit={handleTaskSubmit}
        onClose={() => setSelectedTask(null)}
      />
    </div>
  );
}
