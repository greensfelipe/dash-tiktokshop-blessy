import { cn } from "@/lib/utils";

type PersonColor = "green" | "blue" | "purple";

interface PersonCardProps {
  name: string;
  role: string;
  items: string[];
  color?: PersonColor;
}

const headerMap: Record<PersonColor, string> = {
  green: "bg-green-dark",
  blue: "bg-blue-blessy",
  purple: "bg-purple-700",
};

export default function PersonCard({ name, role, items, color = "green" }: PersonCardProps) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      <div className={cn("px-4 py-3.5 text-white", headerMap[color])}>
        <div className="font-bricolage text-base font-bold">{name}</div>
        <div className="text-[0.68rem] opacity-75 mt-0.5">{role}</div>
      </div>
      <div className="px-4 py-3.5">
        <ul className="list-none p-0">
          {items.map((item, i) => (
            <li
              key={i}
              className="flex gap-2 text-[0.75rem] py-1.5 border-b border-gray-100 last:border-0 leading-snug"
            >
              <span className="text-green-accent font-bold flex-shrink-0">→</span>
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
