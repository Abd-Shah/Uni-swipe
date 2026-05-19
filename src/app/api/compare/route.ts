import { NextResponse } from "next/server";

type UniversityInput = {
  name: string;
  globalRank: number;
  facultyRating: number;
  careerScore: number;
  budgetScore: number;
  coOp: boolean;
  tuition: string;
};

function overallScore(uni: UniversityInput) {
  const rankingScore = (1000 - uni.globalRank) / 100;
  const coOpBonus = uni.coOp ? 1.5 : 0;
  return uni.careerScore + uni.facultyRating + uni.budgetScore * 0.5 + rankingScore + coOpBonus;
}

export async function POST(req: Request) {
  const { universities } = await req.json();

  if (!universities || universities.length < 2) {
    return NextResponse.json({ result: "Please select at least two universities to compare." });
  }

  const selected = universities as UniversityInput[];
  const bestOverall = [...selected].sort((a, b) => overallScore(b) - overallScore(a))[0];
  const bestBudget = [...selected].sort((a, b) => b.budgetScore - a.budgetScore)[0];
  const bestCareer = [...selected].sort((a, b) => b.careerScore - a.careerScore)[0];
  const bestRanking = [...selected].sort((a, b) => a.globalRank - b.globalRank)[0];
  const names = selected.map((u) => u.name).join(", ");

  return NextResponse.json({
    result: `🏆 Best Overall: ${bestOverall.name}

${bestOverall.name} has the strongest combined balance of ranking, faculty rating, career score, budget value, and co-op availability among your selected options.

💰 Best for Budget: ${bestBudget.name}

${bestBudget.name} appears to be the best budget-conscious choice based on its value score and tuition range (${bestBudget.tuition}).

🚀 Best for Career/Co-op: ${bestCareer.name}

${bestCareer.name} is the strongest career-focused option based on career score, tech reputation, and internship/co-op potential.

🌍 Best Global Ranking: ${bestRanking.name}

${bestRanking.name} has the strongest global ranking among the universities selected.

📌 Selected Universities:
${names}

Final Recommendation:
Choose ${bestOverall.name} for the best overall balance. Choose ${bestBudget.name} if cost matters most. Choose ${bestCareer.name} if career outcomes and internships are your top priority.`,
  });
}
