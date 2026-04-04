import { cn } from "@/lib/utils";

type BonusVariant = "gold" | "silver" | "bronze" | "team";

interface BonusCardProps {
  pos: string;
  name: string;
  prize: string;
  icon?: string;
  variant: BonusVariant;
}

const variantMap: Record<BonusVariant, string> = {
  gold: "bg-yellow-50 border-2 border-yellow-400 text-yellow-800",
  silver: "bg-gray-50 border-2 border-gray-400 text-gray-700",
  bronze: "bg-orange-50 border-2 border-orange-700 text-orange-900",
  team: "bg-green-50 border-2 border-green-500 text-green-800",
};

export default function BonusCard({ pos, name, prize, icon, variant }: BonusCardProps) {
  return (
    <div className={cn("rounded-xl p-5 text-center", variantMap[variant])}>
      <div className="font-bricolage text-[1.8rem] font-extrabold mb-1">{pos}</div>
      {icon && <div className="text-[2.4rem] mb-2">{icon}</div>}
      <div className="text-[0.8rem] font-semibold mb-2">{name}</div>
      <div className="font-bricolage text-[1.1rem] font-bold leading-snug">{prize}</div>
    </div>
  );
}
