"use client";

import { useEffect, useRef, useState } from "react";
import { Plus, Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  BLOCK_TYPE_CATALOG,
  type BlockTypeMeta,
  type PageBlock,
} from "@/lib/content-blocks";

export function BlockPicker({
  onPick,
  trigger,
  align = "start",
}: {
  onPick: (block: PageBlock) => void;
  trigger?: React.ReactNode;
  align?: "start" | "center";
}) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!open) return;
    function onPointerDown(e: PointerEvent) {
      const node = containerRef.current;
      if (node && !node.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  useEffect(() => {
    if (open) {
      setQuery("");
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }, [open]);

  const q = query.trim().toLowerCase();
  const filtered: BlockTypeMeta[] = q
    ? BLOCK_TYPE_CATALOG.filter(
        (b) =>
          b.label.toLowerCase().includes(q) ||
          b.type.toLowerCase().includes(q) ||
          b.description.toLowerCase().includes(q)
      )
    : BLOCK_TYPE_CATALOG;

  function handlePick(meta: BlockTypeMeta) {
    onPick(meta.create());
    setOpen(false);
  }

  return (
    <div ref={containerRef} className="relative inline-block">
      <span onClick={() => setOpen((v) => !v)}>
        {trigger ?? (
          <Button type="button" variant="outline" size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Add Block
          </Button>
        )}
      </span>

      {open && (
        <div
          className={`absolute z-30 mt-2 w-[22rem] max-h-[28rem] flex flex-col rounded-md border bg-background shadow-lg overflow-hidden ${
            align === "center" ? "left-1/2 -translate-x-1/2" : "left-0"
          }`}
          role="dialog"
          aria-label="Add a block"
        >
          <div className="flex items-center gap-2 border-b p-2">
            <Search className="h-4 w-4 text-muted-foreground shrink-0" />
            <Input
              ref={inputRef}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search blocks..."
              className="h-8 border-0 shadow-none focus-visible:ring-0 px-0"
            />
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="text-muted-foreground hover:text-foreground"
              aria-label="Close"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="overflow-y-auto p-1">
            {filtered.length === 0 ? (
              <p className="p-3 text-sm text-muted-foreground text-center">
                No blocks match &ldquo;{query}&rdquo;
              </p>
            ) : (
              filtered.map((meta) => (
                <button
                  key={meta.type}
                  type="button"
                  onClick={() => handlePick(meta)}
                  className="w-full text-left rounded px-3 py-2 hover:bg-muted focus-visible:bg-muted focus-visible:outline-none"
                >
                  <div className="text-sm font-medium">{meta.label}</div>
                  <div className="text-xs text-muted-foreground">
                    {meta.description}
                  </div>
                </button>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
