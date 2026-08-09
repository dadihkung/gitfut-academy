"use client";

import { useState } from "react";
import { GitBranch, ArrowRight } from "lucide-react";
import { Who, GITHUB_URL_PATTERN } from "../types";

type Step = "who" | "github-check" | "github-input" | "github-signup";

interface Props {
  onDone: (who: Who, githubLink?: string) => void;
}

export default function RoleSelector({ onDone }: Props) {
  const [step, setStep] = useState<Step>("who");
  const [githubInput, setGithubInput] = useState("");
  const [githubError, setGithubError] = useState("");

  const handleGithubSubmit = () => {
    const trimmed = githubInput.trim();
    if (!GITHUB_URL_PATTERN.test(trimmed)) {
      setGithubError("Link-nya salah nih. Harusnya kayak gini: https://github.com/usernamekamu");
      return;
    }
    onDone("brother", trimmed);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#0B132B]/90 backdrop-blur-sm p-4">
      <div className="w-full max-w-lg rounded-3xl border border-[#FFD700]/30 bg-[#1C2541] p-8 shadow-[0_0_50px_rgba(255,215,0,0.15)]">

        {/* STEP 1: Siapa kamu? */}
        {step === "who" && (
          <>
            <div className="text-center mb-8">
              <p className="text-xs uppercase tracking-[0.35em] text-[#FFD700]">GitFut Academy</p>
              <h2 className="mt-4 text-3xl font-black text-white">
                Siapa kamu? <span className="text-slate-400 text-xl font-normal block mt-1">Who are you?</span>
              </h2>
            </div>
            <div className="grid gap-4 grid-cols-2">
              <button
                onClick={() => onDone("me")}
                className="rounded-2xl border border-[#FFD700]/30 bg-gradient-to-br from-[#FFD700]/10 to-[#00E676]/10 p-6 text-left transition hover:scale-[1.01] hover:border-[#FFD700]"
              >
                <h3 className="text-xl font-bold text-white">Dadih</h3>
                <p className="mt-2 text-sm text-slate-400">Sang pelatih & pembuat.</p>
                <p className="mt-1 text-xs text-slate-500 italic">The coach & creator.</p>
              </button>
              <button
                onClick={() => setStep("github-check")}
                className="rounded-2xl border border-[#00E676]/30 bg-gradient-to-br from-[#00E676]/10 to-[#FFD700]/10 p-6 text-left transition hover:scale-[1.01] hover:border-[#00E676]"
              >
                <h3 className="text-xl font-bold text-white">Ibrahim</h3>
                <p className="mt-2 text-sm text-slate-400">Sang pemain & murid.</p>
                <p className="mt-1 text-xs text-slate-500 italic">The player & student.</p>
              </button>
            </div>
          </>
        )}

        {/* STEP 2: Udah buat akun GitHub belum? */}
        {step === "github-check" && (
          <>
            <div className="text-center mb-8">
              <p className="text-xs uppercase tracking-[0.35em] text-[#00E676]">Halo Ibrahim 👋</p>
              <h2 className="mt-4 text-2xl font-black text-white">
                Udah buat akun GitHub belum?
              </h2>
              <p className="mt-2 text-sm text-slate-400 italic">Have you created a GitHub account yet?</p>
            </div>
            <div className="grid gap-4 grid-cols-2">
              <button
                onClick={() => setStep("github-input")}
                className="rounded-2xl border border-[#00E676]/30 bg-[#00E676]/10 p-5 text-center transition hover:scale-[1.01] hover:border-[#00E676]"
              >
                <h3 className="text-lg font-bold text-white">Udah! ✅</h3>
                <p className="mt-1 text-sm text-slate-400">Link GitHub-ku udah siap.</p>
                <p className="mt-1 text-xs text-slate-500 italic">I have my GitHub link ready.</p>
              </button>
              <button
                onClick={() => setStep("github-signup")}
                className="rounded-2xl border border-slate-600 bg-slate-700/30 p-5 text-center transition hover:scale-[1.01] hover:border-slate-400"
              >
                <h3 className="text-lg font-bold text-white">Belum 😅</h3>
                <p className="mt-1 text-sm text-slate-400">Ajarin aku cara buatnya.</p>
                <p className="mt-1 text-xs text-slate-500 italic">Show me how to create one.</p>
              </button>
            </div>
            <button onClick={() => setStep("who")} className="mt-6 text-xs text-slate-500 hover:text-slate-300 w-full text-center">
              ← Kembali / Back
            </button>
          </>
        )}

        {/* STEP 3a: Masukkan URL GitHub */}
        {step === "github-input" && (
          <>
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-1">
                <GitBranch className="text-[#FFD700]" size={24} />
                <h3 className="text-xl font-bold">Tempel link GitHub kamu</h3>
              </div>
              <p className="text-sm text-slate-400">Ini cuma perlu dilakukan sekali aja.</p>
              <p className="text-xs text-slate-500 italic mt-1">You only need to do this once.</p>
            </div>
            <div className="space-y-3">
              <input
                type="url"
                placeholder="https://github.com/usernamekamu"
                className="w-full bg-black/50 border border-white/10 rounded-lg py-3 px-4 text-white focus:outline-none focus:border-[#FFD700]"
                value={githubInput}
                onChange={(e) => { setGithubInput(e.target.value); setGithubError(""); }}
              />
              {githubError && <p className="text-xs text-red-400">{githubError}</p>}
              <button
                onClick={handleGithubSubmit}
                disabled={!githubInput}
                className="w-full bg-gradient-to-r from-[#00E676] to-[#FFD700] disabled:from-slate-700 disabled:to-slate-700 disabled:text-slate-500 text-black font-bold py-3 rounded-lg flex items-center justify-center gap-2"
              >
                <GitBranch size={18} /> Masuk ke Academy / Enter the Academy
              </button>
            </div>
            <button onClick={() => setStep("github-check")} className="mt-4 text-xs text-slate-500 hover:text-slate-300 w-full text-center">
              ← Kembali / Back
            </button>
          </>
        )}

        {/* STEP 3b: Cara daftar GitHub */}
        {step === "github-signup" && (
          <>
            <div className="mb-6">
              <h3 className="text-xl font-bold">Buat akun GitHub dulu yuk</h3>
              <p className="text-sm text-slate-400 mt-1">Ikutin langkah-langkah ini, terus balik ke sini.</p>
              <p className="text-xs text-slate-500 italic mt-1">Follow these steps, then come back here.</p>
            </div>
            <ol className="space-y-3 mb-6">
              {[
                { id: "Buka", en: "Go to", rest: <><a href="https://github.com/signup" target="_blank" rel="noreferrer" className="text-blue-400 hover:underline">github.com/signup</a> {" "}dan buat akun gratis. <span className="text-slate-500 italic">(and create a free account.)</span></> },
                { id: "Pilih username yang kamu suka — ini jadi bagian dari link profilmu.", en: "Pick a username you're comfortable using long-term." },
                { id: "Verifikasi email kamu, terus login.", en: "Verify your email, then log in." },
                { id: "Link profil kamu bakal jadi:", en: "Your profile link will be:" },
              ].map((item, i) => (
                <li key={i} className="flex gap-3 text-sm text-slate-300">
                  <span className="flex-shrink-0 w-5 h-5 rounded-full bg-[#FFD700]/20 text-[#FFD700] text-xs font-bold flex items-center justify-center mt-0.5">{i + 1}</span>
                  <span>
                    {i === 0 ? <>{item.id} {item.rest}</> : i === 3 ? <>{item.id} <span className="text-slate-500 italic">({item.en})</span><br /><code className="bg-black/40 px-1.5 py-0.5 rounded text-[#00E676]">https://github.com/usernamekamu</code></> : <>{item.id} <span className="text-slate-500 italic">({item.en})</span></>}
                  </span>
                </li>
              ))}
            </ol>
            <a
              href="https://github.com/signup"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300 hover:underline mb-6"
            >
              Buka halaman daftar GitHub / Open GitHub signup <ArrowRight size={14} />
            </a>
            <button
              onClick={() => setStep("github-input")}
              className="w-full bg-[#00E676]/20 border border-[#00E676]/40 hover:bg-[#00E676]/30 text-[#00E676] font-bold py-3 rounded-lg transition"
            >
              Udah buat akunnya! / I created my account →
            </button>
            <button onClick={() => setStep("github-check")} className="mt-4 text-xs text-slate-500 hover:text-slate-300 w-full text-center">
              ← Kembali / Back
            </button>
          </>
        )}

      </div>
    </div>
  );
}
