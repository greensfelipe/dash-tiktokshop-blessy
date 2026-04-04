import { cn } from "@/lib/utils";

interface KpiCardProps {
  label: string;
  value: string;
  sub?: string;
  variant?: "default" | "positive" | "warning" | "negative";
}

export default function KpiCard({ label, value, sub, variant = "default" }: KpiCardProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
      <div className="text-[0.7rem] text-gray-500 font-medium uppercase tracking-[0.04em] mb-1.5">
        {label}
      </div>
      <div
        className={cn(
          "font-bricolage text-[1.4rem] font-bold text-charcoal",
          variant === "positive" && "text-green-accent",
          variant === "warning" && "text-amber-blessy",
          variant === "negative" && "text-red-blessy"
        )}
      >
        {value}
      </div>
      {sub && <div className="text-[0.68rem] text-gray-400 mt-0.5">{sub}</div>}
    </div>
  );
}
