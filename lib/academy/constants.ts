import { Status } from "./types";

export const STATUS_COLORS: Record<Status, string> = {
  "Bench": "bg-slate-700 text-slate-300",
  "In Play": "bg-blue-600 text-white",
  "VAR Check": "bg-yellow-500 text-black",
  "Goal Scored!": "bg-[#00E676] text-black",
};

export const GITHUB_STORAGE_KEY = "gitfut_github_link";
export const USER_ROLE_STORAGE_KEY = "gitfut_user_role";
export const TASKS_STORAGE_KEY = "gitfut_tasks";
export const GITHUB_URL_PATTERN = /^https:\/\/(www\.)?github\.com\/[a-zA-Z0-9-]+\/?$/;

export const CARD_TEXT_COLOR = "text-[#3d2b1f]";