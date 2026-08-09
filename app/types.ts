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

export const STATUS_COLORS: Record<Status, string> = {
  "Bench": "bg-slate-700 text-slate-300",
  "In Play": "bg-blue-600 text-white",
  "VAR Check": "bg-yellow-500 text-black",
  "Goal Scored!": "bg-[#00E676] text-black",
};

export const GITHUB_STORAGE_KEY = "gitfut_github_link";
export const USER_ROLE_STORAGE_KEY = "gitfut_user_role";
export const WHO_STORAGE_KEY = "gitfut_who";
export const GITHUB_URL_PATTERN = /^https:\/\/(www\.)?github\.com\/[a-zA-Z0-9-]+\/?$/;
export type Who = "me" | "brother";
