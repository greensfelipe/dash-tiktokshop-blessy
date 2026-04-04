interface ScheduleRowProps {
  time: string;
  title: string;
  description?: string;
}

export default function ScheduleRow({ time, title, description }: ScheduleRowProps) {
  return (
    <div className="flex items-stretch mb-2 rounded-xl overflow-hidden border border-gray-200 bg-white shadow-sm">
      <div className="bg-green-dark text-lime font-bricolage text-[0.75rem] font-bold px-3.5 py-2.5 min-w-[90px] flex items-center justify-center text-center">
        {time}
      </div>
      <div className="px-4 py-2.5 text-[0.75rem] leading-snug flex flex-col justify-center">
        <strong className="font-semibold text-green-dark text-[0.78rem]">{title}</strong>
        {description && <span className="text-gray-500 text-[0.7rem] mt-0.5">{description}</span>}
      </div>
    </div>
  );
}
