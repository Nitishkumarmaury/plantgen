export default function ProductSkeleton() {
  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-sage-100 animate-pulse">
      <div className="aspect-[4/5] bg-sage-100" />
      <div className="p-4 space-y-3">
        <div className="h-4 bg-sage-100 rounded w-3/4" />
        <div className="h-3 bg-sage-100 rounded w-full" />
        <div className="h-3 bg-sage-100 rounded w-2/3" />
        <div className="flex justify-between items-center mt-2">
          <div className="h-5 bg-sage-100 rounded w-16" />
          <div className="h-4 bg-sage-100 rounded w-20" />
        </div>
        <div className="h-10 bg-sage-100 rounded-xl mt-2" />
      </div>
    </div>
  );
}
