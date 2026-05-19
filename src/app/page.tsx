"use client";

import { useEffect, useMemo, useState } from "react";
import UniversityCard from "../components/UniversityCard";
import FilterBar from "../components/FilterBar";
import { universities } from "../data/universities";

export default function Home() {
  const [index, setIndex] = useState(0);
  const [saved, setSaved] = useState<string[]>([]);
  const [selectedCountry, setSelectedCountry] = useState("All");
  const [search, setSearch] = useState("");
  const [coOpOnly, setCoOpOnly] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("savedUniversities");
    if (stored) setSaved(JSON.parse(stored));
  }, []);

  useEffect(() => setIndex(0), [selectedCountry, search, coOpOnly]);

  const countries = useMemo(() => Array.from(new Set(universities.map((uni) => uni.country))).sort(), []);

  const filteredUniversities = useMemo(() => {
    return universities.filter((uni) => {
      const matchesCountry = selectedCountry === "All" || uni.country === selectedCountry;
      const searchText = `${uni.name} ${uni.city} ${uni.country} ${uni.programs.join(" ")} ${uni.tags.join(" ")}`.toLowerCase();
      const matchesSearch = searchText.includes(search.toLowerCase());
      const matchesCoOp = !coOpOnly || uni.coOp;
      return matchesCountry && matchesSearch && matchesCoOp;
    });
  }, [selectedCountry, search, coOpOnly]);

  const currentUniversity = filteredUniversities[index];
  const visibleUniversities = filteredUniversities.slice(index, index + 3);

  function nextCard() { setIndex((prev) => prev + 1); }

  function handleSave() {
    if (currentUniversity) {
      const updated = saved.includes(currentUniversity.id) ? saved : [...saved, currentUniversity.id];
      setSaved(updated);
      localStorage.setItem("savedUniversities", JSON.stringify(updated));
      nextCard();
    }
  }

  function handlePass() { nextCard(); }

  function clearSaved() {
    localStorage.removeItem("savedUniversities");
    setSaved([]);
  }

  return (
    <main className="flex min-h-screen flex-col items-center bg-gradient-to-br from-pink-100 via-white to-purple-100 px-4 py-8">
      <div className="mb-5 text-center">
        <h1 className="text-5xl font-black text-gray-900">UniSwipe</h1>
        <p className="mt-2 text-lg text-gray-600">Discover universities with a swipe.</p>
        <p className="mt-3 text-sm font-medium text-pink-600">Saved Universities: {saved.length}</p>
        <div className="mt-4 flex justify-center gap-3">
          <button onClick={() => (window.location.href = "/saved")} className="rounded-full bg-black px-5 py-2 text-sm font-semibold text-white shadow-lg transition hover:scale-105">View Saved</button>
          <button onClick={clearSaved} className="rounded-full bg-white px-5 py-2 text-sm font-semibold text-gray-700 shadow-lg">Clear Saved</button>
        </div>
      </div>

      <FilterBar countries={countries} selectedCountry={selectedCountry} setSelectedCountry={setSelectedCountry} search={search} setSearch={setSearch} coOpOnly={coOpOnly} setCoOpOnly={setCoOpOnly} />

      <div className="relative flex h-[760px] w-full max-w-sm items-center justify-center">
        {visibleUniversities.length > 0 ? visibleUniversities.map((uni, i) => {
          const isTop = i === 0;
          return (
            <div key={uni.id} className="absolute w-full" style={{ zIndex: 10 - i, transform: `scale(${1 - i * 0.05}) translateY(${i * 14}px)` }}>
              <UniversityCard university={uni} onSwipeLeft={() => { if (isTop) handlePass(); }} onSwipeRight={() => { if (isTop) handleSave(); }} />
            </div>
          );
        }) : (
          <div className="rounded-3xl bg-white p-8 text-center shadow-xl">
            <h2 className="text-2xl font-bold text-gray-900">No more universities</h2>
            <p className="mt-2 text-gray-600">Adjust filters or clear your search.</p>
          </div>
        )}
      </div>
    </main>
  );
}
