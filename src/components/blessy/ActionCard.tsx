import { cn } from "@/lib/utils";

type BorderColor = "green" | "blue" | "amber" | "red";

interface ActionCardProps {
  title: string;
  items: string[];
  border?: BorderColor;
}

const borderMap: Record<BorderColor, string> = {
  green: "border-l-green-accent",
  blue: "border-l-blue-blessy",
  amber: "border-l-amber-blessy",
  red: "border-l-red-blessy",
};

export default function ActionCard({ title, items, border = "green" }: ActionCardProps) {
  return (
    <div
      className={cn(
        "bg-white rounded-xl border border-gray-200 shadow-sm p-5 border-l-4",
        borderMap[border]
      )}
    >
      <h4 className="font-bricolage text-[0.9rem] font-bold text-green-dark mb-3">{title}</h4>
      <ul className="list-none p-0 space-y-0">
        {items.map((item, i) => (
          <li
            key={i}
            className="text-[0.75rem] py-1.5 border-b border-gray-100 last:border-0 leading-snug"
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
