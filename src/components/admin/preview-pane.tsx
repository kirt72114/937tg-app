"use client";

import { useState } from "react";
import { ExternalLink, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

export function PreviewPane({
  pageId,
  pageSlug,
  refreshKey,
}: {
  pageId: string;
  pageSlug: string;
  refreshKey: number;
}) {
  const [manualRefresh, setManualRefresh] = useState(0);
  const url = `/admin/pages/${pageId}/preview`;

  return (
    <div className="flex flex-col h-full border rounded-md overflow-hidden bg-background">
      <div className="flex items-center justify-between gap-2 border-b px-3 py-2 bg-muted/50">
        <div className="text-xs text-muted-foreground truncate">
          Live preview · <span className="font-mono">/{pageSlug}</span>
        </div>
        <div className="flex items-center gap-1">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="h-7 w-7"
            onClick={() => setManualRefresh((n) => n + 1)}
            title="Refresh preview"
          >
            <RefreshCw className="h-3.5 w-3.5" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="h-7 w-7"
            asChild
            title="Open public page"
          >
            <a
              href={`/${pageSlug}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </Button>
        </div>
      </div>
      <iframe
        key={`${refreshKey}-${manualRefresh}`}
        src={url}
        className="flex-1 w-full bg-white"
        title="Page preview"
      />
    </div>
  );
}
