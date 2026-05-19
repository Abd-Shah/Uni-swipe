"use client";

import { useEffect, useState } from "react";
import { universities } from "../../data/universities";
import SavedUniversityCard from "../../components/SavedUniversityCard";
import RecommendationPanel from "../../components/RecommendationPanel";

export default function SavedPage() {
  const [savedIds, setSavedIds] = useState<string[]>([]);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [result, setResult] = useState<string | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("savedUniversities");
    if (stored) setSavedIds(JSON.parse(stored));
  }, []);

  const savedUniversities = universities.filter((uni) => savedIds.includes(uni.id));

  function toggleSelected(id: string) {
    setSelectedIds((prev) => prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]);
  }

  async function handleCompare() {
    const selectedUnis = savedUniversities.filter((uni) => selectedIds.includes(uni.id));
    const res = await fetch("/api/compare", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ universities: selectedUnis }),
    });
    const data = await res.json();
    setResult(data.result);
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-100 via-white to-pink-100 p-6">
      <div className="mx-auto max-w-3xl">
        <button onClick={() => (window.location.href = "/")} className="mb-6 rounded-full bg-black px-4 py-2 text-sm font-semibold text-white">Back to Swipe</button>
        <h1 className="mb-2 text-center text-5xl font-black text-gray-900">Saved Universities</h1>
        <p className="mb-8 text-center text-gray-600">Select universities and compare them using the recommendation engine.</p>

        {savedUniversities.length === 0 ? (
          <div className="rounded-3xl bg-white p-8 text-center shadow-xl"><p className="text-gray-600">No universities saved yet.</p></div>
        ) : (
          <div className="space-y-4">
            {savedUniversities.map((uni) => (
              <SavedUniversityCard key={uni.id} university={uni} selected={selectedIds.includes(uni.id)} onClick={() => toggleSelected(uni.id)} />
            ))}
            <button disabled={selectedIds.length < 2} onClick={handleCompare} className="mt-6 w-full rounded-full bg-black px-5 py-4 font-bold text-white disabled:cursor-not-allowed disabled:bg-gray-300">
              Compare Universities ({selectedIds.length})
            </button>
            {result && <RecommendationPanel result={result} />}
          </div>
        )}
      </div>
    </main>
  );
}
