export type Status = "Bench" | "In Play" | "VAR Check" | "Goal Scored!";
export type Category = "LOG" | "PYT" | "HTM" | "CSS" | "JS" | "GIT";
export type UserRole = "coach" | "player";

export interface GuideResource {
  label: string;
  url: string;
}

export interface Guide {
  steps: string[];
  resources: GuideResource[];
}

export interface Task {
  id: string;
  week: number;
  title: string;
  desc: string;
  category: Category;
  status: Status;
  demoUrl?: string;
  coachNotes?: string;
  guide: Guide;
}

export interface Stats {
  LOG: number;
  PYT: number;
  HTM: number;
  CSS: number;
  JS: number;
  GIT: number;
  ovr: number;
  approvedCount: number;
  total: number;
}