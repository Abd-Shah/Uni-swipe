"use client";

type Props = {
  countries: string[];
  selectedCountry: string;
  setSelectedCountry: (value: string) => void;
  search: string;
  setSearch: (value: string) => void;
  coOpOnly: boolean;
  setCoOpOnly: (value: boolean) => void;
};

export default function FilterBar({ countries, selectedCountry, setSelectedCountry, search, setSearch, coOpOnly, setCoOpOnly }: Props) {
  return (
    <div className="mb-5 w-full max-w-sm rounded-3xl bg-white/80 p-4 shadow-lg backdrop-blur">
      <input
        value={search}
        onChange={(event) => setSearch(event.target.value)}
        placeholder="Search university or program..."
        className="mb-3 w-full rounded-2xl border border-gray-200 px-4 py-2 text-sm outline-none focus:border-pink-400"
      />
      <div className="flex gap-2">
        <select
          value={selectedCountry}
          onChange={(event) => setSelectedCountry(event.target.value)}
          className="flex-1 rounded-2xl border border-gray-200 px-3 py-2 text-sm outline-none focus:border-pink-400"
        >
          <option value="All">All countries</option>
          {countries.map((country) => (
            <option key={country} value={country}>{country}</option>
          ))}
        </select>
        <button
          onClick={() => setCoOpOnly(!coOpOnly)}
          className={`rounded-2xl px-4 py-2 text-sm font-semibold ${coOpOnly ? "bg-pink-500 text-white" : "bg-gray-100 text-gray-700"}`}
        >
          Co-op
        </button>
      </div>
    </div>
  );
}
