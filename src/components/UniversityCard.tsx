"use client";

import { useState } from "react";
import { motion, useMotionValue, useTransform } from "motion/react";
import { Heart, X } from "lucide-react";
import type { University } from "../data/universities";
import StatPill from "./StatPill";
import TagBadge from "./TagBadge";

type Props = { university: University; onSwipeLeft: () => void; onSwipeRight: () => void };

export default function UniversityCard({ university, onSwipeLeft, onSwipeRight }: Props) {
  const [leaving, setLeaving] = useState<"left" | "right" | null>(null);
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-250, 250], [-18, 18]);

  function swipe(direction: "left" | "right") {
    setLeaving(direction);
    setTimeout(() => {
      if (direction === "right") onSwipeRight();
      else onSwipeLeft();
      setLeaving(null);
      x.set(0);
    }, 250);
  }

  return (
    <motion.div
      drag="x"
      style={{ x, rotate }}
      dragConstraints={{ left: 0, right: 0 }}
      onDragEnd={(_, info) => {
        if (info.offset.x > 120) swipe("right");
        else if (info.offset.x < -120) swipe("left");
      }}
      animate={leaving === "right" ? { x: 600, rotate: 25, opacity: 0 } : leaving === "left" ? { x: -600, rotate: -25, opacity: 0 } : { x: 0, opacity: 1 }}
      transition={{ duration: 0.25 }}
      className="w-full max-w-sm overflow-hidden rounded-3xl bg-white shadow-2xl"
    >
      <div className="h-80 bg-cover bg-center" style={{ backgroundImage: `url(${university.image})` }} />
      <div className="space-y-4 p-5">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">{university.name}</h2>
          <p className="text-sm text-gray-500">{university.city}, {university.country}</p>
        </div>
        <div className="grid grid-cols-3 gap-2 text-sm">
          <StatPill value={`#${university.globalRank}`} label="Global" />
          <StatPill value={`${university.facultyRating}/10`} label="Faculty" />
          <StatPill value={university.acceptanceDifficulty} label="Admission" />
        </div>
        <p className="text-sm text-gray-700">{university.description}</p>
        <div className="rounded-2xl bg-gray-50 p-3">
          <p className="text-xs font-bold uppercase text-gray-500">Programs</p>
          <p className="mt-1 text-sm text-gray-700">{university.programs.slice(0, 4).join(" • ")}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {university.tags.map((tag) => <TagBadge key={tag} label={tag} />)}
          {university.coOp && <TagBadge label="Co-op Available" />}
        </div>
        <div className="flex justify-center gap-5 pt-2">
          <button onClick={() => swipe("left")} className="rounded-full bg-gray-100 p-4 text-gray-700 shadow"><X /></button>
          <button onClick={() => swipe("right")} className="rounded-full bg-pink-500 p-4 text-white shadow"><Heart /></button>
        </div>
      </div>
    </motion.div>
  );
}
