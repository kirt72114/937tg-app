"use client";

import { useEffect, useState } from "react";
import { AlertCircle, Check, Loader2 } from "lucide-react";

export type SaveState =
  | { status: "idle"; lastSavedAt: Date | null }
  | { status: "dirty" }
  | { status: "saving" }
  | { status: "saved"; lastSavedAt: Date }
  | { status: "error"; message: string };

function formatRelative(date: Date, now: Date): string {
  const diff = (now.getTime() - date.getTime()) / 1000;
  if (diff < 5) return "just now";
  if (diff < 60) return `${Math.floor(diff)}s ago`;
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  return date.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
}

export function SaveStatus({ state }: { state: SaveState }) {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    if (state.status !== "saved" && state.status !== "idle") return;
    const interval = setInterval(() => setNow(new Date()), 15_000);
    return () => clearInterval(interval);
  }, [state.status]);

  if (state.status === "saving") {
    return (
      <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
        <Loader2 className="h-3.5 w-3.5 animate-spin" />
        Saving…
      </span>
    );
  }

  if (state.status === "dirty") {
    return (
      <span className="inline-flex items-center gap-1.5 text-xs text-amber-600">
        <AlertCircle className="h-3.5 w-3.5" />
        Unsaved changes
      </span>
    );
  }

  if (state.status === "saved") {
    return (
      <span className="inline-flex items-center gap-1.5 text-xs text-emerald-600">
        <Check className="h-3.5 w-3.5" />
        Saved {formatRelative(state.lastSavedAt, now)}
      </span>
    );
  }

  if (state.status === "error") {
    return (
      <span className="inline-flex items-center gap-1.5 text-xs text-destructive">
        <AlertCircle className="h-3.5 w-3.5" />
        {state.message || "Save failed"}
      </span>
    );
  }

  if (state.lastSavedAt) {
    return (
      <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
        <Check className="h-3.5 w-3.5" />
        Saved {formatRelative(state.lastSavedAt, now)}
      </span>
    );
  }

  return null;
}
