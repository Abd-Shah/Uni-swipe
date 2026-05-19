import type { University } from "../data/universities";

type Props = { university: University; selected: boolean; onClick: () => void };

export default function SavedUniversityCard({ university, selected, onClick }: Props) {
  return (
    <button onClick={onClick} className={`w-full rounded-3xl border p-4 text-left shadow-lg transition ${selected ? "border-pink-500 bg-pink-50" : "border-transparent bg-white"}`}>
      <div className="flex items-center gap-4">
        <div className="h-24 w-24 rounded-2xl bg-cover bg-center" style={{ backgroundImage: `url(${university.image})` }} />
        <div className="flex-1">
          <h2 className="text-2xl font-bold text-gray-900">{university.name}</h2>
          <p className="text-gray-500">{university.city}, {university.country}</p>
          <p className="mt-1 text-sm text-gray-700">Rank #{university.globalRank} • {university.tuition}</p>
          <p className="mt-1 text-xs text-gray-500">Programs: {university.programs.slice(0, 3).join(", ")}</p>
        </div>
        <div className={`flex h-8 w-8 items-center justify-center rounded-full border ${selected ? "border-pink-500 bg-pink-500 text-white" : "border-gray-300 text-gray-400"}`}>✓</div>
      </div>
    </button>
  );
}
