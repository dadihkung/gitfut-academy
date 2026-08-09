"use client";

import React, { useState, useEffect, useMemo } from "react";
import { INITIAL_TASKS } from "./data/tasks";
import { Task, UserRole, Category, Who, GITHUB_STORAGE_KEY, USER_ROLE_STORAGE_KEY, WHO_STORAGE_KEY } from "./types";
import { supabase } from "../lib/supabase";
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

  // Load tasks from Supabase, seed if empty
  useEffect(() => {
    const init = async () => {
      const { data } = await supabase.from("tasks").select("*");

      if (data && data.length > 0) {
        setTasks(data.map(row => ({
          id: row.id,
          week: row.week,
          title: row.title,
          desc: row.description,
          category: row.category,
          status: row.status,
          demoUrl: row.demo_url,
          guide: row.guide,
        })));
      } else {
        // First time — seed the table with initial tasks
        await supabase.from("tasks").insert(
          INITIAL_TASKS.map(t => ({
            id: t.id,
            week: t.week,
            title: t.title,
            description: t.desc,
            category: t.category,
            status: t.status,
            demo_url: t.demoUrl ?? null,
            guide: t.guide,
          }))
        );
      }
    };

    init();

    // Real-time subscription
    const channel = supabase
      .channel("tasks-changes")
      .on("postgres_changes", { event: "*", schema: "public", table: "tasks" }, (payload) => {
        if (payload.eventType === "UPDATE") {
          const row = payload.new;
          setTasks(prev => prev.map(t =>
            t.id === row.id ? { ...t, status: row.status, demoUrl: row.demo_url } : t
          ));
        }
      })
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, []);

  // Load who + github from localStorage
  useEffect(() => {
    const savedWho = localStorage.getItem(WHO_STORAGE_KEY) as Who | null;
    if (savedWho === "me" || savedWho === "brother") {
      setWho(savedWho);
      applyWho(savedWho);
    }
    const savedLink = localStorage.getItem(GITHUB_STORAGE_KEY);
    if (savedLink) setGithubLink(savedLink);
  }, []);

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

  const handleSwitchUser = () => {
    localStorage.removeItem(WHO_STORAGE_KEY);
    setWho(null);
    setUserRole(null);
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

  const handleTaskSubmit = async () => {
    if (!selectedTask) return;
    const { error } = await supabase.from("tasks")
      .update({ status: "VAR Check", demo_url: demoInput })
      .eq("id", selectedTask.id);
    if (error) return alert("Error: " + error.message);
    // Update local state immediately
    setTasks(prev => prev.map(t => t.id === selectedTask.id ? { ...t, status: "VAR Check", demoUrl: demoInput } : t));
    setSelectedTask(null);
    setDemoInput("");
  };

  const handleCoachApprove = async (id: string) => {
    if (coachPin !== "153023") return alert("VAR Overruled: Incorrect Coach PIN");
    const { error } = await supabase.from("tasks")
      .update({ status: "Goal Scored!" })
      .eq("id", id);
    if (error) return alert("Error: " + error.message);
    // Update local state immediately without waiting for realtime
    setTasks(prev => prev.map(t => t.id === id ? { ...t, status: "Goal Scored!" } : t));
  };

  return (
    <div className="min-h-screen bg-[#0B132B] text-slate-100 font-sans selection:bg-[#00E676] selection:text-black">
      {!who && <RoleSelector onDone={handleOnboardingDone} />}

      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        githubLink={githubLink}
        onEditGithub={() => {}}
        onSwitchUser={handleSwitchUser}
        who={who}
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
        githubLink={githubLink}
      />
    </div>
  );
}
