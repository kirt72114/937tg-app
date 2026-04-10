"use client";

import { Button } from "@/components/ui/button";

export default function AdminError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-destructive/10 mb-6">
        <span className="text-3xl font-bold text-destructive">!</span>
      </div>
      <h1 className="text-2xl font-bold mb-2">Admin Error</h1>
      <p className="text-muted-foreground mb-6 max-w-md">
        Something went wrong in the admin panel. Please try again.
      </p>
      <Button onClick={reset}>Try Again</Button>
    </div>
  );
}
