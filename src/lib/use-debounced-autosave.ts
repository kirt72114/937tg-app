"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { SaveState } from "@/components/admin/save-status";

export type AutosaveOptions<T> = {
  data: T;
  enabled: boolean;
  delayMs?: number;
  save: (data: T) => Promise<void>;
};

type Result = {
  state: SaveState;
  isDirty: boolean;
  flush: () => Promise<void>;
  reset: () => void;
};

export function useDebouncedAutosave<T>({
  data,
  enabled,
  delayMs = 2000,
  save,
}: AutosaveOptions<T>): Result {
  const [state, setState] = useState<SaveState>({
    status: "idle",
    lastSavedAt: null,
  });

  const dataRef = useRef(data);
  const saveRef = useRef(save);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const inflightRef = useRef<Promise<void> | null>(null);
  const baselineRef = useRef<string>(JSON.stringify(data));
  const enabledRef = useRef(enabled);

  useEffect(() => {
    dataRef.current = data;
  }, [data]);
  useEffect(() => {
    saveRef.current = save;
  }, [save]);
  useEffect(() => {
    enabledRef.current = enabled;
  }, [enabled]);

  const isDirty = JSON.stringify(data) !== baselineRef.current;

  const performSave = useCallback(async () => {
    if (inflightRef.current) {
      await inflightRef.current;
    }
    const snapshotJson = JSON.stringify(dataRef.current);
    if (snapshotJson === baselineRef.current) return;

    setState({ status: "saving" });
    const op = (async () => {
      try {
        await saveRef.current(dataRef.current);
        baselineRef.current = snapshotJson;
        setState({ status: "saved", lastSavedAt: new Date() });
      } catch (err) {
        setState({
          status: "error",
          message: err instanceof Error ? err.message : "Save failed",
        });
      }
    })();
    inflightRef.current = op;
    try {
      await op;
    } finally {
      inflightRef.current = null;
    }
  }, []);

  // Schedule debounced autosave when data changes & enabled
  useEffect(() => {
    if (!enabled) return;
    if (!isDirty) return;

    setState((prev) =>
      prev.status === "saving" ? prev : { status: "dirty" }
    );

    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      performSave();
    }, delayMs);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, enabled, isDirty, delayMs, performSave]);

  // beforeunload guard
  useEffect(() => {
    function handler(e: BeforeUnloadEvent) {
      if (isDirty) {
        e.preventDefault();
        e.returnValue = "";
      }
    }
    window.addEventListener("beforeunload", handler);
    return () => window.removeEventListener("beforeunload", handler);
  }, [isDirty]);

  const flush = useCallback(async () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    await performSave();
  }, [performSave]);

  const reset = useCallback(() => {
    baselineRef.current = JSON.stringify(dataRef.current);
    setState({ status: "saved", lastSavedAt: new Date() });
  }, []);

  return { state, isDirty, flush, reset };
}
