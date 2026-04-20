import { Card, CardContent } from "@/components/ui/card";
import {
  Download,
  FileText,
  FileImage,
  FileSpreadsheet,
  File as FileIcon,
} from "lucide-react";
import { listPublicFiles } from "@/lib/actions/files";
import type { FilesListBlock } from "@/lib/content-blocks";

const COLUMN_CLASSES: Record<number, string> = {
  1: "grid-cols-1",
  2: "grid-cols-1 md:grid-cols-2",
  3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
};

function iconFor(mimeType: string) {
  if (mimeType.startsWith("image/")) return FileImage;
  if (mimeType.includes("pdf") || mimeType.includes("text")) return FileText;
  if (mimeType.includes("sheet") || mimeType.includes("csv"))
    return FileSpreadsheet;
  return FileIcon;
}

function formatSize(bytes: number | bigint): string {
  const n = typeof bytes === "bigint" ? Number(bytes) : bytes;
  if (n < 1024) return `${n} B`;
  if (n < 1024 * 1024) return `${(n / 1024).toFixed(1)} KB`;
  return `${(n / (1024 * 1024)).toFixed(1)} MB`;
}

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
});

export async function FilesListDisplay({ block }: { block: FilesListBlock }) {
  const files = await listPublicFiles();
  const columns = COLUMN_CLASSES[block.columns] ?? COLUMN_CLASSES[3];

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 space-y-4">
      {block.heading && (
        <h2 className="text-lg font-bold">{block.heading}</h2>
      )}
      {files.length === 0 ? (
        <Card>
          <CardContent className="p-6 text-center text-sm text-muted-foreground">
            No files have been uploaded yet.
          </CardContent>
        </Card>
      ) : (
        <div className={`grid gap-3 ${columns}`}>
          {files.map((f) => {
            const Icon = iconFor(f.mimeType);
            return (
              <a
                key={f.id}
                href={f.publicUrl}
                target="_blank"
                rel="noopener noreferrer"
                download
                className="group"
              >
                <Card className="hover:shadow-md transition-shadow h-full">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-military-blue/10 text-military-blue">
                        <Icon className="h-5 w-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-semibold flex items-center gap-1 mb-1 truncate">
                          {f.filename}
                          <Download className="h-3 w-3 text-muted-foreground shrink-0" />
                        </h3>
                        <p className="text-xs text-muted-foreground">
                          {formatSize(f.sizeBytes)} &middot;{" "}
                          {dateFormatter.format(new Date(f.createdAt))}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </a>
            );
          })}
        </div>
      )}
    </div>
  );
}
