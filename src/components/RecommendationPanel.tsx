type Props = { result: string };
export default function RecommendationPanel({ result }: Props) {
  return (
    <div className="mt-6 rounded-3xl bg-white p-6 shadow-xl">
      <h2 className="mb-4 text-3xl font-black text-gray-900">Recommendation Result</h2>
      <p className="whitespace-pre-line text-lg leading-9 text-gray-700">{result}</p>
    </div>
  );
}
