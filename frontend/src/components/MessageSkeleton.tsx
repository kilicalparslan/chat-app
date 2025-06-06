import { Skeleton } from "@/components/ui/skeleton";

const MessageSkeleton = () => {
  const skeletonMessages = Array(6).fill(null);

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {skeletonMessages.map((_, idx) => (
        <div
          key={idx}
          className={`flex items-start space-x-2 ${
            idx % 2 === 0 ? "justify-start" : "justify-end"
          }`}
        >
          {idx % 2 === 0 && <Skeleton className="size-10 rounded-full" />}

          <div>
            <Skeleton className="h-4 w-16 mb-2" />
            <div
              className={`rounded-lg p-3 max-w-xs ${
                idx % 2 === 0
                  ? "bg-muted"
                  : "bg-primary text-primary-foreground"
              }`}
            >
              <Skeleton className="h-16 w-[200px]" />
            </div>
          </div>

          {idx % 2 !== 0 && <Skeleton className="size-10 rounded-full" />}
        </div>
      ))}
    </div>
  );
};

export default MessageSkeleton;
