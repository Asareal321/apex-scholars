import { Skeleton } from "@/components/ui/skeleton";

export default function BookLoading() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <Skeleton className="h-4 w-16" />
      <Skeleton className="mt-4 h-10 w-64" />
      <Skeleton className="mt-8 h-[28rem] rounded-xl" />
    </div>
  );
}
