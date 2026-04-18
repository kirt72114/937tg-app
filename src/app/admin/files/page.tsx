"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { DataTable } from "@/components/admin/data-table";
import { Upload, FileText, Image as ImageIcon, File as FileIcon2 } from "lucide-react";
import {
  uploadFile,
  listUploadedFiles,
  deleteUploadedFile,
} from "@/lib/actions/files";

type FileRecord = {
  id: string;
  filename: string;
  storagePath: string;
  mimeType: string;
  sizeBytes: bigint;
  createdAt: Date;
};

function FileIcon({ mimeType }: { mimeType: string }) {
  if (mimeType.startsWith("image/"))
    return <ImageIcon className="h-4 w-4 text-blue-500" />;
  if (mimeType === "application/pdf")
    return <FileText className="h-4 w-4 text-red-500" />;
  return <FileIcon2 className="h-4 w-4 text-muted-foreground" />;
}

function formatBytes(bytes: bigint): string {
  const num = Number(bytes);
  if (num < 1024) return `${num} B`;
  if (num < 1024 * 1024) return `${(num / 1024).toFixed(1)} KB`;
  return `${(num / (1024 * 1024)).toFixed(1)} MB`;
}

function formatDate(date: Date): string {
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

const columns = [
  {
    key: "filename",
    header: "File",
    render: (item: FileRecord) => (
      <div className="flex items-center gap-2">
        <FileIcon mimeType={item.mimeType} />
        <span className="font-mono text-xs font-medium">{item.filename}</span>
      </div>
    ),
  },
  {
    key: "mimeType",
    header: "Type",
    render: (item: FileRecord) => {
      const label = item.mimeType.startsWith("image/")
        ? "Image"
        : item.mimeType === "application/pdf"
          ? "PDF"
          : "File";
      const variant = item.mimeType.startsWith("image/")
        ? ("default" as const)
        : item.mimeType === "application/pdf"
          ? ("warning" as const)
          : ("secondary" as const);
      return <Badge variant={variant}>{label}</Badge>;
    },
    className: "w-24",
  },
  {
    key: "sizeBytes",
    header: "Size",
    render: (item: FileRecord) => formatBytes(item.sizeBytes),
    className: "w-24",
  },
  {
    key: "createdAt",
    header: "Uploaded",
    render: (item: FileRecord) => formatDate(item.createdAt),
    className: "w-32",
  },
];

export default function AdminFilesPage() {
  const [data, setData] = useState<FileRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  async function loadData() {
    const items = await listUploadedFiles();
    setData(items as FileRecord[]);
    setLoading(false);
  }

  useEffect(() => {
    loadData();
  }, []);

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setError(null);
    setUploading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("folder", "uploads");

      const result = await uploadFile(formData);
      if (result.error) {
        setError(result.error);
      } else {
        await loadData();
      }
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  }

  async function handleDelete(item: FileRecord) {
    if (!confirm(`Delete "${item.filename}"?`)) return;
    await deleteUploadedFile(item.id);
    loadData();
  }

  async function handleView(item: FileRecord) {
    const { createClient } = await import("@/lib/supabase/client");
    const supabase = createClient();
    const { data } = supabase.storage
      .from("public-uploads")
      .getPublicUrl(item.storagePath);
    window.open(data.publicUrl, "_blank");
  }

  if (loading) return <div className="p-6">Loading...</div>;

  const filtered = data.filter((f) =>
    f.filename.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Files</h1>
          <p className="text-sm text-muted-foreground">
            Manage uploaded files and images.
          </p>
        </div>
        <Button
          onClick={() => fileInputRef.current?.click()}
          disabled={uploading}
        >
          <Upload className="h-4 w-4 mr-2" />
          {uploading ? "Uploading..." : "Upload File"}
        </Button>
        <input
          ref={fileInputRef}
          type="file"
          onChange={handleUpload}
          className="hidden"
        />
      </div>

      {error && (
        <div className="mb-4 rounded-md border border-destructive/50 bg-destructive/10 p-3 text-sm text-destructive">
          {error}
        </div>
      )}

      <div className="relative mb-4 max-w-sm">
        <Input
          placeholder="Search files..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <DataTable
        columns={columns}
        data={filtered}
        onEdit={handleView}
        onDelete={handleDelete}
        emptyMessage="No files uploaded yet. Click 'Upload File' to add one."
      />
    </div>
  );
}
