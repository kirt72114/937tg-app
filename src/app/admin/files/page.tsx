"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DataTable } from "@/components/admin/data-table";
import { Upload, FileText, Image, File } from "lucide-react";

const mockFiles = [
  { id: "1", filename: "937tg-emblem.png", mimeType: "image/png", sizeFormatted: "245 KB", uploadedBy: "Capt Mitchell", createdAt: "Mar 10, 2026" },
  { id: "2", filename: "ait-guide-2026.pdf", mimeType: "application/pdf", sizeFormatted: "1.2 MB", uploadedBy: "TSgt Santos", createdAt: "Mar 5, 2026" },
  { id: "3", filename: "dfac-menu-april.pdf", mimeType: "application/pdf", sizeFormatted: "890 KB", uploadedBy: "SSgt Brown", createdAt: "Apr 1, 2026" },
  { id: "4", filename: "leadership-photo-commander.jpg", mimeType: "image/jpeg", sizeFormatted: "156 KB", uploadedBy: "Capt Mitchell", createdAt: "Feb 20, 2026" },
  { id: "5", filename: "shuttle-route-map.png", mimeType: "image/png", sizeFormatted: "512 KB", uploadedBy: "TSgt Santos", createdAt: "Jan 15, 2026" },
];

type FileItem = (typeof mockFiles)[number];

function FileIcon({ mimeType }: { mimeType: string }) {
  if (mimeType.startsWith("image/")) return <Image className="h-4 w-4 text-blue-500" />;
  if (mimeType === "application/pdf") return <FileText className="h-4 w-4 text-red-500" />;
  return <File className="h-4 w-4 text-muted-foreground" />;
}

const columns = [
  {
    key: "filename",
    header: "File",
    render: (item: FileItem) => (
      <div className="flex items-center gap-2">
        <FileIcon mimeType={item.mimeType} />
        <span className="font-mono text-xs font-medium">{item.filename}</span>
      </div>
    ),
  },
  {
    key: "mimeType",
    header: "Type",
    render: (item: FileItem) => {
      const label = item.mimeType.startsWith("image/") ? "Image" : item.mimeType === "application/pdf" ? "PDF" : "File";
      const variant = item.mimeType.startsWith("image/") ? "default" as const : item.mimeType === "application/pdf" ? "warning" as const : "secondary" as const;
      return <Badge variant={variant}>{label}</Badge>;
    },
    className: "w-24",
  },
  { key: "sizeFormatted", header: "Size", className: "w-24" },
  { key: "uploadedBy", header: "Uploaded By" },
  { key: "createdAt", header: "Date", className: "w-32" },
];

export default function AdminFilesPage() {
  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Files</h1>
          <p className="text-sm text-muted-foreground">Manage uploaded files and images.</p>
        </div>
        <Button><Upload className="h-4 w-4 mr-2" />Upload File</Button>
      </div>
      <DataTable
        columns={columns}
        data={mockFiles}
        onEdit={(item) => alert(`View: ${item.filename}`)}
        onDelete={(item) => alert(`Delete: ${item.filename}`)}
      />
    </div>
  );
}
