import { Skeleton } from "@/components/ui/skeleton";

export default function PackagesLoading() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <Skeleton className="h-4 w-24" />
      <Skeleton className="mt-4 h-10 w-80" />
      <Skeleton className="mt-3 h-6 w-full max-w-xl" />
      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        <Skeleton className="h-80 rounded-xl" />
        <Skeleton className="h-80 rounded-xl" />
      </div>
    </div>
  );
}
