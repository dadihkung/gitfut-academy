import { Task } from "../types";

export const INITIAL_TASKS: Task[] = [
  {
    id: "DRILL-001",
    week: 1,
    title: "Warm-up: Blockly Games",
    desc: "Logic & Fundamentals",
    category: "LOG",
    status: "Bench",
    guide: {
      steps: [
        "Open Blockly Games in your browser — no install needed.",
        "Start with the 'Maze' level and work through each stage.",
        "Try to finish 'Bird' and 'Turtle' too — they teach loops and conditions.",
        "Take a screenshot or note your final level as proof of completion.",
      ],
      resources: [
        { label: "Blockly Games (play here)", url: "https://blockly.games/" },
      ],
    },
  },
  {
    id: "DRILL-002",
    week: 1,
    title: "Tactics Board: Flowchart",
    desc: "System Logic (Draw.io)",
    category: "LOG",
    status: "Bench",
    guide: {
      steps: [
        "Learn the 4 basic flowchart shapes: start/end (oval), process (rectangle), decision (diamond), input/output (parallelogram).",
        "Open draw.io (now diagrams.net) — it's free, no signup required.",
        "Draw a flowchart for something simple, like 'deciding what to eat for breakfast'.",
        "Export it as a PNG or share the link as your submission.",
      ],
      resources: [
        { label: "draw.io / diagrams.net", url: "https://app.diagrams.net/" },
        { label: "Flowchart basics (Tutorialspoint)", url: "https://www.tutorialspoint.com/software_testing_dictionary/flow_chart.htm" },
      ],
    },
  },
  {
    id: "DRILL-003",
    week: 2,
    title: "First Team Debut: Calculator",
    desc: "Python Terminal App",
    category: "PYT",
    status: "Bench",
    guide: {
      steps: [
        "Install Python from python.org if you haven't already.",
        "Learn `input()` and `print()` — how Python reads and shows text.",
        "Learn basic math operators: + - * /",
        "Write a script that asks for two numbers and an operation, then prints the result.",
        "Test it with a few different inputs to make sure it doesn't crash.",
      ],
      resources: [
        { label: "Download Python", url: "https://www.python.org/downloads/" },
        { label: "W3Schools Python Basics", url: "https://www.w3schools.com/python/" },
      ],
    },
  },
  {
    id: "DRILL-004",
    week: 2,
    title: "Penalty Shootout",
    desc: "Number Guessing Game",
    category: "PYT",
    status: "Bench",
    guide: {
      steps: [
        "Learn the `random` module — specifically `random.randint(a, b)`.",
        "Learn `while` loops and `if/elif/else` conditions.",
        "Have the program pick a random number, then loop until the user guesses it.",
        "Give hints like 'Too high!' or 'Too low!' after each guess.",
      ],
      resources: [
        { label: "Python random module (W3Schools)", url: "https://www.w3schools.com/python/module_random.asp" },
        { label: "Python while loops (W3Schools)", url: "https://www.w3schools.com/python/python_while_loops.asp" },
      ],
    },
  },
  {
    id: "DRILL-005",
    week: 3,
    title: "Building the Stadium",
    desc: "HTML Bio Page",
    category: "HTM",
    status: "Bench",
    guide: {
      steps: [
        "Learn the basic HTML structure: `<html>`, `<head>`, `<body>`.",
        "Learn text tags: `<h1>`, `<p>`, and image tag `<img>`.",
        "Build a simple bio page: your name, a photo, and 3 facts about yourself.",
        "Open the file directly in a browser to check it looks right.",
      ],
      resources: [
        { label: "W3Schools HTML Tutorial", url: "https://www.w3schools.com/html/" },
      ],
    },
  },
  {
    id: "DRILL-006",
    week: 4,
    title: "Jersey Customizer",
    desc: "CSS Flexbox Styling",
    category: "CSS",
    status: "Bench",
    guide: {
      steps: [
        "Play Flexbox Froggy first — it teaches flexbox visually through a game.",
        "Learn `display: flex`, `justify-content`, and `align-items`.",
        "Style your HTML bio page from DRILL-005 using flexbox to arrange elements.",
      ],
      resources: [
        { label: "Flexbox Froggy (game)", url: "https://flexboxfroggy.com/" },
        { label: "CSS-Tricks: Guide to Flexbox", url: "https://css-tricks.com/snippets/css/a-guide-to-flexbox/" },
      ],
    },
  },
  {
    id: "DRILL-007",
    week: 4,
    title: "UCL Final: Landing Page",
    desc: "CodePen Web Project",
    category: "CSS",
    status: "Bench",
    guide: {
      steps: [
        "Create a free CodePen account.",
        "Combine your HTML + CSS skills to build a one-page landing page (pick any topic — a game, a club, a hobby).",
        "Focus on layout and color choices, not just content.",
        "Save your Pen and copy the public link as your submission.",
      ],
      resources: [
        { label: "CodePen", url: "https://codepen.io/" },
      ],
    },
  },
  {
    id: "DRILL-008",
    week: 5,
    title: "Midfield Control: DOM",
    desc: "JS Interactivity & Themes",
    category: "JS",
    status: "Bench",
    guide: {
      steps: [
        "Learn `document.querySelector()` to grab elements from a page.",
        "Learn `addEventListener('click', ...)` to react to clicks.",
        "Build a light/dark theme toggle button using JavaScript.",
        "Test that clicking the button actually swaps the page's colors.",
      ],
      resources: [
        { label: "W3Schools JS HTML DOM", url: "https://www.w3schools.com/js/js_htmldom.asp" },
      ],
    },
  },
  {
    id: "DRILL-009",
    week: 6,
    title: "Pro Transfer Market",
    desc: "Git & GitHub Setup",
    category: "GIT",
    status: "Bench",
    guide: {
      steps: [
        "Install Git on your computer.",
        "Create a GitHub account (same one you linked at the start of this app).",
        'Learn: `git init`, `git add .`, `git commit -m "message"`, `git push`.',
        "Create a new repository on GitHub and push one of your earlier drills to it.",
      ],
      resources: [
        { label: "GitHub Docs: Getting Started", url: "https://docs.github.com/en/get-started" },
        { label: "Install Git", url: "https://git-scm.com/downloads" },
      ],
    },
  },
  {
    id: "DRILL-010",
    week: 7,
    title: "Tactical Analysis: SQL",
    desc: "Database Queries",
    category: "GIT",
    status: "Bench",
    guide: {
      steps: [
        "Learn `SELECT`, `FROM`, and `WHERE` — the core of reading data.",
        "Practice on W3Schools' built-in SQL editor (no install needed).",
        "Try writing a query that filters results using a condition.",
        "Bonus: try a simple `JOIN` between two tables.",
      ],
      resources: [
        { label: "W3Schools SQL Tutorial", url: "https://www.w3schools.com/sql/" },
      ],
    },
  },
  {
    id: "DRILL-011",
    week: 8,
    title: "Ballon d'Or Showcase",
    desc: "Final Deploy on Vercel",
    category: "GIT",
    status: "Bench",
    guide: {
      steps: [
        "Make sure your best project is pushed to a GitHub repository.",
        "Create a free Vercel account and connect it to your GitHub.",
        "Import your repository and deploy it — Vercel handles the rest.",
        "Copy your live site's URL as your final submission.",
      ],
      resources: [
        { label: "Vercel Docs", url: "https://vercel.com/docs" },
      ],
    },
  },
];
