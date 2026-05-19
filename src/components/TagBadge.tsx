type Props = { label: string };
export default function TagBadge({ label }: Props) {
  return <span className="rounded-full bg-pink-100 px-3 py-1 text-xs font-medium text-pink-600">{label}</span>;
}
