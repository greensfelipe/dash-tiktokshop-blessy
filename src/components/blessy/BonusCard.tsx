import { cn } from "@/lib/utils";

type BonusVariant = "gold" | "silver" | "bronze" | "team";

interface BonusCardProps {
  pos: string;
  name: string;
  prize: string;
  variant: BonusVariant;
}

const variantMap: Record<BonusVariant, string> = {
  gold: "bg-yellow-50 border-2 border-yellow-400 text-yellow-800",
  silver: "bg-gray-50 border-2 border-gray-400 text-gray-700",
  bronze: "bg-orange-50 border-2 border-orange-700 text-orange-900",
  team: "bg-green-50 border-2 border-green-500 text-green-800",
};

export default function BonusCard({ pos, name, prize, variant }: BonusCardProps) {
  return (
    <div className={cn("rounded-xl p-5 text-center", variantMap[variant])}>
      <div className="font-bricolage text-[1.8rem] font-extrabold mb-1">{pos}</div>
      <div className="text-[0.8rem] font-semibold mb-2">{name}</div>
      <div className="font-bricolage text-[1.4rem] font-bold">{prize}</div>
    </div>
  );
}
