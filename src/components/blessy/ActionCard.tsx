import { cn } from "@/lib/utils";
import { Checkbox } from "@/components/ui/checkbox";

type BorderColor = "green" | "blue" | "amber" | "red";

interface ActionCardProps {
  title: string;
  items: string[];
  border?: BorderColor;
  checklist?: boolean;
  checked?: boolean[];
  onToggle?: (index: number) => void;
}

const borderMap: Record<BorderColor, string> = {
  green: "border-l-green-accent",
  blue: "border-l-blue-blessy",
  amber: "border-l-amber-blessy",
  red: "border-l-red-blessy",
};

export default function ActionCard({
  title,
  items,
  border = "green",
  checklist = false,
  checked = [],
  onToggle,
}: ActionCardProps) {
  const doneCount = checked.filter(Boolean).length;

  return (
    <div
      className={cn(
        "bg-white rounded-xl border border-gray-200 shadow-sm p-5 border-l-4",
        borderMap[border]
      )}
    >
      <div className="flex items-center justify-between mb-3">
        <h4 className="font-bricolage text-[0.9rem] font-bold text-green-dark">{title}</h4>
        {checklist && (
          <span className={cn(
            "text-[0.65rem] font-semibold px-2 py-0.5 rounded-full",
            doneCount === items.length
              ? "bg-green-100 text-green-accent"
              : "bg-gray-100 text-gray-500"
          )}>
            {doneCount}/{items.length}
          </span>
        )}
      </div>
      <ul className="list-none p-0 space-y-0">
        {items.map((item, i) => {
          const isDone = checklist && checked[i];
          return (
            <li
              key={i}
              className={cn(
                "text-[0.75rem] py-1.5 border-b border-gray-100 last:border-0 leading-snug transition-all",
                checklist && "flex items-center gap-2.5 cursor-pointer select-none",
                isDone && "bg-green-50/50"
              )}
              onClick={checklist && onToggle ? () => onToggle(i) : undefined}
            >
              {checklist && (
                <Checkbox
                  checked={!!checked[i]}
                  onCheckedChange={() => onToggle?.(i)}
                  className="flex-shrink-0"
                />
              )}
              <span className={cn(isDone && "line-through text-gray-400")}>
                {item}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
