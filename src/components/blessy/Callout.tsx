import { cn } from "@/lib/utils";

type CalloutVariant = "green" | "amber" | "blue" | "red" | "big";

interface CalloutProps {
  children: React.ReactNode;
  variant?: CalloutVariant;
}

const variantMap: Record<CalloutVariant, string> = {
  green: "bg-green-50/60 border-l-4 border-green-accent text-green-800",
  amber: "bg-amber-50/50 border-l-4 border-amber-blessy text-amber-900",
  blue: "bg-blue-50/50 border-l-4 border-blue-blessy text-blue-900",
  red: "bg-red-50/50 border-l-4 border-red-blessy text-red-900",
  big: "bg-lime/15 border-2 border-lime border-l-[6px] border-l-green-accent text-green-dark font-medium",
};

export default function Callout({ children, variant = "green" }: CalloutProps) {
  return (
    <div
      className={cn(
        "rounded-xl px-4 py-3.5 mb-4 text-[0.78rem] leading-relaxed",
        variant === "big" && "rounded-xl px-6 py-5 mb-7 text-[0.9rem] leading-7",
        variantMap[variant]
      )}
    >
      {children}
    </div>
  );
}
