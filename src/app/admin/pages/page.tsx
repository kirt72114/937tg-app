"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { DataTable } from "@/components/admin/data-table";
import { Plus, Search, FileText, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import {
  getAllPages,
  deletePage,
  seedDefaultPages,
} from "@/lib/actions/pages";
import { useRouter } from "next/navigation";

type PageItem = {
  id: string;
  title: string;
  slug: string;
  isPublished: boolean;
  pageType: string;
  updatedAt: Date;
  creator: { name: string } | null;
};

function formatDate(date: Date): string {
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

const columns = [
  {
    key: "title",
    header: "Title",
    render: (item: PageItem) => (
      <div className="flex items-center gap-2">
        <FileText className="h-4 w-4 text-muted-foreground" />
        <div>
          <p className="font-medium">{item.title}</p>
          <p className="text-xs text-muted-foreground">/{item.slug}</p>
        </div>
      </div>
    ),
  },
  {
    key: "isPublished",
    header: "Status",
    render: (item: PageItem) => (
      <Badge variant={item.isPublished ? "success" : "secondary"}>
        {item.isPublished ? "Published" : "Draft"}
      </Badge>
    ),
    className: "w-28",
  },
  {
    key: "pageType",
    header: "Type",
    render: (item: PageItem) => (
      <Badge variant="outline" className="text-xs">
        {item.pageType}
      </Badge>
    ),
    className: "w-24",
  },
  {
    key: "updatedAt",
    header: "Updated",
    render: (item: PageItem) => formatDate(item.updatedAt),
    className: "w-32",
  },
];

export default function AdminPagesPage() {
  const router = useRouter();
  const [data, setData] = useState<PageItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [seeding, setSeeding] = useState(false);
  const [search, setSearch] = useState("");

  async function loadData() {
    const items = await getAllPages();
    setData(items as PageItem[]);
    setLoading(false);
  }

  async function handleSeed() {
    setSeeding(true);
    try {
      const result = await seedDefaultPages();
      if (result.added === 0) {
        alert(`All ${result.skipped} default pages already exist.`);
      } else {
        alert(
          `Added ${result.added} page(s).${result.skipped ? ` Skipped ${result.skipped} that already existed.` : ""}`
        );
      }
      await loadData();
    } finally {
      setSeeding(false);
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  async function handleDelete(item: PageItem) {
    if (!confirm(`Delete "${item.title}"?`)) return;
    await deletePage(item.id);
    loadData();
  }

  if (loading) return <div className="p-6">Loading...</div>;

  const filtered = data.filter((p) =>
    p.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Pages</h1>
          <p className="text-sm text-muted-foreground">
            Manage your site content pages.
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={handleSeed}
            disabled={seeding}
          >
            <Sparkles className="h-4 w-4 mr-2" />
            {seeding ? "Seeding..." : "Seed Default Pages"}
          </Button>
          <Button asChild>
            <Link href="/admin/pages/new">
              <Plus className="h-4 w-4 mr-2" />
              New Page
            </Link>
          </Button>
        </div>
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
        onEdit={(item) => router.push(`/admin/pages/${item.id}`)}
        onDelete={handleDelete}
        emptyMessage="No pages yet. Click 'New Page' to create one."
      />
    </div>
  );
}
