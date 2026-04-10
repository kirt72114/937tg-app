"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { DataTable } from "@/components/admin/data-table";
import { Plus, Search, FileText } from "lucide-react";
import { useState } from "react";

const mockPages = [
  { id: "1", title: "Home", slug: "/", status: "published", type: "static", updatedAt: "Apr 8, 2026" },
  { id: "2", title: "Meet Your Leadership", slug: "/leadership", status: "published", type: "static", updatedAt: "Apr 8, 2026" },
  { id: "3", title: "Meet Your MTLs", slug: "/mtls", status: "published", type: "static", updatedAt: "Apr 8, 2026" },
  { id: "4", title: "AiT Guide", slug: "/ait-guide", status: "published", type: "dynamic", updatedAt: "Apr 8, 2026" },
  { id: "5", title: "In-Processing", slug: "/in-processing", status: "published", type: "dynamic", updatedAt: "Apr 9, 2026" },
  { id: "6", title: "Out-Processing", slug: "/out-processing", status: "published", type: "dynamic", updatedAt: "Apr 9, 2026" },
  { id: "7", title: "DFAC Hours", slug: "/dfac-hours", status: "published", type: "dynamic", updatedAt: "Apr 9, 2026" },
  { id: "8", title: "Shuttle Route", slug: "/shuttle", status: "draft", type: "dynamic", updatedAt: "Apr 9, 2026" },
];

type PageItem = (typeof mockPages)[number];

const columns = [
  {
    key: "title",
    header: "Title",
    render: (item: PageItem) => (
      <div className="flex items-center gap-2">
        <FileText className="h-4 w-4 text-muted-foreground" />
        <div>
          <p className="font-medium">{item.title}</p>
          <p className="text-xs text-muted-foreground">{item.slug}</p>
        </div>
      </div>
    ),
  },
  {
    key: "status",
    header: "Status",
    render: (item: PageItem) => (
      <Badge variant={item.status === "published" ? "success" : "secondary"}>
        {item.status}
      </Badge>
    ),
    className: "w-28",
  },
  {
    key: "type",
    header: "Type",
    render: (item: PageItem) => (
      <Badge variant="outline" className="text-xs">{item.type}</Badge>
    ),
    className: "w-24",
  },
  {
    key: "updatedAt",
    header: "Updated",
    className: "w-32",
  },
];

export default function AdminPagesPage() {
  const [search, setSearch] = useState("");

  const filtered = mockPages.filter((p) =>
    p.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Pages</h1>
          <p className="text-sm text-muted-foreground">Manage your site content pages.</p>
        </div>
        <Button asChild>
          <Link href="/admin/pages/new">
            <Plus className="h-4 w-4 mr-2" />
            New Page
          </Link>
        </Button>
      </div>

      <div className="relative mb-4 max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search pages..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-10"
        />
      </div>

      <DataTable
        columns={columns}
        data={filtered}
        onEdit={(item) => alert(`Edit page: ${item.title}`)}
        onDelete={(item) => alert(`Delete page: ${item.title}`)}
        emptyMessage="No pages found."
      />
    </div>
  );
}
