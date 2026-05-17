import { cn } from "@/lib/utils";

interface MatchScoreBadgeProps {
  score: number;
  className?: string;
}

export default function MatchScoreBadge({ score, className }: MatchScoreBadgeProps) {
  let colorClass = "bg-emerald-500/10 text-emerald-600 border-emerald-500/20";
  if (score < 60) colorClass = "bg-red-500/10 text-red-600 border-red-500/20";
  else if (score < 80) colorClass = "bg-amber-500/10 text-amber-600 border-amber-500/20";

  return (
    <div className={cn("inline-flex items-center justify-center rounded-full border px-2.5 py-0.5 text-xs font-bold", colorClass, className)}>
      {score}% Match
    </div>
  );
}
