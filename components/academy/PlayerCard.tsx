"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Stats } from "./types";
import { CARD_TEXT_COLOR } from "@/lib/constants";

interface PlayerCardProps {
  stats: Stats;
}

export default function PlayerCard({ stats }: PlayerCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center space-y-12"
    >
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold">Fatih's Player Profile</h2>
        <p className="text-slate-400">Complete drills to upgrade attributes.</p>
        <div className="w-64 h-3 bg-slate-800 rounded-full mx-auto overflow-hidden mt-4 border border-white/10">
          <motion.div
            className="h-full bg-gradient-to-r from-[#00E676] to-[#FFD700]"
            initial={{ width: 0 }}
            animate={{ width: `${(stats.approvedCount / stats.total) * 100}%` }}
          />
        </div>
        <p className="text-xs text-slate-500 mt-1">{stats.approvedCount} / {stats.total} Tasks Completed</p>
      </div>

      {/* 3D FUT CARD */}
      <motion.div
        whileHover={{ scale: 1.05, rotateY: 10, rotateX: 5 }}
        className="relative w-[360px] h-[520px] cursor-pointer drop-shadow-2xl"
        style={{ transformStyle: "preserve-3d" }}
      >
        <Image
          src="/card-bg.png"
          alt="FUT Card Base"
          fill
          priority
          sizes="360px"
          className="z-0 object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
        />

        <div className="absolute inset-0 z-10 font-sans">
          {/* Player Portrait */}
          <div className="absolute left-1/2 -translate-x-1/2 top-[9%] z-[15] h-[240px] w-[230px] overflow-visible pointer-events-none">
            <Image
              src="/fatih-pic3.png"
              alt="Fatih portrait"
              width={480}
              height={600}
              sizes="(max-width: 768px) 100vw, 230px"
              className="h-full w-full object-contain object-bottom scale-[1.1]"
              priority
            />
            <div
              className="absolute pointer-events-none"
              style={{
                left: "-15px",
                right: "-15px",
                bottom: "-14px",
                height: "calc(25% + 22px)",
                background:
                  "linear-gradient(to top, #f5f5ed 0%, #f5f5ed 20%, rgba(245,245,237,0.85) 45%, rgba(245,245,237,0.4) 70%, rgba(245,245,237,0) 100%)",
              }}
            />
          </div>

          {/* Top Left Stats */}
          <div className="absolute left-[18%] top-[15%] flex flex-col items-center z-20">
            <span className={`text-[48px] font-black leading-none drop-shadow-[0_2px_2px_rgba(0,0,0,0.25)] ${CARD_TEXT_COLOR}`}>
              {stats.ovr}
            </span>
            <span className={`text-[20px] font-bold uppercase tracking-wide ${CARD_TEXT_COLOR} mt-[-4px]`}>ST</span>

            <div className="mt-[4px] h-4 w-[26px] bg-white shadow-sm border border-black/10 flex flex-col">
              <div className="h-1/2 w-full bg-red-600"></div>
            </div>

            <div className="mt-[6px] h-8 w-8 relative">
              <Image src="/smk-badge1.png" alt="School badge" fill sizes="32px" className="object-contain" />
            </div>
          </div>

          {/* Player Name */}
          <div className="absolute top-[54%] w-full text-center z-20">
            <h2 className={`text-[28px] font-black uppercase tracking-[0.08em] drop-shadow-[0_1px_1px_rgba(0,0,0,0.2)] ${CARD_TEXT_COLOR}`}>
              FATIH
            </h2>
          </div>

          {/* Stats Grid */}
          <div className="absolute top-[61%] bottom-[22%] left-1/2 -translate-x-1/2 w-[68%] z-20">
            <div className={`absolute left-1/2 top-[5%] bottom-[5%] w-px bg-current opacity-15 -translate-x-1/2 ${CARD_TEXT_COLOR}`}></div>

            <div className={`grid grid-cols-2 gap-x-8 gap-y-1 h-full items-center ${CARD_TEXT_COLOR}`}>
              <div className="flex items-baseline gap-2 justify-end pr-3">
                <span className="text-[20px] font-black leading-none">{stats.LOG}</span>
                <span className="text-[13px] font-bold uppercase tracking-wide leading-none">LOG</span>
              </div>
              <div className="flex items-baseline gap-2 pl-3">
                <span className="text-[20px] font-black leading-none">{stats.CSS}</span>
                <span className="text-[13px] font-bold uppercase tracking-wide leading-none">CSS</span>
              </div>

              <div className="flex items-baseline gap-2 justify-end pr-3">
                <span className="text-[20px] font-black leading-none">{stats.PYT}</span>
                <span className="text-[13px] font-bold uppercase tracking-wide leading-none">PYT</span>
              </div>
              <div className="flex items-baseline gap-2 pl-3">
                <span className="text-[20px] font-black leading-none">{stats.JS}</span>
                <span className="text-[13px] font-bold uppercase tracking-wide leading-none">JS</span>
              </div>

              <div className="flex items-baseline gap-2 justify-end pr-3">
                <span className="text-[20px] font-black leading-none">{stats.HTM}</span>
                <span className="text-[13px] font-bold uppercase tracking-wide leading-none">HTM</span>
              </div>
              <div className="flex items-baseline gap-2 pl-3">
                <span className="text-[20px] font-black leading-none">{stats.GIT}</span>
                <span className="text-[13px] font-bold uppercase tracking-wide leading-none">GIT</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}