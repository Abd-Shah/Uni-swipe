type Props = { value: string; label: string };
export default function StatPill({ value, label }: Props) {
  return (
    <div className="rounded-2xl bg-gray-100 p-2 text-center">
      <p className="font-bold">{value}</p>
      <p className="text-xs text-gray-500">{label}</p>
    </div>
  );
}
