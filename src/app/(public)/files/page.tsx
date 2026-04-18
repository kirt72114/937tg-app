import { Metadata } from "next";
import { Card, CardContent } from "@/components/ui/card";
import { PageHeader } from "@/components/shared/page-header";
import {
  Download,
  FileText,
  FileImage,
  FileSpreadsheet,
  File as FileIcon,
} from "lucide-react";
import { listPublicFiles } from "@/lib/actions/files";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Files & Downloads",
};

function iconFor(mimeType: string) {
  if (mimeType.startsWith("image/")) return FileImage;
  if (mimeType.includes("pdf") || mimeType.includes("text")) return FileText;
  if (mimeType.includes("sheet") || mimeType.includes("csv"))
    return FileSpreadsheet;
  return FileIcon;
}

function formatSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
});

export default async function FilesPage() {
  const files = await listPublicFiles();

  return (
    <div>
      <PageHeader
        title="Files & Downloads"
        description="Documents, forms, and resources uploaded by admin staff."
      />
      <div className="mx-auto max-w-7xl px-4 py-8">
        {files.length === 0 ? (
          <Card>
            <CardContent className="p-6 text-center text-sm text-muted-foreground">
              No files have been uploaded yet.
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
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
    </div>
  );
}
