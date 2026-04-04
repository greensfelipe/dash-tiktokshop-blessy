export default function NavIndicator() {
  return (
    <div className="fixed bottom-4 right-6 bg-green-dark text-white/70 px-3.5 py-1.5 rounded-lg text-[0.65rem] z-50 shadow-lg">
      <kbd className="bg-white/15 px-1.5 py-0.5 rounded text-[0.6rem]">←</kbd>{" "}
      <kbd className="bg-white/15 px-1.5 py-0.5 rounded text-[0.6rem]">→</kbd>{" "}
      navegar seções
    </div>
  );
}
