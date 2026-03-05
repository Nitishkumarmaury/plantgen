export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center pt-20">
      <div className="flex flex-col items-center gap-3">
        <div className="w-8 h-8 border-2 border-neutral-200 border-t-neutral-900 rounded-full animate-spin" />
        <p className="text-sm text-neutral-400">Loading…</p>
      </div>
    </div>
  );
}
